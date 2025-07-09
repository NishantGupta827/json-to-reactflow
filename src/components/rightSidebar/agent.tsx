import { useEffect, useRef, useState, useCallback } from "react";
import { AgentConfig } from "@/types/agent";
// import { SideBarHeader } from "./header";
import CustomSelect from "./select";
import { SideBarFooter } from "./footer";
import "./RightSidebar.css";
import { AgentPerformance } from "./performance";
import { ConnectedAbilities } from "./connectedApps";
import AgentIconUrl from "@/assets/agent-icon.svg";

export function ConvertAgentInstructions(role_setting: string) {
  // Use the 's' flag to make '.' match newlines, and trim whitespace
  const background = role_setting.match(
    /<AgentBackground>(.*?)<\/AgentBackground>/s
  );
  const instruction = role_setting.match(
    /<AgentInstruction>(.*?)<\/AgentInstruction>/s
  );
  const output = role_setting.match(
    /<AgentOutputFormatting>(.*?)<\/AgentOutputFormatting>/s
  );

  return {
    background: background ? [background[0], background[1].trim()] : null,
    instruction: instruction ? [instruction[0], instruction[1].trim()] : null,
    output: output ? [output[0], output[1].trim()] : null,
  };
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
  onDataChange?: (updatedData: AgentConfig) => void;
};

function ModelConfig({ data, edit, modal, onDataChange }: ConfigProps) {
  // Safety checks for potentially undefined arrays
  const providerOptions = data.provider_options || [];
  const modelOptions = data.model_options || {};
  const authOptions = data.auth_options || [];

  const intial_provider = providerOptions.find(
    (ele) => ele.value == data.provider
  );
  const [provider, setProvider] = useState(intial_provider);
  const [modelOpts, setModelOpts] = useState(
    modelOptions[provider?.value || ""] || []
  );

  const intial_model = modelOpts.find((ele) => ele.value == data.model_id);
  const [model, setModel] = useState(intial_model);

  // Filter auth options based on current provider
  const filteredAuthOptions = authOptions
    .filter((auth: any) => auth.group_name === provider?.value)
    .map((auth: any) => ({ label: auth.title, value: auth.id }));

  const initialAuth = filteredAuthOptions.find(
    (auth) => auth.value === data.auth
  );
  const [selectedAuth, setSelectedAuth] = useState(initialAuth);

  // Extract instruction from role_setting
  const parsedInstructions = ConvertAgentInstructions(data.role_setting || "");
  const instructionText = parsedInstructions.instruction?.[1] || "";
  const [instruction, setInstruction] = useState(instructionText);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Log initial instructions only when component mounts or data changes
  useEffect(() => {
    console.log("Agent Instructions - Initial:", {
      rawRoleSetting: data.role_setting,
      parsedSections: {
        background: parsedInstructions.background,
        instruction: parsedInstructions.instruction,
        output: parsedInstructions.output,
      },
      extractedInstruction: instructionText,
    });
  }, [data.role_setting, data.title]); // Only log when role_setting or title changes

  // Debounced callback for instruction updates
  const debouncedInstructionUpdate = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (instructionValue: string) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          console.log("Agent Instructions - Debounced Update:", {
            instructionValue: instructionValue,
            roleSetting: data.role_setting,
            agentTitle: data.title,
            hasCallback: !!onDataChange,
          });

          if (onDataChange) {
            onDataChange({ ...data });
          }
        }, 500); // 500ms debounce
      };
    })(),
    [data, onDataChange]
  );

  useEffect(() => {
    if (!provider) return;
    data.provider = provider.value;
    const newModelOpts = modelOptions[provider.value] || [];
    setModelOpts(newModelOpts);
    setModel(newModelOpts[0]);

    // Update model_id when provider changes
    if (newModelOpts[0]) {
      data.model_id = newModelOpts[0].value;
    }

    // Update auth options when provider changes
    const newFilteredAuthOptions = authOptions
      .filter((auth: any) => auth.group_name === provider.value)
      .map((auth: any) => ({ label: auth.title, value: auth.id }));

    // Check if current auth is still valid for new provider
    const currentAuthStillValid = newFilteredAuthOptions.find(
      (auth) => auth.value === data.auth
    );

    if (currentAuthStillValid) {
      setSelectedAuth(currentAuthStillValid);
    } else {
      // Reset auth if current selection is not valid for new provider
      const firstOption = newFilteredAuthOptions[0] || null;
      setSelectedAuth(firstOption);
      data.auth = firstOption?.value || "";
    }

    // Trigger callback to update parent
    if (onDataChange) {
      onDataChange({ ...data });
    }
  }, [provider, modelOptions, authOptions]);

  // If this is abilityAgentData (missing required config options), show simplified view
  if (
    !providerOptions.length &&
    !Object.keys(modelOptions).length &&
    !authOptions.length
  ) {
    return (
      <div className="sidebar-section">
        <h4 className="section-label">AI Setup</h4>
        <div className="config-not-available">
          Configuration options not available for this agent view.
        </div>

        <div>
          <span className="config-label">Instruction</span>
          <textarea
            ref={textareaRef}
            rows={8}
            readOnly={true}
            value={instruction}
            className="description-area"
            placeholder="No instruction available"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="sidebar-section">
      <h4 className="section-label">AI Setup</h4>

      <div className="select-wrapper">
        <span className="config-label">Provider</span>
        <CustomSelect
          options={providerOptions}
          value={provider ?? null}
          onChange={(newProvider) => {
            setProvider(newProvider);
            // Note: The data update and callback will be triggered by the useEffect
          }}
          disabled={!edit}
          modal={modal}
        />
      </div>

      <div className="select-wrapper">
        <span className="config-label">Model</span>
        <CustomSelect
          options={modelOpts}
          value={model ?? null}
          onChange={(newModel) => {
            setModel(newModel);
            data.model_id = newModel?.value || "";
          }}
          disabled={!edit}
          modal={modal}
        />
      </div>

      <div className="select-wrapper">
        <span className="config-label">Authentication Method</span>
        {filteredAuthOptions.length > 0 ? (
          <CustomSelect
            options={filteredAuthOptions}
            value={selectedAuth ?? null}
            onChange={(newAuth) => {
              setSelectedAuth(newAuth);
              data.auth = newAuth?.value || "";
            }}
            disabled={!edit}
            modal={modal}
          />
        ) : (
          <div className="no-auth-message">
            No authentication method set up for this provider
          </div>
        )}
      </div>

      <div>
        <span className="config-label">Instruction</span>
        <textarea
          ref={textareaRef}
          rows={8}
          readOnly={!edit}
          value={instruction}
          onChange={(e) => {
            // Log instruction changes
            console.log("Agent Instructions - Changing:", {
              oldInstruction: instruction,
              newInstruction: e.target.value,
              oldRoleSetting: data.role_setting,
            });

            // Update role_setting with new instruction
            const newRoleSetting = (data.role_setting || "").replace(
              /<AgentInstruction>.*?<\/AgentInstruction>/,
              `<AgentInstruction>${e.target.value}</AgentInstruction>`
            );
            data.role_setting = newRoleSetting;
            setInstruction(e.target.value);

            console.log("Agent Instructions - Updated:", {
              newRoleSetting: newRoleSetting,
              instructionLength: e.target.value.length,
            });

            debouncedInstructionUpdate(e.target.value);
          }}
          className="description-area"
          placeholder="e.g., Always provide concise summaries with bullet points. Be friendly but not casual"
        />
      </div>
    </div>
  );
}

