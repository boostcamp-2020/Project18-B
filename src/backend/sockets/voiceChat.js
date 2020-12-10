function onConnectVoice(id) {
  const socket = this;
  const { game } = socket;
  socket.in(game.roomID).emit('another voice connected', id);

  socket.on('disconnect', () => {
    socket.in(game.roomID).emit('voice disconnected', id);
  });
}

export default function onVoiceChat(socket) {
  socket.on('player connect voice channel', onConnectVoice);
}
