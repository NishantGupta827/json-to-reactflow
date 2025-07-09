export interface NodeData {
  title: string;
  description: string;
  inputs: string[];
  outputs: string[];
}

export interface NodeDefinition {
  id: string;
  data: NodeData;
}

export interface NodeOption {
  id: string;
  label: string;
  node: NodeDefinition;
}

export type NodeOptionsJson = {
  [K in NodeCategory]: NodeOption[];
};

export type NodeCategory = "tools" | "agents" | "automations" | "triggers";
