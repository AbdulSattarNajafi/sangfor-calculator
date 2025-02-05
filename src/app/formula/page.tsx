"use client";

import { useEffect, useState } from "react";

function FormulaPage() {
  const [data, setData] = useState<{
    year1: number;
    year2: number;
    year3: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/formula");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-semibold">formula - Lists</h1>
      {error && <p className="text-red-500">Error</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default FormulaPage;
