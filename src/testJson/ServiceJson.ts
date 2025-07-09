import { FlowJson } from "@/types/flowJson";

export const updatedServiceJson: FlowJson = {
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
        title: "Parse Request & Determine Event Type",
        description:
          "Parses query parameters (notify, event) and determines the event type, defaulting to 'uncategorized' if not specified.",
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
          "Determines if a taxonomy named 'Event Type' already exists.",
        inputs: [
          {
            title: "Condition",
            type: "div",
            placeholder: "Is 'Event Type' taxonomy found in the list?",
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
        title: "Build Log Payload",
        description:
          "Constructs the structured payload for the Contentstack Object Creator, including log type, content, and the created term ID.",
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
          "Creates and publishes a Contentstack entry or asset based on input type and data.",
        inputs: [],
        icon: "upload",
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
        title: "Return Structured Response",
        description:
          "Returns the final structured response, including status, log type, Contentstack ID, and message.",
        inputs: [],
        icon: "send",
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
      label: "success",
      data: {
        label: "Request received",
      },
    },
    {
      id: "e2",
      source: "step_2",
      sourceHandle: "step_2-bottom",
      target: "step_3",
      targetHandle: "step_3-top",
      label: "success",
      data: {
        label: "Parameters parsed",
      },
    },
    {
      id: "e3",
      source: "step_3",
      sourceHandle: "step_3-bottom",
      target: "step_4",
      targetHandle: "step_4-top",
      label: "success",
      data: {
        label: "Taxonomies fetched",
      },
    },
    {
      id: "e4",
      source: "step_4",
      sourceHandle: "step_4-bottom",
      target: "step_6",
      targetHandle: "step_6-top",
      label: "yes",
      data: {
        label: "Taxonomy 'Event Type' exists?",
      },
    },
    {
      id: "e5",
      source: "step_4",
      sourceHandle: "step_4-bottom",
      target: "step_5",
      targetHandle: "step_5-top",
      label: "no",
      data: {
        label: "Taxonomy 'Event Type' exists?",
      },
    },
    {
      id: "e6",
      source: "step_5",
      sourceHandle: "step_5-bottom",
      target: "step_6",
      targetHandle: "step_6-top",
      label: "success",
      data: {
        label: "Taxonomy created",
      },
    },
    {
      id: "e7",
      source: "step_6",
      sourceHandle: "step_6-bottom",
      target: "step_7",
      targetHandle: "step_7-top",
      label: "success",
      data: {
        label: "Term created",
      },
    },
    {
      id: "e8",
      source: "step_7",
      sourceHandle: "step_7-bottom",
      target: "step_8",
      targetHandle: "step_8-top",
      label: "success",
      data: {
        label: "Payload built",
      },
    },
    {
      id: "e9",
      source: "step_8",
      sourceHandle: "step_8-bottom",
      target: "step_9",
      targetHandle: "step_9-top",
      label: "success",
      data: {
        label: "Contentstack object created",
      },
    },
  ],
};
