import { useState } from 'react';
import { TodoList, InputForm, Button, Loader } from '../../components';
import {
	useRequestGetTodoList,
	useRequestAddTodo,
	useRequestUpdateTodo,
} from '../../hooks';
import styles from './MainPage.module.css';

export const MainPage = (currentPage) => {
	const [todos, setTodos] = useState([]);
	const [selectedSort, setSelectedSort] = useState(false);
	const [refreshTodos, setRefreshTodos] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [todoText, setTodoText] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	const { requestAddTodo } = useRequestAddTodo(todoText, setRefreshTodos, setTodoText);
	const { isLoading } = useRequestGetTodoList(refreshTodos, setTodos);
	const { requestUpdateTodo } = useRequestUpdateTodo(setRefreshTodos, todoText, todos);
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
				requestUpdateTodo(id, !todo.completed)
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		setTodos(updatedList);
	};

	const handleClick = () => {
		setIsCreating(true);
	};

	const getSortedTodos = () => {
		if (selectedSort) {
			return [...todos].sort((a, b) => a['title'].localeCompare(b['title']));
		} else if (searchTerm) {
			return filteredTodos;
		}
		return todos;
	};

	const handleSubmit = (id) => {
		requestAddTodo(id);
		setIsCreating((prev) => !prev);
	};
	const sortedTodos = getSortedTodos();

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={styles.todosContainer}>
					<Button
						isActive={isCreating || isUpdating}
						name={'todo-add-btn'}
						label={'Добавить задачу'}
						onClick={handleClick}
					/>
					<Button
						isActive={isCreating || isUpdating}
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

					{isCreating && (
						<InputForm
							label={'Создать'}
							setTodoText={setTodoText}
							todoText={todoText}
							handleSubmit={handleSubmit}
							isCreating={setIsCreating}
						/>
					)}

					<TodoList
						currentPage={currentPage}
						setIsUpdating={setIsUpdating}
						setTodoText={setTodoText}
						isUpdating={isUpdating}
						isActive={isCreating || isUpdating}
						todoList={sortedTodos}
						handleCheck={handleCheck}
						todoText={todoText}
					/>
				</div>
			)}
		</>
	);
};
