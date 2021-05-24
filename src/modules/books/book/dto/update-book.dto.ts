import { OmitType } from '@nestjs/swagger';

import { PersistedBookDto } from './persisted-book.dto';

export class UpdateBookDto extends OmitType(PersistedBookDto, [
  'id',
  'createdAt',
] as const) {}
