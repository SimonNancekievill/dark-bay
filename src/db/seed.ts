import { Auction } from '../auctions/entities/auction.entity';
import { auctionsData } from './seed-data';
import { AppDataSource } from './data-source';

(async () => {
  const ds = await AppDataSource.initialize();
  await ds.synchronize(true); // drop data + recreate db, guaranteed clean slate
  const auctionsRepo = ds.getRepository(Auction);
  const auctions = await auctionsRepo.save(auctionsData);
  console.log(`Created ${auctions.length} auctions`);
  await ds.destroy();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
