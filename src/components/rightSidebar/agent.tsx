import { useEffect, useRef, useState } from "react";
import { AgentConfig } from "@/types/agent";
import { SideBarHeader } from "./header";
import CustomSelect from "./select";
import { SideBarFooter } from "./footer";
import "./RightSidebar.css";

export default function AgentStatus({ data }: { data: AgentConfig }) {
  const color = data.active ? "#0d6a37" : "#6b7280";
  const label = data.active ? "Active" : "Inactive";

  return (
    <div className="sidebar-section">
      <div className="status-card">
        <div className="status-row">
          <span className="status-label">Status</span>
          <div className="status-pill">
            <div
              className="status-indicator"
              style={{ backgroundColor: color }}
            ></div>
            <span>{label}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "0.5rem" }}>
        <h4 className="config-label">What this agent can do</h4>
        <p className="capabilities-text">
          Intelligent task automation and processing • Context-aware decision
          making • Multi-step workflow orchestration
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
  const intial_provider = data.provider_options.find(
    (ele) => ele.value == data.provider
  );
  const [provider, setProvider] = useState(intial_provider);
  const [modelOpts, setModelOpts] = useState(
    data.model_options[provider?.value || ""]
  );

  const intial_model = modelOpts.find((ele) => ele.value == data.model_id);
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
    if (!provider) return;
    data.provider = provider.value;
    const newModelOpts = data.model_options[provider.value] || [];
    setModelOpts(newModelOpts);
    setModel(newModelOpts[0]);
  }, [provider]);

  return (
    <div className="sidebar-section">
      <h4 className="section-label">AI Setup</h4>

      <div className="select-wrapper">
        <span className="config-label">Provider</span>
        <CustomSelect
          options={data.provider_options}
          value={provider ?? null}
          onChange={setProvider}
          disabled={!edit}
        />
      </div>

      <div className="select-wrapper">
        <span className="config-label">Model</span>
        <CustomSelect
          options={modelOpts}
          value={model ?? null}
          onChange={setModel}
          disabled={!edit}
        />
      </div>

      <div className="select-wrapper">
        <span className="config-label">API Key</span>
        <div className="api-key-box">
          {data.auth ? data.auth : "No API key provided"}
        </div>
      </div>

      <div>
        <span className="config-label">Description</span>
        <textarea
          ref={textareaRef}
          readOnly={!edit}
          value={value}
          onChange={(e) => {
            data.description = e.target.value;
            setValue(e.target.value);
          }}
          className="description-area"
          placeholder="Enter description..."
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

  return (
    <div className="right-sidebar">
      <SideBarHeader icon={"bot"} title={data.title} />
      <AgentStatus data={data} />
      <ModelConfig data={data} edit={edit} />
      <SideBarFooter edit={edit} setEdit={setEdit} />
    </div>
  );
}
