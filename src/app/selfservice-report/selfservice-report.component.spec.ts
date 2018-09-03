import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfserviceReportComponent } from './selfservice-report.component';

describe('SelfserviceReportComponent', () => {
  let component: SelfserviceReportComponent;
  let fixture: ComponentFixture<SelfserviceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfserviceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfserviceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
