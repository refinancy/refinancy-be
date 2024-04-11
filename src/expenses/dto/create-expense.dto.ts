import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({
    type: String,
    description: 'Title.',
    example: 'Salary',
  })
  readonly title: string;
  @ApiProperty({
    type: String,
    description: 'From.',
    example: 'John',
  })
  readonly from: string;
  @ApiPropertyOptional({
    type: String,
    description: 'Description.',
    example: 'Outcome from work.',
  })
  readonly description: string;
  @ApiProperty({
    type: Number,
    description: 'USD.',
    example: 'R$ 1000.00',
  })
  readonly value: number;
  @ApiProperty({
    type: Date,
    description: 'Paid At.',
    example: '2020-08-31T00:00:00.000Z',
  })
  readonly paidAt: Date;
}
