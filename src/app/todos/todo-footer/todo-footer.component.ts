import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as action from 'src/app/filtro/filtro.action';
import { cleanCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: action.filtrosValidos = 'todos';
  filtros: action.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  pendientes: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {


    this.store.subscribe(state => {

      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;

    });
  }

  cambiarFiltro(filtro: action.filtrosValidos) {
    console.log(filtro)
    this.store.dispatch(action.setFiltro({ filtro }));
  }

  limpiarCompletados(){
    this.store.dispatch(cleanCompletados());

  }

}
