import React from "react";
import styles from "./Container.module.scss";

export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    console.log('render Container');
    return(
	<div 
		style={props.style || {}} 
            className={`${styles.container} ${props.className === 'main'? styles.main: props.className || ''}`}
	>
		{props.children}
	</div>
)};