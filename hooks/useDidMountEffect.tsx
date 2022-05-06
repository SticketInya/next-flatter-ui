import { DependencyList, useEffect, useRef, useState } from 'react';

export default function useDidMountEffect(
    func: React.EffectCallback,
    deps?: DependencyList | undefined,
) {
    const [didMount, setDidMount] = useState(false);

    useEffect(() => {
        if (didMount) {
            func();
        } else {
            setDidMount(true);
        }
    }, deps);
}
