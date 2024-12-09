import { Process, Processor } from '@nestjs/bull';
import { AttendanceService } from '../attendance/attendance.service';

@Processor('attendance')
export class AttendanceProcessor {
  constructor(private readonly attendanceService: AttendanceService) {}
  @Process('check-in')
  async handleCheckIn(): Promise<void> {
    await this.attendanceService.checkIn();
  }
  @Process('check-out')
  async handleCheckOut(): Promise<void> {
    await this.attendanceService.checkOut();
  }
}
