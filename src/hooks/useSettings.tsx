import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export interface AppSettings {
  unitPrice: number;
  oldUnitPrice: number;
  googleSheetUrl: string;
  googleSheetNotEndedUrl: string;
  bannerEnabled: boolean;
  bannerMessage: string;
  facebookPixelId: string;
  facebookAccessToken: string;
  tiktokPixelId: string;
  deliveryPrices: Record<string, { stop: number | null; dom: number; note?: string }>;
}

const DEFAULTS: AppSettings = {
  unitPrice: 3200,
  oldUnitPrice: 3900,
  googleSheetUrl: "",
  googleSheetNotEndedUrl: "",
  bannerEnabled: true,
  bannerMessage: "التوصيل متوفر إلى",
  facebookPixelId: "",
  facebookAccessToken: "",
  tiktokPixelId: "",
  deliveryPrices: {},
};

interface SettingsContextValue {
  settings: AppSettings;
  update: (patch: Partial<AppSettings>) => void;
  reset: () => void;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }): React.ReactElement {
  const serverSettings = useQuery(api.settings.getSettings);
  const updateSettingsMutation = useMutation(api.settings.updateSettings);

  const [localOptimistic, setLocalOptimistic] = useState<AppSettings | null>(null);

  useEffect(() => {
    if (serverSettings && !localOptimistic) {
      setLocalOptimistic(serverSettings);
    }
  }, [serverSettings]);

  const update = useCallback((patch: Partial<AppSettings>) => {
    const next = { ...(localOptimistic || serverSettings || DEFAULTS), ...patch };
    setLocalOptimistic(next);
    updateSettingsMutation(next).catch(console.error);
  }, [localOptimistic, serverSettings, updateSettingsMutation]);

  const reset = useCallback(() => {
    setLocalOptimistic(DEFAULTS);
    updateSettingsMutation(DEFAULTS).catch(console.error);
  }, [updateSettingsMutation]);

  const currentSettings = localOptimistic || serverSettings || DEFAULTS;

  return (
    <SettingsContext.Provider value={{ settings: currentSettings, update, reset, isLoading: serverSettings === undefined }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be inside <SettingsProvider>");
  return ctx;
}
