import { useReactFlow } from "@xyflow/react";

export function SideBarFooter() {
  const { setNodes, getNodes } = useReactFlow();

  const handleAddNode = () => {
    const newNode = {
      id: getNodes().length.toString(),
      type: "custom",
      position: { x: 400, y: 200 },
      data: {
        name: "custom_node",
        display_name: "Custom Component",
        description: "Use as a template to create your own custom component",
        inputs: [
          {
            name: "Input Value",
            label: "Input Value",
            type: "text",
            placeholder: "Hello World!",
            required: false,
            handlePresent: true,
          },
        ],
        outputs: [
          {
            name: "Output",
            type: "text",
            description: "Output description",
          },
        ],
      },
    };

    setNodes((nodes) => [...nodes, newNode]);
  };

  return (
    <div className="w-full p-4 bg-f9f9f9 border-t">
      <button
        className="w-full py-2 rounded hover:bg-gray-300"
        onClick={handleAddNode}
      >
        + Add Component
      </button>
    </div>
  );
}
