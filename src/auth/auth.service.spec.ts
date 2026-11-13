import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import * as bcrypt from "bcrypt";

import { UsersService } from "@/users/users.service";

import { AuthService } from "./auth.service";

describe("AuthService", () => {
	let service: AuthService;
	const usersService = { findByUsername: vi.fn() };

	beforeEach(async () => {
		vi.clearAllMocks();
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{ provide: UsersService, useValue: usersService },
				{ provide: JwtService, useValue: { sign: vi.fn(() => "token") } },
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it("returns the user without the password hash for a correct password", async () => {
		const passwordHash = await bcrypt.hash("secret123", 4);
		usersService.findByUsername.mockResolvedValue({ id: "u1", username: "anna", passwordHash });

		const user = await service.validateUser("anna", "secret123");

		expect(user).toEqual({ id: "u1", username: "anna" });
	});

	it("returns null for a wrong password", async () => {
		const passwordHash = await bcrypt.hash("secret123", 4);
		usersService.findByUsername.mockResolvedValue({ id: "u1", username: "anna", passwordHash });

		expect(await service.validateUser("anna", "wrong")).toBeNull();
	});

	it("returns null for an unknown user", async () => {
		usersService.findByUsername.mockResolvedValue(null);

		expect(await service.validateUser("nobody", "secret123")).toBeNull();
	});
});
