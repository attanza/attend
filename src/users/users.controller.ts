import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MongoIdPipe } from '../shared/pipes/mongoId.pipe';
import { ResourcePaginationPipe } from '../shared/pipes/resource-pagination.pipe';
import {
  responseCollection,
  responseCreate,
  responseDelete,
  responseDetail,
  responseUpdate,
} from '../utils/response-parser';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  private resource = 'User';
  constructor(private readonly service: UsersService) {}

  @Get()
  async paginate(@Query() query: ResourcePaginationPipe) {
    const result = await this.service.paginate(query, ['nik', 'isActive']);
    return responseCollection(this.resource, result);
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    const result = await this.service.create(data, ['nik']);
    return responseCreate(this.resource, result);
  }

  @Get(':id')
  async get(@Param() { id }: MongoIdPipe) {
    const result = await this.service.findOrFail({ _id: id });
    return responseDetail(this.resource, result);
  }

  @Put(':id')
  async update(@Param() { id }: MongoIdPipe, @Body() data: UpdateUserDto) {
    const found = await this.service.getById(id);
    const result = await this.service.update(found, data, ['nik']);
    return responseUpdate(this.resource, result);
  }

  @Delete(':id')
  async destroy(@Param() { id }: MongoIdPipe) {
    const found = await this.service.getById(id);
    await this.service.delete(found);
    return responseDelete(this.resource);
  }
}
