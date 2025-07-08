import { 
  Zap,
  Info,
  Bot,
  Wrench,
  Workflow
} from "lucide-react";
import { AgentConfig } from "@/types/agent";

type ConnectedAbilitiesProps = {
  data: AgentConfig;
};

export function ConnectedAbilities({ data }: ConnectedAbilitiesProps) {
  const getIconForType = (type: string) => {
    switch (type) {
      case "agent":
        return Bot;
      case "action":
        return Wrench;
      case "automation":
        return Workflow;
      default:
        return Zap;
    }
  };

  return (
    <div className="connected-apps-section">
      <div className="connected-apps-header">
        <h4 className="connected-apps-title">
          Connected Agents and Abilities
          <Info size={16} className="info-icon" />
        </h4>
      </div>
      
      {/* Abilities Grid */}
      <div className="abilities-grid">
        {data.abilities && data.abilities.length > 0 ? (
          data.abilities.map((ability, index) => {
            // Handle both string and object types for abilities
            const abilityTitle = typeof ability === 'string' ? ability : ability.title;
            const abilityType = typeof ability === 'string' ? 'default' : ability.type;
            const IconComponent = getIconForType(abilityType);
            
            return (
              <div key={index} className="ability-item">
                <IconComponent size={14} className="ability-icon" />
                <span className="ability-name">{abilityTitle}</span>
              </div>
            );
          })
        ) : (
          <div className="no-abilities">
            <span className="no-abilities-text">No abilities connected</span>
          </div>
        )}
      </div>
    </div>
  );
} 