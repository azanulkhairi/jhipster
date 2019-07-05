import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILeave } from 'app/shared/model/leave.model';

@Component({
  selector: 'jhi-leave-detail',
  templateUrl: './leave-detail.component.html'
})
export class LeaveDetailComponent implements OnInit {
  leave: ILeave;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ leave }) => {
      this.leave = leave;
    });
  }

  previousState() {
    window.history.back();
  }
}
