import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HolidaysService } from '../holidays/holidays.service';
import { QueuesService } from '../queues/queues.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private queueService: QueuesService,
    private holidayService: HolidaysService,
  ) {}

  // Cleaning up holiday
  @Cron('30 17 * * 1-5')
  async handleCleanUpHoliday() {
    // this.queueService.checkIn();
    this.logger.debug('Cleaning up holidays');
    const dates = await this.holidayService.find({ date: { $lt: new Date() } });
    console.log(dates);
    await this.holidayService.deleteMany({ date: { $lt: new Date() } });
    const after = await this.holidayService.find({ date: { $lt: new Date() } });
    this.logger.debug('Dates after cleaning up');
    console.log(after);
  }
  // Do check In
  @Cron('12 7 * * 1-5')
  async handleCheckIn() {
    this.logger.debug('Checking in');
    this.queueService.checkIn();
  }
  // Do check Out
  @Cron('12 18 * * 1-5')
  async handleCheckOut() {
    this.logger.debug('Checking out');
    this.queueService.checkOut();
  }
}
