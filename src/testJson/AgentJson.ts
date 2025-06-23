import { AgentConfig } from "@/types/agent";

export const agentJson: AgentConfig = {
  _id: "684a702ed041112e9dc3e1cd",
  id: "9c92eab88cd04c608cb3d750415ff457",
  title: "test",
  //description: "he",
  description:
    "Id commodo nostrud fugiat incididunt nulla ad exercitation deserunt occaecat amet cupidatat. Quis irure in nulla qui ut anim proident amet incididunt. Non consectetur sunt id excepteur excepteur do ",
  active: false,
  project_id: "b4c5248357874643aedca7a32ab1c89a",
  abilities: [],
  auth: "",
  response_type: "text",
  randomness: 0.6,
  user_id: "blt043645b976bcde8f",
  org_id: "blt87b0a3aff3fc7a51",
  created_at: "2025-06-12T06:14:06.365Z",
  updated_at: "2025-06-12T09:04:11.156Z",
  __v: 0,
  model_id: "gemini-2.0-flash",
  provider: "gemini",
  role_setting:
    "<AgentBackground>klmlkmdlk</AgentBackground>\n\n<AgentInstruction>dcsmldmc;mdsc</AgentInstruction>\n\n<AgentOutputFormatting>cs,m dsm, dc</AgentOutputFormatting>",
  input_schema:
    '[{"id":"16ebtcjlq2nj","name":"dcm mds cdc","description":",c ds, dscdcds","type":"string","isArray":false,"required":false,"nestedProperties":[],"enumValues":[]}]',
  brandkit: {
    enabled: false,
    knowledge_vault: false,
  },
  provider_options: [
    {
      label: "OpenAI",
      value: "chatgpt",
    },
    {
      label: "Vertex AI",
      value: "vertex",
    },
    {
      label: "Azure OpenAI",
      value: "azurechatgpt",
    },
    {
      label: "Google Gemini",
      value: "gemini",
    },
    {
      label: "Anthropic Claude",
      value: "anthropic",
    },
  ],
  response_types: [
    {
      label: "JSON",
      value: "json",
    },
    {
      label: "Text",
      value: "text",
    },
    {
      label: "HTML",
      value: "html",
    },
    {
      label: "Markdown",
      value: "markdown",
    },
  ],
  model_options: {
    chatgpt: [
      {
        label: "gpt-4-turbo",
        value: "gpt-4-turbo",
      },
      {
        label: "gpt-4o",
        value: "gpt-4o",
      },
      {
        label: "gpt-4o-mini",
        value: "gpt-4o-mini",
      },
      {
        label: "o3-mini",
        value: "o3-mini",
      },
    ],
    vertex: [
      {
        label: "gemini-1.5-flash",
        value: "gemini-1.5-flash",
      },
      {
        label: "gemini-1.5-pro",
        value: "gemini-1.5-pro",
      },
      {
        label: "gemini-2.0-flash",
        value: "gemini-2.0-flash",
      },
      {
        label: "gemini-2.0-pro-exp-02-05",
        value: "gemini-2.0-pro-exp-02-05",
      },
      {
        label: "gemini-2.0-flash-thinking-exp-01-21",
        value: "gemini-2.0-flash-thinking-exp-01-21",
      },
    ],
    azurechatgpt: [
      {
        label: "MODEL IS CONFIGURED IN AZURE",
        value: "MODEL IS CONFIGURED IN AZURE",
      },
    ],
    gemini: [
      {
        label: "gemini-1.5-flash",
        value: "gemini-1.5-flash",
      },
      {
        label: "gemini-1.5-pro",
        value: "gemini-1.5-pro",
      },
      {
        label: "gemini-2.0-flash",
        value: "gemini-2.0-flash",
      },
      {
        label: "gemini-2.0-pro-exp-02-05",
        value: "gemini-2.0-pro-exp-02-05",
      },
      {
        label: "gemini-2.0-flash-thinking-exp-01-21",
        value: "gemini-2.0-flash-thinking-exp-01-21",
      },
    ],
    anthropic: [
      {
        label: "claude-3-5-sonnet-latest",
        value: "claude-3-5-sonnet-latest",
      },
      {
        label: "claude-3-5-haiku-latest",
        value: "claude-3-5-haiku-latest",
      },
      {
        label: "claude-3-opus-latest",
        value: "claude-3-opus-latest",
      },
    ],
  },
};
