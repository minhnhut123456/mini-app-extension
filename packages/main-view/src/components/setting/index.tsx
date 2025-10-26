import { Globe, Logs, PanelRightIcon, Settings } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const Setting = () => {
  return (
    <div>
      <div className="flex items-center gap-2 bg-[var(--vscode-tab-activeBackground)] p-2 text-[var(--vscode-tab-inactiveForeground)]">
        <Settings /> Mini app extension
      </div>
      <Collapsible className="bg-[var(--vscode-tab-inactiveBackground)] p-2 text-[var(--vscode-button-foreground)]">
        <CollapsibleTrigger className="w-full flex items-center gap-2 cursor-pointer">
          <Globe /> Language
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pl-8">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-[var(--vscode-tab-inactiveBackground)] text-[var(--vscode-tab-inactiveForeground)]">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="vi">Vietnamese</SelectItem>
            </SelectContent>
          </Select>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="bg-[var(--vscode-tab-inactiveBackground)] p-2 text-[var(--vscode-button-foreground)]">
        <CollapsibleTrigger className="w-full flex items-center gap-2 cursor-pointer">
          <PanelRightIcon /> Move sidebar to right
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pl-8">
          <p className="text-[var(--vscode-tab-inactiveForeground)]">
            Move sidebar to the right side of vscode or click move below
          </p>
          <button className="text-[var(--vscode-button-foreground)] bg-[var(--vscode-tab-activeBackground)] px-2 py-1 rounded">
            Move
          </button>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="bg-[var(--vscode-tab-inactiveBackground)] p-2 text-[var(--vscode-button-foreground)]">
        <CollapsibleTrigger className="w-full flex items-center gap-2 cursor-pointer">
          <Logs /> Guide
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pl-8">
          <p className="text-[var(--vscode-tab-inactiveForeground)]">
            Turn guide off to make it simple
          </p>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="guide" />
            <Label htmlFor="guide">Toggle guide</Label>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Setting;
