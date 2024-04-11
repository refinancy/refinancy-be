import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRecipeDto {
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
    example: 'Income from work.',
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
    description: 'Received At.',
    example: '2020-08-31T00:00:00.000Z',
  })
  readonly receivedAt: Date;
}
