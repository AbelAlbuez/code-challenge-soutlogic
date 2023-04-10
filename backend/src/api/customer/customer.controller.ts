import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from './dto/customer.create.dto';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { UpdateCustomerDto } from './dto/customer.update.dto';

@Controller('customers')
@ApiTags('Customers')
export class CustomerController {
  @Inject(CustomerService)
  private readonly service: CustomerService;

  @Get()
  @ApiOperation({ summary: 'Get all Customers' })
  public getAllCustomers(): Promise<Customer[]> {
    return this.service.getAllCustomers();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new Customer' })
  @ApiBody({
    type: CreateCustomerDto,
    description:
      'The Description for the Post Body. Please look into the DTO. You will see the @ApiOptionalProperty used to define the Schema.',
    examples: {
      a: {
        summary: 'Request sample',
        description: 'Body is used to create a new customer',
        value: {
          name: '',
          lastName: '',
          email: '',
          addresses: [
            {
              name: '',
              address: '',
            },
          ],
        } as CreateCustomerDto,
      },
    },
  })
  public createCustomer(@Body() body: CreateCustomerDto): Promise<Customer> {
    return this.service.createCustomer(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Customer by Id' })
  public async getCustomer(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Customer> {
    const response = await this.service.getCustomer(id);
    return response;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Customer by Id' })
  @ApiBody({
    type: UpdateCustomerDto,
    description:
      'The Description for the Post Body. Please look into the DTO. You will see the @ApiOptionalProperty used to define the Schema.',
    examples: {
      a: {
        summary: 'Request sample',
        description: 'Body is used to create a new customer',
        value: {
          name: '',
          lastName: '',
          email: '',
          addresses: [
            {
              id: 0,
              name: '',
              address: '',
            },
          ],
        } as UpdateCustomerDto,
      },
    },
  })
  public async updateCustomer(
    @Body() body: UpdateCustomerDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Customer> {
    return await this.service.updateCustomer(body, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Customer by Id' })
  public deleteCustomer(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.service.deleteCustomer(id);
  }
}
