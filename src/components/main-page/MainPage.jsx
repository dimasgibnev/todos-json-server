import { useState } from 'react';
import styles from './MainPage.module.css';
import { Button } from '../button/Button';
import { Loader } from '../loader/Loader';
import { TodoList } from '../todo-list/TodoList';
import {
	useRequestGetTodoList,
	useRequestDeleteTodo,
	useRequestUpdateTodo,
} from '../../hooks';

export const MainPage = (currentPage) => {
	const [todoList, setTodoList] = useState([]);
	const [selectedSort, setSelectedSort] = useState(false);
	const [refreshTodos, setRefreshTodos] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [todoText, setTodoText] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

	const { isLoading } = useRequestGetTodoList(refreshTodos, setTodoList);
	const { requestDeleteTodo, isDeleting } = useRequestDeleteTodo(setRefreshTodos);
	const { requestUpdateTodo } = useRequestUpdateTodo(setRefreshTodos, todoText);

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

	const filteredTodos = todoList.filter((todo) => {
		if (todo.title) {
			return todo.title.toLowerCase().includes(searchTerm);
		}
		return [];
	});

	const handleCheck = (id) => {
		const updatedList = todoList.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		setTodoList(updatedList);
	};

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
			{isLoading ? (
				<Loader />
			) : (
				<>


					<Button
						isActive={ isUpdating || isDeleting}
						onClick={sortTodos}
						name={'MainPage__todo-sort-btn'}
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
							currentPage={currentPage}
							setIsUpdating={setIsUpdating}
							setTodoText={setTodoText}
							isUpdating={isUpdating}
							requestUpdateTodo={requestUpdateTodo}
							RequestDeleteTodo={requestDeleteTodo}
							isActive={ isUpdating || isDeleting}
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
