import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { Loader, TodoItem } from './components';

export const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [todoList, setTodoList] = useState([
		{
			userId: 1,
			id: 201,
			title: 'Выполнить домашнее задание, реализовать список дел',
			completed: false,
		},
	]);

	useEffect(() => {
		setIsLoading(true);
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((loadedTodos) => setTodoList((prev) => [...prev, ...loadedTodos]))
			.catch((error) => {
				console.error('Ошибка при загрузке данных:', error);
			})
			.finally(() => {
				setTimeout(() => {
					setIsLoading(false);
				}, 2000);
			});
	}, []);

	const handleCheck = (id) => {
		const updatedList = todoList.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		setTodoList(updatedList);
	};

	return (
		<div className={styles.App}>
			{isLoading ? (
				<Loader />
			) : (
				<TodoItem todoList={todoList} handleCheck={handleCheck} />
			)}
		</div>
	);
};
