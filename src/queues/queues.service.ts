import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueuesService {
  constructor(@InjectQueue('attendance') private attendanceQueue: Queue) {}
  async checkIn(): Promise<void> {
    this.attendanceQueue.add(
      'check-in',
      {},
      {
        attempts: 3,
        removeOnComplete: true,
      },
    );
  }
  async checkOut(): Promise<void> {
    this.attendanceQueue.add(
      'check-out',
      {},
      {
        attempts: 3,
        removeOnComplete: true,
      },
    );
  }
}
