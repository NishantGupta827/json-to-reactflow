export interface PerformanceData {
  executions: {
    count: number;
    change: number;
  };
  successRate: {
    percentage: number;
    period: string;
  };
  activities: {
    id: string;
    message: string;
    timestamp: string;
    status: "success" | "warning" | "error";
  }[];
}

export const dummyPerformanceData: PerformanceData = {
  executions: {
    count: 1245,
    change: -4,
  },
  successRate: {
    percentage: 84.5,
    period: "Last 30 days",
  },
  activities: [
    {
      id: "1",
      message: "Agent started processing a new task",
      timestamp: "Just now",
      status: "success",
    },
    {
      id: "2",
      message: "Data fetched from CRM successfully",
      timestamp: "2 minutes ago",
      status: "success",
    },
    {
      id: "3",
      message: "Slack message sent to client",
      timestamp: "5 minutes ago",
      status: "success",
    },
    {
      id: "4",
      message: "Tool integration failed: API key missing",
      timestamp: "15 minutes ago",
      status: "warning",
    },
    {
      id: "5",
      message: "Agent failed to complete task: Invalid input",
      timestamp: "1 hour ago",
      status: "error",
    },
  ],
}; 