import { type BackgroundProps } from '@xyflow/react';
import { type CanvasConfig} from '../type';

export interface BasicBackgroundProps {
  json: CanvasConfig;
}

export function ParseBackground(json: CanvasConfig):BackgroundProps{
    return {
        color: json.color,
        bgColor: json.bgcolor,
        variant: json.variant,
        size: json.size,
    }
}