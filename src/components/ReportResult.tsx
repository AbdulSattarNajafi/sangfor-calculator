"use client";

import { useIsSafari } from "@/hooks/useISSafari";
import DownloadReport from "@/pdf/DownloadReport";
import Report from "@/pdf/Report";
import { CustomerDataType } from "@/utils/types";

function ReportResult({ customer }: { customer: CustomerDataType }) {
  const isSafari = useIsSafari();

  return isSafari ? (
    <DownloadReport customer={customer} />
  ) : (
    <Report customer={customer} />
  );
}

export default ReportResult;
