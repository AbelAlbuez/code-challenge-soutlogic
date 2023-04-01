import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCustomerDto } from './customer.dto';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@Controller('customers')
@ApiTags('Customers')
export class CustomerController {
  @Inject(CustomerService)
  private readonly service: CustomerService;

  @Get(':id')
  @ApiOperation({ summary: 'Get Customer by Id' })
  public getCustomer(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
    return this.service.getCustomer(id);
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
        value: { name: '', lastName: '', email: '' } as CreateCustomerDto,
      },
    },
  })
  public createCustomer(@Body() body: CreateCustomerDto): Promise<Customer> {
    return this.service.createCustomer(body);
  }
}
