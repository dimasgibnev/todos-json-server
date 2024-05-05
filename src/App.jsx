import { Routes, Route } from 'react-router-dom';
import { MainPage, Todos, Todo, TodoEdit, TodoNotFound } from './components';

export const App = () => {

	return (
		<Routes>
			<Route
				path="/"
				element={
					<MainPage currentPage={'MainPage'}  />
				}
			/>
			<Route
				path="/todos"
				element={
					<Todos currentPage={'Todos'} />
				}
			/>
			<Route
				path="/todos/:id"
				element={
					<Todo currentPage={'Todo'} />
				}
			/>
			<Route
				path="/todos/:id/:edit"
				element={
					<TodoEdit currentPage={'TodoEdit'} />
				}
			/>
			<Route path="/404" element={TodoNotFound}/>
		</Routes>
	);
};
