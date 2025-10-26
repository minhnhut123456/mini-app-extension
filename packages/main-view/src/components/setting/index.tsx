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
import useLanguage from "@/hooks/useLanguage";
import type { Language } from "@/stores/setting";
import useI18n from "@/hooks/useI18n";
import useGuide from "@/hooks/useGuide";
import useSidebarPosition from "@/hooks/useSidebarPosition";

const Setting = () => {
  const { language, setLanguage } = useLanguage();
  const { guide, toggleGuide } = useGuide();
  const { toggleSidebarPosition, sidebarPosition } = useSidebarPosition();
  const t = useI18n();

  return (
    <div>
      <div className="flex items-center gap-2 bg-[var(--vscode-tab-activeBackground)] p-2 text-[var(--vscode-tab-inactiveForeground)]">
        <Settings /> {t("setting-title")}
      </div>
      <Collapsible className="bg-[var(--vscode-tab-inactiveBackground)] p-2 text-[var(--vscode-button-foreground)]">
        <CollapsibleTrigger className="w-full flex items-center gap-2 cursor-pointer">
          <Globe /> {t("setting-language-title")}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pl-8">
          <Select
            value={language}
            onValueChange={(value) => {
              setLanguage?.(value as Language);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("setting-language-title")} />
            </SelectTrigger>
            <SelectContent className="bg-[var(--vscode-tab-inactiveBackground)] text-[var(--vscode-tab-inactiveForeground)]">
              <SelectItem value="en">{t("setting-language-en")}</SelectItem>
              <SelectItem value="vi">{t("setting-language-vi")}</SelectItem>
            </SelectContent>
          </Select>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="bg-[var(--vscode-tab-inactiveBackground)] p-2 text-[var(--vscode-button-foreground)]">
        <CollapsibleTrigger className="w-full flex items-center gap-2 cursor-pointer">
          <PanelRightIcon />{" "}
          {sidebarPosition === "left"
            ? t("setting-move-sidebar-to-right-title")
            : t("setting-move-sidebar-to-left-title")}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pl-8">
          {guide && (
            <p className="text-[var(--vscode-tab-inactiveForeground)]">
              {sidebarPosition === "left"
                ? t("setting-move-sidebar-to-right-description")
                : t("setting-move-sidebar-to-left-description")}
            </p>
          )}
          <button
            onClick={toggleSidebarPosition}
            className="cursor-pointer text-[var(--vscode-button-foreground)] bg-[var(--vscode-tab-activeBackground)] px-2 py-1 rounded"
          >
            {sidebarPosition === "left"
              ? t("setting-move-sidebar-to-right-button")
              : t("setting-move-sidebar-to-left-button")}
          </button>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="bg-[var(--vscode-tab-inactiveBackground)] p-2 text-[var(--vscode-button-foreground)]">
        <CollapsibleTrigger className="w-full flex items-center gap-2 cursor-pointer">
          <Logs /> {t("setting-guide-title")}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pl-8">
          {guide && (
            <p className="text-[var(--vscode-tab-inactiveForeground)]">
              {t("setting-guide-description")}
            </p>
          )}

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="guide"
              checked={guide}
              onCheckedChange={(value) =>
                typeof value === "boolean" && toggleGuide?.(value)
              }
            />
            <Label htmlFor="guide">{t("setting-guide-button")}</Label>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Setting;
