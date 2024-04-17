import { useState } from 'react';

export const useRequestDeleteTodo = (setRefreshTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTodo = (id) => {
		setIsDeleting(true);
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setRefreshTodos((prev) => !prev);
			})
			.catch((error) => console.log('Ошибка', error))
			.finally(() => setIsDeleting(false));
	};

	return { requestDeleteTodo, isDeleting };
};
