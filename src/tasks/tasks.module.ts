import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HolidaysModule } from 'src/holidays/holidays.module';

@Module({
  imports: [ScheduleModule.forRoot(), HolidaysModule],
  providers: [TasksService],
})
export class TasksModule {}
