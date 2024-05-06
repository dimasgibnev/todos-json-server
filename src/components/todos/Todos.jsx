import { useState } from 'react';
import { TodoList } from '../todo-list/TodoList';
import { Button } from '../button/Button';
import {
	useRequestGetTodoList,
	useRequestAddTodo,

} from '../../hooks';
import styles from './Todos.module.css'

export const Todos = (currentPage) => {
	const [todos, setTodos] = useState([]);
	const [selectedSort, setSelectedSort] = useState(false);
	const [refreshTodos, setRefreshTodos] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [todoText, setTodoText] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	const { requestAddTodo, isCreating, handleClick } = useRequestAddTodo(
		todoText,
		setRefreshTodos,
		setTodoText,
	);
	useRequestGetTodoList(refreshTodos, setTodos);

	const sortTodos = () => {
		setSelectedSort(!selectedSort);
	};

	const handleSearch = ({ target }) => {
		if (target.value) {
			setSearchTerm(target.value.toLowerCase());
		} else {
			setSearchTerm(target.value);
		}
	};

	const filteredTodos = todos.filter((todo) => {
		if (todo.title) {
			return todo.title.toLowerCase().includes(searchTerm);
		}
		return [];
	});

	const handleCheck = (id) => {
		const updatedList = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		setTodos(updatedList);
	};

	const getSortedTodos = () => {
		if (selectedSort) {
			return [...todos].sort((a, b) => a['title'].localeCompare(b['title']));
		} else if (searchTerm) {
			return filteredTodos;
		}
		return todos;
	};

	const sortedTodos = getSortedTodos();

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				padding: '10px',
			}}
		>
			<Button
				isActive={isCreating || isUpdating }
				name={'todo-add-btn'}
				label={'Добавить задачу'}
				onClick={handleClick}
			/>
			<Button
				isActive={isCreating || isUpdating }
				onClick={sortTodos}
				name={'todo-sort-btn'}
				label={selectedSort ? 'По созданию' : 'По алфавиту'}
			/>

			<input
				placeholder="Поиск..."
				className={styles.input}
				type="text"
				value={searchTerm}
				onChange={handleSearch}
			/>

			<TodoList
				currentPage={currentPage}
				setIsUpdating={setIsUpdating}
				setTodoText={setTodoText}
				isUpdating={isUpdating}
				isActive={isCreating || isUpdating }
				todoList={sortedTodos}
				handleCheck={handleCheck}
				todoText={todoText}
			/>
		</div>
	);
};
