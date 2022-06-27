import child from 'child_process'
import cluster from 'cluster'
import { cpus } from 'os'
import { logger } from '../server/logs'
import path from 'path'
import { config } from '../config'
const root = path.join(__dirname)

export default class Server {
	constructor() {}

	fork = (PORT: any, server: any) => {
		try {
			const forkServer = child.fork(`${root}/fork`)
			server
				.listen(PORT, () => {
					forkServer.on('message', () => {
						forkServer.send(PORT)
						// console.log(`Listening from ${server.address().port} - http://localhost:${PORT}`)
						logger!.info(`Listening from ${server.address().port} - http://localhost:${PORT}`)
					})
				})
				.on('error', (error: Error) => {
					console.log(error)
				})
		} catch (err) {
			console.log(err)
			throw new Error(err)
		}
	}

	cluster = (PORT: any, server: any) => {
		const numCPUs = cpus().length

		if (cluster.isPrimary) {
			logger?.info(`Workers availables: ${numCPUs}`)
			logger?.info(`Master Worker ${config.ProcessID} initialized`)

			for (let i = 0; i < numCPUs; i++) {
				cluster.fork()
			}
			cluster.on('exit', (worker) => {
				logger?.info('Worker ', worker.process.pid, ' killed -', new Date().toLocaleString())
				cluster.fork()
			})
		} else {
			logger?.info(`Process Cluster: on port ${PORT} - worker: ${config.ProcessID}`)
			server
				.listen(PORT, () => {
					// console.log(`Listening from ${server.address().port} - http://localhost:${PORT}`)
					logger?.info(`Listening from ${server.address().port} - http://localhost:${PORT}`)
				})
				.on('error', (error: any) => {
					logger?.error(error)
				})
		}
	}
}
