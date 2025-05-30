type NodeData = {
  title?: string;
  description?: string;
  inputs?: any;
  outputs?: any;
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

export const testJson: TestJsonType = {
  folders: [
    {
      folderName: "Inputs",
      icon: "input",
      item: [
        {
          label: "Chat Input",
          icon: "chat",
          data: {
            title: "Input A",
            description: "Description A",
            inputs: [],
            outputs: [],
          },
        },
        {
          label: "Text Input",
          icon: "text",
          data: {
            name: "TextInputNode",
            display_name: "Text Input",
            display_icon: "Input",
            description: "A simple text input node.",
            inputs: [
              {
                name: "textInput",
                label: "Enter text",
                type: "text",
                placeholder: "Type something...",
                required: true,
                handlePresent: true,
              },
            ],
            outputs: [
              {
                name: "textOutput",
                type: "text",
                description: "User-entered text",
              },
            ],
          },
        },
      ],
    },
    {
      folderName: "Outputs",
      icon: "output",
      item: [
        {
          label: "Chat Output",
          icon: "chat",
          data: {
            title: "Output C",
          },
        },
        {
          label: "Text Output",
          icon: "text",
          data: {
            title: "Output C",
          },
        },
      ],
    },
  ],
};
