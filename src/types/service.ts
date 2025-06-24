export type ServiceStep = {
  id: string; //unique id for each step
  tool: string; //ability or conditional statement use
  target_id?: string[]; //id of the next step. For the final step, if they don't have a target, don't provide this field
  step_no: number; //the level of the node in this workflow tree.
  condition?: string; // if conditional mention the condition
  action?: string; // if ability mention the action taken by the ability
  description: string;
};
