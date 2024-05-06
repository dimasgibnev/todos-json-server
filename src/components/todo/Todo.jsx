import { Link, useParams } from 'react-router-dom';
import { TodoItem } from '../todo-item/TodoItem';
import { useRequestGetTodoList, useRequestDeleteTodo } from '../../hooks';
import { useState } from 'react';
import { Button } from '../button/Button';

export const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [refreshTodos, setRefreshTodos] = useState(false);
	const current = useParams();

	const { isLoading } = useRequestGetTodoList(refreshTodos, setTodos, current.id);
	const { requestDeleteTodo, isDeleting } = useRequestDeleteTodo(setRefreshTodos);

	const handleCheck = (id) => {
		const updatedList = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
		setTodos(updatedList);
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
			{isLoading ? (
				<div>Loading</div>
			) : (
				<>
					<Link to={'/'}>
						<Button onClick={() => {}} name={'back-btn'} label={'Назад'} />
					</Link>
					<TodoItem
						id={current.id}
						title={todos.title}
						completed={todos.completed}
						handleCheck={handleCheck}
						index={0}
					/>
					<Link to={`/${current.id}/edit`}>
						<Button
							id={current.id}
							onClick={() => {}}
							name={'update-btn'}
							label={'Изменить'}
						/>
					</Link>
					<Link to={'/'}>
						<Button
							id={current.id}
							onClick={requestDeleteTodo}
							isActive={isDeleting}
							name={'delete-btn'}
							label={'Удалить'}
						/>
					</Link>
				</>
			)}
		</div>
	);
};
