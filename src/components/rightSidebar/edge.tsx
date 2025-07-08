import { useState, useEffect } from "react";
import { Edge, Node } from "@xyflow/react";
import "./RightSidebar.css";

type EdgeSidebarProps = {
  edge: Edge;
  nodes: Node[]; // We need nodes to get source node data
  onClose: () => void;
  onSave: (updatedEdge: Edge) => void;
};

export function EdgeSidebar({
  edge,
  nodes,
  onClose,
  onSave,
}: EdgeSidebarProps) {
  // Find the source node to get its title and logic expression
  const sourceNode = nodes.find((node) => node.id === edge.source);
  const sourceNodeTitle: string = String(sourceNode?.data?.title || "");
  const edgeLabel: string = typeof edge.label === "string" ? edge.label : "";

  // Format: "Source Node Title - Edge Label"
  const formattedConnectionText: string = `${
    edge.data?.label ? edge.data?.label + " - " : ""
  } ${edge.label ? edge.label : ""}`;

  const sourceNodeCondition: string = edgeLabel
    ? `${sourceNodeTitle} - ${edgeLabel}`
    : sourceNodeTitle;

  // const formattedConnectionText: string = edgeLabel
  //   ? `${sourceNodeTitle} - ${edgeLabel}`
  //   : sourceNodeTitle;

  // // Get logic expression from source node's inputs (condition)
  // const sourceNodeInputs = sourceNode?.data?.inputs;
  // const sourceNodeCondition: string =
  //   Array.isArray(sourceNodeInputs) && sourceNodeInputs[0]?.placeholder
  //     ? String(sourceNodeInputs[0].placeholder)
  //     : "";

  const [connectionText, setConnectionText] = useState<string>(
    formattedConnectionText || ""
  );
  const [logicExpression, setLogicExpression] = useState<string>(
    sourceNodeCondition || ""
  );

  // Update state when edge changes (for when user double-clicks different edge)
  useEffect(() => {
    setConnectionText(formattedConnectionText || "");
    setLogicExpression(sourceNodeCondition || "");
  }, [edge.id, formattedConnectionText, sourceNodeCondition]); // Update when edge changes

  const handleSave = () => {
    console.log("working?");
    console.log(connectionText);
    const temp = connectionText.split("-");
    console.log(temp);
    const updatedEdge = {
      ...edge,
      label: temp.length >= 2 ? temp[1] : " ", // Keep original edge label
      data: {
        ...edge.data,
        logicExpression,
        label: temp.length >= 1 ? temp[0] : " ",
      },
    };
    onSave(updatedEdge);
  };

  return (
    <div className="right-sidebar">
      <div className="agent-title-section">
        <h1 className="agent-main-title">
          Condition : {edgeLabel || "New Connection"}
        </h1>
      </div>

      <div className="sidebar-section">
        <div className="select-wrapper">
          <span className="config-label">Connection Text (required)</span>
          <input
            type="text"
            value={connectionText}
            onChange={(e) => setConnectionText(e.target.value)}
            className="description-area"
            style={{ height: "40px", resize: "none" }}
            placeholder="Enter connection text..."
            // readOnly
          />
          <p
            style={{
              fontSize: "0.8rem",
              color: "#6b7280",
              marginTop: "0.25rem",
            }}
          >
            This text will appear on the connection line between nodes
          </p>
        </div>

        <div className="select-wrapper">
          <span className="config-label">Logic Expression (required)</span>
          <textarea
            rows={4}
            value={logicExpression}
            onChange={(e) => setLogicExpression(e.target.value)}
            className="description-area"
            placeholder="Enter logic expression..."
          />
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="sidebar-button cancel-button" onClick={onClose}>
          Cancel
        </button>
        <button className="sidebar-button save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
