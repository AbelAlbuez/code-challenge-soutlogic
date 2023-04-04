import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UpdateCustomerAddressDTO } from './customer.address.update.dto';

export class UpdateCustomerDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public addresses: UpdateCustomerAddressDTO[];
}
