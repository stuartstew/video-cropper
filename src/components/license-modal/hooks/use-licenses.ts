import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import type { FrontendLicense } from "../types/frontend-license";

export const useLicenses = () => {
  const [frontendLicenses, setFrontendLicenses] = useState<FrontendLicense[]>([]);
  const [rustLicensesHTML, setRustLicensesHTML] = useState("");

  useEffect(() => {
    const loadLicenses = async () => {
      invoke<FrontendLicense[]>("read_frontend_licenses")
        .then((licenses) => setFrontendLicenses(licenses))
        .catch((e) => {
          console.error("cannot load frontend licenses");
          console.error(e);
        });

      invoke<string>("read_rust_licenses_html")
        .then((licenses) => setRustLicensesHTML(licenses))
        .catch((e) => {
          console.error("cannot load rust licenses");
          console.error(e);
        });
    };

    loadLicenses();
  }, []);

  return { frontendLicenses, rustLicensesHTML };
};
