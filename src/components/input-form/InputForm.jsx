import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '..';

import styles from './InputForm.module.css';

export const InputForm = ({ handleSubmit, todoText, setTodoText, label }) => {
	const navigate = useNavigate();
	const {id, edit} = useParams();
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(id);
				label === 'Изменить' ? navigate(`/task/${id}`) : navigate('/');
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
