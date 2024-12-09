import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { UsersModule } from 'src/users/users.module';
import { HolidaysModule } from 'src/holidays/holidays.module';

@Module({
  imports: [UsersModule, HolidaysModule],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
