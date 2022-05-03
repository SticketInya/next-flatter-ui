import { useState } from 'react';

export default function useToggleState(
    initialValue = false,
): [boolean, () => void] {
    const [state, setState] = useState(initialValue);

    const toggleState = (val?: boolean) => {
        if (typeof val !== undefined) {
            setState(val as boolean);
        }
        setState(!state);
    };

    return [state, toggleState];
}
