import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { MongoIdPipe } from '../shared/pipes/mongoId.pipe';
import { ResourcePaginationPipe } from '../shared/pipes/resource-pagination.pipe';
import {
  responseCollection,
  responseCreate,
  responseDetail,
  responseUpdate,
  responseDelete,
} from '../utils/response-parser';

@Controller('holidays')
export class HolidaysController {
  private resource = 'Holiday';
  constructor(private readonly service: HolidaysService) {}

  @Get()
  async paginate(@Query() query: ResourcePaginationPipe) {
    const result = await this.service.paginate(query, ['date']);
    return responseCollection(this.resource, result);
  }

  @Post()
  async create(@Body() data: CreateHolidayDto) {
    const result = await this.service.create(data, ['date']);
    return responseCreate(this.resource, result);
  }

  @Get(':id')
  async get(@Param() { id }: MongoIdPipe) {
    const result = await this.service.findOrFail({ _id: id });
    return responseDetail(this.resource, result);
  }

  @Put(':id')
  async update(@Param() { id }: MongoIdPipe, @Body() data: UpdateHolidayDto) {
    const found = await this.service.getById(id);
    const result = await this.service.update(found, data, ['date']);
    return responseUpdate(this.resource, result);
  }

  @Delete(':id')
  async destroy(@Param() { id }: MongoIdPipe) {
    const found = await this.service.getById(id);
    await this.service.delete(found);
    return responseDelete(this.resource);
  }
}
