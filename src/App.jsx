import { Routes, Route } from 'react-router-dom';
import { MainPage, Todo, TodoEdit, TodoNotFound } from './pages';

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/task/:id" element={<Todo />} />
			<Route path="/task/:id/:edit" element={<TodoEdit />} />
			<Route path="/404" element={<TodoNotFound />} />
		</Routes>
	);
};
