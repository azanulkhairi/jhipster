import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILeave, Leave } from 'app/shared/model/leave.model';
import { LeaveService } from './leave.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee';

@Component({
  selector: 'jhi-leave-update',
  templateUrl: './leave-update.component.html'
})
export class LeaveUpdateComponent implements OnInit {
  isSaving: boolean;

  employees: IEmployee[];

  editForm = this.fb.group({
    id: [],
    daysAmount: [],
    takenDay: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected leaveService: LeaveService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ leave }) => {
      this.updateForm(leave);
    });
    this.employeeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmployee[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmployee[]>) => response.body)
      )
      .subscribe((res: IEmployee[]) => (this.employees = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(leave: ILeave) {
    this.editForm.patchValue({
      id: leave.id,
      daysAmount: leave.daysAmount,
      takenDay: leave.takenDay
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const leave = this.createFromForm();
    if (leave.id !== undefined) {
      this.subscribeToSaveResponse(this.leaveService.update(leave));
    } else {
      this.subscribeToSaveResponse(this.leaveService.create(leave));
    }
  }

  private createFromForm(): ILeave {
    return {
      ...new Leave(),
      id: this.editForm.get(['id']).value,
      daysAmount: this.editForm.get(['daysAmount']).value,
      takenDay: this.editForm.get(['takenDay']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILeave>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackEmployeeById(index: number, item: IEmployee) {
    return item.id;
  }
}
