import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";

import { CreateUserDto } from "./dtos/createUser.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly users: Repository<User>,
	) {}

	findByUsername(username: string): Promise<User | null> {
		return this.users.findOneBy({ username });
	}

	async createUser(userPayload: CreateUserDto): Promise<User> {
		const SALT_ROUNDS = 12;
		const { username, password } = userPayload;
		const usernameExists = await this.findByUsername(username);
		if (usernameExists) {
			throw new ConflictException(`Username '${username}' is already taken.`);
		}

		const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
		const user = this.users.create({
			username,
			passwordHash,
		});
		return this.users.save(user);
	}
}
