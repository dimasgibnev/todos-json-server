import { useState } from 'react';
import { Button, InputForm, TodoItem } from '..';
import styles from './TodoList.module.css';

export const TodoList = ({
	todoList,
	handleCheck,
	isActive,
	RequestDeleteTodo,
	requestUpdateTodo,
	isUpdating,
	setTodoText,
	setIsUpdating,
	todoText,
	currentPage,
}) => {
	const [editingId, setEditingId] = useState(null);

	const handleUpdate = (id) => {
		setIsUpdating(false);
		return requestUpdateTodo(id);
	};

	const onEditTodoTitle = (id) => {
		const editingTodo = todoList.filter((todo) => id === todo.id);
		setTodoText(editingTodo[0].title);
		setIsUpdating(true);
		setEditingId(id);
	};

	if ( currentPage === 'MainPage') {
		
	}

	return (
		<>
			{isUpdating && (
				<InputForm
					label={'Изменить'}
					setTodoText={setTodoText}
					handleSubmit={() => handleUpdate(editingId)}
					todoText={todoText}
				/>
			)}
			{TodoList.length > 0
				? todoList.map(({ id, title, completed }, index) => (
						<div className={styles['todo-container']} key={id}>
							<TodoItem
								id={id}
								title={
									currentPage.currentPage !== 'MainPage'
										? title
										: title.slice(0, 80) + ' ...'
								}
								completed={completed}
								index={index}
								handleCheck={handleCheck}
							/>
							{currentPage.currentPage !== 'MainPage' ? (
								<div>
									<Button
										id={id}
										onClick={RequestDeleteTodo}
										isActive={isActive}
										name={'delete-btn'}
										label={'Удалить'}
									/>
									<Button
										id={id}
										onClick={() => {
											onEditTodoTitle(id);
										}}
										isActive={isActive}
										name={'update-btn'}
										label={'Изменить'}
									/>
								</div>
							) : (
								''
							)}
						</div>
					))
				: <h3>Задач нет!</h3>}
		</>
	);
};
