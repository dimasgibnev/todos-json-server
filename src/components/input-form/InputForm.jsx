import { useNavigate } from 'react-router-dom';
import { Button } from '..';

import styles from './InputForm.module.css';


export const InputForm = ({ handleSubmit, todoText, setTodoText, id, label, isCreating }) => {
	const navigate = useNavigate()

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(id);
				navigate('/')
				isCreating(false)
			}}
			className={styles.form}
		>
			<input
				type="text"
				value={todoText}
				onChange={(e) => setTodoText(e.target.value)}
			/>
			<Button onClick={() => {}} type={'submit'} name={'add-todo'} label={label} />
		</form>
	);
};
