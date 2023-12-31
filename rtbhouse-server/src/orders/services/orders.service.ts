import { Injectable } from '@nestjs/common';
import { Order } from '../interfaces/order.interface';

@Injectable()
export class OrdersService {
  public readonly orders: Order[] = [
    {
      customer_id: 1,
      products: [
        { product_id: 101, amount: 1 },
        { product_id: 112, amount: 2 },
        { product_id: 107, amount: 1 },
      ],
      purchase_date: '2023-01-15',
      purchase_id: 'P001',
    },

    {
      customer_id: 3,
      products: [
        { product_id: 105, amount: 2 },
        { product_id: 114, amount: 1 },
        { product_id: 118, amount: 1 },
      ],
      purchase_date: '2023-02-22',
      purchase_id: 'P002',
    },

    {
      customer_id: 5,
      products: [
        { product_id: 108, amount: 1 },
        { product_id: 116, amount: 1 },
        { product_id: 111, amount: 2 },
      ],
      purchase_date: '2023-03-10',
      purchase_id: 'P003',
    },

    {
      customer_id: 2,
      products: [
        { product_id: 103, amount: 1 },
        { product_id: 110, amount: 1 },
        { product_id: 116, amount: 1 },
      ],
      purchase_date: '2023-04-05',
      purchase_id: 'P004',
    },

    {
      customer_id: 7,
      products: [
        { product_id: 106, amount: 1 },
        { product_id: 118, amount: 1 },
        { product_id: 112, amount: 1 },
      ],
      purchase_date: '2023-05-20',
      purchase_id: 'P005',
    },

    {
      customer_id: 4,
      products: [
        { product_id: 109, amount: 1 },
        { product_id: 119, amount: 2 },
        { product_id: 114, amount: 1 },
      ],
      purchase_date: '2023-06-18',
      purchase_id: 'P006',
    },

    {
      customer_id: 6,
      products: [
        { product_id: 102, amount: 2 },
        { product_id: 111, amount: 1 },
        { product_id: 115, amount: 1 },
      ],
      purchase_date: '2023-07-14',
      purchase_id: 'P007',
    },

    {
      customer_id: 9,
      products: [
        { product_id: 110, amount: 1 },
        { product_id: 116, amount: 1 },
        { product_id: 108, amount: 2 },
      ],
      purchase_date: '2023-08-30',
      purchase_id: 'P008',
    },

    {
      customer_id: 8,
      products: [
        { product_id: 107, amount: 1 },
        { product_id: 114, amount: 1 },
        { product_id: 119, amount: 1 },
      ],
      purchase_date: '2023-09-25',
      purchase_id: 'P009',
    },

    {
      customer_id: 10,
      products: [
        { product_id: 104, amount: 2 },
        { product_id: 115, amount: 1 },
        { product_id: 118, amount: 1 },
      ],
      purchase_date: '2023-10-12',
      purchase_id: 'P010',
    },

    {
      customer_id: 1,
      products: [
        { product_id: 112, amount: 1 },
        { product_id: 117, amount: 1 },
        { product_id: 103, amount: 2 },
      ],
      purchase_date: '2023-11-05',
      purchase_id: 'P011',
    },

    {
      customer_id: 3,
      products: [
        { product_id: 115, amount: 1 },
        { product_id: 119, amount: 1 },
        { product_id: 108, amount: 1 },
      ],
      purchase_date: '2023-12-20',
      purchase_id: 'P012',
    },

    {
      customer_id: 5,
      products: [
        { product_id: 116, amount: 2 },
        { product_id: 107, amount: 1 },
        { product_id: 111, amount: 1 },
      ],
      purchase_date: '2024-01-08',
      purchase_id: 'P013',
    },

    {
      customer_id: 2,
      products: [
        { product_id: 114, amount: 1 },
        { product_id: 118, amount: 1 },
        { product_id: 109, amount: 1 },
      ],
      purchase_date: '2024-02-15',
      purchase_id: 'P014',
    },

    {
      customer_id: 7,
      products: [
        { product_id: 118, amount: 1 },
        { product_id: 109, amount: 1 },
        { product_id: 110, amount: 1 },
      ],
      purchase_date: '2024-03-22',
      purchase_id: 'P015',
    },

    {
      customer_id: 4,
      products: [
        { product_id: 119, amount: 1 },
        { product_id: 107, amount: 1 },
        { product_id: 108, amount: 1 },
      ],
      purchase_date: '2024-04-30',
      purchase_id: 'P016',
    },

    {
      customer_id: 6,
      products: [
        { product_id: 111, amount: 1 },
        { product_id: 108, amount: 1 },
        { product_id: 115, amount: 1 },
      ],
      purchase_date: '2024-05-12',
      purchase_id: 'P017',
    },

    {
      customer_id: 9,
      products: [
        { product_id: 110, amount: 1 },
        { product_id: 106, amount: 1 },
        { product_id: 107, amount: 1 },
      ],
      purchase_date: '2024-06-01',
      purchase_id: 'P018',
    },
    {
      customer_id: 8,
      products: [
        { product_id: 107, amount: 1 },
        { product_id: 112, amount: 1 },
      ],
      purchase_date: '2024-07-18',
      purchase_id: 'P019',
    },
    {
      customer_id: 10,
      products: [
        { product_id: 104, amount: 1 },
        { product_id: 115, amount: 1 },
      ],
      purchase_date: '2024-08-03',
      purchase_id: 'P020',
    },
  ];
  //to do create interface for this
  findAll(): Order[] {
    return this.orders;
  }

  findOneByCustomer(id: number): Order {
    return this.orders.find((order) => order.customer_id === id);
  }
}
