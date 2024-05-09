import { Link } from 'react-router-dom';
import { Button } from '../../components/button/Button';

export const TodoNotFound = () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
			<h2>Такой задачи не существует</h2>
			<Link to={'/'}>
				<Button onClick={() => {}} name={'back-btn'} label={'Назад'} />
			</Link>
		</div>
	);
};
