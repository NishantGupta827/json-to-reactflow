import { ServiceStep } from "@/types/service";
import { FlowJson } from "@/types/flowJson";

export const ServiceJson: ServiceStep[] = [
  {
    id: "trigger_http_request",
    type: "trigger",
    target_id: [
      {
        id: "if_query_param_present",
      },
    ],
    step_no: 1,
    title: "HTTP Request Trigger",
    description:
      "This event is triggered when HTTP GET/POST  requests are made to a webhook URL.",
  },
  {
    id: "if_query_param_present",
    type: "if",
    target_id: [
      {
        id: "ability_send_email",
        label: "If query parameter is present",
      },
      {
        id: "ability_send_sms",
        label: "If query parameter is NOT present",
      },
    ],
    step_no: 2,
    condition: "Query parameter is present in HTTP request body/params",
    title: "Check for Query Parameter",
    description:
      "Checks if a specific query parameter is present in the incoming HTTP request.",
  },
  {
    id: "ability_send_email",
    type: "ability",
    target_id: [
      {
        id: "ability_send_sms",
      },
    ],
    step_no: 3,
    title: "Send Email",
    description: "This action sends an email from a SendGrid account.",
  },
  {
    id: "ability_send_sms",
    type: "ability",
    target_id: [],
    step_no: 4,
    title: "Send SMS",
    description: "This action sends an SMS using the Twilio account.",
  },
];

export const updatdServiceJson: FlowJson = {
  nodes: [
    {
      id: "trigger_1",
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: "HTTP Request Trigger",
        description:
          "This event is triggered when HTTP GET/POST requests are made to a webhook URL.",
        inputs: [],
        icon: "webhook",
        isIsland: false,
        type: "trigger",
      },
      type: "custom",
    },
    {
      id: "step_2",
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: "Parse Query Parameters",
        description:
          "Extracts 'notify' and 'event' values from the incoming HTTP request query string.",
        inputs: [],
        icon: "search",
        isIsland: false,
        type: "logic",
      },
      type: "custom",
    },
    {
      id: "step_3",
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: "Get All Taxonomies",
        description:
          "This action fetches the details of all the taxonomies in a stack.",
        inputs: [],
        icon: "database",
        isIsland: false,
        type: "action",
      },
      type: "custom",
    },
    {
      id: "step_4",
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: "Check for 'Event Type' Taxonomy",
        description:
          "Determines if a taxonomy named 'Event Type' already exists in the Contentstack stack.",
        inputs: [
          {
            title: "Condition",
            type: "div",
            placeholder:
              "Check if 'Event Type' taxonomy exists in the fetched taxonomies.",
          },
        ],
        icon: "git-branch",
        isIsland: false,
        type: "logic",
      },
      type: "custom",
    },
    {
      id: "step_5",
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: "Create a Taxonomy",
        description: "This action creates a new taxonomy in a stack.",
        inputs: [],
        icon: "plus",
        isIsland: false,
        type: "action",
      },
      type: "custom",
    },
    {
      id: "step_6",
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: "Create a Term",
        description: "This action creates a new term within a taxonomy.",
        inputs: [],
        icon: "tag",
        isIsland: false,
        type: "action",
      },
      type: "custom",
    },
    {
      id: "step_7",
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: "Build Sub-Agent Payload",
        description:
          "Constructs the payload (type, content, term_id) required by the 'Contentstack Object Creator' sub-agent.",
        inputs: [],
        icon: "file-text",
        isIsland: false,
        type: "logic",
      },
      type: "custom",
    },
    {
      id: "step_8",
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: "Contentstack Object Creator",
        description:
          "Creates and publishes a Contentstack entry or asset based on input type and data. Acts as a reusable sub-agent for logging or event tracking purposes.",
        inputs: [],
        icon: "send",
        isIsland: false,
        type: "agent",
      },
      type: "custom",
    },
    {
      id: "step_9",
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: "Return Final Structured Response",
        description:
          "Generates the final JSON response with status, log type, Contentstack ID, term ID, and a message.",
        inputs: [],
        icon: "message-square",
        isIsland: false,
        type: "logic",
      },
      type: "custom",
    },
  ],
  edges: [
    {
      id: "e1",
      source: "trigger_1",
      sourceHandle: "trigger_1-bottom",
      target: "step_2",
      targetHandle: "step_2-top",
    },
    {
      id: "e2",
      source: "step_2",
      sourceHandle: "step_2-bottom",
      target: "step_3",
      targetHandle: "step_3-top",
    },
    {
      id: "e3",
      source: "step_3",
      sourceHandle: "step_3-bottom",
      target: "step_4",
      targetHandle: "step_4-top",
    },
    {
      id: "e4",
      source: "step_4",
      sourceHandle: "step_4-bottom",
      target: "step_6",
      targetHandle: "step_6-top",
      label: "Found",
    },
    {
      id: "e5",
      source: "step_4",
      sourceHandle: "step_4-bottom",
      target: "step_5",
      targetHandle: "step_5-top",
      label: "Not Found",
    },
    {
      id: "e6",
      source: "step_5",
      sourceHandle: "step_5-bottom",
      target: "step_6",
      targetHandle: "step_6-top",
    },
    {
      id: "e7",
      source: "step_6",
      sourceHandle: "step_6-bottom",
      target: "step_7",
      targetHandle: "step_7-top",
    },
    {
      id: "e8",
      source: "step_7",
      sourceHandle: "step_7-bottom",
      target: "step_8",
      targetHandle: "step_8-top",
    },
    {
      id: "e9",
      source: "step_8",
      sourceHandle: "step_8-bottom",
      target: "step_9",
      targetHandle: "step_9-top",
    },
  ],
};
