import { Address } from './address'
export class User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  birthDate: Date;
  email: string;
  password: string;
  avatar: string;
  address: Address;
  phoneNumber : string;
  admin : boolean;
  friends : User[];
  interests: string;
  active: boolean;
  verified: boolean;
  created_at: Date;
  updated_at:Date;
}
