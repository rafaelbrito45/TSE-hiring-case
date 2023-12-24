import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { OrdersService } from '../../orders/services/orders.service';
import { ClientsController } from '../controllers/clients.controller';
import { ProductsService } from '../../products/services/products.service';
import { ClientsModule } from '../clients.module';

describe('ClientsService', () => {
  let service: ClientsService;
  let app: { init: () => any; getHttpServer: () => any; close: () => any };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClientsModule],
      controllers: [ClientsController],
      providers: [ClientsService, OrdersService, ProductsService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<ClientsService>(ClientsService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('/clients (GET) should return an array of clients', async () => {
    const response = await request(app.getHttpServer()).get('/clients');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(service.findAll());
  });

  it('/products/create (POST) should create a new product', async () => {
    const data = {
      name: 'name',
      surname: 'surname',
    };
    const response = await request(app.getHttpServer())
      .post('/clients/create')
      .send(data);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      message: 'client created',
    });
  });
});
