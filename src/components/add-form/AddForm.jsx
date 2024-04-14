import { Button } from '../../components';
import styles from './AddForm.module.css';

export const AddForm = ({ handleSubmit, setTodoText }) => {
	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input type="text" onChange={(e) => setTodoText(e.target.value.trim())} />
			<Button onClick={()=> console.log('click')} type={'submit'} name={'add-todo'} label={'Добавить'} />
		</form>
	);
};
