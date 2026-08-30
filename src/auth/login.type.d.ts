import { Request } from 'express';
import { User } from '../users/entities/user.entity';

export type Payload = {
  sub: string;
  username: string;
};

export type AuthenticatedRequest = Request & {
  user: User;
};
