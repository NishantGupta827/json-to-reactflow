import { SquarePlus } from "lucide-react";
import { JSX, useEffect, useRef, useState } from "react";
import * as LucideIcons from "lucide-react";
import SearchableMenu from "./SearchMenu";
import { useReactFlow } from "@xyflow/react";

type subcomponentProps = {
  icon: string;
  text: string;
  bottom: boolean;
  type: string;
  style: React.CSSProperties;
  handleClick: (arg0: string) => void;
};

const nodeOptionsJson: Record<string, Record<string, any>> = {
  tools: {
    "API Client": {
      title: "API Client",
      description: "Tool for making API requests.",
      inputs: ["url", "method", "headers", "payload"],
      outputs: ["responseData"],
    },
    "Header Manager": {
      title: "Header Manager",
      description: "Manages API request headers.",
      inputs: ["baseHeaders", "authToken"],
      outputs: ["preparedHeaders"],
    },
    "Data Cleaner": {
      title: "Data Cleaner",
      description: "Cleans and formats raw data.",
      inputs: ["rawData"],
      outputs: ["cleanData"],
    },
    Logger: {
      title: "Logger",
      description: "Logs events or messages.",
      inputs: ["message"],
      outputs: ["logId"],
    },
    "Data Merger": {
      title: "Data Merger",
      description: "Combines multiple data sources.",
      inputs: ["sourceA", "sourceB"],
      outputs: ["mergedResult"],
    },
    "JSON Parser": {
      title: "JSON Parser",
      description: "Parses JSON strings into objects.",
      inputs: ["jsonString"],
      outputs: ["jsonObject"],
    },
  },
  agents: {
    "AI Helper": {
      title: "AI Helper",
      description: "Handles AI decision-making.",
      inputs: ["prompt"],
      outputs: ["response"],
    },
    "Scheduler Agent": {
      title: "Scheduler Agent",
      description: "Schedules tasks based on time or event.",
      inputs: ["task", "schedule"],
      outputs: ["scheduleId"],
    },
    "Summarizer Agent": {
      title: "Summarizer Agent",
      description: "Summarizes long form content.",
      inputs: ["text"],
      outputs: ["summary"],
    },
    "Translator Agent": {
      title: "Translator Agent",
      description: "Translates text between languages.",
      inputs: ["text", "targetLang"],
      outputs: ["translatedText"],
    },
    "Research Agent": {
      title: "Research Agent",
      description: "Fetches and analyzes external content.",
      inputs: ["query"],
      outputs: ["insights"],
    },
  },
  automations: {
    "HTTP Request": {
      title: "HTTP Request",
      description: "Handles outgoing HTTP requests.",
      inputs: ["url", "method", "headers"],
      outputs: ["response"],
    },
    "Retry on Failure": {
      title: "Retry on Failure",
      description: "Retries a failed request automatically.",
      inputs: ["request", "retries"],
      outputs: ["finalResponse"],
    },
    "Email Automation": {
      title: "Email Automation",
      description: "Sends automated emails.",
      inputs: ["recipient", "subject", "body"],
      outputs: ["status"],
    },
    "Delay Step": {
      title: "Delay Step",
      description: "Waits for a specified duration.",
      inputs: ["duration"],
      outputs: ["nextTrigger"],
    },
    "Conditional Logic": {
      title: "Conditional Logic",
      description: "Routes based on true/false condition.",
      inputs: ["condition"],
      outputs: ["truePath", "falsePath"],
    },
    "Loop Automation": {
      title: "Loop Automation",
      description: "Repeats a step for each item in a list.",
      inputs: ["items", "action"],
      outputs: ["results"],
    },
  },
};

const icons: Record<string, JSX.Element> = {
  bot: <LucideIcons.Bot strokeWidth={1} />,
  wrench: <LucideIcons.Wrench strokeWidth={1} />,
  branch: <LucideIcons.GitBranch strokeWidth={1} />,
};

function SubComponent({
  icon,
  text,
  bottom,
  type,
  handleClick,
  style,
}: subcomponentProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: bottom ? "0px" : "8px",
        padding: "5px",
        border: "solid 1px transparent",
        userSelect: "none",
        ...style,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        handleClick(type);
      }}
    >
      <div style={{ flex: "1" }}>{icons[icon]}</div>
      <div style={{ flex: "3", textAlign: "center" }}>
        <span>{text}</span>
      </div>
      <div style={{ flex: "1", textAlign: "right", cursor: "pointer" }}>
        <LucideIcons.ChevronRight strokeWidth={1} />
      </div>
    </div>
  );
}

