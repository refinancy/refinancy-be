import { ApiProperty } from '@nestjs/swagger';

export class CreateCashflowResponse {
  @ApiProperty({ example: '5f4e3f3f4f3f4f3f4f3f4f3f', type: String })
  readonly _id: string;
  @ApiProperty({ example: 'Monthly report.', type: String })
  readonly description: string;
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
    description: 'Started At.',
    type: Date,
    example: '2020-08-31T00:00:00.000Z',
  })
  readonly startedAt: Date;
  @ApiProperty({
    description: 'Ended At.',
    type: Date,
    example: '2020-08-31T00:00:00.000Z',
  })
  readonly endedAt: Date;
}
