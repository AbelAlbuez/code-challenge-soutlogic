import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { CustomerAddress } from './customer.address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, CustomerAddress])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
