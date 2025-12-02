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
import {
  DefaultGuide,
  DefaultLanguage,
  DefaultSidebarPosition,
  useSettingStore,
  type Language,
} from "@/stores/setting";
import useI18n from "@/hooks/useI18n";
import { toggleSidebarPosition as vscodeToggleSidebarPosiiton } from "@/vscode-events/fire-events";

const Setting = () => {
  const language =
    useSettingStore?.((state) => state.language) ?? DefaultLanguage;
  const setLanguage = useSettingStore?.((state) => state.setLanguage);

  const guide = useSettingStore?.((state) => state.guide) ?? DefaultGuide;
  const toggleGuide = useSettingStore?.((state) => state.toggleGuide);

  const sidebarPosition =
    useSettingStore?.((state) => state.sidebarPosition) ??
    DefaultSidebarPosition;
  const toggleSidebarPosition = useSettingStore?.(
    (state) => state.toggleSidebarPosition
  );

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
            onClick={() => {
              toggleSidebarPosition?.();
              vscodeToggleSidebarPosiiton();
            }}
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
              onCheckedChange={toggleGuide}
            />
            <Label htmlFor="guide">{t("setting-guide-button")}</Label>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Setting;
