import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  endDate!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
