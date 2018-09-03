import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifiedReportComponent } from './certified-report.component';

describe('CertifiedReportComponent', () => {
  let component: CertifiedReportComponent;
  let fixture: ComponentFixture<CertifiedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertifiedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertifiedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
