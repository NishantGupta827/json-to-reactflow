import { NodeSideBarData } from "@/components/rightSidebar/node";
import { FlowJson } from "@/types/flowJson";
import { ServiceStep } from "@/types/service";
import { type Edge, type Node } from "@xyflow/react";

export function ServiceToFlow(data: ServiceStep[]): FlowJson {
  console.log(data);
  const nodes: Node[] = [];
  const arr: { source: string; target: string; label?: string }[] = [];
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
    ele.target_id.forEach((target) => 
      arr.push({
        source: ele.id,
        target: target.id,
        label: target.label,
      })
    );

    const temp: Node = {
      id: ele.id,
      position: {
        x: 0,
        y: 0,
      },
      data: {
        title: ele.title,
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
    if (!ele.target && !ele.source) {
      return;
    }

    const sourceStep = stepMap.get(ele.source);
    const targetStep = stepMap.get(ele.target);

    const LR1 = HandleMap.get(ele.source)?.includes("right")
      ? "left"
      : "right";

    const condition = sourceStep && targetStep && sourceStep > targetStep;
    const pos1 = condition ? LR1 : "bottom";
    const pos2 = "top";

    const temp = {
      id: `e${count}`,
      source: ele.source,
      sourceHandle: `${ele.source}-${pos1}`,
      target: ele.target,
      targetHandle: `${ele.target}-${pos2}`,
      label: ele.label,
    };
    count += 1;

    const check = HandleMap.get(ele.source);
    HandleMap.set(ele.source, check ? [...check, pos1] : [pos1]);
    HandleMap.set(ele.target, check ? [...check, pos2] : [pos2]);

    edges.push(temp);
  });

  return {
    nodes: nodes,
    edges: edges,
  };
}
