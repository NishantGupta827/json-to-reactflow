export type agentPayload = {
  abilities: string[]; //need to check
  //id: "745c1e2179e84c27bee58ceb6cf9813f",title: "Testing",type: "agent"
  // Icons of abilities are constant based on the type

  auth: string;
  //We can get the available auths in the system from the store
  //auth providers are constants
  //Available auth is pulled from the redux store
  //Agent models are also constants

  brandkit: { enabled: boolean; knowledge_vault: boolean };
  description: string;
  input_schema: {
    id: string;
    name: string;
    description: string;
    type: string; // boolean, select, textarea, string
    isArray: boolean;
    required: boolean;
    enumvalues: string[];
  }[];
  //string; //need to check
  // Jsonify in this format [{\"id\":\"tf8hoamcoap\",\"name\":\"Search Query\",\"description\":\"\",\"type\":\"string\",\"isArray\":false,\"required\":true,\"nestedProperties\":[],\"enumValues\":[]}]

  model: string;
  provider: string;
  randomness: 0.5;
  response_type: string;
  role_setting: string;
  // AgentBackground tag gives background information,
  // AgentInstruction tag gives instructions,
  // AgentOutputFormatting tag gives output formatting rules

  title: string;

  //might have to expose 2 functions to the parent
};

export interface Option {
  label: string;
  value: string;
}

export interface AuthOption {
  id: string;
  title: string;
  group_name: string;
}

export interface Brandkit {
  enabled: boolean;
  knowledge_vault: boolean;
}

export interface InputSchemaItem {
  id: string;
  name: string;
  description: string;
  type: string; // boolean, select, textarea, string
  isArray: boolean;
  required: boolean;
  enumValues: string[];
  nestedProperties: any[];
}

export interface ModelOptions {
  chatgpt: Option[];
  vertex: Option[];
  azurechatgpt: Option[];
  gemini: Option[];
  anthropic: Option[];
}

export interface AgentConfig {
  _id: string;
  id: string;
  title: string;
  description: string;
  active: boolean;
  project_id: string;
  abilities: (string | { id: string; title: string; type: string; [key: string]: any })[]; // Can be strings or objects with at least id, title, and type
  auth: string;
  response_type: string;
  randomness: number;
  user_id: string;
  org_id: string;
  created_at: string; // ISO string, or use `Date` if parsed
  updated_at: string;
  __v: number;
  model_id: string;
  provider: string;
  role_setting: string;
  input_schema: InputSchemaItem[]; // JSON string; optionally parsed into InputSchemaItem[]
  brandkit: Brandkit;
  provider_options: Option[];
  response_types: Option[];
  model_options: Record<string, Option[]>;
  auth_options: AuthOption[];
}
