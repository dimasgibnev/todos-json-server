import { TodoItem } from '..';
import styles from './TodoList.module.css';

export const TodoList = ({ todoList, handleCheck }) => {
	return (
		<>
			{TodoList.length > 0 ? (
				todoList.map(({ id, title, completed }, index) => (
					<div className={styles['todo-container']} key={id}>
						<TodoItem
							id={id}
							title={title.slice(0, 40) + ' ...'}
							completed={completed}
							index={index}
							handleCheck={handleCheck}
						/>
					</div>
				))
			) : (
				<h3>Задач нет!</h3>
			)}
		</>
	);
};
