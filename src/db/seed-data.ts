import * as bcrypt from "bcrypt";

const SALT_ROUNDS = 12;
const DAY_IN_MS = 24 * 60 * 60 * 1000;
const now = Date.now();

const daysFromNow = (days: number) => new Date(now + days * DAY_IN_MS);

export async function getUsersData() {
	return [
		{
			username: "swagger",
			passwordHash: await bcrypt.hash("letsSwaggg", SALT_ROUNDS),
		},
		{
			username: "tomato",
			passwordHash: await bcrypt.hash("pomodoroIsMyFav", SALT_ROUNDS),
		},
	];
}

export const auctionsData = [
	{
		userIndex: 0,
		title: "Vintage Rolex Submariner",
		description: "1970s Rolex Submariner, great condition, comes with original box.",
		seller: "watchlover88",
		startingPrice: 3500,
		currentPrice: 3750,
		createdAt: daysFromNow(-10),
		endDate: daysFromNow(5),
	},
	{
		userIndex: 0,
		title: "Gaming PC RTX 4090",
		description: "High-end gaming PC, 32GB RAM, 2TB SSD, barely used.",
		seller: "techseller_ben",
		startingPrice: 1800,
		currentPrice: 1950,
		createdAt: daysFromNow(-8),
		endDate: daysFromNow(3),
	},
	{
		userIndex: 0,
		title: "Handcrafted Leather Armchair",
		description: "Chesterfield armchair, genuine leather, dark brown.",
		seller: "furniturehub_freiburg",
		startingPrice: 450,
		currentPrice: 475,
		createdAt: daysFromNow(-20),
		endDate: daysFromNow(-17),
	},
	{
		userIndex: 0,
		title: "Fender Stratocaster 1998",
		description: "American-made electric guitar, sunburst finish, minor fret wear.",
		seller: "guitarcollector",
		startingPrice: 900,
		currentPrice: 950,
		createdAt: daysFromNow(-12),
		endDate: daysFromNow(10),
	},
	{
		userIndex: 0,
		title: "Antique Persian Rug",
		description: "Hand-woven wool rug, approx. 200x300cm, early 20th century.",
		seller: "rugtraderemma",
		startingPrice: 1200,
		currentPrice: 1250,
		createdAt: daysFromNow(-30),
		endDate: daysFromNow(-12),
	},
	{
		userIndex: 0,
		title: "MacBook Pro 16-inch M3",
		description: "Barely used, 32GB RAM, 1TB SSD, still under warranty.",
		seller: "techseller_ben",
		startingPrice: 2100,
		currentPrice: 2150,
		createdAt: daysFromNow(-5),
		endDate: daysFromNow(2),
	},
	{
		userIndex: 0,
		title: "Original Oil Painting - Coastal Sunset",
		description: "Framed original oil on canvas, signed by the artist.",
		seller: "artgallery_north",
		startingPrice: 300,
		currentPrice: 320,
		createdAt: daysFromNow(-4),
		endDate: daysFromNow(6),
	},
	{
		userIndex: 0,
		title: "Mountain Bike - Full Suspension",
		description: "Trek Fuel EX, size L, serviced last month, minor scratches.",
		seller: "bikeguy_max",
		startingPrice: 600,
		currentPrice: 630,
		createdAt: daysFromNow(-25),
		endDate: daysFromNow(-3),
	},
	{
		userIndex: 0,
		title: "Espresso Machine - La Marzocco Linea Mini",
		description: "Home espresso machine, excellent condition, includes tamper and knock box.",
		seller: "coffeenerd_lisa",
		startingPrice: 1400,
		createdAt: daysFromNow(-2),
		endDate: daysFromNow(0.5),
	},
	{
		userIndex: 0,
		title: "Rare First Edition Book Collection",
		description: "Set of 5 first-edition novels, protective sleeves included.",
		seller: "bookwormjane",
		startingPrice: 750,
		createdAt: daysFromNow(-1),
		endDate: daysFromNow(20),
	},
];

export const offersData = [
	{
		userIndex: 1,
		auctionIndex: 0,
		offerPrice: 3600,
		createdAt: daysFromNow(-9.5),
	},
	{
		userIndex: 1,
		auctionIndex: 0,
		offerPrice: 3750,
		createdAt: daysFromNow(-8),
	},
	{
		userIndex: 1,
		auctionIndex: 1,
		offerPrice: 1850,
		createdAt: daysFromNow(-7),
	},
	{
		userIndex: 1,
		auctionIndex: 1,
		offerPrice: 1950,
		createdAt: daysFromNow(-6),
	},
	{
		userIndex: 1,
		auctionIndex: 2,
		offerPrice: 475,
		createdAt: daysFromNow(-18),
	},
	{
		userIndex: 1,
		auctionIndex: 3,
		offerPrice: 950,
		createdAt: daysFromNow(-11),
	},
	{
		userIndex: 1,
		auctionIndex: 4,
		offerPrice: 1250,
		createdAt: daysFromNow(-25),
	},
	{
		userIndex: 1,
		auctionIndex: 5,
		offerPrice: 2150,
		createdAt: daysFromNow(-4),
	},
	{
		userIndex: 1,
		auctionIndex: 6,
		offerPrice: 320,
		createdAt: daysFromNow(-3),
	},
	{
		userIndex: 1,
		auctionIndex: 7,
		offerPrice: 630,
		createdAt: daysFromNow(-20),
	},
];
