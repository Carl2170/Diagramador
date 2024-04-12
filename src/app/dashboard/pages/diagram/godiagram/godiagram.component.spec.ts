import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GodiagramComponent } from './godiagram.component';

describe('GodiagramComponent', () => {
  let component: GodiagramComponent;
  let fixture: ComponentFixture<GodiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GodiagramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GodiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
