import React, { useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchQuiz } from "../../store/quizSlice";
import { Card } from '../card/Card';

export function Quiz() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchQuiz());
	}, [dispatch]);

	console.log("render quiz");

/* 	interface ICard {
		id: number,
			question: string,
				answers: string[],
					correctAnswer: number,
						selectedAnswer ?: number
	}
 */
	return (
		<div>
			{[...new Array(10)].map((item, index) => {
				return <Card 
					key={"card" + index}
					cardNumber={index + 1} 
				/>})}
		</div>
	);
}
