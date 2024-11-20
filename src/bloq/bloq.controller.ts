import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BloqService } from './bloq.service';
import { CreateBloqDto } from './dto/create-bloq.dto';
import { UpdateBloqDto } from './dto/update-bloq.dto';

@Controller('bloq')
export class BloqController {
  constructor(private readonly bloqService: BloqService) {}

  @Post()
  create(@Body() createBloqDto: CreateBloqDto) {
    return this.bloqService.create(createBloqDto);
  }

  @Get()
  findAll() {
    return this.bloqService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bloqService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBloqDto: UpdateBloqDto) {
    return this.bloqService.update(id, updateBloqDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bloqService.remove(id);
  }
}
