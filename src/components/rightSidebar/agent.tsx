import { useEffect, useRef, useState } from "react";
import { AgentConfig } from "@/types/agent";
import { SideBarHeader } from "./header";
import CustomSelect from "./select";
import { SideBarFooter } from "./footer";
import "./RightSidebar.css";
import ToggleSwitch from "./toggleSwitch";
import { Trash } from "lucide-react";

export function InputSchemaComponent({
  data,
  edit,
  modal,
}: {
  data: AgentConfig;
  edit: boolean;
  modal: boolean;
}) {
  const [input, setInput] = useState<inputChange[]>(
    data.input_schema.map((ele) => ({
      id: ele.id,
      name: ele.name,
      desc: ele.description,
      data: ele.type,
      mandatory: ele.required,
      action: false,
      deleted: false,
    }))
  );

  type inputChange = {
    id: string;
    name: string;
    desc: string;
    data: string;
    mandatory: boolean;
    action: boolean;
    deleted: boolean;
  };

  useEffect(() => {
    console.log("Input state changed:", input);
  }, [input]);

  useEffect(() => {
    data.input_schema = [];
    input.forEach((ele) => {
      if (!ele.deleted) {
        data.input_schema.push({
          id: ele.id,
          name: ele.name,
          description: ele.desc,
          type: ele.data,
          isArray: ele.data != "enum" ? false : true,
          required: ele.mandatory,
          enumValues: [],
          nestedProperties: [],
        });
      }
    });
  }, [edit]);

  return (
    <div className="sidebar-section">
      <h4 className="section-label" style={{ marginBottom: "1em" }}>
        Input Schema
      </h4>
      <div className="schema-table-container">
        <table className="schema-table">
          <tbody>
            <tr className="schema-table-row">
              <td className="property-name-column">Property Name</td>
              <td className="description-column">Description</td>
              <td className="data-type-column">Data Type</td>
              <td className="mandatory-column">Mandatory</td>
              <td className="actions-column"></td>
            </tr>
            {input.map((ele, id) => {
              const updated = [...input];

              return (
                !updated[id].deleted && (
                  <tr key={id} className="schema-table-row">
                    <td className="property-name-column">
                      <input
                        value={ele.name}
                        placeholder="Enter property name"
                        disabled={!edit}
                        onChange={(e) => {
                          updated[id].name = e.target.value;
                          setInput(updated);
                        }}
                      />
                    </td>
                    <td className="description-column">
                      <input
                        value={ele.desc}
                        placeholder="Enter description"
                        disabled={!edit}
                        onChange={(e) => {
                          const updated = [...input];
                          updated[id].desc = e.target.value;
                          setInput(updated);
                        }}
                      />
                    </td>
                    <td className="data-type-column">
                      <CustomSelect
                        options={[
                          { label: "String", value: "string" },
                          { label: "Number", value: "number" },
                          { label: "Boolean", value: "boolean" },
                          { label: "Object", value: "object" },
                          { label: "Select", value: "select" },
                        ]}
                        value={{
                          label:
                            ele.data.charAt(0).toUpperCase() +
                            ele.data.substring(1).toLowerCase(),
                          value: ele.data,
                        }}
                        onChange={(selected) => {
                          updated[id].data = selected?.value || "";
                          setInput(updated);
                        }}
                        disabled={!edit}
                        modal={modal}
                      />
                    </td>
                    <td className="mandatory-column">
                      <ToggleSwitch
                        disabled={!edit}
                        checked={ele.mandatory}
                        onChange={(checked) => {
                          updated[id].mandatory = checked;
                          setInput(updated);
                        }}
                      />
                    </td>
                    <td className="actions-column">
                      <Trash
                        onClick={() => {
                          if (edit) {
                            updated[id].deleted = true;
                            setInput(updated);
                          }
                        }}
                        style={{
                          cursor: "pointer",
                        }}
                      />
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AgentStatus({ data }: { data: AgentConfig }) {
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
  modal: boolean;
};

function ModelConfig({ data, edit, modal }: ConfigProps) {
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
          modal={modal}
        />
      </div>

      <div className="select-wrapper">
        <span className="config-label">Model</span>
        <CustomSelect
          options={modelOpts}
          value={model ?? null}
          onChange={setModel}
          disabled={!edit}
          modal={modal}
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
  modal: boolean;
};

export function Default({ data, modal }: AgentProps) {
  const [edit, setEdit] = useState(false);

  return (
    <div className="right-sidebar">
      <SideBarHeader icon={"bot"} title={data.title} />
      <AgentStatus data={data} />
      <ModelConfig data={data} edit={edit} modal={modal} />
      <InputSchemaComponent data={data} edit={edit} modal={modal} />
      <SideBarFooter edit={edit} setEdit={setEdit} />
    </div>
  );
}
