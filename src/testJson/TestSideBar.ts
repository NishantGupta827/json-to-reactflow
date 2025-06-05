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
            title: "Webhook Trigger",
            description: "Triggers the workflow when a specific URL is hit.",
            color: "#2196f3",
            inputs: [],
            outputs: ["Trigger Data"],
            automations: [],
            tools: [],
            abilities: [],
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
            title: "Webhook Trigger",
            description: "Triggers the workflow when a specific URL is hit.",
            color: "#2196f3",
            inputs: [],
            outputs: ["Trigger Data"],
            automations: [],
            tools: [],
            abilities: [],
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
            title: "Webhook Trigger",
            description: "Triggers the workflow when a specific URL is hit.",
            color: "#2196f3",
            inputs: [],
            outputs: ["Trigger Data"],
            automations: [],
            tools: [],
            abilities: [],
          },
        },
        {
          title: "Webhook Listener",
          description: "Receive real time webhook via HTTP",
          icon: "📡",
          nodeData: {
            title: "Webhook Trigger",
            description: "Triggers the workflow when a specific URL is hit.",
            color: "#2196f3",
            inputs: [],
            outputs: ["Trigger Data"],
            automations: [],
            tools: [],
            abilities: [],
          },
        },
      ],
    },
  ],
};
