import { useRef, useEffect } from "react";

export function useTraceUpdate(props: any) {
    const prev = useRef(props);
    useEffect(() => {
        const changedProps = Object.entries(props).reduce(
            (accumulator: any, [key, value]) => {
                // если значение изменилось - вернем его в результирующем объекте
                if (prev.current[key] !== value) {
                    accumulator[key] = [prev.current[key], value];
                }
                return accumulator;
            },
            {}
        );
        if (Object.keys(changedProps).length > 0) {
            console.log("Changed props:", changedProps);
        }
        prev.current = props;
    });
}

// Использование
/* function MyComponent(props) {
    useTraceUpdate(props);
    return <div>{props.children}</div>;
} */
