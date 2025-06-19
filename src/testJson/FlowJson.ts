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
      data: {
        title: "Webhook Trigger",
        description: "Triggers the workflow when a specific URL is hit.",
        color: "#2196f3",
        inputs: [],
        outputs: ["Trigger Data"],
        automations: [],
        tools: [],
        abilities: [],
        // Added icon for Webhook Trigger
        icon: "Webhook",
      },
    },
    {
      id: "node_2",
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
              data: {
                title: "Error Handling",
                description: "Manages errors and exceptions.",
                inputs: ["errorObject"],
                outputs: ["handledError"],
              },
            },
          },
        ],
        icon: "Cloud",
      },
    },
    {
      id: "node_3",
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
              data: {
                title: "Script Execution",
                description: "Runs a custom script on input data.",
                inputs: ["script", "input"],
                outputs: ["result"],
                automations: [
                  {
                    id: "automation_log",
                    label: "Logging",
                    node: {
                      id: "automation_log",
                      data: {
                        title: "Log Execution",
                        description: "Logs the script execution results.",
                        inputs: ["logData"],
                        outputs: ["logConfirmation"],
                      },
                    },
                  },
                ],
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
              data: {
                title: "Custom Formatting",
                description: "Applies custom formatting rules.",
                inputs: ["data", "rules"],
                outputs: ["formattedOutput"],
              },
            },
          },
        ],
        // Added icon for Format IPL Data
        icon: "ListEnd", // Or "FileText", "Type"
      },
    },
    {
      id: "node_4",
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
              data: {
                title: "Message Dispatch",
                description: "Dispatches messages to destinations.",
                inputs: ["message", "destination"],
                outputs: ["dispatchStatus"],
              },
            },
          },
        ],
        icon: "MessageSquare",
      },
    },
  ],
  edges: [
    {
      id: "e1",
      source: "node_1",
      sourceHandle: "node_1-bottom",
      target: "node_2",
      targetHandle: "node_2-top",
    },
    {
      id: "e2",
      source: "node_2",
      sourceHandle: "node_2-bottom",
      target: "node_3",
      targetHandle: "node_3-top",
    },
    {
      id: "e3",
      source: "node_3",
      sourceHandle: "node_3-bottom",
      target: "node_4",
      targetHandle: "node_4-top",
    },
  ],  
};
