import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import type { FrontendLicense } from "../types/frontend-license";

export const useLicenses = () => {
  const [frontendLicenses, setFrontendLicenses] = useState<FrontendLicense[]>([]);

  useEffect(() => {
    const loadLicenses = async () => {
      invoke<FrontendLicense[]>("read_frontend_licenses")
        .then((licenses) => setFrontendLicenses(licenses))
        .catch((e) => {
          console.error("cannot load frontend licenses");
          console.error(e);
        });
    };

    loadLicenses();
  }, []);

  return { frontendLicenses };
};
