import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { OrdersService } from '../../orders/services/orders.service';
import { ProductsModule } from '../products.module';

describe('ProductsService', () => {
  let service: ProductsService;
  let app: { init: () => any; getHttpServer: () => any; close: () => any };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductsModule],
      providers: [ProductsService, OrdersService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<ProductsService>(ProductsService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('/products (GET) should return an array of products', async () => {
    const response = await request(app.getHttpServer()).get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(service.findAll());
  });

  it('/products/create (POST) should create a new product', async () => {
    const data = {
      name: 'test product',
      store_name: 'test store',
      price: 25,
    };
    const response = await request(app.getHttpServer())
      .post('/products/create')
      .send(data);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      message: 'product created',
    });
  });
});
