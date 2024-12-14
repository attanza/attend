import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { decryptData } from '../utils/encrypt';
import { HolidaysService } from '../holidays/holidays.service';
import moment from 'moment';

import { checkInProc } from '../utils/checkInProc';
import { checkOutProc } from '../utils/checkOutProc';
import { getTokenProc } from '../utils/getTokenProc';

@Injectable()
export class AttendanceService {
  constructor(
    private userService: UsersService,
    private holidayService: HolidaysService,
  ) {}
  async checkIn() {
    const users = await this.userService.find({ isActive: true });
    if (users && users.length > 0) {
      for (const user of users) {
        const token = await getTokenProc(user.nik, decryptData(user.password));
        if (token && token !== 0) {
          const promises: any = [];
          promises.push(checkInProc(token));
          await Promise.all(promises);
        } else {
          console.log('No further action for nik: ', user.nik);
        }
      }
    }

    return 'Checked in';
  }
  async checkOut() {
    const users = await this.userService.find({ isActive: true });
    if (users && users.length > 0) {
      for (const user of users) {
        const token = await getTokenProc(user.nik, decryptData(user.password));
        if (token && token !== 0) {
          const promises: any = [];
          promises.push(checkOutProc(token));
          await Promise.all(promises);
        } else {
          console.log('No further action for nik: ', user.nik);
        }
      }
    }

    return 'Checked out';
  }

  async holidayCheck() {
    const todayDate = moment().format('YYYY-MM-DD');
    const found = await this.holidayService.find({ date: todayDate });
    if (!found || found.length > 0) {
      throw new BadRequestException('Today is a holiday');
    }
    return false;
  }
}
