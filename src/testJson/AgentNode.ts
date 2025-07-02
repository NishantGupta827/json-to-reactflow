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
