import { useParams } from 'react-router-dom';
import { TodoItem } from '../todo-item/TodoItem';
import { useRequestGetTodoList } from '../../hooks';
import { useState } from 'react';

export const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [refreshTodos, setRefreshTodos] = useState(false);
	const { todoId } = useParams();

	const handleCheck = (id) => {
		const updatedList = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		setTodos(updatedList);
	};
	useRequestGetTodoList(refreshTodos, setTodos, todoId);

	// const currentTodo = todos.filter((todo) =>{ return todo.id === todoId});
	console.log(todoId);
	return (
		<div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
			{todos.map(({ id, title, completed }, index) => {
				return (
					<TodoItem
						id={id}
						title={title}
						completed={completed}
						handleCheck={handleCheck}
						key={id}
						index={index}
					/>
				);
			})}
		</div>
	);
};
