import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateCustomerAddressDTO } from './customer.address.create.dto';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsNotEmpty()
  public addresses: CreateCustomerAddressDTO[];

  @IsEmail()
  public email: string;
}
