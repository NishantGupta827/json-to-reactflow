import { Handle, NodeProps, Position } from "@xyflow/react";
import NodeInputsRenderer, { type InputField } from "./NodeInputsRenderer";
import { useEffect, useRef, useState } from "react";
import * as LucideIcons from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading, Paragraph } from "@contentstack/venus-components";

interface Output {
  name: string;
  type: "data" | "text";
  description: string;
}

export default function RevisedCustomNode({ data }: NodeProps) {
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
  const [inputHandlePositions, setInputHandlePositions] = useState<number[]>(
    []
  );
  const [outputHandlePositions, setOutputHandlePositions] = useState<number[]>(
    []
  );

  const handleChange = (name: string, value: any) => {
    setInputValues((prev) => ({ ...prev, [name]: value }));
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
          //   paddingBottom: "12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconComponent style={{ width: 20, height: 20, color: "#2563eb" }} />
        {/* <h3 style={{ fontSize: "14px", fontWeight: 600 }}>
          {display_name as string}
        </h3> */}
        <Heading tagName="h2" text={display_name as string} />
      </CardHeader>

      <CardContent style={{ marginTop: "-16px"}}>
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
          style={{marginTop: '8px'}}
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
            <div>
              {(outputs as Output[]).map((output, index) => (
                <div
                  key={output.name}
                  ref={(el) => {
                    outputRefs.current[index] = el;
                  }}
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginTop: "10px",
                    // backgroundColor:
                    height: "20px",
                    textAlign: "right",
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
  );
}
