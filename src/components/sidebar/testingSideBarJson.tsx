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
    {
      folderName: "Agent",
      icon: "agent",
      item: [
        {
          label: "Open API",
          icon: "agent",
          data: {
            name: "OpenAIChatNode",
            display_name: "OpenAI Chat",
            display_icon: "Bot",
            description:
              "This node sends a prompt to OpenAI's Chat model and returns a response.",
            inputs: [
              {
                name: "prompt",
                label: "Enter Prompt",
                type: "text",
                placeholder: "Enter your prompt...",
                required: true,
                handlePresent: true,
              },
              {
                name: "temperature",
                type: "text",
                label: "Temperature",
                placeholder: "e.g. 0.7",
                required: false,
                default: "0.7",
                handlePresent: true,
              },
              {
                name: "model",
                type: "dropdown",
                label: "Enter OpenAI model",
                options: ["gpt-3.5-turbo", "gpt-4"],
                placeholder: "Select model",
                required: true,
                handlePresent: false,
              },
            ],
            outputs: [
              {
                name: "responseText",
                type: "text",
                description: "The raw response from the model",
              },
              {
                name: "fullResponse",
                type: "data",
                description: "The complete JSON response object",
              },
            ],
          },
        },
      ],
    },
    {
      folderName: "Routing",
      icon: "routing",
      item: [
        {
          label: "Conditional",
          icon: "conditional",
          data: {
            name: "ConditionalRouterNode",
            display_name: "Conditional Router",
            display_icon: "GitBranch",
            description:
              "Routes data to different outputs based on conditions or flags.",
            inputs: [
              {
                name: "inputData",
                label: "Incoming data",
                type: "text",
                required: true,
                handlePresent: true,
              },
              {
                name: "condition",
                label: "Routing Condition",
                type: "text",
                placeholder: "e.g., type === 'greeting'",
                required: true,
                handlePresent: true,
              },
            ],
            outputs: [
              {
                name: "trueBranch",
                type: "data",
                description: "Output if condition is true",
              },
              {
                name: "falseBranch",
                type: "data",
                description: "Output if condition is false",
              },
            ],
          },
        },
      ],
    },
  ],
  
};
