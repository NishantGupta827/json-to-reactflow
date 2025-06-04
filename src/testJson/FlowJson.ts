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
      id: "node_2",
      type: "custom",
      position: { x: 350, y: 150 },
      data: {
        title: "API Call",
        description: "Calls an external API to fetch data.",
        color: "#4caf50",
        inputs: ["url", "method", "headers"],
        outputs: ["Response Data", "Response Text"],
        automations: [
          {
            id: "automation_http",
            label: "HTTP Request",
            node: {
              id: "automation_http",
              type: "custom",
              position: { x: 550, y: 50 },
              data: {
                title: "HTTP Request",
                description: "Handles outgoing HTTP requests.",
                inputs: ["url", "method", "headers"],
                outputs: ["response"],
              },
            },
          },
          {
            id: "automation_retry",
            label: "Retry on Failure",
            node: {
              id: "automation_retry",
              type: "custom",
              position: { x: 550, y: 100 },
              data: {
                title: "Retry on Failure",
                description: "Retries a failed request automatically.",
                inputs: ["request", "retries"],
                outputs: ["finalResponse"],
              },
            },
          },
        ],
        tools: [
          {
            id: "tool_api_client",
            label: "API Client",
            node: {
              id: "tool_api_client",
              type: "custom",
              position: { x: 550, y: 150 },
              data: {
                title: "API Client",
                description: "Tool for making API requests.",
                inputs: ["url", "method", "headers", "payload"],
                outputs: ["responseData"],
              },
            },
          },
          {
            id: "tool_header_mgr",
            label: "Header Manager",
            node: {
              id: "tool_header_mgr",
              type: "custom",
              position: { x: 550, y: 200 },
              data: {
                title: "Header Manager",
                description: "Manages API request headers.",
                inputs: ["baseHeaders", "authToken"],
                outputs: ["preparedHeaders"],
              },
            },
          },
        ],
        abilities: [
          {
            id: "ability_fetch",
            label: "Data Fetching",
            node: {
              id: "ability_fetch",
              type: "custom",
              position: { x: 550, y: 250 },
              data: {
                title: "Data Fetching",
                description: "Ability to fetch remote data.",
                inputs: ["endpoint"],
                outputs: ["rawData"],
              },
            },
          },
          {
            id: "ability_http",
            label: "HTTP Communication",
            node: {
              id: "ability_http",
              type: "custom",
              position: { x: 550, y: 300 },
              data: {
                title: "HTTP Communication",
                description: "Handles HTTP communication protocols.",
                inputs: ["url", "headers"],
                outputs: ["httpResponse"],
              },
            },
          },
          {
            id: "ability_error",
            label: "Error Handling",
            node: {
              id: "ability_error",
              type: "custom",
              position: { x: 550, y: 350 },
              data: {
                title: "Error Handling",
                description: "Manages errors and exceptions.",
                inputs: ["errorObject"],
                outputs: ["handledError"],
              },
            },
          },
        ],
      },
    },
    {
      id: "node_3",
      type: "custom",
      position: { x: 600, y: 150 },
      data: {
        title: "Format IPL Data",
        description:
          "Extracts and formats relevant IPL update information from the API response.",
        color: "#ff9800",
        inputs: ["inputData", "formatScript"],
        outputs: ["Formatted_Text"],
        automations: [
          {
            id: "automation_script",
            label: "Script Execution",
            node: {
              id: "automation_script",
              type: "custom",
              position: { x: 800, y: 50 },
              data: {
                title: "Script Execution",
                description: "Runs a custom script on input data.",
                inputs: ["script", "input"],
                outputs: ["result"],
              },
            },
          },
        ],
        tools: [
          {
            id: "tool_js_engine",
            label: "JavaScript Engine",
            node: {
              id: "tool_js_engine",
              type: "custom",
              position: { x: 800, y: 100 },
              data: {
                title: "JavaScript Engine",
                description: "Executes JavaScript code safely.",
                inputs: ["code", "context"],
                outputs: ["output"],
              },
            },
          },
          {
            id: "tool_json_fmt",
            label: "JSON Formatter",
            node: {
              id: "tool_json_fmt",
              type: "custom",
              position: { x: 800, y: 150 },
              data: {
                title: "JSON Formatter",
                description: "Formats JSON into a readable structure.",
                inputs: ["rawJson"],
                outputs: ["prettyJson"],
              },
            },
          },
        ],
        abilities: [
          {
            id: "ability_parse",
            label: "Data Parsing",
            node: {
              id: "ability_parse",
              type: "custom",
              position: { x: 800, y: 200 },
              data: {
                title: "Data Parsing",
                description: "Parses structured data formats.",
                inputs: ["input"],
                outputs: ["parsed"],
              },
            },
          },
          {
            id: "ability_format",
            label: "Custom Formatting",
            node: {
              id: "ability_format",
              type: "ability",
              position: { x: 800, y: 250 },
              data: {
                title: "Custom Formatting",
                description: "Applies custom formatting rules.",
                inputs: ["data", "rules"],
                outputs: ["formattedOutput"],
              },
            },
          },
        ],
      },
    },
    {
      id: "node_4",
      type: "custom",
      position: { x: 850, y: 150 },
      data: {
        title: "Slack Notification",
        description: "Sends a message to a specified Slack channel.",
        color: "#795548",
        inputs: ["message", "webhookUrl", "channel"],
        outputs: [],
        automations: [
          {
            id: "automation_notify",
            label: "Send Notification",
            node: {
              id: "automation_notify",
              type: "custom",
              position: { x: 1050, y: 50 },
              data: {
                title: "Send Notification",
                description: "Sends notifications to external platforms.",
                inputs: ["message"],
                outputs: ["status"],
              },
            },
          },
          {
            id: "automation_retry",
            label: "Retry on Failure",
            node: {
              id: "automation_retry_slack",
              type: "custom",
              position: { x: 1050, y: 100 },
              data: {
                title: "Retry on Failure",
                description: "Retries a failed Slack message.",
                inputs: ["message", "retryConfig"],
                outputs: ["finalStatus"],
              },
            },
          },
        ],
        tools: [
          {
            id: "tool_slack_webhook",
            label: "Slack Webhook",
            node: {
              id: "tool_slack_webhook",
              type: "custom",
              position: { x: 1050, y: 150 },
              data: {
                title: "Slack Webhook",
                description: "Sends messages using Slack webhook.",
                inputs: ["webhookUrl", "payload"],
                outputs: ["response"],
              },
            },
          },
          {
            id: "tool_msg_fmt",
            label: "Message Formatter",
            node: {
              id: "tool_msg_fmt",
              type: "custom",
              position: { x: 1050, y: 200 },
              data: {
                title: "Message Formatter",
                description: "Formats message content for Slack.",
                inputs: ["rawText"],
                outputs: ["formattedMessage"],
              },
            },
          },
        ],
        abilities: [
          {
            id: "ability_alert",
            label: "Real-time Alerts",
            node: {
              id: "ability_alert",
              type: "custom",
              position: { x: 1050, y: 250 },
              data: {
                title: "Real-time Alerts",
                description: "Triggers alerts in real time.",
                inputs: ["event"],
                outputs: ["alertStatus"],
              },
            },
          },
          {
            id: "ability_dispatch",
            label: "Message Dispatch",
            node: {
              id: "ability_dispatch",
              type: "custom",
              position: { x: 1050, y: 300 },
              data: {
                title: "Message Dispatch",
                description: "Dispatches messages to destinations.",
                inputs: ["message", "destination"],
                outputs: ["dispatchStatus"],
              },
            },
          },
        ],
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
      sourceHandle: "output-Formatted_Text",
      animated: true,
      label: "Formatted Updates to Slack",
    },
  ],
};

