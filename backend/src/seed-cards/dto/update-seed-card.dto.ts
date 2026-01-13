import { PartialType } from '@nestjs/mapped-types';
import { CreateSeedCardDto } from './create-seed-card.dto';

export class UpdateSeedCardDto extends PartialType(CreateSeedCardDto) {}
