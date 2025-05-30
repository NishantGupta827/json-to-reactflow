import {
  Handle,
  NodeProps,
  Position,
  NodeToolbar,
  useReactFlow,
} from "@xyflow/react";
import NodeInputsRenderer, { type InputField } from "./NodeInputsRenderer";
import { useCallback, useEffect, useRef, useState } from "react";
import * as LucideIcons from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading, Paragraph, Button } from "@contentstack/venus-components";
import { Play } from "lucide-react";
import { NodeStatusIndicator } from "@/components/node-status-indicator";

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

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  };

  const handleChange = (name: string, value: any) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));
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

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      // Helper to recursively trigger next nodes
      const triggerNextNode = (sourceId: string) => {
        const nextEdges = getEdges().filter((edge) => edge.source === sourceId);

        for (const edge of nextEdges) {
          const targetId = edge.target;

          // Set next node to loading
          setNodes((nodes) =>
            nodes.map((node) =>
              node.id === targetId
                ? { ...node, data: { ...node.data, status: "loading" } }
                : node
            )
          );

          // After 4 seconds, mark it as success and trigger its children
          setTimeout(() => {
            setNodes((nodes) =>
              nodes.map((node) =>
                node.id === targetId
                  ? { ...node, data: { ...node.data, status: "success" } }
                  : node
              )
            );

            // Recursively trigger next
            triggerNextNode(targetId);
          }, 4000);
        }
      };

      // Step 1: Set current node to "loading"
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, status: "loading" } }
            : node
        )
      );

      // Step 2: After 4 seconds, set to "success" and trigger next nodes
      setTimeout(() => {
        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === id
              ? { ...node, data: { ...node.data, status: "success" } }
              : node
          )
        );

        // Start propagating to connected nodes
        triggerNextNode(id);
      }, 4000);
    },
    [id, getEdges, setNodes]
  );

  const handleDelete = () => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#fff",
              padding: "8px",
              borderRadius: "12px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
            className="roboto-font"
          >
            <Button
              buttonType="secondary"
              icon="Copy"
              size="small"
              onClick={handleCopy}
              // version="v2"
            >
              Copy
            </Button>
            <Button
              buttonType="secondary"
              icon="Download"
              size="small"
              onClick={handleDownload}
            >
              Download
            </Button>
            <Button
              buttonType="secondary"
              icon="Edit"
              size="small"
              onClick={() => console.log("Edit mode toggle")}
            >
              Edit
            </Button>
            <Button
              buttonType="secondary"
              icon="Delete"
              size="small"
              onClick={handleDelete}
              className="text-red-600"
            >
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
          style={{
            position: "relative",
            width: "320px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            padding: "10px",
            backgroundColor: "white",
          }}
        >
          <CardHeader
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between", // Push play icon to the right
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <IconComponent
                style={{ width: 20, height: 20, color: "#2563eb" }}
              />
              <Heading tagName="h2" text={display_name as string} />
            </div>

            {/* Play icon button */}
            <button
              onMouseDown={(e: { stopPropagation: () => any }) =>
                e.stopPropagation()
              }
              onClick={handleClick}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 4,
                borderRadius: "6px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              title="Run Node"
            >
              <Play style={{ width: 16, height: 16, color: "#6b5ce7" }} />
            </button>
          </CardHeader>

          <CardContent style={{ marginTop: "-16px" }}>
            {(description as string) && (
              // <p
              //   style={{
              //     marginBottom: "12px",
              //     fontSize: "12px",
              //     color: "#6b7280",
              //   }}
              // >
              //   {description as string}
              // </p>
              <Paragraph
                tagName="p"
                text={description as string}
                variant="p3"
                variantStyle="regular"
              />
            )}

            <Separator />

            <div
              ref={(el) => {
                if (el) {
                  inputRefs.current = Array.from(
                    el.querySelectorAll(".venus-component")
                  ) as HTMLDivElement[];
                }
              }}
              style={{ marginTop: "8px" }}
            >
              <NodeInputsRenderer
                inputs={inputs as InputField[]}
                values={inputValues}
                onChange={handleChange}
                nodeId={data.id as string}
              />
            </div>

            {(outputs as Output[]).length > 0 && (
              <>
                <Separator />
                <div
                  style={{
                    // Tailwind's gray-50 equivalent
                    borderRadius: "8px",
                    padding: "8px",
                    marginTop: "8px",
                  }}
                >
                  {(outputs as Output[]).map((output, index) => (
                    <div
                      key={output.name}
                      ref={(el) => {
                        outputRefs.current[index] = el;
                      }}
                      style={{
                        backgroundColor: "#f9fafb",
                        fontSize: "12px",
                        height: "20px",
                        marginBottom: "6px",
                        paddingRight: "4px",
                        textAlign: "right",
                        padding: "16px",
                        display: "flex", // <-- Add
                        alignItems: "center", // <-- Add (vertical centering)
                        justifyContent: "flex-end",
                      }}
                    >
                      {output.name}
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>

          {/* Output Handles */}
          {(outputs as Output[]).map((output, idx) => (
            <Handle
              key={`output-${output.name}`}
              type="source"
              position={Position.Right}
              id={`output-${output.name}`}
              style={{
                position: "absolute",
                top: outputHandlePositions[idx]
                  ? outputHandlePositions[idx] - 4
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
    </>
  );
}
