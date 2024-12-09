import { Global, Module } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { redisConnection } from '../utils/redis-connetion';
import { BullModule } from '@nestjs/bull';
import { AttendanceModule } from 'src/attendance/attendance.module';
import { AttendanceProcessor } from './attendance.processor';
const REDIS_CONN = redisConnection();

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'attendance',
      redis: REDIS_CONN,
    }),
    AttendanceModule,
  ],
  providers: [QueuesService, AttendanceProcessor],
  exports: [QueuesService],
})
export class QueuesModule {}
