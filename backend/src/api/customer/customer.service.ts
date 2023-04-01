import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/customer.create.dto';
import { Customer } from './customer.entity';
import { UpdateCustomerDto } from './dto/customer.update.dto';

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

  public async deleteCustomer(id: number): Promise<boolean> {
    const response = await this.repository.delete(id);
    return response.affected > 0;
  }

  public getAllCustomers(): Promise<Customer[]> {
    return this.repository.find();
  }

  public createCustomer(body: CreateCustomerDto): Promise<Customer> {
    const customer: Customer = new Customer();

    customer.name = body.name;
    customer.lastName = body.lastName;
    customer.email = body.email;

    return this.repository.save(customer);
  }

  public async updateCustomer(
    body: UpdateCustomerDto,
    id: number,
  ): Promise<Customer> {
    const customerToUpdate = await this.repository.findOneBy({
      id,
    });

    customerToUpdate.name = body.name;
    customerToUpdate.lastName = body.lastName;
    customerToUpdate.email = body.email;
    customerToUpdate.isActive = body.isActive;

    return this.repository.save(customerToUpdate);
  }
}
