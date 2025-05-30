import { SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button, Textarea } from "@contentstack/venus-components";

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
  const [jsonString, setJsonString] = useState("");

  useEffect(() => {
    setJsonString(JSON.stringify(data, null, 2));
  }, [data]);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonString);
      onSave(parsed);
      onClose();
    } catch (err) {
      alert("Invalid JSON. Please correct and try again.");
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

        <Textarea
          name="jsonEditor"
          labelText=""
          rows={20}
          placeholder="Edit JSON here..."
          value={jsonString}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setJsonString(e.target.value)}
          resize="vertical"
          style={{
            backgroundColor: "#f9fafb",
            fontFamily: "monospace",
            fontSize: "13px",
          }}
        />

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
