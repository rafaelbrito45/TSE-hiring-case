import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
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
    try {
      return this.productService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong', {
        cause: new Error(),
        description: 'Something went wrong',
      });
    }
  }

  @Get('search')
  findByQuery(@Query() query: getProductsFilterDto) {
    return this.productService.findByQuery(query.q);
  }

  @Get('paginate')
  paginate(@Query() query) {
    try {
      return this.productService.paginate(query);
    } catch (error) {
      throw new BadRequestException('Bad Request at pagination', {
        cause: new Error(),
        description: 'Bad request at pagination',
      });
    }
  }

  @Get(':id')
  findOne(@Param('id') id) {
    try {
      return this.productService.findOne(Number(id));
    } catch (error) {
      throw new BadRequestException('Product not found', {
        cause: new Error(),
        description: 'The product id was not found on the data',
      });
    }
  }

  @Post('create')
  createProduct(@Body() productData: createProductDto) {
    try {
      this.productService.createProduct(productData);
      return { success: true, message: 'product created' };
    } catch (error) {
      throw new BadRequestException('body request may not be right', {
        cause: new Error(),
        description: 'body request may not be right',
      });
    }
  }

  @Post('delete')
  deleteProduct(@Body() body: deleteProductDto) {
    try {
      this.productService.deleteProduct(Number(body.id));
      return body;
    } catch (error) {
      throw new BadRequestException('Product not found', {
        cause: new Error(),
        description: 'Product not found for deletion',
      });
    }
  }
}
