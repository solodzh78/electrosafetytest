import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchQuiz, setShowModal, setIsTesting } from "../../store/mainSlice";
import { Card } from '../card/Card';
import { Container } from '../container/Container';
import { Preloader } from '../preloarer/Preloader';
import styles from './Quiz.module.scss'
import { Element } from 'react-scroll';
import { RootState } from '../../store';
import { CheckButton } from '../checkButton/CheckButton';
import { CheckTicket } from '../checkTicket/CheckTicket';
import { useParams } from 'react-router-dom';
import { Questionline } from '../questionline/Questionline';

export const Quiz: React.FC = function() {

	const dispatch = useAppDispatch();
    const id = useParams().id || '';

	useEffect(() => {
		dispatch(fetchQuiz(id));
	}, [dispatch, id]);

    const title = useAppSelector(({ main: { quiz } }: RootState) =>
        quiz && quiz.title);
	const status = useAppSelector(state => state.main.status)
	console.log('status: ', status, status === "loading");

    const handleClickButton: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(setShowModal({showModal: true}));
        dispatch(setIsTesting({isTesting: false}));
    };
	console.log("render Quiz");

	return (<>
        {status === "loading" && <Preloader />}
        {status === "success" && <>
            <div className={styles.header}>
                <Container>
                    <div className={styles.title}>
                        {title}
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
                <CheckButton onClick={handleClickButton}>Проверить</CheckButton>
                <CheckTicket />
            </Container></>}</>
	);
}
