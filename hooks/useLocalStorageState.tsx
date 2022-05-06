import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useDidMountEffect from './useDidMountEffect';

export default function useLocalStorageState(key: string, initialValue: any) {
    const [state, setState] = useState(initialValue);

    useDidMountEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    useEffect(() => {
        const data = localStorage.getItem(key);
        if (data !== null) {
            setState(JSON.parse(data));
        }
    }, []);

    return [state, setState] as const;
}
