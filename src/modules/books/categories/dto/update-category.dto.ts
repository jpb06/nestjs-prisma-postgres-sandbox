import { OmitType } from '@nestjs/swagger';

import { PersistedCategoryDto } from './persisted-category.dto';

export class UpdateCategoryDto extends OmitType(PersistedCategoryDto, [
  'id',
  'createdAt',
] as const) {}
