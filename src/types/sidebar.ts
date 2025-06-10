// import { InputField } from "@/components/node/NodeInputsRenderer";

// interface Output {
//   name: string;
//   type: "data" | "text";
//   description: string;
// }

// type NodeData = {
//   name?: string;
//   display_name?: string;
//   display_icon?: string;
//   description?: string;
//   inputs?: InputField[];
//   outputs?: Output[];
//   [key: string]: any;
// };

export type Item = {
  title: string;
  icon: string;
  description: string;
  attributes?: [string, string][];
  nodeData: any;
};

type Folder = {
  folderName: string;
  item: Item[];
};

export type SideBarJson = {
  folders: Folder[];
};
