import { SideBarJson } from "@/types/sidebar";
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
        name: "WebhookTriggerNode",
        display_name: "Webhook Trigger",
        display_icon: "Webhook",
        description: "Triggers the workflow when a specific URL is hit.",
        inputs: [],
        outputs: [
          {
            name: "Trigger Data",
            type: "data",
            description: "Data received from the webhook payload (if any).",
            handlePresent: true,
          },
        ],
      },
    },
    {
      id: "node_2",
      type: "custom",
      position: { x: 350, y: 150 },
      data: {
        name: "APICallNode",
        display_name: "API Call",
        display_icon: "Cloud",
        description: "Calls an external API to fetch data.",
        inputs: [
          {
            name: "url",
            label: "API URL",
            type: "text",
            placeholder: "e.g., https://api.example.com/ipl/updates",
            required: true,
            handlePresent: true,
            value: "https://api.example.com/ipl/recent",
          },
          {
            name: "method",
            label: "Method",
            type: "dropdown",
            options: ["GET", "POST", "PUT", "DELETE"],
            placeholder: "Select method",
            required: true,
            handlePresent: false,
            value: "GET",
          },
          {
            name: "headers",
            label: "Headers (JSON)",
            type: "text",
            placeholder: '{ "Authorization": "Bearer YOUR_TOKEN" }',
            required: false,
            handlePresent: true,
            value: "{}",
          },
        ],
        outputs: [
          {
            name: "Response Data",
            type: "data",
            description: "The raw JSON response from the API.",
            handlePresent: true,
          },
          {
            name: "Response Text",
            type: "text",
            description: "The response body as a string.",
            handlePresent: true,
          },
        ],
      },
    },
    {
      id: "node_3",
      type: "custom",
      position: { x: 600, y: 150 },
      data: {
        name: "DataFormatterNode",
        display_name: "Format IPL Data",
        display_icon: "Braces",
        description:
          "Extracts and formats relevant IPL update information from the API response.",
        inputs: [
          {
            name: "inputData",
            label: "API Response Data",
            type: "data",
            required: true,
            handlePresent: true,
            value: "",
          },
          {
            name: "formatScript",
            label: "Formatting Script (JS)",
            type: "textarea",
            placeholder:
              "return data.updates.map(u => u.match + ': ' + u.score).join('\\n');",
            required: true,
            handlePresent: true,
            value:
              '// Example: Assuming API response is { "updates": [{ "match": "Match A vs B", "score": "150/3 (15 ov)", "status": "In Progress" }] } \n return inputData.updates ? inputData.updates.map(update => `* ${update.match}: ${update.score} (${update.status})`).join(\'\\n\') : \'No IPL updates available.\';\n',
          },
        ],
        outputs: [
          {
            name: "Formatted Text",
            type: "text",
            description: "Formatted IPL update string.",
            handlePresent: true,
          },
        ],
      },
    },
    {
      id: "node_4",
      type: "custom",
      position: { x: 850, y: 150 },
      data: {
        name: "SlackNotificationNode",
        display_name: "Slack Notification",
        display_icon: "Slack",
        description: "Sends a message to a specified Slack channel.",
        inputs: [
          {
            name: "message",
            label: "Message Text",
            type: "text",
            placeholder: "Enter message to send...",
            required: true,
            handlePresent: true,
            value: "",
          },
          {
            name: "webhookUrl",
            label: "Slack Webhook URL",
            type: "text",
            placeholder: "https://hooks.slack.com/services/...",
            required: true,
            handlePresent: true,
            value: "",
          },
          {
            name: "channel",
            label: "Channel (optional)",
            type: "text",
            placeholder: "#general",
            required: false,
            handlePresent: true,
            value: "#ipl-updates",
          },
        ],
        outputs: [],
      },
    },
  ],
  edges: [
    {
      id: "e1",
      source: "node_1",
      target: "node_2",
      targetHandle: "input-url",
      sourceHandle: "output-Trigger Data",
      animated: true,
      label: "Trigger API Call",
    },
    {
      id: "e2",
      source: "node_2",
      target: "node_3",
      targetHandle: "input-inputData",
      sourceHandle: "output-Response Data",
      animated: true,
      label: "API Response to Formatter",
    },
    {
      id: "e3",
      source: "node_3",
      target: "node_4",
      targetHandle: "input-message",
      sourceHandle: "output-Formatted Text",
      animated: true,
      label: "Formatted Updates to Slack",
    },
  ],
};

export const sideBarJson: SideBarJson = {
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
