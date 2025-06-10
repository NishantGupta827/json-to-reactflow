import {
  Handle,
  NodeProps,
  Position,
  useNodesState,
  useReactFlow,
  useStore,
  type Node,
  useUpdateNodeInternals,
} from "@xyflow/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { NodeStatusIndicator } from "@/components/node-status-indicator";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { cn } from "@/lib/utils";

// interface AgentNodeData {
//   title: string;
//   description?: string;
//   icon?: keyof typeof LucideIcons;
//   model?: string;
//   temperature?: number;
//   automations?: { id: string; label: string; node: Node }[];
//   tools?: { id: string; label: string; node: Node }[];
//   abilities?: { id: string; label: string; node: Node }[];
//   inputs?: string[];
//   outputs?: string[];
//   status?: "initial" | "loading" | "success" | "error";
//   color?: string;
// }

export default function AgentNode({ data, id }: NodeProps) {
  const { setNodes, screenToFlowPosition, getNodes } = useReactFlow();
  const [expanded, setExpanded] = useState(false);

  const inputsListRef = useRef<HTMLUListElement>(null);
  const outputsListRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const zoom = useStore((s) => s.transform[2]);

  const [inputHandleTops, setInputHandleTops] = useState<number[]>([]);
  const [outputHandleTops, setOutputHandleTops] = useState<number[]>([]);

  const updateNodeInternals = useUpdateNodeInternals();

  const updateHandlePositions = useCallback(() => {
    if (expanded && inputsListRef.current && outputsListRef.current) {
      const nodeEl = inputsListRef.current.closest(
        ".react-flow__node"
      ) as HTMLElement;
      if (!nodeEl) return;

      const getHandleTops = (ref: React.RefObject<HTMLUListElement>) =>
        Array.from(ref.current?.children ?? []).map((li) => {
          const liRect = (li as HTMLElement).getBoundingClientRect();
          const containerRect = nodeEl.getBoundingClientRect();
          return (liRect.top - containerRect.top + liRect.height / 2) / zoom;
        });

      setInputHandleTops(
        getHandleTops(inputsListRef as React.RefObject<HTMLUListElement>)
      );

      setOutputHandleTops(
        getHandleTops(outputsListRef as React.RefObject<HTMLUListElement>)
      );
    } else {
      setInputHandleTops([60]);
      setOutputHandleTops([60]);
    }
    updateNodeInternals(id);
  }, [expanded, zoom, id, updateNodeInternals]);
  useEffect(() => {
    updateHandlePositions();
  }, [expanded, data.inputs, data.outputs, updateHandlePositions]);

  useLayoutEffect(() => {
    if (expanded) {
      updateHandlePositions();
    }
  }, [zoom]);

  const revealNode = (
    nodeId: string,
    nodeToAdd: Node,
    screenPos?: { x: number; y: number }
  ) => {
    setNodes((nodes) => {
      const existing = nodes.find((n) => n.id === nodeId);
      if (existing) {
        return nodes.map((n) =>
          n.id === nodeId ? { ...n, hidden: false } : n
        );
      }

      let position = nodeToAdd.position;
      if (screenPos && screenToFlowPosition) {
        position = screenToFlowPosition(screenPos);
      } else {
        const current = nodes.find((n) => n.id === id);
        position = position || {
          x: current?.position.x ?? 0 + 300,
          y: current?.position.y ?? 0,
        };
      }

      return [
        ...nodes,
        {
          ...nodeToAdd,
          position,
          type: "custom",
          hidden: false,
        },
      ];
    });
  };

  let IconComponent: ForwardRefExoticComponent<
    LucideProps & RefAttributes<SVGSVGElement>
  >;

  if (
    data.icon &&
    typeof data.icon === "string" &&
    LucideIcons[data.icon as keyof typeof LucideIcons]
  ) {
    IconComponent = LucideIcons[
      data.icon as keyof typeof LucideIcons
    ] as ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>;
  } else {
    IconComponent = LucideIcons.Zap;
  }

  return (
    <>
      <NodeStatusIndicator
        status={
          data.status as "loading" | "success" | "initial" | "error" | undefined
        }
      >
        <div ref={containerRef} className="relative">
          <Card className="w-[320px] border shadow">
            <CardHeader
              className={cn(
                "flex items-start justify-between py-2 px-4 rounded-t-xl",
                expanded ? "" : "bg-white"
              )}
              style={
                expanded
                  ? { backgroundColor: (data.color as string) ?? "#ffe082" }
                  : {}
              }
            >
              <div className="flex items-start gap-3 cursor-pointer">
                <IconComponent
                  className="w-5 h-5 text-muted-foreground mt-0.5"
                  size={20}
                  onClick={() => setExpanded(!expanded)}
                />
                <div className="flex flex-col">
                  <h2 className="text-base font-semibold">
                    {data.title as string}
                  </h2>
                  <p
                    className={`text-sm ${
                      expanded ? "text-black" : "text-muted-foreground"
                    }`}
                  >
                    {data.description as string}
                  </p>
                </div>
              </div>
              <button onClick={() => setExpanded(!expanded)} title="Toggle">
                <LucideIcons.ChevronRight
                  className={cn("w-4 h-4 mt-1 transition-transform", {
                    "rotate-90": expanded,
                  })}
                />
              </button>
            </CardHeader>

            {expanded && (
              <CardContent className="space-y-4 px-4 pt-2 pb-4">
                {["automations", "tools", "abilities"].map((key) => {
                  const items = (data as any)[key] as {
                    id: string;
                    label: string;
                    node: Node;
                  }[];
                  const title = key[0].toUpperCase() + key.slice(1);
                  const iconMap = {
                    automations: (
                      <LucideIcons.Zap className="w-4 h-4 text-yellow-500" />
                    ),
                    tools: (
                      <LucideIcons.Settings className="w-4 h-4 text-blue-500" />
                    ),
                    abilities: (
                      <LucideIcons.Code2 className="w-4 h-4 text-green-500" />
                    ),
                  };
                  return (
                    <div key={key}>
                      <h3 className="text-sm font-semibold flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          {iconMap[key as keyof typeof iconMap]} {title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {items?.length ?? 0}
                        </span>
                      </h3>
                      {items?.map((item) => (
                        <div
                          key={item.id}
                          className="bg-muted px-2 py-1 rounded text-sm cursor-pointer hover:bg-muted/80 truncate mb-1"
                          onClick={(e) =>
                            revealNode(item.node.id, item.node, {
                              x: e.clientX,
                              y: e.clientY,
                            })
                          }
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  );
                })}

                <div className="flex gap-4 border-t pt-3">
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-muted-foreground mb-1">
                      Inputs ({(data.inputs as string[])?.length || 0})
                    </h4>
                    <ul ref={inputsListRef} className="space-y-1 text-sm">
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
                    <h4 className="text-xs font-semibold text-muted-foreground mb-1">
                      Outputs ({(data.outputs as string)?.length || 0})
                    </h4>
                    <ul ref={outputsListRef} className="space-y-1 text-sm">
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
              </CardContent>
            )}
          </Card>
        </div>
      </NodeStatusIndicator>

      {(expanded
        ? (data.inputs as string[])
        : [(data.inputs as string[])[0]]
      ).map((inputName, index) =>
        inputName ? (
          <Handle
            key={`input-${index}`}
            type="target"
            position={Position.Left}
            id={`input-${inputName}`}
            style={{
              top: inputHandleTops[index] ?? 60,
              background: "#6b7280",
              width: 10,
              height: 10,
              borderRadius: "50%",
              position: "absolute",
              transform: "translateX(-50%) translateY(-50%)",
            }}
          />
        ) : null
      )}

      {(expanded
        ? (data.outputs as string[])
        : [(data.outputs as string[])[0]]
      ).map((outputName, index) =>
        outputName ? (
          <Handle
            key={`output-${index}`}
            type="source"
            position={Position.Right}
            id={`output-${outputName}`}
            style={{
              top: outputHandleTops[index] ?? 60,
              background: "#3b82f6",
              width: 10,
              height: 10,
              borderRadius: "50%",
              position: "absolute",
              transform: "translateX(50%) translateY(-50%)",
            }}
          />
        ) : null
      )}
    </>
  );
}
