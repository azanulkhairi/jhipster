/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { TestJhipsterTestModule } from '../../../test.module';
import { LeaveUpdateComponent } from 'app/entities/leave/leave-update.component';
import { LeaveService } from 'app/entities/leave/leave.service';
import { Leave } from 'app/shared/model/leave.model';

describe('Component Tests', () => {
  describe('Leave Management Update Component', () => {
    let comp: LeaveUpdateComponent;
    let fixture: ComponentFixture<LeaveUpdateComponent>;
    let service: LeaveService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestJhipsterTestModule],
        declarations: [LeaveUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LeaveUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LeaveUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LeaveService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Leave(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Leave();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
