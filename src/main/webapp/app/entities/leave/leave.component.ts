import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILeave } from 'app/shared/model/leave.model';
import { AccountService } from 'app/core';
import { LeaveService } from './leave.service';

@Component({
  selector: 'jhi-leave',
  templateUrl: './leave.component.html'
})
export class LeaveComponent implements OnInit, OnDestroy {
  leaves: ILeave[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected leaveService: LeaveService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.leaveService
      .query()
      .pipe(
        filter((res: HttpResponse<ILeave[]>) => res.ok),
        map((res: HttpResponse<ILeave[]>) => res.body)
      )
      .subscribe(
        (res: ILeave[]) => {
          this.leaves = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInLeaves();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILeave) {
    return item.id;
  }

  registerChangeInLeaves() {
    this.eventSubscriber = this.eventManager.subscribe('leaveListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
