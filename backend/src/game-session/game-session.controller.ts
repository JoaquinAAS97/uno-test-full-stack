import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GameSessionService } from './game-session.service';
import { CreateGameSessionDto } from './dto/create-game-session.dto';
import { UpdateGameSessionDto } from './dto/update-game-session.dto';

@Controller('game-session')
export class GameSessionController {
  constructor(private readonly gameSessionService: GameSessionService) {}

  @Post()
  create(@Body() createGameSessionDto: CreateGameSessionDto) {
    return this.gameSessionService.create(createGameSessionDto);
  }

  @Get(':rut')
  findOne(@Param('rut') rut: string) {
    return this.gameSessionService.findByRut(rut);
  }

}
