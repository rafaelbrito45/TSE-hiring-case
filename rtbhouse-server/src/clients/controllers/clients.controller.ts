import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
    return this.clientService.findAll();
  }

  @Get('search')
  findByQuery(@Query() query: getClientsFilterDto): Client[] {
    return this.clientService.findByQuery(query.q);
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.clientService.findOne(Number(id));
  }

  @Get(':id/orders')
  findOrdersByClientId(@Param('id') id) {
    return this.clientService.findOrdersByClientId(Number(id));
  }

  @Post('create')
  createClient(@Body() clientData: createClientDto) {
    this.clientService.createClient(clientData);
    return clientData;
  }
  @Post('delete')
  deleteClient(@Body() body: deleteClientDto) {
    this.clientService.deleteClient(Number(body.id));
    return body;
  }
}
