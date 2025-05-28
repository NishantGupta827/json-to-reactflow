import { CustomNodeData } from "./nodes";

export type SideBarInputJSON = {
  Data: CustomNodeData[];  
};

export type SideBarProps = {
  name: string;
  shape: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  editable?: boolean;
};