import {
  BookCopyIcon,
  ChromeIcon,
  GlobeIcon,
  MonitorSmartphone,
  RocketIcon,
} from "lucide-react";
import useI18n from "@/hooks/useI18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  useSettingStore,
  type DevChannels as DevChannelsType,
  type Devices as DevicesType,
} from "@/stores/setting";
import { DevChannels, Devices } from "@/constants";
import { turnOnDevServer, turnOffDevServer } from "@/vscode-events/fire-events";

const options = [
  {
    value: DevChannels.SIMULATOR,
    icon: MonitorSmartphone,
  },
  {
    value: DevChannels.CHROME_DEBUGGER,
    icon: ChromeIcon,
  },
  {
    value: DevChannels.EDGE_DEBUGGER,
    icon: BookCopyIcon,
  },
  {
    value: DevChannels.DEFAULT_BROWSER,
    icon: GlobeIcon,
  },
];

const Home = () => {
  const t = useI18n();
  const devChannel = useSettingStore?.((state) => state.devChannel);
  const setDevChannel = useSettingStore?.((state) => state.setDevChannel);
  const device = useSettingStore?.((state) => state.device);
  const setDevice = useSettingStore?.((state) => state.setDevice);
  const guide = useSettingStore?.((state) => state.guide);
  const ratio = device ? Devices[device].width / Devices[device].height : 1;

  const startedDevServer = useSettingStore?.((state) => state.startedDevServer);
  const port = useSettingStore?.((state) => state.port);

  return (
    <div>
      <div className="gap-2 flex items-center px-2 py-1 text-[var(--vscode-tab-inactiveForeground)] bg-[var(--vscode-tab-activeBackground)]">
        <RocketIcon /> {t("develop-title")}
      </div>
      <div className="flex items-center bg-[var(--vscode-tab-inactiveBackground)] p-2 gap-3">
        <Select
          value={devChannel}
          onValueChange={(value) => {
            setDevChannel?.(value as DevChannelsType);
          }}
        >
          <SelectTrigger className="w-[180px] text-[var(--vscode-button-foreground)]">
            <SelectValue placeholder={t("develop-dev-channel-title")} />
          </SelectTrigger>
          <SelectContent className="bg-[var(--vscode-tab-inactiveBackground)] text-[var(--vscode-button-foreground)]">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {<option.icon className="focus:text-accent-foreground" />}
                {t(`develop-${option.value}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button
          onClick={() => {
            if (startedDevServer) {
              turnOffDevServer();
              return;
            }
            turnOnDevServer(port!);
          }}
          className="cursor-pointer text-[var(--vscode-button-foreground)] bg-[var(--vscode-button-background)] px-2 py-1 rounded"
        >
          {startedDevServer
            ? t("develop-button-stop")
            : t("develop-button-start")}
        </button>
      </div>
      {guide && (
        <p className="text-[var(--vscode-tab-inactiveForeground)]">
          {t("develop-start-description")}
        </p>
      )}

      {devChannel === "simulator" && (
        <>
          <div className="gap-2 flex items-center px-2 py-1 text-[var(--vscode-tab-inactiveForeground)] bg-[var(--vscode-tab-activeBackground)]">
            {t("develop-simulator-setting-title")}
          </div>
          <div className="flex items-center bg-[var(--vscode-tab-inactiveBackground)] p-2 gap-3">
            <Select
              value={device}
              onValueChange={(value) => {
                setDevice?.(value as DevicesType);
              }}
            >
              <SelectTrigger className="w-[180px] text-[var(--vscode-button-foreground)]">
                <SelectValue
                  placeholder={t("develop-simulator-setting-title")}
                />
              </SelectTrigger>
              <SelectContent className="bg-[var(--vscode-tab-inactiveBackground)] text-[var(--vscode-button-foreground)]">
                {Object.values(Devices).map((device) => (
                  <SelectItem key={device.key} value={device.key}>
                    {device.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div
            style={{
              width: "100%",
              aspectRatio: ratio,
            }}
            className="rounded-lg gap-2 flex items-center p-4 text-[var(--vscode-tab-inactiveForeground)] bg-[var(--vscode-tab-activeBackground)]"
          >
            {startedDevServer ? (
              <iframe
                width="100%"
                height="100%"
                className="rounded-lg bg-white"
                src={`http://localhost:${port}/`}
              ></iframe>
            ) : (
              <div className="rounded-lg w-full h-full flex bg-black"></div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
