import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCarrinhoComponent } from './modal-carrinho.component';

describe('ModalCarrinhoComponent', () => {
  let component: ModalCarrinhoComponent;
  let fixture: ComponentFixture<ModalCarrinhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCarrinhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
