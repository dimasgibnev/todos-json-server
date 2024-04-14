import { useState } from 'react';

export const useRequestAddTodo = (todoText, setRefreshTodos) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTodo = () => {
		setIsCreating(true);

		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: todoText,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setRefreshTodos((prev) => !prev);
			})
			.catch((error) => console.log('Ошибка', error))
			.finally(() => setIsCreating(false));
	};

	const handleClick = () => {
		setIsCreating(true);
	};

	return { requestAddTodo, isCreating, handleClick };
};
