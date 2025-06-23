import { ArrowDownToLine, PenLine } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type SideBarFooterProps = {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
};

export function SideBarFooter({ edit, setEdit }: SideBarFooterProps) {
  return (
    <div className="flex gap-2 pt-2 border-t border-gray-200">
      <button
        onClick={() => setEdit(!edit)}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs flex-1"
      >
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
