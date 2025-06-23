import { Node, useReactFlow } from "@xyflow/react";

export function TestForIsland() {
  const reactflow = useReactFlow();
  const node = reactflow.getNode("node_1");
  const visited = new Set();
  const arr: string[] = [node?.id as string];
  //visited.add(node);
  while (arr.length != 0) {
    const conns = reactflow.getNodeConnections({
      nodeId: arr[-1],
    });
    arr.pop();
    conns.forEach((ele) => {
      const initial = visited.size;
      visited.add(ele.target);
      const final = visited.size;
      if (initial == final) {
        arr.push(ele.target);
      }
    });
  }
  console.log(arr);
  console.log(visited);
}
