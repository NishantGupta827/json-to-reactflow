import { ArrowDownToLine, Edit3 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import "./RightSidebar.css";

type SideBarFooterProps = {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  onSave?: () => void;
};

export function SideBarFooter({ edit, setEdit, onSave }: SideBarFooterProps) {
  const handleSave = () => {
    // Call the save function if provided
    if (onSave) {
      onSave();
    }
    // Exit edit mode
    setEdit(false);
  };

  const handleCancel = () => {
    // Cancel editing without saving
    setEdit(false);
  };

  const handleEdit = () => {
    // Enter edit mode
    setEdit(true);
  };

  if (!edit) {
    return (
      <div className="sidebar-footer">
        <button 
          className="sidebar-button edit-button"
          onClick={handleEdit}
        >
          <Edit3 size={16} />
          Edit
        </button>
      </div>
    );
  }

  return (
    <div className="sidebar-footer">
      <button 
        className="sidebar-button cancel-button"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button 
        className="sidebar-button save-button"
        onClick={handleSave}
      >
        <ArrowDownToLine size={16} />
        Save
      </button>
    </div>
  );
}
