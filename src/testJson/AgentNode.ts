export function ConvertAgentPayload(data: any) {
  const background = data.role_setting.match(
    /<AgentBackground>(.*?)<\/AgentBackground>/
  );
  const instruction = data.role_setting.match(
    /<AgentInstruction>(.*?)<\/AgentInstruction>/
  );

  const output = data.role_setting.match(
    /<AgentBackground>(.*?)<\/AgentBackground>/
  );

  return {
    component: "agent",
    title: data.title,
    description: data.description,
    auth: data.auth,
    model: data.model_id,
    model_options: data.model_options,
    provider_options: data.provider_options,
    provider: data.provider,
    randomness: data.randomness,
    response_type: data.response_type,
    background: background ? background[1] : "",
    instruction: instruction ? instruction[1] : "",
    output: output ? output[1] : "",
    color: "#4caf50",
    inputs: ["Some text Label"],
    outputs: ["Response"],
    icon: "Cloud",
  };
}
