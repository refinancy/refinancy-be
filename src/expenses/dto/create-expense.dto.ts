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
    type: String,
    description: 'Creator Id',
    example: '5f4b3b3b4f6f4b3b3b4f6f4b',
  })
  readonly user_id: string;
  @ApiProperty({
    type: Number,
    description: 'USD.',
    example: 'R$ 1000.00',
  })
  readonly value: number;
}
