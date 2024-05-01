import { useState } from 'react';
import styles from './App.module.css';
import { Button, Loader, TodoList, InputForm } from './components';
import {
	useRequestAddTodo,
	useRequestGetTodoList,
	useRequestDeleteTodo,
	useRequestUpdateTodo,
} from './hooks';

export const App = () => {
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
	const { todoList, isLoading, handleCheck } = useRequestGetTodoList(refreshTodos);
	const { requestDeleteTodo, isDeleting } = useRequestDeleteTodo(setRefreshTodos);
	const { requestUpdateTodo } = useRequestUpdateTodo(setRefreshTodos, todoText);

	const sortTodos = () => {
		setSelectedSort(!selectedSort);
	};

	const handleSearch = ({ target }) => {
		if (target.value) {
			setSearchTerm(target.value.toLowerCase());
		} else {
			setSearchTerm(target.value)
		}
	};

	const filteredTodos = todoList.filter((todo) => {
		if (todo.title) {
			return todo.title.toLowerCase().includes(searchTerm);
		}
	});

	const getSortedTodos = () => {
		if (selectedSort) {
			return [...todoList].sort((a, b) => a['title'].localeCompare(b['title']));
		} else if (searchTerm) {
			return filteredTodos;
		}
		return todoList;
	};

	const sortedTodos = getSortedTodos();
	return (
		<div className={styles.App}>
			{isCreating && (
				<InputForm
					label={'Создать'}
					setTodoText={setTodoText}
					todoText={todoText}
					handleSubmit={requestAddTodo}
				/>
			)}

			{isLoading ? (
				<Loader />
			) : (
				<>
					<Button
						isActive={isCreating || isUpdating || isDeleting}
						name={'todo-add-btn'}
						label={'Добавить задачу'}
						onClick={handleClick}
					/>

					<Button
						isActive={isCreating || isUpdating || isDeleting}
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
					<div>
						<TodoList
							setIsUpdating={setIsUpdating}
							setTodoText={setTodoText}
							isUpdating={isUpdating}
							requestUpdateTodo={requestUpdateTodo}
							RequestDeleteTodo={requestDeleteTodo}
							isActive={isCreating || isUpdating || isDeleting}
							todoList={sortedTodos}
							handleCheck={handleCheck}
							todoText={todoText}
						/>
					</div>
				</>
			)}
		</div>
	);
};
