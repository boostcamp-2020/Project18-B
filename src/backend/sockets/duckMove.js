function onUserDuckMove({ x, y }) {
  const socket = this;
  const { game, user } = socket;

  if (!user || !game) return;

  socket.in(game.roomID).emit('get duck move', { x, y, playerID: socket.id });
}

export default function onDuckMove(socket) {
  socket.on('send duck move', onUserDuckMove);
}
