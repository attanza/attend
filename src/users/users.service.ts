import { Injectable } from '@nestjs/common';
import { BaseService } from '../shared/services/base.service';
import { User, UserDocument } from './user.schema';
import { Pagination } from 'mongoose-paginate-ts';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService extends BaseService<UserDocument> {
  constructor(@InjectModel(User.name) private model: Pagination<UserDocument>) {
    super(model);
  }
}
