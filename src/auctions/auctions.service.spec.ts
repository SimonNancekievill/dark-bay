import { ConflictException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { AuctionsService } from "./auctions.service";
import { Auction } from "./entities/auction.entity";
import { User } from "../users/entities/user.entity";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

const seller = { id: "seller-1" } as User;
const otherUser = { id: "user-2" } as User;

describe("AuctionsService", () => {
	let service: AuctionsService;
	const repository = {
		findOne: vi.fn(),
		create: vi.fn((auction: Partial<Auction>) => auction),
		save: vi.fn((auction: Partial<Auction>) => Promise.resolve(auction)),
		delete: vi.fn(),
	};

	beforeEach(async () => {
		vi.clearAllMocks();
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuctionsService,
				{ provide: getRepositoryToken(Auction), useValue: repository },
			],
		}).compile();

		service = module.get<AuctionsService>(AuctionsService);
	});

	describe("create", () => {
		const payload = { title: "Lamp", description: "Old lamp", startingPrice: 10 };

		it("ends the auction after three days by default", async () => {
			const auction = await service.create(payload, seller);

			const duration = auction.endDate.getTime() - auction.createdAt.getTime();
			expect(duration).toBe(3 * ONE_DAY_IN_MS);
			expect(auction.seller).toBe(seller);
		});

		it("rejects an end date in the past", async () => {
			const endDate = new Date(Date.now() - ONE_DAY_IN_MS);

			await expect(service.create({ ...payload, endDate }, seller)).rejects.toThrow(
				"Auction end cannot be in the past.",
			);
		});

		it("rejects auctions shorter than one day", async () => {
			const endDate = new Date(Date.now() + ONE_DAY_IN_MS / 2);

			await expect(service.create({ ...payload, endDate }, seller)).rejects.toThrow(
				"Auction has to last at least one day.",
			);
		});
	});

	describe("update", () => {
		it("throws when the auction does not exist", async () => {
			repository.findOne.mockResolvedValue(null);

			await expect(service.update("missing", {}, seller)).rejects.toThrow(NotFoundException);
		});

		it("only lets the seller update the auction", async () => {
			repository.findOne.mockResolvedValue({ id: "a1", seller });

			await expect(service.update("a1", { title: "New" }, otherUser)).rejects.toThrow(
				"You can only update your own auctions.",
			);
		});

		it("blocks price changes once there are offers", async () => {
			repository.findOne.mockResolvedValue({ id: "a1", seller, currentPrice: 20 });

			await expect(service.update("a1", { startingPrice: 5 }, seller)).rejects.toThrow(
				ConflictException,
			);
		});
	});

	describe("remove", () => {
		it("blocks deleting within one day of the auction end", async () => {
			const endDate = new Date(Date.now() + ONE_DAY_IN_MS / 2);
			repository.findOne.mockResolvedValue({ id: "a1", seller, endDate });

			await expect(service.remove("a1", seller)).rejects.toThrow(
				"Cannot delete auction within one day of auction end.",
			);
			expect(repository.delete).not.toHaveBeenCalled();
		});
	});
});
