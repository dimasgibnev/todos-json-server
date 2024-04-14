import { useState } from 'react';
import styles from './App.module.css';
import { Button, Loader, TodoList, AddForm } from './components';
import {
	useRequestAddTodo,
	useRequestGetTodoList,
	useRequestDeleteTodo,
	useRequestUpdateTodo,
} from './hooks';

export const App = () => {
	const [refreshTodos, setRefreshTodos] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [todoText, setTodoText] = useState('');

	const { requestAddTodo, isCreating, handleClick } = useRequestAddTodo(
		todoText,
		setRefreshTodos,
	);
	const { todoList, isLoading, handleCheck } = useRequestGetTodoList(refreshTodos);
	const { requestDeleteTodo, isDeleting } = useRequestDeleteTodo(setRefreshTodos);
	const { requestUpdateTodo } = useRequestUpdateTodo(setRefreshTodos, todoText);

	const handleSubmit = (event) => {
		event.preventDefault();
		requestAddTodo();
	};

	return (
		<div className={styles.App}>
			{isCreating && (
				<AddForm
					onClick={handleClick}
					setTodoText={setTodoText}
					handleSubmit={handleSubmit}
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
					<div>
						<TodoList
							setIsUpdating={setIsUpdating}
							setTodoText={setTodoText}
							isUpdating={isUpdating}
							requestUpdateTodo={requestUpdateTodo}
							RequestDeleteTodo={requestDeleteTodo}
							isActive={isCreating || isUpdating || isDeleting}
							todoList={todoList}
							handleCheck={handleCheck}
						/>
					</div>
				</>
			)}
		</div>
	);
};
