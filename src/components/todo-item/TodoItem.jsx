import { Link } from 'react-router-dom';
import styles from './TodoItem.module.css';

export const TodoItem = ({ id, index, completed, title, handleCheck }) => {
	return (
		<div className={styles.todo}>
			<div className={styles['todo__content']}>
				<Link to={`/${id}`} className={styles.link}>
					<span>{index + 1}.</span>
					<strong className={completed ? styles['todo__completed'] : ''}>
						{title}
					</strong>
				</Link>
				<input
					className={styles.checkbox}
					type="checkbox"
					name="completed"
					checked={completed}
					id={id}
					onChange={() => handleCheck(id)}
				/>
			</div>
		</div>
	);
};
