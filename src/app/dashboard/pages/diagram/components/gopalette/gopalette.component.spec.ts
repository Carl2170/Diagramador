import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GopaletteComponent } from './gopalette.component';

describe('GopaletteComponent', () => {
  let component: GopaletteComponent;
  let fixture: ComponentFixture<GopaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GopaletteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GopaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