type controlAddButtonProps = {
  addMenuFocus: boolean;
  setAddMenuFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ControlAddButton({
  addMenuFocus,
  setAddMenuFocus,
}: controlAddButtonProps) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [option, setOption] = useState<
    {
      label: string;
      value: any;
    }[]
  >([]);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [type, setType] = useState("");

  const { addNodes, getNodes, getViewport } = useReactFlow();

  const handleClick = () => {
    setOpen(true);
    setAddMenuFocus(true);
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
        setOpenSub(false);
        setAddMenuFocus(false);
        setType("");
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  useEffect(() => {
    if (!addMenuFocus) {
      setType("");
      setOpen(false);
      setOpenSub(false);
    }
  }, [addMenuFocus]);

  useEffect(() => {
    const temp = nodeOptionsJson[type];
    if (!temp) {
      return;
    }

    const options = Object.entries(temp).map(([key, value]) => ({
      label: key,
      value: value,
    }));

    setOption(options);
  }, [type]);

  const handleSubComponentClick = (ele: string) => {
    console.log("clicked");
    setType(ele);
    setOpenSub(true);
  };

  const searchMenuClick = (ele: { label: string; value: any }) => {
    const viewport = getViewport();
    const nodes = getNodes();
    const baseId = ele.label.toLowerCase().replace(/\s+/g, "_");
    const existingIds = nodes.map((n) => n.id);
    let newId = baseId;
    let counter = 1;
    while (existingIds.includes(newId)) {
      newId = `${baseId}_${counter++}`;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    const centerX = (width / 2 - viewport.x) / viewport.zoom;
    const centerY = (height / 2 - viewport.y) / viewport.zoom;

    const position = { x: centerX, y: centerY };

    const payload = {
      id: newId,
      position,
      data: {
        ...ele.value,
        isIsland: false,
      },
      type: "custom",
    };

    addNodes(payload);
  };

  const [openSub, setOpenSub] = useState(false);

  return (
    <div>
      <div
        ref={menuRef}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          cursor: "pointer",
          backgroundColor: open && addMenuFocus ? "#f0f1fb" : hovered ? "#f3f4f6" : "#ffffff",
          transition: "background-color 0.2s ease",
        }}
      >
        <SquarePlus strokeWidth={1} fill="#ffffff" />
      </div>

      {open && addMenuFocus && (
        <>
          <div
            style={{
              position: "fixed",
              bottom: "55px",
              left: "-145px",
              width: "175px",
              backgroundColor: "white",
              border: "1px solid #ccc",
              padding: "8px",
              borderRadius: "6px",
              boxShadow: "rgba(0, 0, 0, 0.15) 2px 2px 6px",
              zIndex: 3000,
            }}
          >
            <SubComponent
              icon={"bot"}
              text={"AI agent"}
              type="agents"
              bottom={false}
              style={
                type == "agents"
                  ? {
                      color: "#5D50BF",
                      backgroundColor: "#6C5CE70D",
                      borderColor: "#5D50BF",
                    }
                  : {
                      borderColor: "transparent",
                    }
              }
              handleClick={handleSubComponentClick}
            />
            <SubComponent
              icon={"branch"}
              text={"Automation"}
              bottom={false}
              type="automations"
              style={
                type == "automations"
                  ? {
                      color: "#5D50BF",
                      backgroundColor: "#6C5CE70D",
                      borderColor: "#5D50BF",
                    }
                  : {
                      borderColor: "transparent",
                    }
              }
              handleClick={handleSubComponentClick}
            />
            <SubComponent
              icon={"wrench"}
              text={"Tool"}
              bottom={true}
              type={"tools"}
              style={
                type == "tools"
                  ? {
                      color: "#5D50BF",
                      backgroundColor: "#6C5CE70D",
                      borderColor: "#5D50BF",
                    }
                  : {
                      borderColor: "transparent",
                    }
              }
              handleClick={handleSubComponentClick}
            />
          </div>

          {openSub && (
            <div
              style={{
                position: "fixed",
                left: "40px",
                bottom: "50px",
                padding: "8px",
                borderRadius: "6px",
                zIndex: 2000,
                border: "1px",
              }}
            >
              <SearchableMenu options={option} onSelect={searchMenuClick} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
