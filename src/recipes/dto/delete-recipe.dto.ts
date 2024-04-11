import { ApiProperty } from '@nestjs/swagger';

export class DeleteRecipeDto {
  @ApiProperty({
    type: String,
    example: '5f4e3f3f4f3f4f3f4f3f4f3f',
  })
  readonly id: string;
}
