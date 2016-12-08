import { User } from './user';
import { Game } from './game'
export class PlayerAccount {
  user: User;
  login: string;
  game: Game;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}
