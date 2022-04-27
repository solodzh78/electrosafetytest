import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ICard, setShowModal } from "../../store/mainSlice";
import styles from "./CheckTicket.module.scss"

type ICheckCard = {
    id: number;
    userAnswer: number;
    correctAnswer: number;
}


export const CheckTicket: React.FC = function () {

    const dispatch = useAppDispatch();

    // Получаем из стора массив объектов ICheckCard
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
    
    // Получаем из стора состояние модального окна
    const showModal = useAppSelector(({ main: { quiz } }: RootState) => quiz.showModal);

    // Подсчет количества правильных ответов
    const correctAnswerCount = ticket?.reduce((akk, card) => 
    akk + (card.userAnswer === card.correctAnswer ? 1 : 0), 0);

    // Результат теста
    const success = correctAnswerCount > 7;

    // Текст модального окна
    const quizResult = success ? 'Вы успешно сдали экзамен' : 'Экзамен не сдан. Попробуйте ещё раз';

    // Цвет модального окна
    const modalColor = success ? 'green' : 'red';

    //  Обработчик закрытия модального окна
    const handleOnClick: React.MouseEventHandler<HTMLDivElement> = function(event) {
        const target = event.target as Element;
        if (target.classList.contains(styles.overlay) || 
            target.classList.contains(styles["close-popup"])) {
                dispatch(setShowModal({showModal: false}))
        }
    };

    return <>{showModal && 
        <div className={styles.overlay} onClick={handleOnClick}>
            <div className={`${styles.popup} ${success && styles.passed}`}>
                <h2>{quizResult}</h2>
                <p>{`Количество ошибок: ${10 - correctAnswerCount}`}</p>
                <div className={styles["close-popup"]}></div>
            </div>
        </div>}</>
};