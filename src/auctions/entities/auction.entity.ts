import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auctions')
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
}
