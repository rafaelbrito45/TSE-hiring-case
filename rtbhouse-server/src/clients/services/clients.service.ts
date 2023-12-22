import { Inject, Injectable } from '@nestjs/common';
import { Client } from '../interfaces/client.interface';
import { ClientOrder } from '../interfaces/clientOrder.interface';
import { OrdersService } from 'src/orders/services/orders.service';
import { ProductsService } from 'src/products/services/products.service';
import { createClientDto } from '../dto/create-client.dto';

@Injectable()
export class ClientsService {
  @Inject(OrdersService)
  private readonly orderService: OrdersService;

  @Inject(ProductsService)
  private readonly productService: ProductsService;

  public readonly clients: Client[] = [
    { id: 1, name: 'John', surname: 'Doe' },
    { id: 2, name: 'Jane', surname: 'Smith' },
    { id: 3, name: 'Robert', surname: 'Johnson' },
    { id: 4, name: 'Emily', surname: 'Williams' },
    { id: 5, name: 'Michael', surname: 'Brown' },
    { id: 6, name: 'Sophia', surname: 'Davis' },
    { id: 7, name: 'William', surname: 'Miller' },
    { id: 8, name: 'Olivia', surname: 'Wilson' },
    { id: 9, name: 'Ethan', surname: 'Moore' },
    { id: 10, name: 'Ava', surname: 'Jones' },
  ];

  findAll(): Client[] {
    return this.clients;
  }

  public findOne(id: number): Client {
    return this.clients.find((client) => client.id === id);
  }

  findOrdersByClientId(id: number): ClientOrder[] {
    let response = [];
    const allOrders = this.orderService.findAll();
    const filteredOrders = allOrders.filter((order) => {
      return order.customer_id === id;
    });
    let productsInfo = [];
    filteredOrders.map((order) => {
      order.products.map((product: any) => {
        productsInfo.push(this.productService.findOne(product.product_id));
      });

      response.push({
        customer_id: id,
        products: productsInfo,
        date: order.purchase_date,
        order_id: order.purchase_id,
      });
    });

    return response;
  }
  //to do - figure a way to filter by name and surname
  findByQuery(query: string): Client[] {
    let results = [];
    const filteredResults = this.clients.filter(
      (client) => client.name.toLowerCase().indexOf(query.toLowerCase()) > -1,
    );

    filteredResults.map((client) => {
      results.push({
        id: client.id,
        name: client.name,
        surname: client.surname,
      });
    });

    return results;
  }

  createClient(clientData: createClientDto) {
    const id = this.clients[this.clients.length - 1].id + 1;

    const client: Client = {
      id,
      name: clientData.name,
      surname: clientData.surname,
    };

    this.clients.push(client);
  }

  deleteClient(id: number) {
    const clientIndex = this.clients.findIndex((product) => product.id === id);
    this.clients.splice(clientIndex, 1);
  }
}
