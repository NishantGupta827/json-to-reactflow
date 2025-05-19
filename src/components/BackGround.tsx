import { type BackgroundProps, BackgroundVariant } from '@xyflow/react';
import { type CanvasConfig } from '../type';

export function ParseBackground(json: CanvasConfig): BackgroundProps {
  const variantMap: Record<string, BackgroundVariant> = {
    dots: BackgroundVariant.Dots,
    lines: BackgroundVariant.Lines,
    cross: BackgroundVariant.Cross,
  };

  return {
    color: json.color,
    bgColor: json.bgcolor,
    variant: variantMap[json.variant!] ?? BackgroundVariant.Dots, // fallback to 'dots'
    size: json.size,
  };
}
