/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestJhipsterTestModule } from '../../../test.module';
import { LeaveComponent } from 'app/entities/leave/leave.component';
import { LeaveService } from 'app/entities/leave/leave.service';
import { Leave } from 'app/shared/model/leave.model';

describe('Component Tests', () => {
  describe('Leave Management Component', () => {
    let comp: LeaveComponent;
    let fixture: ComponentFixture<LeaveComponent>;
    let service: LeaveService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestJhipsterTestModule],
        declarations: [LeaveComponent],
        providers: []
      })
        .overrideTemplate(LeaveComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LeaveComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LeaveService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Leave(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.leaves[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
