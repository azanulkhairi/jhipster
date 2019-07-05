import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestJhipsterSharedModule } from 'app/shared';
import {
  LeaveComponent,
  LeaveDetailComponent,
  LeaveUpdateComponent,
  LeaveDeletePopupComponent,
  LeaveDeleteDialogComponent,
  leaveRoute,
  leavePopupRoute
} from './';

const ENTITY_STATES = [...leaveRoute, ...leavePopupRoute];

@NgModule({
  imports: [TestJhipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [LeaveComponent, LeaveDetailComponent, LeaveUpdateComponent, LeaveDeleteDialogComponent, LeaveDeletePopupComponent],
  entryComponents: [LeaveComponent, LeaveUpdateComponent, LeaveDeleteDialogComponent, LeaveDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestJhipsterLeaveModule {}
