import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchQuiz, setShowModal, setIsTesting } from "../../store/mainSlice";
import { Card } from '../card/Card';
import { Container } from '../container/Container';
import { Preloader } from '../preloarer/Preloader';
import styles from './Quiz.module.scss'
import { Element } from 'react-scroll';
import { RootState } from '../../store';
import { CheckButton } from '../checkButton/CheckButton';
import { useParams } from 'react-router-dom';
import { Questionline } from '../questionline/Questionline';
import ComponentWithDimensions from '../componentWithDimensions';

export const Quiz: React.FC = function(props) {

	const quizAnswersRef = useRef(null);
	const [paddingTop, setPaddingTop] = useState('130px')
	const dispatch = useAppDispatch();
    const id = useParams().id || '';

	useEffect(() => {
		dispatch(fetchQuiz(id));
	}, [dispatch, id]);

    const title = useAppSelector(({ main: { quiz } }: RootState) =>
        quiz && quiz.title);
	const status = useAppSelector(state => state.main.status)

    const handleClickButton: React.MouseEventHandler<HTMLButtonElement> = () => {
        dispatch(setShowModal({showModal: true}));
        dispatch(setIsTesting({isTesting: false}));
    };
	if (quizAnswersRef.current) {
		console.log('fontSize: ', quizAnswersRef.current);
		// const fontSize = getComputedStyle(quizAnswersRef.current)
		// 	.getPropertyValue('font-size');
	}

	console.log("render Quiz");

	return (<>
		<div ref={quizAnswersRef}></div>
        {status === "loading" && <Preloader />}
        {status === "success" && 
        <>
            <div className={styles.header}>
				<ComponentWithDimensions fn={setPaddingTop}>
					<Container>
						<div className={styles.title}>
							{title}
						</div>
						<Questionline />
					</Container>
				</ComponentWithDimensions>
            </div>
            <Container  className={styles.quiz} style={{paddingTop: `calc(3.415rem + ${paddingTop}px)`}} ref={quizAnswersRef}>
                {[...Array(10)].map((item, index) => 
                    <Element 
                        key={"card" + (index + 1)}
                        name={`myScrollToElement_${index + 1}`}
                    >
                        <Card cardNumber={index + 1} />
                    </Element>)}
                <CheckButton onClick={handleClickButton}>Проверить</CheckButton>
            </Container>
        </>}
    </>
	);
}
