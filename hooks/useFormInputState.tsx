import { ChangeEvent, useState } from 'react';

export default function useFormInputState(
    initialValue = '',
): [string, (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void] {
    const [state, setState] = useState(initialValue);

    const updateState = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        setState(e.target.value);
    };

    return [state, updateState];
}
