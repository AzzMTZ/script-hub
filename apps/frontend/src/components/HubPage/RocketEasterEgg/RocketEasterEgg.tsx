import { useRef, useState } from 'react';
import { RocketIcon } from './RocketEasterEgg.styles';

const CLICKS_TO_TRIGGER = 5;
const CLICK_WINDOW_MS = 1500;

export const useRocketEasterEgg = () => {
    const [launched, setLaunched] = useState(false);
    const clickCount = useRef(0);
    const windowTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const registerClick = () => {
        clickCount.current += 1;

        if (windowTimer.current) {
            clearTimeout(windowTimer.current);
        }
        windowTimer.current = setTimeout(() => {
            clickCount.current = 0;
        }, CLICK_WINDOW_MS);

        if (clickCount.current >= CLICKS_TO_TRIGGER) {
            clickCount.current = 0;
            setLaunched(true);
        }
    };

    const rocket = launched ? <RocketIcon onAnimationEnd={() => setLaunched(false)} /> : null;

    return { registerClick, rocket };
};
