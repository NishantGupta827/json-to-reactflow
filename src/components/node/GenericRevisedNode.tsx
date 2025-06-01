import {
  Handle,
  NodeProps,
  Position,
  NodeToolbar,
  useReactFlow,
  useStore,
  useNodeConnections,
} from "@xyflow/react";
import NodeInputsRenderer, { type InputField } from "./NodeInputsRenderer";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as LucideIcons from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { NodeStatusIndicator } from "@/components/node-status-indicator";
import { NodeEditDialog } from "./NodeEditDialog";
import { Copy, Download, Edit, Trash2 } from "lucide-react";

interface Output {
  name: string;
  type: "data" | "text";
  description: string;
}

export default function RevisedCustomNode({ data, id, selected }: NodeProps) {
  const {
    display_name,
    display_icon,
    description,
    inputs = [],
    outputs = [],
  } = data;

  const [inputValues, setInputValues] = useState<Record<string, any>>({});
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { setNodes, getEdges } = useReactFlow();
  const [outputHandlePositions, setOutputHandlePositions] = useState<number[]>(
    []
  );
  const [editOpen, setEditOpen] = useState(false);
  const edges = useStore((store) => store.edges);

  const connectedInputs = useMemo(() => {
    return edges
      .filter((edge) => edge.target === id)
      .map((edge) => edge.targetHandle?.replace("input-", ""))
      .filter(Boolean) as string[];
  }, [edges, id]);

  useEffect(() => {
    const initialValues: Record<string, any> = {};
    (inputs as InputField[]).forEach((input: InputField) => {
      initialValues[input.name] = input.value ?? "";
    });
    setInputValues(initialValues);
  }, [inputs]);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  };

  const handleChange = (name: string, value: any) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));

    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id !== id) return node;

        const updatedInputs = (node.data.inputs as InputField[]).map(
          (input: InputField) =>
            input.name === name ? { ...input, value } : input
        );

        return {
          ...node,
          data: {
            ...node.data,
            inputs: updatedInputs,
          },
        };
      })
    );
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${display_name || id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getUpstreamExecutionOrder = (
    targetId: string,
    edges: any[],
    visited = new Set<string>()
  ): string[] => {
    if (visited.has(targetId)) return [];
    visited.add(targetId);

    const incomingEdges = edges.filter((edge) => edge.target === targetId);
    let ordered: string[] = [];

    for (const edge of incomingEdges) {
      ordered = [
        ...ordered,
        ...getUpstreamExecutionOrder(edge.source, edges, visited),
      ];
    }

    return [...ordered, targetId];
  };
  const runNodesInOrder = async (orderedNodeIds: string[]) => {
    for (const nodeId of orderedNodeIds) {
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, status: "loading" } }
            : node
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 4000));

      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, status: "success" } }
            : node
        )
      );
    }
  };
  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      const edges = getEdges();
      const orderedIds = getUpstreamExecutionOrder(id, edges);
      await runNodesInOrder(orderedIds);
    },
    [id, getEdges, setNodes]
  );

  const handleDelete = () => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
  };

  const allConnections = useNodeConnections();

  const connectionsCount = (id: string) => {
    return allConnections.filter((conn) => conn.sourceHandle === id).length;
  };

  const RawIcon = LucideIcons[display_icon as keyof typeof LucideIcons];
  const IconComponent =
    (RawIcon as React.FC<React.SVGProps<SVGSVGElement>>) || LucideIcons.Plug;

  useEffect(() => {
    const outputTops = outputRefs.current.map((ref) =>
      ref ? ref.offsetTop + ref.offsetHeight / 2 : 100
    );
    setOutputHandlePositions(outputTops);
  }, [inputs, outputs]);

  return (
    <>
      {selected && (
        <NodeToolbar position={Position.Top}>
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow text-xs">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-1 text-xs"
              onClick={handleCopy}
            >
              <Copy className="w-3.5 h-3.5 mr-1" />
              Copy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-1 text-xs"
              onClick={handleDownload}
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-1 text-xs"
              onClick={() => setEditOpen(true)}
            >
              <Edit className="w-3.5 h-3.5 mr-1" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="h-7 px-1 text-xs"
              onClick={handleDelete}
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              Delete
            </Button>
          </div>
        </NodeToolbar>
      )}
      <NodeStatusIndicator
        status={
          data.status as "initial" | "loading" | "success" | "error" | undefined
        }
      >
        <Card
          className={`relative w-[320px] border bg-white shadow -py-3 pt-3 ${
            selected ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <CardHeader className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <IconComponent className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold leading-none tracking-tight">
                {display_name as string}
              </h2>
            </div>

            <Button
              onMouseDown={(e) => e.stopPropagation()}
              onClick={handleClick}
              title="Run Node"
              variant="ghost"
            >
              <Play className="w-4 h-4 text-indigo-600" />
            </Button>
          </CardHeader>

          <CardContent className="-mt-4">
            {(description as string) && (
              <p className="text-sm text-muted-foreground mb-3">
                {description as string}
              </p>
            )}

            <div
              ref={(el) => {
                if (el) {
                  inputRefs.current = Array.from(
                    el.querySelectorAll(".venus-component")
                  ) as HTMLDivElement[];
                }
              }}
              className="mb-5"
            >
              <NodeInputsRenderer
                inputs={inputs as InputField[]}
                values={inputValues}
                onChange={handleChange}
                nodeId={data.id as string}
                connectedInputs={connectedInputs as string[]}
              />
            </div>

            {(outputs as Output[]).length > 0 && (
              <>
                <div className="rounded-md">
                  {(outputs as Output[]).map((output, index) => (
                    <>
                      <div
                        key={output.name}
                        ref={(el) => {
                          outputRefs.current[index] = el;
                        }}
                        className="bg-gray-50 text-xs h-5 pr-3 -mx-6 text-right py-4 flex items-center justify-end border-t-1 rounded-b-2xl"
                      >
                        {output.name}
                      </div>
                    </>
                  ))}
                </div>
              </>
            )}
          </CardContent>

          {(outputs as Output[]).map((output, idx) => (
            <Handle
              key={`output-${output.name}`}
              type="source"
              position={Position.Right}
              id={`output-${output.name}`}
              isConnectable={connectionsCount(`output-${output.name}`) < 1}
              style={{
                position: "absolute",
                top: outputHandlePositions[idx]
                  ? outputHandlePositions[idx]
                  : 100,
                background: "#10b981",
                width: 10,
                height: 10,
                borderRadius: "50%",
              }}
            />
          ))}
        </Card>
      </NodeStatusIndicator>
      <NodeEditDialog
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
      />
    </>
  );
}
