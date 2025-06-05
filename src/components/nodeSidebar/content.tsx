import { Code, Plus, Settings, Trash, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { JSX, useEffect, useState } from "react";
import { Node } from "@xyflow/react";

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

type SidebarContentProps = {
  curr: Node;
  setCurr: React.Dispatch<React.SetStateAction<Node | null>>;
};

export function SideBarContent({ curr, setCurr }: SidebarContentProps) {
  const [myMap, setMyMap] = useState<Map<string, []>>(
    new Map([
      ["General", curr.data.automations as []],
      ["Automations", curr.data.automations as []],
      ["Tools", curr.data.tools as []],
      ["Abilities", curr.data.abilities as []],
    ])
  );

  useEffect(
    () =>
      setCurr((prev) => ({
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

  const [active, setActive] = useState("General");

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className="py-2 px-3 text-sm text-muted-foreground"
          onClick={() => setActive("General")}
        >
          General
        </button>
        <button
          className="py-2 px-3 text-sm text-muted-foreground"
          onClick={() => setActive("Automations")}
        >
          Automations
        </button>
        <button
          className="py-2 px-3 text-sm text-muted-foreground"
          onClick={() => setActive("Tools")}
        >
          Tools
        </button>
        <button
          className="py-2 px-3 text-sm text-muted-foreground"
          onClick={() => setActive("Abilities")}
        >
          Abilities
        </button>
      </div>
      <GenericContent
        data={myMap.get(active) as []}
        name={active}
        addition={updateMap}
      />
    </div>
  );
}
