import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { setupApp } from './../src/app.setup';

describe('Auctions (e2e)', () => {
  let app: INestApplication<App>;
  const credentials = {
    username: `e2e-${Date.now()}`,
    password: 'ichBin3inHase',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('registers without returning the password hash', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(credentials)
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(String),
      username: credentials.username,
    });
  });

  it('rejects creating an auction without a token', async () => {
    await request(app.getHttpServer())
      .post('/auctions')
      .send({ title: 'Lamp', description: 'Old lamp', startingPrice: 10 })
      .expect(401);
  });

  it('creates an auction after login and lists it', async () => {
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send(credentials)
      .expect(201);
    const token = (login.body as { access_token: string }).access_token;

    const created = await request(app.getHttpServer())
      .post('/auctions')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Lamp', description: 'Old lamp', startingPrice: 10 })
      .expect(201);

    const auctionId = (created.body as { id: string }).id;
    const found = await request(app.getHttpServer())
      .get(`/auctions/${auctionId}`)
      .expect(200);

    expect(found.body).toMatchObject({
      title: 'Lamp',
      startingPrice: 10,
      seller: { username: credentials.username },
    });
  });
});
