import { Button } from "../ui/button";

type nodeSideBarFooterProps = {
  closeSideBar: () => void;
  saveSideBar: () => void;
};

export function NodeSideBarFooter({
  closeSideBar,
  saveSideBar,
}: nodeSideBarFooterProps) {
  return (
    <div className="p-4 border-t border-border flex justify-end gap-2">
      <Button variant="outline" onClick={closeSideBar}>
        Cancel
      </Button>
      <Button className="bg-blue-500 text-white" onClick={saveSideBar}>
        Save Changes
      </Button>
    </div>
  );
}
