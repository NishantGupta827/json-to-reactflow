import { ServiceStep } from "@/types/service";

export const ServiceJson: ServiceStep[] = [
  {
    id: "step1_read_inbox",
    tool: "Read Mail Inbox",
    action: "Read all unread emails from the inbox.",
    description:
      "Initiates the process by reading all unread emails from the user's mail inbox.",
    target_id: ["step2_loop_emails"],
    step_no: 1,
  },
  {
    id: "step2_loop_emails",
    tool: "Loop",
    condition: "For each unread email",
    description: "Iterates through each unread email retrieved from the inbox.",
    target_id: ["step3_check_subject"],
    step_no: 2,
  },
  {
    id: "step3_check_subject",
    tool: "Check Subject",
    action: "Extract the subject of the current email.",
    description:
      "Extracts the subject line from the current email being processed.",
    target_id: ["step4_if_condition"],
    step_no: 3,
  },
  {
    id: "step4_if_condition",
    tool: "if",
    condition: "Subject contains 'work'",
    description:
      "Checks if the subject of the current email contains the keyword 'work'.",
    target_id: ["step5_send_slack", "step6_send_mail_back"],
    step_no: 4,
  },
  {
    id: "step5_send_slack",
    tool: "Send Slack Message",
    action: "Send a Slack message to a specific channel about the email.",
    description:
      "Sends a notification to a designated Slack channel if the email subject contains 'work'.",
    target_id: ["step2_loop_emails"],
    step_no: 5,
  },
  {
    id: "step6_send_mail_back",
    tool: "Send Email",
    action: "Send an email back to the original sender.",
    description:
      "Composes and sends a reply email to the original sender if the subject does not contain 'work'.",
    target_id: ["step2_loop_emails"],
    step_no: 5,
  },
];
