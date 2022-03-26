import React from "react";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSelectedCard } from "../../store/mainSlice";
import { Link } from "react-scroll";
import styles from './Questionline.module.scss'
import { ReactScrollLinkProps } from "react-scroll/modules/components/Link";
import { RadioButton } from "../radiobutton/RadioButton";
import { constants } from "os";
import { ICard } from "../../store/mainSlice";

export const Questionline: React.FC = function() {
    
    const selectedCard = useAppSelector(({ main: { quiz } }: RootState) => 
    quiz && quiz.selectedCard);

    const isAnswerSelected = useAppSelector(({ main: { quiz: { ticket } } }: RootState) => {
        if (ticket && ticket.length > 0) return (ticket as Array<ICard>).reduce<number[]>((akk: number[], card: ICard) => {
            akk.push(card.selectedAnswer);
            return akk;
        }, []);
    });
    console.log('isAnswerSelected: ', isAnswerSelected);

    const dispatch = useAppDispatch();
    const dispatchSelectedCard: (cardNumber: string) => void = function (cardNumber) {
        dispatch(
            setSelectedCard({
                selectedCard: parseInt(cardNumber)
            })
        )};

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = function (event) {
        dispatchSelectedCard(event.target.value)};

    const handleOnSetActive: (this: ReactScrollLinkProps & { children: string }) => void = function () {
        dispatchSelectedCard(this.children)};

    console.log("render Q-line: ");
    
	return (
        <div className={styles["question-line"]} onChange={handleChange}>
			{[...Array(10)].map((_item, index) => {
                const card = index + 1;
                
                return <RadioButton
                    key={`input_card_${card}`}
                    name="questions"
                    id={`q${card}`}
                    value={card}
                    checked={selectedCard === card}
                    className={isAnswerSelected && isAnswerSelected[index] ? styles.isAnswerSelected : ''}
                >
                    {<Link
                        key={`link_${card}`}
                        to={`myScrollToElement_${card}`}
                        activeClass={styles.active}
                        spy={true}
                        smooth={true}
                        offset={-80}
                        onSetActive={handleOnSetActive}
                    >
                        {card}
                    </Link>}
                </RadioButton>
            })}
		</div>
	);
}