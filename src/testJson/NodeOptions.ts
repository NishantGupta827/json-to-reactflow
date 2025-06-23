export const nodeOptionsJson = {
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
  agents: [
    {
      id: "agent_ai_helper",
      label: "AI Helper",
      node: {
        id: "agent_ai_helper",
        data: {
          title: "AI Helper",
          description: "Handles AI decision-making.",
          inputs: ["prompt"],
          outputs: ["response"],
        },
      },
    },
  ],
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
  triggers: [
    {
      id: "trigger_webhook",
      label: "Webhook Trigger",
      node: {
        id: "trigger_webhook",
        data: {
          title: "Webhook Trigger",
          description: "Fires on incoming webhook.",
          inputs: [],
          outputs: ["payload"],
        },
      },
    },
  ],
};
