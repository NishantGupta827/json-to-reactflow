export interface SidebarInput {
  type: "text" | "dropdown" | "checkbox" | "switch";
  key: string;
  label?: string;
  value: string | boolean;
  options?: string[];
  required?: boolean;
  defaultValue?: string | boolean;
  placeholder?: string;
  handlePresent?: boolean;
}

export interface SidebarNode {
  label: string;
  editable: boolean;
  inputs?: SidebarInput[];
  incoming?: number;
  outgoing?: number;
}

export interface SidebarJson {
  Data: SidebarNode[];
}

export type SideBarProps = {
  name: string;
  shape: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  editable?: boolean;
};