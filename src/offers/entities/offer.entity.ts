import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auction } from '../../auctions/entities/auction.entity';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  bidder!: string;

  @Column({ default: 0 })
  offerPrice!: number;

  @ManyToOne(() => Auction, (auction) => auction.offers)
  auction!: Auction;

  @Column({ type: 'datetime' })
  createdAt!: Date;
}
