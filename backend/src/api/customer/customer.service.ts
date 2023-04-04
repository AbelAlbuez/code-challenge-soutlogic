import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/customer.create.dto';
import { Customer } from './customer.entity';
import { UpdateCustomerDto } from './dto/customer.update.dto';
import { CustomerAddress } from './customer.address.entity';

@Injectable()
export class CustomerService {
  @InjectRepository(Customer)
  private readonly repository: Repository<Customer>;
  constructor(private manager: EntityManager) {}

  public getCustomer(id: number): Promise<Customer> {
    return this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['addresses'],
    });
  }

  public async deleteCustomer(id: number): Promise<boolean> {
    const response = await this.repository.delete(id);
    return response.affected > 0;
  }

  public getAllCustomers(): Promise<Customer[]> {
    return this.repository.find({
      relations: ['addresses'],
    });
  }

  public async createCustomer(body: CreateCustomerDto): Promise<Customer> {
    let response = null;
    await this.manager.transaction(async (manager) => {
      const customer: Customer = new Customer();

      customer.name = body.name;
      customer.lastName = body.lastName;
      customer.email = body.email;
      customer.addresses = [];

      if (body.addresses.length > 0) {
        for (let index = 0; index < body.addresses.length; index++) {
          const element = body.addresses[index];
          const ca = new CustomerAddress();
          ca.name = element.name;
          ca.address = element.address;
          await manager.save(ca);
          customer.addresses = [...customer.addresses, ca];
        }
      }
      response = await manager.save(customer);
    });
    return response;
  }

  public async updateCustomer(
    body: UpdateCustomerDto,
    id: number,
  ): Promise<Customer> {
    let response = null;
    await this.manager.transaction(async (manager) => {
      const customerToUpdate = await this.getCustomer(id);

      customerToUpdate.name = body.name;
      customerToUpdate.lastName = body.lastName;
      customerToUpdate.email = body.email;
      customerToUpdate.addresses = [];

      if (body.addresses.length > 0) {
        for (let index = 0; index < body.addresses.length; index++) {
          const element = body.addresses[index];
          const id = element.id;
          const ca = await manager.findOne(CustomerAddress, {
            where: {
              id: id,
            },
          });
          ca.name = element.name;
          ca.address = element.address;
          await manager.save(ca);
          customerToUpdate.addresses = [...customerToUpdate.addresses, ca];
        }
      }

      response = await manager.save(customerToUpdate);
    });

    return response;
  }
}
