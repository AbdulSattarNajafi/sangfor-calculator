import { useState, useEffect } from "react";
import { MarketingDataTypes } from "@/utils/types";

const Calculator_Url = "https://live-sangfor.pantheonsite.io";

const initalState = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_id: "",
  utm_term: "",
  utm_content: "",
  gBraid: "",
  gclid: "",
  gdpr_checkbox: false,
  landing_url: "",
};

export function useScsData() {
  const [scs, setScs] = useState<MarketingDataTypes>(initalState);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== Calculator_Url) {
        console.warn("Blocked message from unknown origin:", event.origin);
        return;
      }

      const { key, value } = event.data;
      if (key === "_scs" && value) {
        try {
          const scsData = JSON.parse(value);
          let scsValues;
          if (scsData.default.utm.value) {
            const {
              utm_source,
              utm_medium,
              utm_campaign,
              utm_id,
              utm_term,
              utm_content,
              gBraid,
              gclid,
              gdpr_checkbox,
              landing_url,
            } = scsData.default.utm.value;
            scsValues = {
              utm_source: !utm_source ? "" : utm_source,
              utm_medium: !utm_medium ? "" : utm_medium,
              utm_campaign: !utm_campaign ? "" : utm_campaign,
              utm_id: !utm_id ? "" : utm_id,
              utm_term: !utm_term ? "" : utm_term,
              utm_content: !utm_content ? "" : utm_content,
              gBraid: !gBraid ? "" : gBraid,
              gclid: !gclid ? "" : gclid,
              gdpr_checkbox: !gdpr_checkbox ? false : gdpr_checkbox,
              landing_url: !landing_url ? "" : landing_url,
            };
            setScs(scsValues);
          }
        } catch (error) {
          console.error("Failed to parse received data:", error);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return scs;
}
