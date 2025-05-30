import { Node } from "@xyflow/react";

export const nodeJson: Node[] = [
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

  {
    id: "node_2",
    type: "custom",
    position: { x: 150, y: 150 }, // 150px to the right
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
          handlePresent: true, // to create a handle for connection
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

  {
    id: "node_3",
    type: "custom",
    position: { x: 250, y: 150 }, // another 150px right
    data: {
      name: "SwitchNode",
      display_name: "Switch",
      display_icon: "ToggleRight",
      description: "A toggleable switch to enable/disable features.",
      inputs: [
        {
          name: "enabled",
          label: "Enable feature?",
          type: "checkbox",
          default: false,
          required: false,
          handlePresent: true,
        },
      ],
      outputs: [
        {
          name: "switchState",
          type: "boolean",
          description: "True if enabled",
        },
      ],
    },
  },

  {
    id: "node_4",
    type: "custom",
    position: { x: 350, y: 150 }, // next one
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
];
