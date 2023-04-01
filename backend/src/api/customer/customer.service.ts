import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './customer.dto';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  @InjectRepository(Customer)
  private readonly repository: Repository<Customer>;

  public getCustomer(id: number): Promise<Customer> {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  public createCustomer(body: CreateCustomerDto): Promise<Customer> {
    const user: Customer = new Customer();

    user.name = body.name;
    user.lastName = body.lastName;
    user.email = body.email;

    return this.repository.save(user);
  }
}
