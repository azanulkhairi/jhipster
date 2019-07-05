import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILeave } from 'app/shared/model/leave.model';
import { LeaveService } from './leave.service';

@Component({
  selector: 'jhi-leave-delete-dialog',
  templateUrl: './leave-delete-dialog.component.html'
})
export class LeaveDeleteDialogComponent {
  leave: ILeave;

  constructor(protected leaveService: LeaveService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.leaveService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'leaveListModification',
        content: 'Deleted an leave'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-leave-delete-popup',
  template: ''
})
export class LeaveDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ leave }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LeaveDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.leave = leave;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/leave', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/leave', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
