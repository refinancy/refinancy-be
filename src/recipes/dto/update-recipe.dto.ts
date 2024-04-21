import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateRecipeDto } from './create-recipe.dto';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  @ApiProperty({
    type: String,
    example: '5f4e3f3f4f3f4f3f4f3f4f3f',
  })
  _id: string;
  @ApiProperty({
    type: Date,
    description: 'Received At.',
    example: '2020-08-31T00:00:00.000Z',
  })
  readonly receivedAt: Date;
  @ApiProperty({
    type: CreateRecipeDto,
  })
  recipe: CreateRecipeDto;
}
