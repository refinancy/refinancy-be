import { ApiProperty } from '@nestjs/swagger';

export class FindOneCashflowDto {
  @ApiProperty({
    type: String,
    example: '5f4e3f3f4f3f4f3f4f3f4f3f',
  })
  public readonly id: string;
}
