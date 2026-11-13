import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  const repository = {
    findOneBy: vi.fn(),
    create: vi.fn((user: Partial<User>) => user),
    save: vi.fn((user: Partial<User>) => Promise.resolve(user)),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: getRepositoryToken(User), useValue: repository }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('stores a bcrypt hash instead of the password', async () => {
    repository.findOneBy.mockResolvedValue(null);

    const user = await service.createUser({ username: 'anna', password: 'secret123' });

    expect(user.passwordHash).not.toBe('secret123');
    expect(await bcrypt.compare('secret123', user.passwordHash)).toBe(true);
  });

  it('rejects a username that is already taken', async () => {
    repository.findOneBy.mockResolvedValue({ id: 'u1', username: 'anna' });

    await expect(service.createUser({ username: 'anna', password: 'secret123' })).rejects.toThrow(
      "Username 'anna' is already taken.",
    );
    expect(repository.save).not.toHaveBeenCalled();
  });
});
