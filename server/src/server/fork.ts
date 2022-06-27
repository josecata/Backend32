process.on('exit', () => {
	console.log(`worker ${process.pid} killed`)
})

process.send!('start')

process.on('message', (PORT) => {
	console.log(`Process Fork: on port: ${PORT} - pid: ${process.pid}`)
})
