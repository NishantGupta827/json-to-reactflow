import {
  ControlButton,
  useReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import { useRef } from "react";

function downloadJSON(dataUrl: string) {
  const a = document.createElement("a");

  a.setAttribute("download", "import.json");
  a.href = dataUrl;
  a.click();
}

type ImportExport = {
  Node: Node[];
  Edge: Edge[];
};

export function Export() {
  const { getNodes, getEdges } = useReactFlow();

  const onClick = () => {
    const data: ImportExport = { Node: getNodes(), Edge: getEdges() };
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    downloadJSON(jsonString);
  };

  return (
    <ControlButton>
      <img
        src="./images/export.png"
        alt="download icon"
        onClick={onClick}
        width="16px"
        height="16px"
      />
    </ControlButton>
  );
}

export function Import() {
  const { addNodes, addEdges } = useReactFlow();
  const readJsonFile = (file: Blob) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        if (event.target) {
          resolve(JSON.parse(event.target.result as string));
        }
      };

      fileReader.onerror = (error) => reject(error);
      fileReader.readAsText(file);
    });

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const parsedData = (await readJsonFile(
        event.target.files[0]
      )) as ImportExport;
      addNodes(parsedData.Node);
      addEdges(parsedData.Edge);
      console.log(parsedData);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <ControlButton>
      <img
        src="./images/import.png"
        alt="download icon"
        onClick={handleIconClick}
        width="16px"
        height="16px"
      />
      <input
        type="file"
        accept=".json,application/json"
        ref={fileInputRef}
        onChange={onChange}
        style={{ display: "none" }}
      />
    </ControlButton>
  );
}
