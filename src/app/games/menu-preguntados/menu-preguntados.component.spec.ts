import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPreguntadosComponent } from './menu-preguntados.component';

describe('MenuPreguntadosComponent', () => {
  let component: MenuPreguntadosComponent;
  let fixture: ComponentFixture<MenuPreguntadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPreguntadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPreguntadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
