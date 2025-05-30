const http = require('http');
const app = require('./app');
const socketIo = require('socket.io');
const UserStatusService = require('./services/userStatusService')

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
const io = socketIo(server);

new UserStatusService(io);
require('./jobs/sessionCleanup');