import {
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
  ControlButton,
} from "@xyflow/react";
import { toPng } from "html-to-image";
import DownloadIcon from './../../assets/download.png'

function downloadImage(dataUrl: string) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton() {
  const { getNodes } = useReactFlow();
  const onClick = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
      0
    );

    const viewportEl = document.querySelector(".react-flow__viewport");

    if (viewportEl instanceof HTMLElement) {
      toPng(viewportEl, {
        backgroundColor: "#FFFFFF",
        width: imageWidth,
        height: imageHeight,
        style: {
          width: imageWidth as unknown as string,
          height: imageHeight as unknown as string,
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
      }).then(downloadImage);
    } else {
      console.error("Could not find .react-flow__viewport element to capture.");
    }
  };

  return (
    <ControlButton>
      <img
        src={DownloadIcon}
        alt="download icon"
        onClick={onClick}
        width="16px"
        height="16px"
      />
    </ControlButton>
  );
}

export default DownloadButton;
