export function ConvertAgentInstructions(role_setting: string) {
  const background = role_setting.match(
    /<AgentBackground>(.*?)<\/AgentBackground>/
  );
  const instruction = role_setting.match(
    /<AgentInstruction>(.*?)<\/AgentInstruction>/
  );

  const output = role_setting.match(
    /<AgentBackground>(.*?)<\/AgentBackground>/
  );
  return {
    background: background,
    instruction: instruction,
    output: output,
  };
}
