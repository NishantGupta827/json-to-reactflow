// AgentNode.tsx
import {
  Handle,
  NodeProps,
  Position,
  NodeToolbar,
  useReactFlow,
} from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Download,
  Copy,
  Edit,
  Play,
  Zap,
  Settings,
  Code2,
} from "lucide-react";
import { NodeStatusIndicator } from "@/components/node-status-indicator";
import { NodeEditDialog } from "./NodeEditDialog";

interface AgentNodeData {
  title: string;
  description?: string;
  model?: string;
  temperature?: number;
  automations?: string[];
  tools?: string[];
  abilities?: string[];
  status?: "initial" | "loading" | "success" | "error";
  color?: string;
}

export default function AgentNode({ data, id, selected }: NodeProps) {
  const { setNodes, getEdges } = useReactFlow();
  const [editOpen, setEditOpen] = useState(false);

  const inputsListRef = useRef<HTMLUListElement>(null);
  const outputsListRef = useRef<HTMLUListElement>(null);

  const [inputHandleTops, setInputHandleTops] = useState<number[]>([]);
  const [outputHandleTops, setOutputHandleTops] = useState<number[]>([]);

  useEffect(() => {
    const updatePositions = () => {
      if (!inputsListRef.current || !outputsListRef.current) return;

      const nodeContainer = inputsListRef.current.closest(
        ".react-flow__node"
      ) as HTMLElement;
      if (!nodeContainer) return;

      const inputTops = Array.from(inputsListRef.current.children).map((li) => {
        const liRect = li.getBoundingClientRect();
        const containerRect = nodeContainer.getBoundingClientRect();
        return liRect.top - containerRect.top + liRect.height / 2;
      });

      const outputTops = Array.from(outputsListRef.current.children).map(
        (li) => {
          const liRect = li.getBoundingClientRect();
          const containerRect = nodeContainer.getBoundingClientRect();
          return liRect.top - containerRect.top + liRect.height / 2;
        }
      );

      setInputHandleTops(inputTops);
      setOutputHandleTops(outputTops);
    };

    updatePositions();

    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [data.inputs, data.outputs]);

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((n) => n.id !== id));
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.display_name || id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  };

  const revealNode = (nodeId: string) => {
    console.log("revealing node", nodeId);
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === nodeId ? { ...node, hidden: false } : node
      )
    );
  };

  const runNode = async () => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, status: "loading" } }
          : node
      )
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, status: "success" } }
          : node
      )
    );
  };

  return (
    <>
      {selected && (
        <NodeToolbar position={Position.Top}>
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow text-xs">
            <Button onClick={handleCopy} variant="ghost" size="sm">
              <Copy className="w-3.5 h-3.5 mr-1" />
              Copy
            </Button>
            <Button onClick={handleDownload} variant="ghost" size="sm">
              <Download className="w-3.5 h-3.5 mr-1" />
              Download
            </Button>
            <Button onClick={() => setEditOpen(true)} variant="ghost" size="sm">
              <Edit className="w-3.5 h-3.5 mr-1" />
              Edit
            </Button>
            <Button onClick={handleDelete} variant="destructive" size="sm">
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              Delete
            </Button>
          </div>
        </NodeToolbar>
      )}

      <NodeStatusIndicator
        status={
          data.status as "loading" | "success" | "initial" | "error" | undefined
        }
      >
        <Card className="w-[320px] shadow border">
          <CardHeader
            className={`flex flex-col gap-2 py-2 rounded-t-xl`}
            style={{ backgroundColor: data.color as string }}
          >
            <div className={`w-full`}>
              <h2 className="text-lg font-semibold text-white">
                {data.title as string}
              </h2>
              {/* <Button
                variant="ghost"
                size="sm"
                title="Run Node"
                onClick={runNode}
              >
                <Play className="w-4 h-4 text-indigo-600" />
              </Button> */}
            </div>

            {/* <div className="text-xs text-muted-foreground flex flex-col gap-1">
              <div>
                <span className="font-medium">Model:</span> {(data as AgentNodeData).model}
              </div>
              <div>
                <span className="font-medium">Temperature:</span> {(data as AgentNodeData).temperature}
              </div>
            </div> */}
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {data.description as string}
            </p>

            {[
              {
                title: "Automations",
                icon: <Zap className="w-4 h-4 text-yellow-500" />,
                items: data.automations as any[],
              },
              {
                title: "Tools",
                icon: <Settings className="w-4 h-4 text-blue-500" />,
                items: data.tools as any[],
              },
              {
                title: "Abilities",
                icon: <Code2 className="w-4 h-4 text-green-500" />,
                items: data.abilities as any[],
              },
            ].map(({ title, icon, items }) => (
              <div key={title}>
                <h3 className="text-sm font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    {icon}
                    {title}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {items?.length || 0}
                  </span>
                </h3>
                {items && items.length > 0 && (
                  <div className="space-y-1">
                    {items.map((item) => (
                      <div
                        key={item.label}
                        className="w-full text-left bg-muted hover:bg-muted/80 text-sm rounded px-2 py-1 transition truncate z-[1000]"
                        onClick={() => revealNode(item.id)}
                      >
                        {item.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>

          <div className="border-t border-muted py-3 px-4 flex justify-between gap-4">
            <div className="flex-1">
              <h4 className="text-xs font-semibold mb-1 text-muted-foreground">
                Inputs ({(data.inputs as string[])?.length || 0})
              </h4>
              <ul
                ref={inputsListRef}
                className="space-y-1 text-sm"
                style={{ maxHeight: 100, overflowY: "auto" }}
              >
                {(data.inputs as string[])?.length ? (
                  (data.inputs as string[]).map((input) => (
                    <li
                      key={input}
                      className="bg-muted rounded px-2 py-1 truncate"
                      title={input}
                    >
                      {input}
                    </li>
                  ))
                ) : (
                  <li className="text-muted-foreground">No inputs</li>
                )}
              </ul>
            </div>

            <div className="flex-1">
              <h4 className="text-xs font-semibold mb-1 text-muted-foreground">
                Outputs ({(data.outputs as string[])?.length || 0})
              </h4>
              <ul
                ref={outputsListRef}
                className="space-y-1 text-sm"
                style={{ maxHeight: 100, overflowY: "auto" }}
              >
                {(data.outputs as string[])?.length ? (
                  (data.outputs as string[]).map((output) => (
                    <li
                      key={output}
                      className="bg-muted rounded px-2 py-1 truncate"
                      title={output}
                    >
                      {output}
                    </li>
                  ))
                ) : (
                  <li className="text-muted-foreground">No outputs</li>
                )}
              </ul>
            </div>
          </div>
        </Card>
      </NodeStatusIndicator>

      {(data.inputs as string[])?.map((inputName, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={`input-${inputName}`}
          style={{
            top: inputHandleTops[index] || 0,
            background: "#6b7280",
            width: 10,
            height: 10,
            borderRadius: "50%",
            position: "absolute",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        />
      ))}

      {(data.outputs as string[])?.map((outputName, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={`output-${outputName}`}
          style={{
            top: outputHandleTops[index] || 0,
            background: "#3b82f6",
            width: 10,
            height: 10,
            borderRadius: "50%",
            position: "absolute",
            transform: "translateX(50%) translateY(-50%)",
          }}
        />
      ))}

      {/* <NodeEditDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        data={data}
        onSave={(updatedData) => {
          setNodes((nodes) =>
            nodes.map((node) =>
              node.id === id ? { ...node, data: updatedData } : node
            )
          );
        }}
      /> */}
    </>
  );
}
