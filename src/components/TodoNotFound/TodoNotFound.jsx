import { Link } from 'react-router-dom';
import { Button } from '../button/Button';

export const TodoNotFound = () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
			<h1>Такой задачи не существует</h1>
			<Link to={'/todos'}>
				<Button onClick={() => {}} name={'back-btn'} label={'Назад'} />
			</Link>
		</div>
	);
};
