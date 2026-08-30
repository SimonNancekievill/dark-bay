import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Offer } from '../../offers/entities/offer.entity';
import { Auction } from '../../auctions/entities/auction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  passwordHash!: string;

  @OneToMany(() => Offer, (offer) => offer.bidder)
  offers!: Offer[];

  @OneToMany(() => Auction, (auction) => auction.seller)
  auctions!: Auction[];

  @CreateDateColumn()
  createdAt!: Date;
}
