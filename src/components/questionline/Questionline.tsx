import React, { ChangeEvent  } from "react";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSelectedCard } from "../../store/mainSlice";
import styles from './Questionline.module.scss'

export const Questionline: React.FC = () => {
    
    const dispatch = useAppDispatch();
    const selectedCard = useAppSelector(({ main: { quiz } }: RootState) => 
        quiz && quiz.selectedCard);

    const handlerChange = function (event: ChangeEvent<HTMLInputElement>) {
        dispatch(setSelectedCard({
            selectedCard: +event.target.value
        }));
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
