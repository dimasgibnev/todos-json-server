export const useRequestUpdateTodo = (setRefreshTodos, title) => {
	const requestUpdateTodo = (id, completed) => {
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title,
				completed
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setRefreshTodos((prev) => !prev);
			})
			.catch((error) => console.log('Ошибка', error));
	};

	return { requestUpdateTodo };
};
