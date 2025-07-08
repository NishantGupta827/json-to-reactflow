export type BackendAbilityRes = {
  id: string;
  title: string;
  description: string;
  type: string;
  connector_id: string;
  group_name: string;
};

export const backendRes: Record<string, Record<string, any>> = {
  tools: {
    "Add Items to a Release": {
      title: "Add Items to a Release",
      description: "This action adds items to a release.",
    },
    "Assign/Reassign a Branch Alias": {
      title: "Assign/Reassign a Branch Alias",
      description:
        "This action assigns/reassigns an existing/new alias to a branch in a stack.",
    },
    "Clone a Release": {
      title: "Clone a Release",
      description: "This action creates a duplicate of a release.",
    },
  },
  agent: {
    "Contentstack Object Creator": {
      title: "Contentstack Object Creator",
      description:
        "Creates and publishes a Contentstack entry or asset based on input type and data. Acts as a reusable sub-agent for logging or event tracking purposes.",
    },
  },
};
