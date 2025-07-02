import { ArrowDown } from "lucide-react";
import "./RightSidebar.css";
import { dummyPerformanceData } from "@/testJson/PerformanceData";

export function AgentPerformance() {
  const { executions, successRate, activities } = dummyPerformanceData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "#10b981";
      case "warning":
        return "#f59e0b";
      case "error":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="sidebar-section">
      <h4 className="section-label">Agent Performance & Updates</h4>
      <p className="performance-description">Lorem ipsum</p>
      
      <div className="performance-stats">
        <div className="stat-card">
          <h5 className="stat-label">Executions</h5>
          <div className="stat-value">{executions.count}</div>
          <div className="stat-change negative">
            <ArrowDown size={12} />
            {Math.abs(executions.change)}%
          </div>
        </div>
        
        <div className="stat-card">
          <h5 className="stat-label">Success Rate</h5>
          <div className="stat-value">{successRate.percentage}%</div>
          <div className="stat-period">{successRate.period}</div>
        </div>
      </div>
      
      <div className="activity-feed">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div 
              className="activity-dot"
              style={{ backgroundColor: getStatusColor(activity.status) }}
            />
            <div className="activity-content">
              <div className="activity-message">{activity.message}</div>
              <div className="activity-timestamp">{activity.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 