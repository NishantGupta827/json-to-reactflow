import { useEffect, useRef, useState } from "react";
import { AgentConfig } from "@/types/agent";
import { SideBarHeader } from "./header";
import CustomSelect from "./select";
import { SideBarFooter } from "./footer";

export default function AgentStatus({ data }: { data: AgentConfig }) {
  const color = data.active ? "#0d6a37" : "#37404f";
  const label = data.active ? "Active" : "Inactive";

  return (
    <div className="space-y-4" style={{ margin: "10px" }}>
      {/* Agent Status */}
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2 m-auto">
          <span className="text-sm font-medium text-gray-700">Status</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "white",
              padding: "6px 12px",
              borderRadius: "8px",
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              width: "fit-content",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: color,
              }}
            ></div>
            <span>{label}</span>
          </div>
        </div>
      </div>

      {/* Agent Capabilities */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">
          What this agent can do
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          {
            "Intelligent task automation and processing • Context-aware decision making • Multi-step workflow orchestration"
          }
        </p>
      </div>
    </div>
  );
}

type ConfigProps = {
  data: AgentConfig;
  edit: boolean;
};

function ModelConfig({ data, edit }: ConfigProps) {
  const intial_provider = data.provider_options.filter(
    (ele) => ele.value == data.provider
  )[0];
  const [provider, setProvider] = useState(intial_provider);
  const [modelOpts, setModelOpts] = useState(
    data.model_options[provider.value]
  );

  const intial_model = modelOpts.filter((ele) => {
    ele.value == data.model_id;
  })[0];

  const [model, setModel] = useState(intial_model);

  const [value, setValue] = useState(data.description);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  useEffect(() => {
    data.provider = provider.value;
    setModelOpts(data.model_options[provider.value]);
    setModel(modelOpts[0]);
  }, [provider]);

  return (
    <div style={{ margin: "10px", fontSize: "0.875rem" }}>
      <h4 className="text-sm font-medium text-gray-900 mb-3">AI Setup</h4>
      <div style={{ marginBottom: "10px" }}>
        <span>Provider</span>
        <CustomSelect
          options={data.provider_options}
          value={provider}
          onChange={setProvider}
          disabled={!edit}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <span>Models</span>
        <CustomSelect
          options={modelOpts}
          value={model}
          onChange={setModel}
          disabled={!edit}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <span>API Key</span>
        <div
          style={{ backgroundColor: "#F7F7F7" }}
          className="w-full border rounded-md px-3 py-2 text-left shadow-sm"
        >
          {data.auth != "" ? data.auth : "testing"}
        </div>
      </div>
      <div>
        <span className="block mb-1 text-sm font-medium">Description</span>
        <textarea
          ref={textareaRef}
          readOnly={!edit}
          value={value}
          onChange={(e) => {
            data.description = e.target.value;
            setValue(e.target.value);
          }}
          className="w-full border rounded-md px-3 py-2 text-left shadow-sm resize-none overflow-hidden leading-relaxed focus:outline-none"
          placeholder="Enter description..."
          style={{ height: "auto", backgroundColor: "#F7F7F7" }}
        />
      </div>
    </div>
  );
}

type AgentProps = {
  data: AgentConfig;
};

export function Default({ data }: AgentProps) {
  const [edit, setEdit] = useState(false);

  // useEffect(() => console.log(data), [edit]);

  return (
    <div
      style={{ height: "100%", overflowY: "auto" }}
      className="max-w-sm w-full border rounded-lg p-4 bg-white shadow-sm"
    >
      <SideBarHeader icon={"bot"} title={data.title} />
      <AgentStatus data={data} />
      <ModelConfig data={data} edit={edit} />
      <SideBarFooter edit={edit} setEdit={setEdit} />
    </div>
  );
}
