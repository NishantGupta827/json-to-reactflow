import { NodeOption, NodeOptionsJson } from "@/types/nodeOption";

export const convertBackendRes = (
  backendRes: Record<string, Record<string, any>>
) => {
  const result: NodeOptionsJson = {
    tools: [],
    agents: [],
    automations: [],
    triggers: [],
  };
  const tools: NodeOption[] = [];
  if (backendRes.tools) {
    Object.values(backendRes.tools).map((ele: any) => {
      const temp: NodeOption = {
        id: `${ele.title}`,
        label: ele.title,
        node: {
          id: `${ele.title}`,
          data: {
            title: ele.title,
            description: ele.description,
            inputs: [],
            outputs: [],
          },
        },
      };
      tools.push(temp);
    });
  }

  const agents: NodeOption[] = [];
  if (backendRes.agent) {
    Object.values(backendRes.agent).map((ele: any) => {
      const temp: NodeOption = {
        id: `${ele.title}`,
        label: ele.title,
        node: {
          id: `${ele.title}`,
          data: {
            title: ele.title,
            description: ele.description,
            inputs: [],
            outputs: [],
          },
        },
      };
      agents.push(temp);
    });
  }

  const automations: NodeOption[] = [];
  if (backendRes.automations) {
    backendRes.automations.forEach((ele: any) => {
      const temp: NodeOption = {
        id: `${ele.title}`,
        label: ele.title,
        node: {
          id: `${ele.title}`,
          data: {
            title: ele.title,
            description: ele.description,
            inputs: [],
            outputs: [],
          },
        },
      };
      automations.push(temp);
    });
  }
  result.tools = tools;
  result.agents = agents;
  result.automations = automations;
  console.log(result);
  return result;
};
