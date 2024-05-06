import { useState, useEffect } from 'react';

export const useRequestGetTodoList = (refreshTodos, setTodoList, id = '') => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch(`http://localhost:3005/todos/${id}`)
			.then((response) => response.json())
			.then((loadedTodos) => setTodoList(loadedTodos))
			.catch((error) => console.log('Ошибка запроса', error))
			.finally(() => setIsLoading(false));
	}, [refreshTodos]);
	

	return { isLoading };
};
