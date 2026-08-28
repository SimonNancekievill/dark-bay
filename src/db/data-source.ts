import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Auction } from '../auctions/entities/auction.entity';
import { Offer } from '../offers/entities/offer.entity';
import 'dotenv/config';
import { User } from '../users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: process.env.DB_FILE!,
  entities: [Auction, Offer, User],
  migrations: ['src/db/migrations/*.ts'],
  synchronize: false,
});
