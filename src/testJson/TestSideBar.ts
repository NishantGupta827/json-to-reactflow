import { SideBarJson } from "@/types/sidebar";

export const testSideBar: SideBarJson = {
  folders: [
    {
      folderName: "Agents",
      item: [
        {
          title: "GPT Agent",
          description:
            "A GPT based conversational agent with advanced capabilities",
          attributes: [
            ["Model", "gpt-4"],
            ["Temperature", "0.7"],
          ],
          icon: "💬", //need to clarify this too
          nodeData: {
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
          title: "Reasoning Agent",
          icon: "🧠",
          description: "An agent dedicated to step by step reasoning",
          attributes: [
            ["Model", "claude-3-opus"],
            ["Temperature", "0.3"],
          ],
          nodeData: {
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
      ],
    },
    {
      folderName: "Testing",
      item: [
        {
          title: "API connector",
          icon: "🔌",
          description: "Connect to third party API",
          nodeData: {
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
          title: "Webhook Listener",
          description: "Receive real time webhook via HTTP",
          icon: "📡",
          nodeData: {
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
      ],
    },
  ],
};
