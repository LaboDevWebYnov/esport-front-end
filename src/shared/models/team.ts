import { PlayerAccount } from './player-account';
import { Game } from './game';

export class Team {
  name: string;
  tag: string;
  captain: PlayerAccount;
  players: PlayerAccount[];
  invitedPlayers: PlayerAccount[];
  postulatedPlayers: PlayerAccount[];
  active: boolean;
  game: Game;
  created_at: Date;
  updated_at: Date;
}
