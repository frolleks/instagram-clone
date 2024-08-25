import { DragDropImage } from "./drag-drop-image";
import { Icon } from "./iconify-icon";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export function CreateButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="justify-start gap-3 w-full"
          variant="ghost"
          size="sm"
        >
          <Icon icon="fluent:add-square-24-regular" fontSize={22} />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center px-8 py-36">
        <DragDropImage />
      </DialogContent>
    </Dialog>
  );
}
