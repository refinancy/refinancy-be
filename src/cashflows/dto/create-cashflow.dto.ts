import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCashflowDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Description.',
    example: 'monthly report.',
  })
  readonly description: string;
  @ApiProperty({
    type: String,
    description: 'User Id.',
    example: '5f4e3f3f4f3f4f3f4f3f4f3f',
  })
  readonly user_id: string;
  @ApiProperty({
    type: Date,
    description: 'Started At.',
    example: '2020-08-31T00:00:00.000Z',
  })
  readonly startedAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Ended At.',
    example: '2020-08-31T00:00:00.000Z',
  })
  readonly endedAt: Date;
}
