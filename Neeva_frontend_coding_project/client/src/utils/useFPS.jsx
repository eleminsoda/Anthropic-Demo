import { useRef, useEffect } from "react";

// A custom React hook to use setInterval
// reference: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export default function useFPS(callback, fps) {
    const savedCallback = useRef();

    // save the last callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // set up the interval 
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (fps !== null) {
            let id = setInterval(tick, 1000 / fps);
            return () => clearInterval(id);
        }
    }, [fps]);
}
