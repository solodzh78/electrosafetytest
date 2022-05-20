import React from "react";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSelectedCard } from "../../store/mainSlice";
import { Link } from "react-scroll";
import styles from './Questionline.module.scss'
import { ReactScrollLinkProps } from "react-scroll/modules/components/Link";
import { QlineButton } from "../qlineButton/QlineButton";
import { useTraceUpdate } from "../../hooks/useTraceUpdate";

export const Questionline: React.FC = function() {

    const selectedCard = useAppSelector(({ main: { quiz } }: RootState) => 
    quiz && quiz.selectedCard);

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

    console.log("render Q-line");
    useTraceUpdate(
        {
            selectedCard,
        });
    
	return (
        <div className={styles["question-line"]} onChange={handleChange}>
			{[...Array(10)].map((_item, index) => {
                const card = index + 1;
                
                return <QlineButton
                    key={`input_card_${card}`}
                    name="questions"
                    id={`q${card}`}
                    value={card}
                    checked={selectedCard === card}
                    classNames={styles}
                >
                    {<Link
                        key={`link_${card}`}
                        to={`myScrollToElement_${card}`}
                        activeClass={'active'}
                        spy={true}
                        smooth={true}
                        offset={-130}
                        onSetActive={handleOnSetActive}
                    >
                        {card}
                    </Link>}
                </QlineButton>
            })}
		</div>
	);
}