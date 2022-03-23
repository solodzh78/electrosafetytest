import React, { useEffect} from 'react';
import { useAppDispatch } from '../../store/hooks';
import { fetchQuiz } from "../../store/quizSlice";
import { Card } from '../card/Card';
import { Container } from '../container/Container';

export function Quiz() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchQuiz());
	}, [dispatch]);

	console.log("render quiz");

	return (
		<Container>
			{[...new Array(10)].map((item, index) => {
				return <Card 
					key={"card" + index}
					cardNumber={index + 1} 
				/>})}
		</Container>
	);
}
