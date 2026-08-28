import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auction } from '../../auctions/entities/auction.entity';
import { User } from '../../users/entities/user.entity';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: 0 })
  offerPrice!: number;

  @ManyToOne(() => Auction, (auction) => auction.offers)
  auction!: Auction;

  @ManyToOne(() => User, (user) => user.offers)
  bidder!: User;

  @Column({ type: 'datetime' })
  createdAt!: Date;
}
