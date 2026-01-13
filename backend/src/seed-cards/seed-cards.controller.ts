import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedCardsService } from './seed-cards.service';


@Controller('seed-cards')
export class SeedCardsController {
  constructor(private readonly seedCardsService: SeedCardsService) {}

  @Get()
  executed() {
    this.seedCardsService.execute();
    return "Seed has been executed succefully"
  }
}
