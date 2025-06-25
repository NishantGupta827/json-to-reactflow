export type ServiceStep = {
  id: string; //unique id for each step
  type: "ability" | "if" | "loop" | "trigger"; //type of the step
  title: string; //title of the step
  target_id: { id: string; label?: string }[]; //array of objects with id and optional label for the next steps. For the final step, if they don't have a target, don't provide this field
  step_no: number; //the level of the node in this workflow tree.
  condition?: string; // if conditional mention the condition
  action?: string; // if ability mention the action taken by the ability
  description: string;
};
