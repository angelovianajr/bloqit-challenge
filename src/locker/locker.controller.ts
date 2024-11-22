import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LockerService } from './locker.service';
import { CreateLockerDto } from './dto/create-locker.dto';
import { UpdateLockerDto, UpdateLockerStatusDTO } from './dto/update-locker.dto';

@Controller('locker')
export class LockerController {
  constructor(private readonly lockerService: LockerService) {}

  @Post()
  create(@Body() createLockerDto: CreateLockerDto) {
    return this.lockerService.create(createLockerDto);
  }

  @Get()
  findAll() {
    return this.lockerService.findAll();
  }

  @Patch('/status/:id')
  updateLockerStatus(@Param('id') id: string, @Body() updateLockerStatusDto: UpdateLockerStatusDTO) {
    return this.lockerService.updateLockerStatus(id, updateLockerStatusDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lockerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLockerDto: UpdateLockerDto) {
    return this.lockerService.update(id, updateLockerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lockerService.remove(id);
  }
}
