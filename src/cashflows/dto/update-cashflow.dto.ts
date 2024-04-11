import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCashflowDto } from './create-cashflow.dto';

export class UpdateCashflowDto extends PartialType(CreateCashflowDto) {
  @ApiProperty({
    type: String,
    example: '5f4e3f3f4f3f4f3f4f3f4f3f',
  })
  _id: string;
  @ApiProperty({
    type: CreateCashflowDto,
  })
  cashflow: CreateCashflowDto;
}
