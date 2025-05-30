import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@contentstack/venus-components";
import { JsonEditor } from "json-edit-react";

interface NodeEditDialogProps {
  open: boolean;
  onClose: () => void;
  data: Record<string, any>;
  onSave: (updatedData: Record<string, any>) => void;
}

export function NodeEditDialog({
  open,
  onClose,
  data,
  onSave,
}: NodeEditDialogProps) {
  const [jsonData, setJsonData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    setJsonData(data);
  }, [data]);

  const handleSave = () => {
    try {
      onSave(jsonData);
      onClose();
    } catch (err) {
      alert("Failed to save JSON. Please fix the structure.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        style={{
          maxWidth: "700px",
          padding: "20px",
          backgroundColor: "white",
        }}
      >
        <DialogHeader>
          <DialogTitle>Edit Node JSON</DialogTitle>
        </DialogHeader>

        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            backgroundColor: "#f9fafb",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #e5e7eb",
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <JsonEditor
            data={jsonData}
            setData={(data: unknown) => {
              // TODO: runtime validation here before setting state
              setJsonData(data as Record<string, unknown>);
            }}
          />
        </div>

        <DialogFooter
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "12px",
          }}
        >
          <Button buttonType="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button buttonType="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
