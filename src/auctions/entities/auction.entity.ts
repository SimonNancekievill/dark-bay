import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Offer } from '../../offers/entities/offer.entity';

@Entity('auctions')
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  seller!: string;

  @Column()
  startingPrice!: number;

  @Column({ default: 0 })
  currentPrice!: number;

  @Column({ type: 'datetime' })
  createdAt!: Date;

  @Column({ type: 'datetime' })
  endDate!: Date;

  @OneToMany(() => Offer, (offer) => offer.auction)
  offers!: Offer[];
}
