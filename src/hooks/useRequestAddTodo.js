export const useRequestAddTodo = (todoText, setRefreshTodos, setIsCreating) => {
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

	return { requestAddTodo };
};
