import chroma from 'chroma-js';
import { WCAG_CONTRAST_RATIO } from '../constants/contrast';

export default function getColorContrast(
    color1: string,
    color2: string,
): boolean {
    return chroma.contrast(color1, color2) < WCAG_CONTRAST_RATIO;
}
