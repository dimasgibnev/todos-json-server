import { Routes, Route } from 'react-router-dom';
import {Todos, Todo, TodoEdit, TodoNotFound } from './components';

export const App = () => {

	return (
		<Routes>

			<Route
				path="/"
				element={
					<Todos />
				}
			/>
			<Route
				path="/:id"
				element={
					<Todo  />
				}
			/>
			<Route
				path="/:id/:edit"
				element={
					<TodoEdit  />
				}
			/>
			<Route path="/404" element={TodoNotFound}/>
		</Routes>
	);
};