// export const sideBarJson: SideBarJson = {
//   folders: [
//     {
//       folderName: "Inputs",
//       icon: "input",
//       item: [
//         {
//           label: "Chat Input",
//           icon: "chat",
//           data: {
//             name: "ChatInputNode",
//             display_name: "Chat Input",
//             display_icon: "MessageSquareMore",
//             description: "Create chat inputs for the workflow",
//             inputs: [
//               {
//                 name: "textInput",
//                 label: "Text",
//                 type: "text",
//                 placeholder: "Type something...",
//                 required: true,
//                 handlePresent: true,
//                 value: "",
//               },
//             ],
//             outputs: [
//               {
//                 name: "Message",
//                 type: "text",
//                 description: "User-entered text",
//               },
//             ],
//           },
//         },
//         {
//           label: "Text Input",
//           icon: "text",
//           data: {
//             name: "TextInputNode",
//             display_name: "Text Input",
//             display_icon: "Input",
//             description: "A simple text input node.",
//             inputs: [
//               {
//                 name: "textInput",
//                 label: "Enter text",
//                 type: "text",
//                 placeholder: "Type something...",
//                 required: true,
//                 handlePresent: true,
//                 value: "",
//               },
//             ],
//             outputs: [
//               {
//                 name: "textOutput",
//                 type: "text",
//                 description: "User-entered text",
//               },
//             ],
//           },
//         },
//       ],
//     },
//     {
//       folderName: "Outputs",
//       icon: "output",
//       item: [
//         {
//           label: "Chat Output",
//           icon: "chat",
//           data: {
//             name: "ChatOutputNode",
//             display_name: "Chat Output",
//             display_icon: "MessageSquareMore",
//             description: "Display the final response from the LLM.",
//             inputs: [
//               {
//                 name: "outputData",
//                 label: "Incoming Text",
//                 type: "text",
//                 required: true,
//                 handlePresent: true,
//                 value: "",
//               },
//             ],
//             outputs: [
//               {
//                 name: "Message",
//                 type: "text",
//                 description: "Final response from LLM as Text.",
//               },
//             ],
//           },
//         },
//       ],
//     },
//     {
//       folderName: "Agent",
//       icon: "agent",
//       item: [
//         {
//           label: "Open API",
//           icon: "agent",
//           data: {
//             name: "OpenAIChatNode",
//             display_name: "OpenAI Chat",
//             display_icon: "Bot",
//             description:
//               "This node sends a prompt to OpenAI's Chat model and returns a response.",
//             inputs: [
//               {
//                 name: "prompt",
//                 label: "Enter Prompt",
//                 type: "text",
//                 placeholder: "Enter your prompt...",
//                 required: true,
//                 handlePresent: true,
//                 value: "",
//               },
//               {
//                 name: "system_message",
//                 type: "text",
//                 label: "System Message",
//                 placeholder: "Type something...",
//                 required: true,
//                 handlePresent: true,
//                 value: "",
//               },
//               {
//                 name: "model",
//                 type: "dropdown",
//                 label: "Enter OpenAI model",
//                 options: ["gpt-3.5-turbo", "gpt-4"],
//                 placeholder: "Select model",
//                 required: true,
//                 handlePresent: false,
//                 value: "",
//               },
//               {
//                 name: "key",
//                 type: "text",
//                 label: "OpenAI API Key",
//                 placeholder: "",
//                 required: true,
//                 handlePresent: true,
//                 value: "",
//               },
//             ],
//             outputs: [
//               {
//                 name: "Response Text",
//                 type: "text",
//                 description: "The raw response from the model",
//               },
//               {
//                 name: "Full JSON Response",
//                 type: "data",
//                 description: "The complete JSON response object",
//               },
//             ],
//           },
//         },
//       ],
//     },
//   ],
// };
