import { OmitType } from '@nestjs/swagger';

import { PersistedAuthorDto } from './persisted-author.dto';

export class UpdateAuthorDto extends OmitType(PersistedAuthorDto, [
  'id',
  'createdAt',
] as const) {}
