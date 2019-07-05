import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Leave } from 'app/shared/model/leave.model';
import { LeaveService } from './leave.service';
import { LeaveComponent } from './leave.component';
import { LeaveDetailComponent } from './leave-detail.component';
import { LeaveUpdateComponent } from './leave-update.component';
import { LeaveDeletePopupComponent } from './leave-delete-dialog.component';
import { ILeave } from 'app/shared/model/leave.model';

@Injectable({ providedIn: 'root' })
export class LeaveResolve implements Resolve<ILeave> {
  constructor(private service: LeaveService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILeave> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Leave>) => response.ok),
        map((leave: HttpResponse<Leave>) => leave.body)
      );
    }
    return of(new Leave());
  }
}

export const leaveRoute: Routes = [
  {
    path: '',
    component: LeaveComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Leaves'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LeaveDetailComponent,
    resolve: {
      leave: LeaveResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Leaves'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LeaveUpdateComponent,
    resolve: {
      leave: LeaveResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Leaves'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LeaveUpdateComponent,
    resolve: {
      leave: LeaveResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Leaves'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const leavePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LeaveDeletePopupComponent,
    resolve: {
      leave: LeaveResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Leaves'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
