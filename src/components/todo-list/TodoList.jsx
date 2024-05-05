import { Button,  TodoItem } from '..';
import styles from './TodoList.module.css';
import { Link } from 'react-router-dom';


export const TodoList = ({
	todoList,
	handleCheck,
	isActive,
	currentPage,
	requestDeleteTodo
}) => {


	return (
		<>
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
										onClick={requestDeleteTodo}
										isActive={isActive}
										name={'delete-btn'}
										label={'Удалить'}
									/>
									<Link to={`/todos/${id}/edit`}>
						<Button
							id={id}
							onClick={() => {}}
							name={'update-btn'}
							label={'Изменить'}
						/>
					</Link>
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
