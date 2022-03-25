import React, { useEffect} from 'react';
import { Questionline } from '../questionline/Questionline';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchQuiz } from "../../store/mainSlice";
import { Card } from '../card/Card';
import { Container } from '../container/Container';
import { Preloader } from '../preloarer/Preloader';
import styles from './Quiz.module.scss'
import { Element } from 'react-scroll';

export function Quiz() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchQuiz());
	}, [dispatch]);

	const status = useAppSelector(state => state.main.status)
	console.log('status: ', status, status === "loading");

	console.log("render quiz");

	return (
		<Container>
			{status === "loading" && <Preloader />}
			{status === "success" && 
				<div className={styles.title}>
					Экзамен по электробезопасности на 2 группу до 1000В
				</div>}
			{status === "success" && <Questionline />}
			{status === "success" && [...new Array(10)].map((item, index) => {
                return <Element name={`myScrollToElement${index + 1}`}><Card 
					key={"card" + index}
					cardNumber={index + 1} 
                /></Element>})}
		</Container>
	);
}
