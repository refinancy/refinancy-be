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
    description: 'Total Recipe Amount.',
    example: '5000',
    type: Number,
  })
  readonly total_recipe_amount: number;
  @ApiProperty({
    description: 'Total Expense Amount.',
    example: '3000',
    type: Number,
  })
  readonly total_expense_amount: number;
  @ApiProperty({
    description: 'Total.',
    example: '2000',
    type: Number,
  })
  readonly total: number;
  @ApiProperty({
    type: CreateCashflowDto,
  })
  cashflow: CreateCashflowDto;
}
