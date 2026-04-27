import SettingsPage from "@/components/settingsPage";

export default function Settings() {
  return (
    <div className="flex items-center justify-center flex-col p-3">
      <div className="flex flex-col text-sm mb-2 justify-end w-full max-w-md ">
        <span className="uppercase tracking-wider text-slate-400">
          Settings
        </span>
        <h1 className="text-lg font-bold text-slate-800">Account</h1>
      </div>
      <SettingsPage />
    </div>
  );
}
