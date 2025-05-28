import { BackgroundConfig } from "@/types/flowJson";
import { type BackgroundProps, BackgroundVariant } from "@xyflow/react";

export function ParseBackground(json: BackgroundConfig): BackgroundProps {
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
    gap: json.gap,
    lineWidth: json.lineWidth,
  };
}
