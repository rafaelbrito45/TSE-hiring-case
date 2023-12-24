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
import { ClientsService } from '../services/clients.service';
import { Client } from '../interfaces/client.interface';
import { createClientDto } from '../dto/create-client.dto';
import { getClientsFilterDto } from '../dto/get-clients-filter.dto';
import { deleteClientDto } from '../dto/delete-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}
  @Get()
  findAll(): Client[] {
    try {
      return this.clientService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong', {
        cause: new Error(),
        description: 'Something went wrong',
      });
    }
  }

  @Get('paginate')
  paginate(@Query() query) {
    try {
      return this.clientService.paginate(query);
    } catch (error) {
      throw new BadRequestException('Bad request at pagination', {
        cause: new Error(),
        description: 'Bad request at pagination',
      });
    }
  }

  @Get('search')
  findByQuery(@Query() query: getClientsFilterDto) {
    return this.clientService.findByQuery(query.q);
  }

  @Get(':id')
  findOne(@Param('id') id) {
    try {
      return this.clientService.findOne(Number(id));
    } catch (error) {
      throw new BadRequestException('Client not found', {
        cause: new Error(),
        description: 'Client not found',
      });
    }
  }

  @Get(':id/orders')
  findOrdersByClientId(@Param('id') id) {
    return this.clientService.findOrdersByClientId(Number(id));
  }

  @Post('create')
  createClient(@Body() clientData: createClientDto) {
    try {
      this.clientService.createClient(clientData);
      return { success: true, message: 'client created' };
    } catch (error) {}
  }
  @Post('delete')
  deleteClient(@Body() body: deleteClientDto) {
    try {
      this.clientService.deleteClient(Number(body.id));
      return body;
    } catch (error) {
      throw new BadRequestException('Client not found for deletion', {
        cause: new Error(),
        description: 'Client not found for deletion',
      });
    }
  }
}
