import { Controller, HttpCode, Post } from '@nestjs/common';
import { QueuesService } from 'src/queues/queues.service';
import { responseSuccess } from 'src/utils/response-parser';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(
    private readonly queueService: QueuesService,
    private service: AttendanceService,
  ) {}

  @HttpCode(200)
  @Post('check-in')
  async checkIn() {
    await this.service.holidayCheck();
    this.queueService.checkIn();
    return responseSuccess('Check-in success', null);
  }
  @HttpCode(200)
  @Post('check-out')
  async checkOut() {
    await this.service.holidayCheck();
    this.queueService.checkOut();
    return responseSuccess('Check-out success', null);
  }
}
