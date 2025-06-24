import { NodeSideBarData } from "@/components/rightSidebar/node";
import { FlowJson } from "@/types/flowJson";
import { ServiceStep } from "@/types/service";
import { Edge, type Node } from "@xyflow/react";

export function ServiceToFlow(data: ServiceStep[]): FlowJson {
  console.log(data);
  const nodes: Node[] = [];
  const arr: (string | undefined)[][] = [];
  const stepMap = new Map<string, number>();

  data.forEach((ele) => {
    const inputs: NodeSideBarData[] = [];

    if (ele.action) {
      inputs.push({
        title: "Action",
        type: "div",
        placeholder: ele.action,
      });
    } else {
      inputs.push({
        title: "Condition",
        type: "div",
        placeholder: ele.condition as string,
      });
    }

    stepMap.set(ele.id, ele.step_no);
    ele.target_id?.forEach((e) => arr.push([ele.id, e]));

    const temp: Node = {
      id: ele.id,
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: ele.tool == "ability" ? ele.action : ele.tool,
        description: ele.description,
        inputs: inputs,
        icon: "zap",
        isIsland: false,
      },
      type: "custom",
    };
    nodes.push(temp);
  });

  const edges: Edge[] = [];
  let count = 1;
  const HandleMap = new Map<string, string[]>();
  arr.forEach((ele) => {
    if (!ele[1] && !ele[0]) {
      return;
    }

    const sourceStep = stepMap.get(ele[0] as string);
    const targetStep = stepMap.get(ele[1] as string);

    const LR1 = HandleMap.get(ele[0] as string)?.includes("right")
      ? "left"
      : "right";

    const condition = sourceStep && targetStep && sourceStep > targetStep;
    const pos1 = condition ? LR1 : "bottom";
    const pos2 = "top";

    const temp = {
      id: `e${count}`,
      source: ele[0] as string,
      sourceHandle: `${ele[0]}-${pos1}`,
      target: ele[1] as string,
      targetHandle: `${ele[1]}-${pos2}`,
    };
    count += 1;

    const check = HandleMap.get(ele[0] as string);
    HandleMap.set(ele[0] as string, check ? [...check, pos1] : [pos1]);
    HandleMap.set(ele[1] as string, check ? [...check, pos2] : [pos2]);

    edges.push(temp);
  });

  return {
    nodes: nodes,
    edges: edges,
  };
}
