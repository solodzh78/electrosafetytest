import { RootState } from "../../store";
import { useAppSelector } from "../../store/hooks";
import { ICard } from "../../store/mainSlice";
import styles from "./CheckTicket.module.scss"

type ICheckCard = {
    id: number;
    userAnswer: number;
    correctAnswer: number;
}


export const Check: React.FC = function () {

    const ticket = useAppSelector(
        ({ main: { quiz: { ticket } } }: RootState) => 
            ticket.reduce<ICheckCard[]>((akk: ICheckCard[], card: ICard) => {
                const checkCard: ICheckCard = {
                    id: card.id,
                    userAnswer: card.selectedAnswer,
                    correctAnswer: card.correctAnswer
                };
                akk.push(checkCard);
                return akk;
            }, [])
        );
    const correctAnswerCount = ticket?.reduce((akk, card) => 
    akk + (card.userAnswer === card.correctAnswer ? 1 : 0), 0);
    console.log('Правильных ответов: ', correctAnswerCount);

    const quizResult = (correctAnswerCount && correctAnswerCount > 7) ?
        'Вы успешно сдали экзамен' : 'Экзамен не сдан. Попробуйте ещё раз';
        
    console.log((correctAnswerCount && correctAnswerCount > 7) ? 
    'Вы успешно сдали экзамен' : 'Экзамен не сдан. Попробуйте ещё раз');

    return <>
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <h2>{quizResult}</h2>
                <p>{`Количество ошибок: ${10 - correctAnswerCount}`}</p>
                <div className={styles["close-popup"]}></div>
            </div>
        </div></>
};