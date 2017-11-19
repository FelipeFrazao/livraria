import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopoComponent } from './topo.component';
import { AppComponent } from "../app.component";

describe('TopoComponent', () => {
  let component: TopoComponent;
  let fixture: ComponentFixture<TopoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render title in a h1 tag', async(() => {
    fixture = TestBed.createComponent(TopoComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Good Shelf');
  }));
});
