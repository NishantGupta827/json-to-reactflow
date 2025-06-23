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
    {
      id: "tool_data_cleaner",
      label: "Data Cleaner",
      node: {
        id: "tool_data_cleaner",
        data: {
          title: "Data Cleaner",
          description: "Cleans and formats raw data.",
          inputs: ["rawData"],
          outputs: ["cleanData"],
        },
      },
    },
    {
      id: "tool_logger",
      label: "Logger",
      node: {
        id: "tool_logger",
        data: {
          title: "Logger",
          description: "Logs events or messages.",
          inputs: ["message"],
          outputs: ["logId"],
        },
      },
    },
    {
      id: "tool_data_merger",
      label: "Data Merger",
      node: {
        id: "tool_data_merger",
        data: {
          title: "Data Merger",
          description: "Combines multiple data sources.",
          inputs: ["sourceA", "sourceB"],
          outputs: ["mergedResult"],
        },
      },
    },
    {
      id: "tool_json_parser",
      label: "JSON Parser",
      node: {
        id: "tool_json_parser",
        data: {
          title: "JSON Parser",
          description: "Parses JSON strings into objects.",
          inputs: ["jsonString"],
          outputs: ["jsonObject"],
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
    {
      id: "agent_scheduler",
      label: "Scheduler Agent",
      node: {
        id: "agent_scheduler",
        data: {
          title: "Scheduler Agent",
          description: "Schedules tasks based on time or event.",
          inputs: ["task", "schedule"],
          outputs: ["scheduleId"],
        },
      },
    },
    {
      id: "agent_summary",
      label: "Summarizer Agent",
      node: {
        id: "agent_summary",
        data: {
          title: "Summarizer Agent",
          description: "Summarizes long form content.",
          inputs: ["text"],
          outputs: ["summary"],
        },
      },
    },
    {
      id: "agent_translator",
      label: "Translator Agent",
      node: {
        id: "agent_translator",
        data: {
          title: "Translator Agent",
          description: "Translates text between languages.",
          inputs: ["text", "targetLang"],
          outputs: ["translatedText"],
        },
      },
    },
    {
      id: "agent_researcher",
      label: "Research Agent",
      node: {
        id: "agent_researcher",
        data: {
          title: "Research Agent",
          description: "Fetches and analyzes external content.",
          inputs: ["query"],
          outputs: ["insights"],
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
    {
      id: "automation_email",
      label: "Email Automation",
      node: {
        id: "automation_email",
        data: {
          title: "Email Automation",
          description: "Sends automated emails.",
          inputs: ["recipient", "subject", "body"],
          outputs: ["status"],
        },
      },
    },
    {
      id: "automation_delay",
      label: "Delay Step",
      node: {
        id: "automation_delay",
        data: {
          title: "Delay Step",
          description: "Waits for a specified duration.",
          inputs: ["duration"],
          outputs: ["nextTrigger"],
        },
      },
    },
    {
      id: "automation_condition",
      label: "Conditional Logic",
      node: {
        id: "automation_condition",
        data: {
          title: "Conditional Logic",
          description: "Routes based on true/false condition.",
          inputs: ["condition"],
          outputs: ["truePath", "falsePath"],
        },
      },
    },
    {
      id: "automation_loop",
      label: "Loop Automation",
      node: {
        id: "automation_loop",
        data: {
          title: "Loop Automation",
          description: "Repeats a step for each item in a list.",
          inputs: ["items", "action"],
          outputs: ["results"],
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
    {
      id: "trigger_cron",
      label: "Cron Trigger",
      node: {
        id: "trigger_cron",
        data: {
          title: "Cron Trigger",
          description: "Triggers workflow on schedule.",
          inputs: ["cronExpression"],
          outputs: ["tick"],
        },
      },
    },
    {
      id: "trigger_api",
      label: "API Trigger",
      node: {
        id: "trigger_api",
        data: {
          title: "API Trigger",
          description: "Starts flow when an API is called.",
          inputs: [],
          outputs: ["inputData"],
        },
      },
    },
    {
      id: "trigger_form",
      label: "Form Submit Trigger",
      node: {
        id: "trigger_form",
        data: {
          title: "Form Submit Trigger",
          description: "Fires on form submission.",
          inputs: [],
          outputs: ["formData"],
        },
      },
    },
    {
      id: "trigger_file_upload",
      label: "File Upload Trigger",
      node: {
        id: "trigger_file_upload",
        data: {
          title: "File Upload Trigger",
          description: "Initiates flow when file is uploaded.",
          inputs: [],
          outputs: ["fileMetadata"],
        },
      },
    },
  ],
};
