import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll, cleanCompletados } from './todo.actions';
import { Todo } from './models/todo.model';

export const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Comprar tarje de iroman'),
  new Todo('Vencer a Thanos'),
  new Todo('Dominar el mundo')
];

const _todoReducer = createReducer(estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(toggle, (state, { id }) => {

    return state.map((todo) => {

      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        };
      } else {
        return todo;
      }
    })

  }),
  on(editar, (state, { id, texto }) => {

    return state.map((todo) => {

      if (todo.id === id) {
        return {
          ...todo,
          texto
        };
      } else {
        return todo;
      }
    })

  }),
  on(borrar, (state, { id }) => {

    return state.filter((todo) => todo.id !== id);

  }),
  on(toggleAll, (state, { completado }) => {

    return state.map((todo) => {
      return {
        ...todo,
        completado
      };
    });

  }),
  on(cleanCompletados, state =>
    state.filter(todo => !todo.completado)
  ),

);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
