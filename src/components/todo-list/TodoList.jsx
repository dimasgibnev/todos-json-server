import { Button, TodoItem } from '..';
import styles from './TodoList.module.css';
import { InputForm } from '../input-form/InputForm';
import { useState } from 'react';

export const TodoList = (props) => {
	const [editId, setEditId] = useState(null);
	
	const onEditTodoTitle = (id) => {
		const [editingTodo] = props.todoList.filter((todo) => id === todo.id);
		props.setTodoText(editingTodo.title);
		props.setIsUpdating(true);
	};
	const handleUpdate = (id) => {
		setEditId(id);
		props.setIsUpdating(false);
		return props.requestUpdateTodo(id);
	};
	return (
		<>
			{props.isUpdating && (
				<InputForm
					label={'Изменить'}
					setTodoText={props.setTodoText}
					handleSubmit={() => handleUpdate(editId)}
					todoText={props.todoText}
				/>
			)}
			{props.todoList.map(({ id, title, completed }, index) => (
				<div className={styles['todo-container']} key={id}>
					<TodoItem
						id={id}
						title={title}
						completed={completed}
						index={index}
						handleCheck={props.handleCheck}
						setIsUpdating={props.setIsUpdating}
						isUpdating={props.isUpdating}
						setTodoText={props.setTodoText}
						requestUpdateTodo={props.requestUpdateTodo}
						todoText={props.todoText}
						RequestDeleteTodo={props.RequestDeleteTodo}
						todoList={props.todoList}
					/>
					<Button
						id={id}
						onClick={props.RequestDeleteTodo}
						isActive={props.isActive}
						name={'delete-btn'}
						label={'Удалить'}
					/>
					<Button
						id={id}
						onClick={() => {
							onEditTodoTitle(id);
						}}
						isActive={props.isActive}
						name={'update-btn'}
						label={'Изменить'}
					/>
				</div>
			))}
		</>
	);
};
