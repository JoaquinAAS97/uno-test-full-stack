import { PartialType } from '@nestjs/mapped-types';
import { CreateDeckCardDto } from './create-deck-card.dto';

export class UpdateDeckCardDto extends PartialType(CreateDeckCardDto) {}
