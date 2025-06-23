import { Node } from "@xyflow/react";

type NodeSideBarData = {
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

  function isNodeSideBarData(input: unknown): input is NodeSideBarData {
    return (
      typeof input === "object" && input !== null && "someExpectedKey" in input
    );
  }

  const info = [
    ...basicInfo,
    ...(data.data.inputs && isNodeSideBarData(data.data.inputs)
      ? [data.data.inputs]
      : []),
  ];

  return (
    <>
      {info.map((ele, id) => {
        return (
          <div key={id} style={{ marginBottom: "10px", fontSize: "0.875rem" }}>
            <span>{ele.title}</span>
            <div
              style={{ backgroundColor: "#F7F7F7" }}
              className="w-full border rounded-md px-3 py-2 text-left shadow-sm"
            >
              {ele.placeholder}
            </div>
          </div>
        );
      })}
    </>
  );
}
