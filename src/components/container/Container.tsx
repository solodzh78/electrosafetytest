import React from "react";
import styles from "./Container.module.scss";

interface Prop {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties | undefined;
	ref?: React.LegacyRef<HTMLDivElement> | undefined;
}

export const Container: React.FC<Prop> = (props) => {
    console.log('render Container');
    return(
	<div 
		style={props.style || {}} 
            className={`${styles.container} ${props.className === 'main'? styles.main: props.className || ''}`}
	>
		{props.children}
	</div>
)};