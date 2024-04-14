import { Button } from '..';
import styles from './UpdateForm.module.css';

export const UpdateForm = ({ handleSubmit, setTodoText, id }) => {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(id);
			}}
			className={styles.form}
		>
			<input type="text" onChange={(e) => setTodoText(e.target.value.trim())} />
			<Button onClick={()=> console.log('click')} type={'submit'} name={'add-todo'} label={'Изменить'} />
		</form>
	);
};
