import { Auction } from '../auctions/entities/auction.entity';
import { auctionsData, offersData } from './seed-data';
import { AppDataSource } from './data-source';
import { Offer } from '../offers/entities/offer.entity';

(async () => {
  const ds = await AppDataSource.initialize();
  await ds.synchronize(true); // drop data + recreate db, guaranteed clean slate
  const auctionsRepo = ds.getRepository(Auction);
  const auctions = await auctionsRepo.save(auctionsData);
  console.log(`Created ${auctions.length} auctions`);

  const offerRepo = ds.getRepository(Offer);
  const offers = offersData.map((offerData) => {
    const auction = auctions[offerData.auctionIndex];

    return {
      bidder: offerData.bidder,
      offerPrice: offerData.offerPrice,
      createdAt: offerData.createdAt,
      auction: auction,
    };
  });

  await offerRepo.save(offers);
  console.log(`Created ${offers.length} offers`);

  await ds.destroy();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
