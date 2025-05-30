import { InputField } from "../node/NodeInputsRenderer";

interface Output {
  name: string;
  type: "data" | "text";
  description: string;
}

type NodeData = {
  name?: string;
  display_name?: string;
  display_icon?: string;
  description?: string;
  inputs?: InputField[];
  outputs?: Output[];
  [key: string]: any;
};

export type Item = {
  label: string;
  icon: string;
  data: NodeData;
};

type Folder = {
  folderName: string;
  icon: string;
  item: Item[];
};

export type TestJsonType = {
  folders: Folder[];
};