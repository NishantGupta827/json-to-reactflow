import { Node } from "@xyflow/react";
import "./RightSidebar.css";

export type NodeSideBarData = {
  title: string;
  type: string;
  placeholder: string;
};

type NodeContentProps = {
  data: Node;
};

export default function NodeContent({ data }: NodeContentProps) {
  const basicInfo: NodeSideBarData[] = [
    {
      title: "Node Title",
      type: "div",
      placeholder: data.data.title as string,
    },
    {
      title: "Node Description",
      type: "div",
      placeholder: data.data.description as string,
    },
  ];

  const info = [
    ...basicInfo,
    ...(data.data.inputs && typeof data.data.inputs === typeof basicInfo
      ? (data.data.inputs as [])
      : []),
  ];

  return (
    <>
      {info.map((ele, id) => (
        <div className="node-section" key={id}>
          <span className="node-label">{ele.title}</span>
          <div className="node-value-box">{ele.placeholder}</div>
        </div>
      ))}
    </>
  );
}
