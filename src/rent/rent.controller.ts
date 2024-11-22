import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto, RentLinkLockerDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Post()
  create(@Body() createRentDto: CreateRentDto) {
    return this.rentService.create(createRentDto);
  }

  @Get()
  findAll() {
    return this.rentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentService.findOne(id);
  }

  @Patch('/:id/linklocker')
  linkLocker(@Param('id') id: string, @Body() rentLinkLockerDto: RentLinkLockerDto) {
    return this.rentService.linkLocker(id, rentLinkLockerDto);
  }

  @Patch('/:id/dropoff')
  dropOffParcel(@Param('id') id: string) {
    return this.rentService.dropOff(id);
  }

  @Patch('/:id/dropoff')
  pickUpParcel(@Param('id') id: string) {
    return this.rentService.pickUp(id);
  }

}
