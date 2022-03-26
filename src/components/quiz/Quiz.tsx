import React, { useEffect} from 'react';
import { Questionline } from '../questionline/Questionline';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchQuiz } from "../../store/mainSlice";
import { Card } from '../card/Card';
import { Container } from '../container/Container';
import { Preloader } from '../preloarer/Preloader';
import styles from './Quiz.module.scss'
import { Element } from 'react-scroll';

export const Quiz: React.FC = function() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchQuiz());
	}, [dispatch]);

	const status = useAppSelector(state => state.main.status)
	console.log('status: ', status, status === "loading");

	console.log("render quiz");

	return (<>
        {status === "loading" && <Preloader />}
        {status === "success" && <>
            <div className={styles.navbar}>
                <Container>
                    <div className={styles.title}>
                        Экзамен по электробезопасности на 2 группу до 1000В
                    </div>
                    <Questionline />
                </Container>
            </div>
            <Container className={styles.quiz}>
                {[...Array(10)].map((item, index) => 
                    <Element 
                        key={"card" + (index + 1)}
                        name={`myScrollToElement_${index + 1}`}
                    >
                        <Card 
                            cardNumber={index + 1} 
                        />
                    </Element>)}
            </Container></>}</>
	);
}
