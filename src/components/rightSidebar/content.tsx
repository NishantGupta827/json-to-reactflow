import {
  ArrowRight,
  Code,
  MessageSquare,
  Plus,
  Settings,
  Trash,
  Zap,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { JSX, useEffect, useState } from "react";
import { Edge, Node } from "@xyflow/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";
import { cn } from "@/lib/utils";

type genericContentProps = {
  data: any[];
  name: string;
  addition: (key: string, value: []) => void;
};

const sideBarIcons: { [key: string]: JSX.Element } = {
  Automations: <Zap className="size-4 text-amber-500" />,
  Tools: <Settings className="size-4 text-blue-500" />,
  Abilities: <Code className="size-4 text-green-500" />,
};

export function GenericContent({ data, name, addition }: genericContentProps) {
  const [arr, setArr] = useState(data);
  useEffect(() => setArr(data), [data]);
  useEffect(() => addition(name, arr as []), [arr]);
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium flex items-center gap-1.5">
          {sideBarIcons[name]}
          {name}
        </h4>
      </div>

      <div className="space-y-2 mb-4">
        {arr.map((element, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-100"
          >
            <span className="text-sm">{element.label}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => {
                setArr(() =>
                  arr.filter((item) => item.label !== element.label)
                );
              }}
            >
              <Trash className="size-3.5 text-red-500" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Input placeholder={`Add ${name}...`} className="text-sm" />
        <Button className="whitespace-nowrap">
          {/* onClick={() => setArr(...arr,)}> how does adding work actually?? */}
          <Plus className="size-4 mr-1" /> Add
        </Button>
      </div>
    </div>
  );
}

type generalContentProps = {
  data: any;
};

export function GeneralContent({ data }: generalContentProps) {
  const [randomness, setRandomness] = useState(data.randomness);
  const [background, setBackground] = useState(data.background);
  const [instruction, setInstruction] = useState(data.instruction);
  const [output, setOutput] = useState(data.output);
  const [provider, setProvider] = useState(data.provider);
  const [model, setModel] = useState(data.model);

  const options = data.provider_options;
  console.log(data);

  if (data.component != "agent") {
    return <div>Nothing to show here</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-2">
          Define the AI agent instructions, then create a workflow using Tools.
        </p>
      </div>

      {/* Provider & Model Section */}
      <div className="p-3 border rounded-md mb-4 bg-gray-50">
        <h4 className="font-medium mb-3 flex items-center">
          Model Configuration
        </h4>

        <div className="mb-4">
          <label className="block text-sm mb-1">Model Provider</label>
          <Select
            onValueChange={(e) => {
              data.provider = e;
              setProvider(e);
            }}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  data.provider_options.filter(
                    (opt) => opt.value == provider
                  )[0].label
                }
              />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectGroup> */}
              {options.map((item, index) => (
                <SelectItem value={item.value} key={index}>
                  {item.label}
                </SelectItem>
              ))}
              {/* </SelectGroup> */}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Model</label>
          <Select
            onValueChange={(e) => {
              console.log(e);
              data.model = e;
              setModel(e);
            }}
            key={provider}
          >
            <SelectTrigger>
              {data.model_options[provider].some(
                (opt) => opt.value === model
              ) && <SelectValue placeholder={model} />}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data.provider_options &&
                  data.model_options[provider].map((ele, id) => (
                    <SelectItem value={ele.value} key={id}>
                      {ele.label}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/*Agent Behaviour*/}
      <div className="p-3 border rounded-md mb-4 bg-gray-50">
        <h4 className="font-medium mb-3 flex items-center">Agent Behaviour</h4>
        <div className="mb-4">
          <label className="block text-sm mb-1">Background</label>
          <Textarea
            value={background}
            onChange={(e) => {
              setBackground(e.target.value);
              data.background = e.target.value;
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Instruction</label>
          <Textarea
            value={instruction}
            onChange={(e) => {
              setInstruction(e.target.value);
              data.instruction = e.target.value;
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Output Format</label>
          <Textarea
            value={output}
            onChange={(e) => {
              setOutput(e.target.value);
              data.output = e.target.value;
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Randomness</label>
          <Slider
            defaultValue={[data.randomness]}
            onValueChange={(e) => {
              setRandomness(e);
              data.randomness = e;
            }}
            max={2}
            step={0.2}
            className={cn("w-[60%]")}
          />
          <div key={randomness}>{randomness}</div>
        </div>
      </div>
    </div>
  );
}

type nodeSidebarContentProps = {
  currNode: Node;
  setCurrNode: React.Dispatch<React.SetStateAction<Node | null>>;
};

export function NodeSideBarContent({
  currNode,
  setCurrNode,
}: nodeSidebarContentProps) {
  const [myMap, setMyMap] = useState<Map<string, []>>(
    new Map([
      //["General", currNode.data.inputs as []],
      ["Automations", currNode.data.automations as []],
      ["Tools", currNode.data.tools as []],
      ["Abilities", currNode.data.abilities as []],
    ])
  );

  useEffect(
    () =>
      setCurrNode((prev) => ({
        ...prev!,
        data: {
          ...prev!.data,
          automations: myMap.get("Automations"),
          tools: myMap.get("Tools"),
          abilities: myMap.get("Abilities"),
        },
      })),
    [myMap]
  );

  const updateMap = (key: string, value: []) => {
    setMyMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(key, value);
      return newMap;
    });
  };

  const [active, setActive] = useState(
    currNode.data.component == "agent" ? "General" : "Automations"
  );

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="flex border-b border-gray-200 mb-4">
        {currNode.data.component == "agent" && (
          <button
            className="py-2 px-3 text-sm text-muted-foreground"
            onClick={() => setActive("General")}
          >
            General
          </button>
        )}
        <button
          className="py-2 px-3 text-sm text-muted-foreground m-auto"
          onClick={() => setActive("Automations")}
        >
          Automations
        </button>
        <button
          className="py-2 px-3 text-sm text-muted-foreground m-auto"
          onClick={() => setActive("Tools")}
        >
          Tools
        </button>
        <button
          className="py-2 px-3 text-sm text-muted-foreground m-auto"
          onClick={() => setActive("Abilities")}
        >
          Abilities
        </button>
      </div>
      {myMap.get(active) ? (
        <GenericContent
          data={myMap.get(active) as []}
          name={active}
          addition={updateMap}
        />
      ) : (
        <GeneralContent data={currNode.data} />
      )}
    </div>
  );
}

type edgeSidebarContentProps = {
  currEdge: Edge;
  setCurrEdge: React.Dispatch<React.SetStateAction<Edge | null>>;
};

export function EdgeSideBarContent({ currEdge }: edgeSidebarContentProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-4">
          Configure this workflow connection and define what actions should be
          performed.
        </p>
      </div>

      <div className="p-3 border rounded-md mb-4 bg-gray-50">
        <h4 className="font-medium mb-3 flex items-center">
          <ArrowRight className="size-4 mr-2 text-purple-500" />
          Connection Details
        </h4>

        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type:</span>
            <span className="capitalize">{currEdge.type || "default"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Source:</span>
            <span>{currEdge.source}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Target:</span>
            <span>{currEdge.target}</span>
          </div>
        </div>
      </div>
      <div className="p-3 border rounded-md mb-4 bg-purple-50">
        <h4 className="font-medium mb-3 flex items-center">
          <MessageSquare className="size-4 mr-2 text-purple-500" />
          Workflow Step Configuration
        </h4>

        <div className="mb-4">
          <label className="block text-sm mb-1">Step Number</label>
          <Input
            readOnly
            type="number"
            min="1"
            max="100"
            value={currEdge!.data?.workflowStepNo as number}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Order of this step in the workflow
          </p>
        </div>
      </div>
    </div>
  );
}
