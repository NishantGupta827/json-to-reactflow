import { Edge, Handle, Position } from "@xyflow/react";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import { Plus } from "lucide-react";
import { ButtonHandle } from "../ui/ButtonHandle";
import "./AgentNode.css";
import { NodeOptionsJson } from "@/types/nodeOption";

type AgentNodeProps = {
  data: any;
  id: string;
  edges: Edge[];
  onHandleClick: (info: {
    nodeId: string;
    handleId: string;
    type: "source" | "target";
    nodeData: any;
  }) => void;
};

export default function AgentNodeContent({
  data,
  id,
  edges,
  onHandleClick,
}: AgentNodeProps) {
  const isConnected = (handleId: string, type: "source" | "target") => {
    return edges.some((edge) => {
      return type === "source"
        ? edge.source === id && edge.sourceHandle === handleId
        : edge.target === id && edge.targetHandle === handleId;
    });
  };

  const renderHandle = (
    positionName: "top" | "right" | "bottom" | "left",
    type: "source" | "target",
    position: Position
  ) => {
    const handleId = `${id}-${positionName}`;
    const connected = isConnected(handleId, type);

    if (connected) {
      return (
        <Handle
          type={type}
          position={position}
          id={handleId}
          style={{
            background: "#6E6B86",
            width: 9,
            height: 9,
            borderColor: "white",
            borderWidth: 1.5,
            zIndex: 10,
          }}
        />
      );
    }

    return (
      <ButtonHandle
        type={type}
        position={position}
        id={handleId}
        className="handle-wrapper"
        style={{
          background: "#6E6B86",
          width: 9,
          height: 9,
          borderColor: "white",
          borderWidth: 1.5,
          zIndex: 10,
        }}
      >
        <button
          className="handle-button"
          onClick={(e) => {
            e.stopPropagation();
            onHandleClick?.({
              nodeId: id,
              handleId,
              type,
              nodeData: data,
            });
          }}
        >
          <Plus size={10} />
        </button>
      </ButtonHandle>
    );
  };

  const convertIconName = (iconName: string): string => {
    return iconName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  };

  const colorCombinations = [
    {
      icon: "#FFAE0A", // Mango
      background: "#FFF4E6",
    },
    {
      icon: "#0469E3", // Aqua
      background: "#E6F3FF",
    },
    {
      icon: "#007A52", // Spinach
      background: "#E6F7F1",
    },
  ];

  const getColorFromId = (
    nodeId: string
  ): { icon: string; background: string } => {
    let hash = 0;
    for (let i = 0; i < nodeId.length; i++) {
      const char = nodeId.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    const colorIndex = Math.abs(hash) % colorCombinations.length;
    return colorCombinations[colorIndex];
  };

  const { icon: iconColor } = getColorFromId(id);

  let IconComponent: ForwardRefExoticComponent<
    LucideProps & RefAttributes<SVGSVGElement>
  > = LucideIcons.Zap;

  if (data.icon && typeof data.icon === "string") {
    const convertedIconName = convertIconName(data.icon);

    if (LucideIcons[convertedIconName as keyof typeof LucideIcons]) {
      IconComponent = LucideIcons[
        convertedIconName as keyof typeof LucideIcons
      ] as ForwardRefExoticComponent<
        LucideProps & RefAttributes<SVGSVGElement>
      >;
    }
  }

  return (
    <div className="agent-node-container">
      <div
        className={`${data.isIsland ? "island-node" : "agent-node-card"}`}
        style={data.style}
      >
        <div className="agent-node-header">
          <div className="agent-node-icon-box">
            <IconComponent
              className="agent-node-icon"
              style={{ color: iconColor }}
            />
          </div>
          <div className="agent-node-text">
            <div className="agent-node-title">{data.title}</div>
            <div className="agent-node-description">{data.description}</div>
          </div>
        </div>
      </div>

      {renderHandle("top", "target", Position.Top)}
      {renderHandle("right", "source", Position.Right)}
      {renderHandle("bottom", "source", Position.Bottom)}
      {renderHandle("left", "source", Position.Left)}

      {/* {showModal && clickedHandle && (
        <NodeSelectionModal
          onClose={() => setShowModal(false)}
          onSelect={handleNodeSelect}
        />
      )} */}
    </div>
  );
}

type Category = "all" | "agents" | "automations" | "tools" | "triggers";

export function NodeSelectionModal({
  onClose,
  onSelect,
  nodeOptionsJson,
}: {
  onClose: () => void;
  onSelect: (node: any) => void;
  nodeOptionsJson: NodeOptionsJson;
}) {
  const [category, setCategory] = useState<Category>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(
    new Set()
  );

  // Get all nodes or filtered by category
  const getAllNodes = () => {
    const allCategories: (keyof NodeOptionsJson)[] = [
      "agents",
      "automations",
      "tools",
      "triggers",
    ];
    if (category === "all") {
      return allCategories.flatMap((cat) => nodeOptionsJson[cat] || []);
    }
    return nodeOptionsJson[category as keyof NodeOptionsJson] || [];
  };

  // Filter nodes by search term
  const filteredNodes = getAllNodes().filter(
    (item) =>
      item.node.data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.node.data.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Group nodes by category for display
  const groupedNodes = filteredNodes.reduce((acc, item) => {
    const cat = Object.keys(nodeOptionsJson).find((key) =>
      nodeOptionsJson[key as keyof NodeOptionsJson]?.includes(item)
    ) as keyof NodeOptionsJson;

    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, typeof filteredNodes>);

  const categoryIcons = {
    all: LucideIcons.Home,
    agents: LucideIcons.Bot,
    automations: LucideIcons.Settings,
    tools: LucideIcons.Wrench,
    triggers: LucideIcons.Zap,
  };

  const handleInsert = () => {
    if (selectedNode) {
      onSelect(selectedNode);
      onClose();
    }
  };

  const toggleCategory = (categoryName: string) => {
    const newCollapsed = new Set(collapsedCategories);
    if (newCollapsed.has(categoryName)) {
      newCollapsed.delete(categoryName);
    } else {
      newCollapsed.add(categoryName);
    }
    setCollapsedCategories(newCollapsed);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="node-selection-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Full Width Header */}
        <div className="modal-header">
          <h2>Choose next step</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <LucideIcons.X size={16} />
          </button>
        </div>

        {/* Two Column Layout */}
        <div className="modal-content">
          {/* Left Section - Categories */}
          <div className="modal-sidebar">
            {(
              [
                "all",
                "agents",
                "automations",
                "tools",
                "triggers",
              ] as Category[]
            ).map((cat) => {
              const IconComponent = categoryIcons[cat];
              return (
                <button
                  key={cat}
                  className={`modal-category-btn ${
                    category === cat ? "active" : ""
                  }`}
                  onClick={() => setCategory(cat)}
                >
                  <IconComponent size={16} className="category-icon" />
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              );
            })}
          </div>

          {/* Right Section - Search + Content + Footer */}
          <div className="modal-right-section">
            <div className="modal-search-section">
              <div className="search-container">
                <input
                  className="modal-search-input"
                  placeholder="Search in across various abilities..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-btn">
                  <LucideIcons.Search size={16} />
                </button>
              </div>
            </div>

            <div className="modal-main">
              {Object.entries(groupedNodes).map(([categoryName, nodes]) => {
                const IconComponent =
                  categoryIcons[categoryName as keyof typeof categoryIcons];
                const isCollapsed = collapsedCategories.has(categoryName);
                return (
                  <div key={categoryName} className="category-section">
                    <div
                      className="category-title-container"
                      onClick={() => toggleCategory(categoryName)}
                    >
                      <h3 className="category-title">
                        {categoryName.charAt(0).toUpperCase() +
                          categoryName.slice(1)}
                      </h3>
                      <LucideIcons.ChevronDown
                        size={16}
                        className={`collapse-icon ${
                          isCollapsed ? "collapsed" : ""
                        }`}
                      />
                    </div>
                    {!isCollapsed && (
                      <div className="nodes-grid">
                        {nodes.map((item) => (
                          <div
                            key={item.id}
                            className={`node-card ${
                              selectedNode?.id === item.id ? "selected" : ""
                            }`}
                            onClick={() => setSelectedNode(item.node)}
                          >
                            <div className="node-icon">
                              <IconComponent size={20} />
                            </div>
                            <div className="node-info">
                              <div className="modal-node-title">
                                {item.node.data.title}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="modal-footer">
              <button className="modal-btn cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button
                className={`modal-btn insert-btn ${
                  !selectedNode ? "disabled" : ""
                }`}
                onClick={handleInsert}
                disabled={!selectedNode}
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
