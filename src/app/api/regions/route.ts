import { NextResponse } from "next/server";
import * as xlsx from "xlsx";
import * as fs from "fs";
import * as path from "path";
import { toCamelCase } from "@/utils/helpers";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "formula.xlsx");
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = xlsx.read(fileBuffer, { type: "buffer" });

    const sheetName = "Lists";
    if (!workbook.Sheets[sheetName]) {
      return NextResponse.json(
        { error: `Sheet "${sheetName}" not found` },
        { status: 400 },
      );
    }

    const sheet = workbook.Sheets[sheetName];
    const rawData: Record<string, string | number>[] =
      xlsx.utils.sheet_to_json(sheet);

    const cleanedData = rawData.map((row) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [
          toCamelCase(key.replace(/\d+/g, "").trim()),
          typeof value === "string" ? value.trim() : value,
        ]),
      ),
    );

    return NextResponse.json({ regions: cleanedData });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
