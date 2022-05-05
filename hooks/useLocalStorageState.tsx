import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useLocalStorageState(key: string, initialValue: any) {
    const [state, setState] = useState(getInitalState());

    function getInitalState() {
        try {
            return JSON.parse(
                localStorage.getItem(key) || String(initialValue),
            );
        } catch (err) {
            return initialValue;
        }
    }

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState] as const;
}
