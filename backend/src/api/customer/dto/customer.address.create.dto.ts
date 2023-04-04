import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCustomerAddressDTO {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public address: string;
}
