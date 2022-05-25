import React, { useRef, useEffect, useState } from "react";
interface Prop {
	fn: React.Dispatch<React.SetStateAction<string>>;
	children?: React.ReactNode;
}

const ComponentWithDimensions: React.FC<Prop> = (props) => {
    const targetRef = useRef(null);
	const [size, setSize] = useState(window.innerWidth);
    useEffect(() => {
		if (targetRef.current) {
			// setDimensions({
			// 	width: targetRef.current.offsetWidth,
            //     height: targetRef.current.offsetHeight,
            // });
			let currentRef = targetRef as unknown as React.MutableRefObject<HTMLDivElement>;
			props.fn(String(currentRef.current.offsetHeight));
			window.onresize = () => {
				setSize(window.innerWidth);
			}
        }
    }, [props, size]);
	// console.log('dimensions: ', dimensions);


    return (
        <div ref={targetRef}>
            {props.children}
        </div>
    );
};

export default ComponentWithDimensions;
