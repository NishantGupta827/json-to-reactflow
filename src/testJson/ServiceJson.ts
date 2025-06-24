import { ServiceStep } from "@/types/service";

export const ServiceJson: ServiceStep[] = [
  {
    id: "read_inbox_start",
    tool: "ability",
    action: "ReadMailInbox",
    description:
      "Initiate the process to read all emails from the configured mail inbox.",
    target_id: ["process_email_loop"],
    step_no: 1,
  },
  {
    id: "process_email_loop",
    tool: "loop",
    condition: "Are there more unread or unprocessed emails in the inbox?",
    description:
      "Iterate through each available email to process them sequentially.",
    target_id: ["check_subject_condition"],
    step_no: 2,
  },
  {
    id: "check_subject_condition",
    tool: "conditional",
    condition: "If the subject of the current email contains the word 'work'",
    description:
      "Evaluate the subject line of the current email to determine if it includes the keyword 'work'.",
    target_id: ["send_slack_message", "send_mail_reply"],
    step_no: 3,
  },
  {
    id: "send_slack_message",
    tool: "ability",
    action: "SendSlackMessage",
    description:
      "Send a notification message to a specific Slack channel detailing the email content.",
    target_id: ["process_email_loop"],
    step_no: 4,
  },
  {
    id: "send_mail_reply",
    tool: "ability",
    action: "SendMailReply",
    description:
      "Compose and send an automated reply email back to the original sender of the current email.",
    target_id: ["process_email_loop"],
    step_no: 4,
  },
];
