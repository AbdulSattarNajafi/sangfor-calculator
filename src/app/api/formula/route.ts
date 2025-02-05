import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";
import { toCamelCase } from "@/utils/helpers";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "formula.xlsx");
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });

    const sheetName = "formula";
    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      return NextResponse.json(
        { error: `Sheet "${sheetName}" not found` },
        { status: 400 },
      );
    }

    // Convert sheet data to JSON
    const rawData =
      XLSX.utils.sheet_to_json<Record<string, string | number>>(worksheet);

    // Transform the data into a single object
    const jsonData: Record<
      string,
      { year1: string | number; year2: string | number; year3: string | number }
    > = {};

    rawData.forEach((row) => {
      const originalKey = row["Security & Networking Org Efficiency Gain"];
      if (!originalKey) return;

      let camelCaseKey = "";
      if (typeof originalKey === "string") {
        camelCaseKey = toCamelCase(originalKey);
      }

      jsonData[camelCaseKey] = {
        year1: row["Year 1"],
        year2: row["Year 2"],
        year3: row["Year 3"],
      };
    });

    return NextResponse.json(jsonData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process file", details: error },
      { status: 500 },
    );
  }
}
