const SALT_ROUNDS = 12;
import * as bcrypt from 'bcrypt';

export async function getUsersData() {
  return [
    {
      username: 'swagger',
      passwordHash: await bcrypt.hash('letsSwaggg', SALT_ROUNDS),
    },
    {
      username: 'tomato',
      passwordHash: await bcrypt.hash('pomodoroIsMyFav', SALT_ROUNDS),
    },
  ];
}

export const auctionsData = [
  {
    userIndex: 0,
    title: 'Vintage Rolex Submariner',
    description:
      '1970s Rolex Submariner, great condition, comes with original box.',
    seller: 'watchlover88',
    startingPrice: 3500,
    currentPrice: 3750,
    createdAt: new Date('2026-08-20T09:00:00.000Z'),
    endDate: new Date('2026-09-15T18:00:00.000Z'),
  },
  {
    userIndex: 0,
    title: 'Gaming PC RTX 4090',
    description: 'High-end gaming PC, 32GB RAM, 2TB SSD, barely used.',
    seller: 'techseller_ben',
    startingPrice: 1800,
    currentPrice: 1950,
    createdAt: new Date('2026-08-21T11:30:00.000Z'),
    endDate: new Date('2026-09-10T12:00:00.000Z'),
  },
  {
    userIndex: 0,
    title: 'Handcrafted Leather Armchair',
    description: 'Chesterfield armchair, genuine leather, dark brown.',
    seller: 'furniturehub_freiburg',
    startingPrice: 450,
    currentPrice: 475,
    createdAt: new Date('2026-08-22T14:15:00.000Z'),
    endDate: new Date('2026-08-25T14:15:00.000Z'),
  },
  {
    userIndex: 0,
    title: 'Fender Stratocaster 1998',
    description:
      'American-made electric guitar, sunburst finish, minor fret wear.',
    seller: 'guitarcollector',
    startingPrice: 900,
    currentPrice: 950,
    createdAt: new Date('2026-08-19T16:45:00.000Z'),
    endDate: new Date('2026-09-20T20:00:00.000Z'),
  },
  {
    userIndex: 0,
    title: 'Antique Persian Rug',
    description: 'Hand-woven wool rug, approx. 200x300cm, early 20th century.',
    seller: 'rugtraderemma',
    startingPrice: 1200,
    currentPrice: 1250,
    createdAt: new Date('2026-08-18T10:00:00.000Z'),
    endDate: new Date('2026-09-05T14:00:00.000Z'),
  },
  {
    userIndex: 0,
    title: 'MacBook Pro 16-inch M3',
    description: 'Barely used, 32GB RAM, 1TB SSD, still under warranty.',
    seller: 'techseller_ben',
    startingPrice: 2100,
    createdAt: new Date('2026-08-23T08:20:00.000Z'),
    endDate: new Date('2026-09-12T16:00:00.000Z'),
  },
  {
    userIndex: 0,
    title: 'Original Oil Painting - Coastal Sunset',
    description: 'Framed original oil on canvas, signed by the artist.',
    seller: 'artgallery_north',
    startingPrice: 300,
    createdAt: new Date('2026-08-24T13:00:00.000Z'),
    endDate: new Date('2026-09-12T16:00:00.000Z'),
  },
  {
    userIndex: 0,
    title: 'Mountain Bike - Full Suspension',
    description: 'Trek Fuel EX, size L, serviced last month, minor scratches.',
    seller: 'bikeguy_max',
    startingPrice: 600,
    createdAt: new Date('2026-08-17T17:30:00.000Z'),
    endDate: new Date('2026-09-08T09:00:00.000Z'),
  },
  {
    userIndex: 0,
    title: 'Espresso Machine - La Marzocco Linea Mini',
    description:
      'Home espresso machine, excellent condition, includes tamper and knock box.',
    seller: 'coffeenerd_lisa',
    startingPrice: 1400,
    createdAt: new Date('2026-08-25T07:45:00.000Z'),
    endDate: new Date('2026-09-12T16:00:00.000Z'),
  },
  {
    userIndex: 0,
    title: 'Rare First Edition Book Collection',
    description: 'Set of 5 first-edition novels, protective sleeves included.',
    seller: 'bookwormjane',
    startingPrice: 750,
    createdAt: new Date('2026-08-16T12:00:00.000Z'),
    endDate: new Date('2026-09-25T10:00:00.000Z'),
  },
];

export const offersData = [
  {
    userIndex: 1,
    auctionIndex: 0,
    offerPrice: 3600,
    createdAt: new Date('2026-08-20T10:15:00.000Z'),
  },
  {
    userIndex: 1,
    auctionIndex: 0,
    offerPrice: 3750,
    createdAt: new Date('2026-08-21T09:30:00.000Z'),
  },
  {
    userIndex: 1,
    auctionIndex: 1,
    offerPrice: 1850,
    createdAt: new Date('2026-08-22T14:00:00.000Z'),
  },
  {
    userIndex: 1,
    auctionIndex: 1,
    offerPrice: 1950,
    createdAt: new Date('2026-08-23T16:45:00.000Z'),
  },
  {
    userIndex: 1,
    auctionIndex: 2,
    offerPrice: 475,
    createdAt: new Date('2026-08-23T11:00:00.000Z'),
  },
  {
    userIndex: 1,
    auctionIndex: 3,
    offerPrice: 950,
    createdAt: new Date('2026-08-20T08:20:00.000Z'),
  },
  {
    userIndex: 1,
    auctionIndex: 4,
    offerPrice: 1250,
    createdAt: new Date('2026-08-19T13:10:00.000Z'),
  },
  {
    userIndex: 1,
    auctionIndex: 5,
    offerPrice: 2150,
    createdAt: new Date('2026-08-24T10:00:00.000Z'),
  },
  {
    userIndex: 1,
    auctionIndex: 6,
    offerPrice: 320,
    createdAt: new Date('2026-08-25T15:30:00.000Z'),
  },
  {
    userIndex: 1,
    auctionIndex: 7,
    offerPrice: 630,
    createdAt: new Date('2026-08-18T17:00:00.000Z'),
  },
];
