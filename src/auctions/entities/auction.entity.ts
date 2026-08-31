import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Offer } from '../../offers/entities/offer.entity';
import { User } from '../../users/entities/user.entity';

@Entity('auctions')
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  startingPrice!: number;

  @Column({ type: 'int', nullable: true })
  currentPrice?: number | null;

  @Column({ type: 'datetime' })
  createdAt!: Date;

  @Column({ type: 'datetime' })
  endDate!: Date;

  @OneToMany(() => Offer, (offer) => offer.auction)
  offers!: Offer[];

  @ManyToOne(() => User, (user) => user.auctions)
  seller!: User;
}
