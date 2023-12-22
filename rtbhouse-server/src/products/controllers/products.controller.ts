import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product.interface';
import { getProductsFilterDto } from '../dto/get-products-filter.dto';
import { createProductDto } from '../dto/create-product.dto';
import { deleteProductDto } from '../dto/delete-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  findAll(): Product[] {
    return this.productService.findAll();
  }
  //to do - create interface
  @Get('search')
  findByQuery(@Query() query: getProductsFilterDto): Product[] {
    return this.productService.findByQuery(query.q);
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.productService.findOne(Number(id));
  }

  @Post('create')
  createProduct(@Body() productData: createProductDto) {
    this.productService.createProduct(productData);
    return 'product created';
  }

  @Post('delete')
  deleteProduct(@Body() body: deleteProductDto) {
    this.productService.deleteProduct(Number(body.id));
    return body;
  }
}
