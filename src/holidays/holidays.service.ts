import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { Holiday, HolidayDocument } from './holiday.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Pagination } from 'mongoose-paginate-ts';

@Injectable()
export class HolidaysService extends BaseService<HolidayDocument> {
  constructor(
    @InjectModel(Holiday.name) private model: Pagination<HolidayDocument>,
  ) {
    super(model);
  }
}
