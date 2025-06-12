type agentPayload = {
  abilities: string[]; //need to check
  //id: "745c1e2179e84c27bee58ceb6cf9813f",title: "Testing",type: "agent"
  // Icons of abilities are constant based on the type

  auth: string;
  //We can get the available auths in the system from the store
  //auth providers are constants
  //Available auth is pulled from the redux store
  //Agent models are also constants

  brandkit: { enabled: boolean; knowledge_vault: boolean };
  description: string;
  input_schema: string; //need to check
  // Jsonify in this format [{\"id\":\"tf8hoamcoap\",\"name\":\"Search Query\",\"description\":\"\",\"type\":\"string\",\"isArray\":false,\"required\":true,\"nestedProperties\":[],\"enumValues\":[]}]

  model: string;
  provider: string;
  randomness: 0.5;
  response_type: string;
  role_setting: string;
  // AgentBackground tag gives background information,
  // AgentInstruction tag gives instructions,
  // AgentOutputFormatting tag gives output formatting rules

  title: string;

  //might have to expose 2 functions to the parent
};
