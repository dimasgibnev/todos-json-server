import React from 'react';
import styles from './TodoItem.module.css';

export const TodoItem = ({todoList, handleCheck}) => {
	return (
		<>
			{todoList.map(({ id, title, completed }) => (
				<div className={styles.todo} key={id}>
					<div className={styles['todo__content']}>
						<strong
							className={
								completed
									? styles['todo__completed']
									: styles['todo__title']
							}
						>
							{title}
						</strong>
						<input
							type="checkbox"
							name="completed"
							checked={completed}
							id={id}
							onChange={() => handleCheck(id)}
						/>
					</div>
				</div>
			))}
		</>
	);
};
