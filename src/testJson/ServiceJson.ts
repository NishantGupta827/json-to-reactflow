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
      id: "step1_http_trigger",
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: "HTTP Request Trigger",
        description:
          "This event is triggered when HTTP GET/POST  requests are made to a webhook URL.",
        inputs: [
          {
            title: "Condition",
            type: "div",
          },
        ],
        icon: "zap",
        isIsland: false,
      },
      type: "custom",
    },
    {
      id: "step2_if_query_param",
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: "Check for Query Parameter",
        description:
          "Checks if a specific query parameter is present in the HTTP request.",
        inputs: [
          {
            title: "Condition",
            type: "div",
            placeholder: "query param is present",
          },
        ],
        icon: "zap",
        isIsland: false,
      },
      type: "custom",
    },
    {
      id: "step3_send_email",
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: "Send Email",
        description: "This action sends an email from a SendGrid account.",
        inputs: [
          {
            title: "Condition",
            type: "div",
          },
        ],
        icon: "zap",
        isIsland: false,
      },
      type: "custom",
    },
    {
      id: "step4_send_sms_only",
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: "Send SMS",
        description: "This action sends an SMS using the Twilio account.",
        inputs: [
          {
            title: "Condition",
            type: "div",
          },
        ],
        icon: "zap",
        isIsland: false,
      },
      type: "custom",
    },
    {
      id: "step5_send_sms_after_email",
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: "Send SMS",
        description: "This action sends an SMS using the Twilio account.",
        inputs: [
          {
            title: "Condition",
            type: "div",
          },
        ],
        icon: "zap",
        isIsland: false,
      },
      type: "custom",
    },
  ],
  edges: [
    {
      id: "e1",
      source: "step1_http_trigger",
      sourceHandle: "step1_http_trigger-bottom",
      target: "step2_if_query_param",
      targetHandle: "step2_if_query_param-top",
      label: "on trigger",
    },
    {
      id: "e2",
      source: "step2_if_query_param",
      sourceHandle: "step2_if_query_param-bottom",
      target: "step3_send_email",
      targetHandle: "step3_send_email-top",
      label: "If query parameter is present",
    },
    {
      id: "e3",
      source: "step2_if_query_param",
      sourceHandle: "step2_if_query_param-bottom",
      target: "step4_send_sms_only",
      targetHandle: "step4_send_sms_only-top",
      label: "If query parameter is not present",
    },
    {
      id: "e4",
      source: "step3_send_email",
      sourceHandle: "step3_send_email-bottom",
      target: "step5_send_sms_after_email",
      targetHandle: "step5_send_sms_after_email-top",
      label: "on success",
    },
  ],
};
