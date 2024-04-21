import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateExpenseDto } from './create-expense.dto';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  @ApiProperty({
    type: String,
    example: '5f4e3f3f4f3f4f3f4f3f4f3f',
  })
  _id: string;
  @ApiProperty({
    type: Date,
    description: 'Paid At.',
    example: '2020-08-31T00:00:00.000Z',
  })
  readonly paidAt: Date;
  @ApiProperty({
    type: CreateExpenseDto,
  })
  expense: CreateExpenseDto;
}
