// Express || Server variables
import express from 'express'
import cors from 'cors'
import passport from 'passport'
import passportLocal from 'passport-local'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import http from 'http'
import { Server as ioServer } from 'socket.io'

// MongoDB
import mongoose from 'mongoose'
import User from './Models/UserModel'

// Encrypt
import bcrypt from 'bcryptjs'

// Env
import dotenv from 'dotenv'
import { config } from './config'
dotenv.config()

// Interfaces & Types
import { DatabaseUserInterface, UserInterface } from './Interfaces/UserInterface'
import { mode } from './types/Mode'

// Routes
import { authentication } from './Routes/Authentication'
import { routerCart } from './Routes/Cart'
import { routerChat } from './Routes/Chat'
import { routerProduct } from './Routes/Products'
import { routerRandom } from './Routes/Random'
import { invalid } from './Routes/Invalid'

// Middlewares
import { logRoute } from './Middlewares/Logs'

// Controllers
import { save as saveMessages } from './Controllers/messages'

// Server Mode
import Server from './server/mode'

// Compression
import compression from 'compression'

// Strategy
const LocalStrategy = passportLocal.Strategy

// Logs
import { logger } from './server/logs'
import './server/logs'

// Connection to Mongo
mongoose.connect(`${config.mongoDB}`, (err) => {
	if (err) throw err
	logger?.info(`Worker ${config.ProcessID} connected to Mongo`)
})

// Path folder
import path from 'path'

// Path public client
const root = path.join(__dirname, '..', '..', 'client/build')

// Middleware
const app = express()
app.use(express.json())
app.use(cors({ origin: `${config.FRONTEND}`, credentials: true }))
app.use(session({ secret: 'secretcode', resave: true, saveUninitialized: true }))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(root))
app.use(logRoute)

// Passport
passport.use(
	new LocalStrategy(async (username: string, password: string, done) => {
		await User.findOne({ username: username })
			.then((user: DatabaseUserInterface) => {
				if (!user) return done(null, false)
				bcrypt
					.compare(password, user.password)
					.then((result: boolean) => {
						if (result === true) {
							return done(null, user)
						} else {
							return done(null, false)
						}
					})
					.catch((err) => {
						if (err) throw err
					})
			})
			.catch((err) => {
				if (err) throw err
			})
	})
)

passport.serializeUser((user: DatabaseUserInterface, cb) => {
	cb(null, user._id)
})

passport.deserializeUser(async (id: string, cb) => {
	await User.findOne({ _id: id })
		.catch((err) => {
			cb(err, false)
		})
		.then((user: DatabaseUserInterface) => {
			const userInformation: UserInterface = {
				username: user.username,
				isAdmin: user.isAdmin,
				id: user._id,
			}
			cb(null, userInformation)
		})
})
// Routes

app.use(authentication)
app.use(routerCart)
app.use(routerChat)
app.use(routerProduct)
app.use(routerRandom)

// solo para desafios
const info = {
	Arguments: config.arguments,
	OS: config.os,
	NodeVersion: config.NodeVersion,
	MemoryReservedRSS: config.MemoryReservedRSS,
	ExecPath: config.ExecPath,
	ProcessID: config.ProcessID,
	Folder: config.Folder,
}

app.get('/info', (req, res) => {
	res.send(info)
})
app.get('/infoCompressed', compression(), (req, res) => {
	res.send(info)
})

app.use(invalid)

// Socket io
const httpserver = http.createServer(app)

const io = new ioServer(httpserver, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
})

io.on('connection', (socket) => {
	// logger.info(`User Connected: ${socket.id}`)

	socket.on('disconnect', () => {
		// logger.info('user disconnected', socket.id)
	})

	socket.on('join_room', (data: string) => {
		socket.join(data)
		// console.log(`user with ID: ${socket.id} connect to room: ${data}`)
	})

	socket.on('send_message', (data) => {
		saveMessages(data)
		socket.to('chatRoom').emit('receive_message', data)
	})
})

// Server listener
const PORT: number = config.PORT
const MODE: mode = config.MODE
const server = new Server()
server[MODE](PORT, httpserver)
