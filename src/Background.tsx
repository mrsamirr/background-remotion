import { useEffect, useState } from 'react';
import { AbsoluteFill, useCurrentFrame} from 'remotion';
import { random } from 'remotion';

function getColor(h: number, s: number, l: number) {
    return `hsl(${h}, ${s}%, ${l}%)`;
}

export default function Background() {
    const frame = useCurrentFrame();
    const [hue, setHue] = useState(0);

    useEffect(() => {
        setHue((prevHue) => (prevHue + 1) % 360);
    }, [frame]);


    const saturation = 70 + random('saturation') * 30;
    const lightness = 40 + random('lightness') * 20;
    const bgColor = getColor(hue, saturation, lightness);

    return (
        <AbsoluteFill style={{ backgroundColor: bgColor }} />
    );
}
