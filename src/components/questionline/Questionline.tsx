import React, { ChangeEvent  } from "react";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSelectedCard } from "../../store/mainSlice";
import { scroller } from "react-scroll";
import styles from './Questionline.module.scss'

export const Questionline: React.FC = () => {
    
    const dispatch = useAppDispatch();
    const selectedCard = useAppSelector(({ main: { quiz } }: RootState) => 
        quiz && quiz.selectedCard);

    const handlerChange = function (event: ChangeEvent<HTMLInputElement>) {
        dispatch(setSelectedCard({
            selectedCard: +event.target.value
        }));
        scroller.scrollTo(`myScrollToElement${+event.target.value}`, {
            duration: 1500,
            delay: 100,
            smooth: true,
            // containerId: 'ContainerElementID',
            offset: 0, // Scrolls to element + 50 pixels down the page
        })
    }
	return (
        <div className={styles["question-line"]} onChange={handlerChange}>
			{[...new Array(10)].map((_item, index) => {
                const card = index + 1;
                return(
                    <>
                        <input 
                            type="radio" 
                            name="questions" 
                            id={`q${card}`} 
                            value={card} 
                            checked={selectedCard === card}
                        />
                        <label htmlFor={`q${card}`} >{card}</label>
                    </>
			)})}
		</div>
	);
}