type AgentProps = {
  data: AgentConfig;
  modal: boolean;
  onDataChange?: (updatedData: AgentConfig) => void;
  onClose?: () => void;
};

export function Default({ data, modal, onDataChange }: AgentProps) {
  const [edit, setEdit] = useState(false);

  const handleDataUpdate = (updatedData: AgentConfig) => {
    // Update parent component with new data
    if (onDataChange) {
      onDataChange(updatedData);
    }
  };

  const handleSave = () => {
    // Log final instructions before saving
    const finalParsedInstructions = ConvertAgentInstructions(data.role_setting);
    console.log("Agent Instructions - Saving:", {
      finalRoleSetting: data.role_setting,
      finalParsedSections: {
        background: finalParsedInstructions.background,
        instruction: finalParsedInstructions.instruction,
        output: finalParsedInstructions.output,
      },
      finalInstructionText: finalParsedInstructions.instruction?.[1] || "",
      agentTitle: data.title,
      provider: data.provider,
      modelId: data.model_id,
    });

    // Save the current data state
    console.log("Saving agent data:", data);

    // Trigger final save callback to parent
    handleDataUpdate(data);

    // You can add additional save logic here, such as:
    // - Making an API call to save the data
    // - Updating local storage

    alert("Agent data saved successfully!");
  };

  return (
    <div className="right-sidebar">
      <div className="agent-title-section">
        <h1 className="agent-main-title">{data.title}</h1>
      </div>

      <div className="agent-setup-header">
        <div className="agent-icon-container">
          <div className="agent-bot-icon">
            <img
              src={AgentIconUrl}
              alt="Agent"
              style={{ width: "80px", height: "80px" }}
            />
          </div>
        </div>
        <h2 className="agent-setup-title">{data.title}</h2>
        <p className="agent-setup-description">{data.description}</p>
      </div>

      <ConnectedAbilities data={data} />

      <ModelConfig
        data={data}
        edit={edit}
        modal={modal}
        onDataChange={handleDataUpdate}
      />
      {/* <InputSchemaComponent data={data} edit={edit} modal={modal} /> */}

      <AgentPerformance />

      <SideBarFooter edit={edit} setEdit={setEdit} onSave={handleSave} />
    </div>
  );
}
