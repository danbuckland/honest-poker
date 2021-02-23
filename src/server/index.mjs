import { createServer } from 'https'
import { Server } from 'socket.io'
import fs from 'fs'

const httpServer = createServer({
	key: fs.readFileSync('localhost-key.pem'),
	cert: fs.readFileSync('localhost.pem'),
	requestCert: false,
	rejectUnauthorized: false
})
const io = new Server(httpServer, {
  cors: {
    origin: ["https://localhost:8080"]
  }
  // ...
})

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`)
})

httpServer.listen(7000)