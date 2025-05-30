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
      description:
        "Display the final response from the LLM.",
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

];
