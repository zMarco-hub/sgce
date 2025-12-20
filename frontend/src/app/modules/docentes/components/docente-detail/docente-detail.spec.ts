import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteDetail } from './docente-detail';

describe('DocenteDetail', () => {
  let component: DocenteDetail;
  let fixture: ComponentFixture<DocenteDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocenteDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
