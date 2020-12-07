import express, { Request, Response } from 'express';
import GameList from '@game/GameList';

const router = express.Router();

const getRoomsRouter = (req: Request, res: Response) => {
  const { roomID } = req.params;
  const game = GameList.getGame(roomID);
  if (game && game.isEnterable(roomID)) {
    return res.status(200).json({});
  }

  return res.status(403).json({});
};

router.get('/rooms', getRoomsRouter);
router.get('/rooms/:roomID', getRoomsRouter);

router.post('/rooms', (req: Request, res: Response) => {
  const roomID = GameList.createGame();
  return res.status(200).json({ roomID });
});

export default router;