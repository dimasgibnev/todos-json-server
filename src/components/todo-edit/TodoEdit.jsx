import { useEffect, useState } from 'react';
import { InputForm } from '../input-form/InputForm';
import { useRequestUpdateTodo, useRequestGetTodoList } from '../../hooks';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../button/Button';

export const TodoEdit = () => {
	const current = useParams();
	const [refreshTodos, setRefreshTodos] = useState(false);
	const [todo, setTodo] = useState([]);
	const [todoText, setTodoText] = useState('');

	useRequestGetTodoList(setRefreshTodos, setTodo, current.id);
	const { requestUpdateTodo } = useRequestUpdateTodo(setRefreshTodos, todoText);

	useEffect(() => {
		setTodoText(todo.title);
	}, [todo]);

	return (
		<div>
			<InputForm
				label={'Изменить'}
				setTodoText={setTodoText}
				handleSubmit={() => requestUpdateTodo(current.id)}
				todoText={todoText}
			/>
			<Link to={'/'}>
				<Button onClick={() => {}} name={'back-btn'} label={'Назад'} />
			</Link>
		</div>
	);
};
