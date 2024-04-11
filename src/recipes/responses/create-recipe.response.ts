import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeResponse {
  @ApiProperty({ example: '5f4e3f3f4f3f4f3f4f3f4f3f', type: String })
  readonly _id: string;
  @ApiProperty({ example: 'Salary', type: String })
  readonly title: string;
  @ApiProperty({ example: 'John', type: String })
  readonly from: string;
  @ApiProperty({ example: 'Income from work', type: String })
  readonly description: string;
  @ApiProperty({ example: '1000', type: Number })
  readonly value: number;
  @ApiProperty({
    description: 'Received At.',
    type: Date,
    example: '2020-08-31T00:00:00.000Z',
  })
  readonly receivedAt: Date;
}
