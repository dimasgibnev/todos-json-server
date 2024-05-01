import { useState } from 'react';
import styles from './App.module.css';
import { Button, Loader, TodoList, InputForm } from './components';
import { Route, Routes } from 'react-router-dom';
import {
	useRequestAddTodo,
	useRequestGetTodoList,
	useRequestDeleteTodo,
	useRequestUpdateTodo,
} from './hooks';

const MainPage = () => {
	const [selectedSort, setSelectedSort] = useState(false);
	const [refreshTodos, setRefreshTodos] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [todoText, setTodoText] = useState('');

	const { requestAddTodo } = useRequestAddTodo(
		todoText,
		setRefreshTodos,
		setIsCreating,
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



	const createTodo =() => {
		setTodoText('')
		setIsCreating(!isCreating)
	}

	return (
		<>
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
						onClick={createTodo}
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
		</>
	);
};

export const App = () => {
	return (
		<div className={styles.App}>
			<Routes>
				<Route path="/" element={<MainPage />} />
			</Routes>
		</div>
	);
};
