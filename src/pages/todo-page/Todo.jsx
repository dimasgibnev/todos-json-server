import { Link, useParams, useNavigate } from 'react-router-dom';
import { TodoItem } from '../../components/todo-item/TodoItem';
import { useRequestGetTodoList, useRequestDeleteTodo } from '../../hooks';
import { useState, useEffect } from 'react';
import { Button } from '../../components/button/Button';
import styles from './Todo.module.css';
import { Loader } from '../../components/loader/Loader';

export const Todo = () => {
	const navigate = useNavigate();
	const [todo, setTodo] = useState({});
	const [refreshTodos, setRefreshTodos] = useState(false);
	const current = useParams();

	const { isLoading } = useRequestGetTodoList(refreshTodos, setTodo, current.id);
	const { requestDeleteTodo, isDeleting } = useRequestDeleteTodo(setRefreshTodos);

	const handleCheck = (id) => {
		setTodo((prev) => ({ ...prev, completed: !prev.completed }));
	};

	useEffect(() => {
		if (todo.title === undefined) {
			navigate('/404');
		}
	}, [todo.id, navigate]);

	return (
		<div className={styles.todoContainer}>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Link to={'/'}>
						<Button onClick={() => {}} name={'back-btn'} label={'Назад'} />
					</Link>
					<TodoItem
						id={current.id}
						title={todo.title}
						completed={todo.completed}
						handleCheck={handleCheck}
						index={0}
					/>
					<Link to={`/task/${current.id}/edit`}>
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
