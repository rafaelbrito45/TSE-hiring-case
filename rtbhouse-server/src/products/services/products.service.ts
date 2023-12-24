import { Injectable, Inject } from '@nestjs/common';
import { Product } from '../interfaces/product.interface';
import { OrdersService } from '../../orders/services/orders.service';
import { createProductDto } from '../dto/create-product.dto';
//import * as fs from 'fs';
//import * as path from '../../../../data/products.json';

//const filePath = path.resolve(__dirname, '../../../../data/products.json');

@Injectable()
export class ProductsService {
  @Inject(OrdersService)
  private readonly OrderService: OrdersService;
  private readonly products: Product[] = [
    { id: 101, name: 'Smart TV', price: 899.0, store_name: 'ElectroMart' },
    { id: 102, name: 'iPhone 13', price: 1099.99, store_name: 'GadgetWorld' },
    {
      id: 103,
      name: 'Espresso Machine',
      price: 299.95,
      store_name: 'HomeGoods',
    },
    { id: 104, name: 'Running Shoes', price: 89.95, store_name: 'SportsZone' },
    { id: 105, name: 'Gaming Laptop', price: 1499.0, store_name: 'TechHaven' },
    { id: 106, name: 'Nintendo Switch', price: 299.0, store_name: 'GameStop' },
    {
      id: 107,
      name: 'Mirrorless Camera',
      price: 799.95,
      store_name: 'PhotoTech',
    },
    {
      id: 108,
      name: 'Noise-Canceling Headphones',
      price: 249.99,
      store_name: 'AudioWorld',
    },
    {
      id: 109,
      name: 'French Door Refrigerator',
      price: 1299.0,
      store_name: 'ApplianceCenter',
    },
    { id: 110, name: 'iPad Pro', price: 799.99, store_name: 'MobileExpress' },
    { id: 111, name: 'Robot Vacuum', price: 199.99, store_name: 'TechHaven' },
    {
      id: 112,
      name: 'Fitness Tracker',
      price: 79.95,
      store_name: 'SportsZone',
    },
    { id: 113, name: 'Blender', price: 49.99, store_name: 'HomeGoods' },
    {
      id: 114,
      name: 'Curved Gaming Monitor',
      price: 599.99,
      store_name: 'TechHaven',
    },
    { id: 115, name: 'Air Fryer', price: 79.99, store_name: 'ApplianceCenter' },
    {
      id: 116,
      name: 'Apple Watch Series 7',
      price: 349.0,
      store_name: 'MobileExpress',
    },
    {
      id: 117,
      name: 'Drone with Camera',
      price: 699.95,
      store_name: 'PhotoTech',
    },
    { id: 118, name: 'Upright Vacuum', price: 139.99, store_name: 'HomeGoods' },
    { id: 119, name: 'Gaming Keyboard', price: 79.0, store_name: 'GameStop' },
    {
      id: 120,
      name: 'Mini Refrigerator',
      price: 99.0,
      store_name: 'ApplianceCenter',
    },
  ];

  calculateTotalAmount(productId: number) {
    const orders = this.OrderService.findAll();
    let products = [];
    orders.map((order) => {
      order.products.map((product) => {
        products.push(product);
      });
    });

    const filteredProducts = products.filter(
      (product) => product.product_id === productId,
    );
    let totalAmount: number = 0;
    filteredProducts.map((product) => {
      totalAmount += product.amount;
    });

    return totalAmount;
  }
  //to do - make a function to poulate the result to do not repeat the code

  findAll(): Product[] {
    let results = [];

    this.products.map((product) => {
      results.push({
        id: product.id,
        name: product.name,
        price: product.price,
        store_name: product.store_name,
        totalAmount: this.calculateTotalAmount(product.id),
        revenue: this.calculateTotalAmount(product.id) * product.price,
      });
    });

    return results;
  }
  //to do - see if this is usable
  findOneById(productId): Product[] {
    this.calculateTotalAmount(productId);
    let results = [];

    this.products.map((product) => {
      results.push({
        id: product.id,
        name: product.name,
        price: product.price,
        store_name: product.store_name,
        totalAmount: this.calculateTotalAmount(product.id),
        revenue: this.calculateTotalAmount(product.id) * product.price,
      });
    });

    return results;
  }
  //to do - new interface for pagination
  findByQuery(query: string) {
    const filteredResults = this.products.filter(
      (product) => product.name.toLowerCase().indexOf(query.toLowerCase()) > -1,
    );

    const data = filteredResults.map((product: Product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      store_name: product.store_name,
      totalAmount: this.calculateTotalAmount(product.id),
      revenue: this.calculateTotalAmount(product.id) * product.price,
    }));

    return {
      data,
      currentPage: -1,
    };
  }
  paginate({ itemsPerPage, currentPage }) {
    const startIndex = (parseInt(currentPage) - 1) * parseInt(itemsPerPage);
    const endIndex = startIndex + parseInt(itemsPerPage);

    const totalPages = Math.ceil(this.products.length / parseInt(itemsPerPage));

    console.log(totalPages);

    const pageProducts = this.products.slice(startIndex, endIndex);

    let data = [];

    pageProducts.map((product) => {
      data.push({
        id: product.id,
        name: product.name,
        price: product.price,
        store_name: product.store_name,
        totalAmount: this.calculateTotalAmount(product.id),
        revenue: this.calculateTotalAmount(product.id) * product.price,
      });
    });

    return {
      data,
      currentPage: parseInt(currentPage),
      totalPages,
    };
  }

  findOne(id: number): Product {
    const product = this.products.find((product) => product.id === id);
    if (product === undefined) throw new Error('Product not found.');
    const result = {
      id: product.id,
      name: product.name,
      price: product.price,
      store_name: product.store_name,
      totalAmount: this.calculateTotalAmount(product.id),
      revenue: this.calculateTotalAmount(product.id) * product.price,
    };

    return result;
  }

  createProduct(productData: createProductDto) {
    const id = this.products[this.products.length - 1].id + 1;
    const product: Product = {
      id,
      name: productData.name,
      price: productData.price,
      store_name: productData.store_name,
      totalAMount: 0,
      revenue: 0,
    };

    this.products.push(product);
  }

  deleteProduct(id: number) {
    console.log(id);
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    this.products.splice(productIndex, 1);
  }
}
