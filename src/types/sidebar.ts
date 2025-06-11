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
