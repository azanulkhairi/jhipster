import { IEmployee } from 'app/shared/model/employee.model';

export interface ILeave {
  id?: number;
  daysAmount?: number;
  takenDay?: number;
  employee?: IEmployee;
}

export class Leave implements ILeave {
  constructor(public id?: number, public daysAmount?: number, public takenDay?: number, public employee?: IEmployee) {}
}
