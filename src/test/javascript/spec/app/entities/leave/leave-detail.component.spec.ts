/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestJhipsterTestModule } from '../../../test.module';
import { LeaveDetailComponent } from 'app/entities/leave/leave-detail.component';
import { Leave } from 'app/shared/model/leave.model';

describe('Component Tests', () => {
  describe('Leave Management Detail Component', () => {
    let comp: LeaveDetailComponent;
    let fixture: ComponentFixture<LeaveDetailComponent>;
    const route = ({ data: of({ leave: new Leave(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestJhipsterTestModule],
        declarations: [LeaveDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LeaveDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LeaveDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.leave).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
