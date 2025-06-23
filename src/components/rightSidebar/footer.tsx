import { ArrowDownToLine, PenLine } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import "./RightSidebar.css";

type SideBarFooterProps = {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
};

export function SideBarFooter({ edit, setEdit }: SideBarFooterProps) {
  return (
    <div className="sidebar-footer">
      <button onClick={() => setEdit(!edit)} className="sidebar-button">
        {!edit ? (
          <>
            <PenLine /> Edit
          </>
        ) : (
          <>
            <ArrowDownToLine /> Save
          </>
        )}
      </button>
    </div>
  );
}
