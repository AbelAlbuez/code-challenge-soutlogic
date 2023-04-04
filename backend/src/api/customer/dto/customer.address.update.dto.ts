import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UpdateCustomerAddressDTO {
  @IsNumber()
  @IsNotEmpty()
  public id!: number;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public address: string;
}
