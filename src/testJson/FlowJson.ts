import { TestJsonType } from "@/components/sidebar/testingSideBarJson";
import { FlowJson } from "../types/flowJson";

export const flowJson: FlowJson = {
  export: true,
  control: true,
  minimap: true,
  background: {
    color: "#000000",
    bgcolor: "#ffffff",
    variant: "cross",
    size: 1,
  },
  nodes: [
    {
      id: "node_1",
      type: "custom",
      position: { x: 100, y: 150 },
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
            value: "",
          },
          {
            name: "system_message",
            type: "text",
            label: "System Message",
            placeholder: "Type something...",
            required: true,
            handlePresent: true,
            value: "",
          },
          {
            name: "model",
            type: "dropdown",
            label: "Enter OpenAI model",
            options: ["gpt-3.5-turbo", "gpt-4"],
            placeholder: "Select model",
            required: true,
            handlePresent: false,
            value: "",
          },
          {
            name: "key",
            type: "text",
            label: "OpenAI API Key",
            placeholder: "",
            required: true,
            handlePresent: true,
            value: "",
          },
        ],
        outputs: [
          {
            name: "Response Text",
            type: "text",
            description: "The raw response from the model",
          },
          {
            name: "Full JSON Response",
            type: "data",
            description: "The complete JSON response object",
          },
        ],
      },
    },

    {
      id: "node_2",
      type: "custom",
      position: { x: 150, y: 150 },
      data: {
        name: "ChatInputNode",
        display_name: "Chat Input",
        display_icon: "MessageSquareMore",
        description: "Create chat inputs for the workflow",
        inputs: [
          {
            name: "textInput",
            label: "Text",
            type: "text",
            placeholder: "Type something...",
            required: true,
            handlePresent: true,
            value: "",
          },
        ],
        outputs: [
          {
            name: "Message",
            type: "text",
            description: "User-entered text",
          },
        ],
      },
    },
    {
      id: "node_3",
      type: "custom",
      position: { x: 250, y: 150 },
      data: {
        name: "PromptNode",
        display_name: "Prompt",
        display_icon: "SquareTerminal",
        description: "Create a prompt template with dynamic variables",
        inputs: [
          {
            name: "template",
            label: "Templae",
            type: "text",
            placeholder: "Type your prompt here...",
            required: true,
            handlePresent: true,
            value: "",
          },
        ],
        outputs: [
          {
            name: "Prompt Message",
            type: "text",
            description: "LLM focused prompt",
          },
        ],
      },
    },

    {
      id: "node_4",
      type: "custom",
      position: { x: 350, y: 150 }, // next one
      data: {
        name: "ChatOutputNode",
        display_name: "Chat Output",
        display_icon: "MessageSquareMore",
        description: "Display the final response from the LLM.",
        inputs: [
          {
            name: "outputData",
            label: "Incoming Text",
            type: "text",
            required: true,
            handlePresent: true,
            value: "",
          },
        ],
        outputs: [
          {
            name: "Message",
            type: "text",
            description: "Final response from LLM as Text.",
          },
        ],
      },
    },
  ],
  edges: [
    {
      id: "e1",
      source: "node_2", // TextInputNode
      target: "node_1", // OpenAIChatNode
      targetHandle: "input-prompt", // matches id={`input-${name}`}
      animated: true,
      label: "Prompt input",
    },
    {
      id: "e2",
      source: "node_3", // SwitchNode
      target: "node_1", // OpenAIChatNode
      targetHandle: "input-system_message",
      animated: true,
      label: "Prompt Template",
    },
    {
      id: "e3",
      source: "node_1", // OpenAIChatNode
      target: "node_4", // ConditionalRouterNode
      animated: true,
      label: "Response → Router",
    },
  ],
};

export const SideBarJson: TestJsonType = {
  folders: [
    {
      folderName: "Inputs",
      icon: "input",
      item: [
        {
          label: "Chat Input",
          icon: "chat",
          data: {
            name: "ChatInputNode",
            display_name: "Chat Input",
            display_icon: "MessageSquareMore",
            description: "Create chat inputs for the workflow",
            inputs: [
              {
                name: "textInput",
                label: "Text",
                type: "text",
                placeholder: "Type something...",
                required: true,
                handlePresent: true,
                value: "",
              },
            ],
            outputs: [
              {
                name: "Message",
                type: "text",
                description: "User-entered text",
              },
            ],
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
                value: "",
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
            name: "ChatOutputNode",
            display_name: "Chat Output",
            display_icon: "MessageSquareMore",
            description: "Display the final response from the LLM.",
            inputs: [
              {
                name: "outputData",
                label: "Incoming Text",
                type: "text",
                required: true,
                handlePresent: true,
                value: "",
              },
            ],
            outputs: [
              {
                name: "Message",
                type: "text",
                description: "Final response from LLM as Text.",
              },
            ],
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
                value: "",
              },
              {
                name: "system_message",
                type: "text",
                label: "System Message",
                placeholder: "Type something...",
                required: true,
                handlePresent: true,
                value: "",
              },
              {
                name: "model",
                type: "dropdown",
                label: "Enter OpenAI model",
                options: ["gpt-3.5-turbo", "gpt-4"],
                placeholder: "Select model",
                required: true,
                handlePresent: false,
                value: "",
              },
              {
                name: "key",
                type: "text",
                label: "OpenAI API Key",
                placeholder: "",
                required: true,
                handlePresent: true,
                value: "",
              },
            ],
            outputs: [
              {
                name: "Response Text",
                type: "text",
                description: "The raw response from the model",
              },
              {
                name: "Full JSON Response",
                type: "data",
                description: "The complete JSON response object",
              },
            ],
          },
        },
      ],
    },
  ],
};
