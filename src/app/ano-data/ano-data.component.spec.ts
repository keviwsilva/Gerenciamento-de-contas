import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnoDataComponent } from './ano-data.component';

describe('AnoDataComponent', () => {
  let component: AnoDataComponent;
  let fixture: ComponentFixture<AnoDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnoDataComponent]
    });
    fixture = TestBed.createComponent(AnoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
