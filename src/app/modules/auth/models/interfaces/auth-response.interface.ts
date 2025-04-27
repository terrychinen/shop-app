import { User } from '@auth/models/interfaces/user.interface';

export interface AuthResponse {
  user: User;
  token: string;
}
