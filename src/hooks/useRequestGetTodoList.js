import { useState, useEffect } from 'react';

export const useRequestGetTodoList = (refreshTodos) => {
	const [isLoading, setIsLoading] = useState(false);
	const [todoList, setTodoList] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3005/todos')
			.then((response) => response.json())
			.then((loadedTodos) => setTodoList(loadedTodos))
			.catch((error) => console.log('Ошибка запроса', error))
			.finally(() => setIsLoading(false));
	}, [refreshTodos]);

	const handleCheck = (id) => {
		const updatedList = todoList.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		setTodoList(updatedList);
	};

	return { todoList, isLoading, handleCheck };
};
