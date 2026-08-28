import { Auction } from '../auctions/entities/auction.entity';
import { auctionsData, getUsersData, offersData } from './seed-data';
import { AppDataSource } from './data-source';
import { Offer } from '../offers/entities/offer.entity';
import { User } from '../users/entities/user.entity';

(async () => {
  const ds = await AppDataSource.initialize();
  await ds.synchronize(true); // drop data + recreate db, guaranteed clean slate

  const usersRepo = ds.getRepository(User);
  const users = await usersRepo.save(await getUsersData());
  console.log(`Created ${users.length} users`);

  const auctionsRepo = ds.getRepository(Auction);
  // const auctions = await auctionsRepo.save(auctionsData);
  const auctions = auctionsData.map((auctionData) => {
    const user = users[auctionData.userIndex];

    return {
      title: auctionData.title,
      description: auctionData.description,
      seller: user,
      createdAt: auctionData.createdAt,
      startingPrice: auctionData.startingPrice,
      currentPrice: auctionData.currentPrice ? auctionData.currentPrice : null,
      endDate: auctionData.endDate,
    };
  });
  await auctionsRepo.save(auctions);
  console.log(`Created ${auctions.length} auctions`);

  const offerRepo = ds.getRepository(Offer);
  const offers = offersData.map((offerData) => {
    const auction = auctions[offerData.auctionIndex];
    const user = users[offerData.userIndex];

    return {
      bidder: user,
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
