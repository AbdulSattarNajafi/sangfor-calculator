import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";
import { toCamelCase } from "@/utils/helpers";

interface DataRow {
  [key: string]: [
    { year1: string | number },
    { year2: string | number },
    { year3: string | number },
  ];
}

interface Sections {
  [sectionName: string]: DataRow;
}

export async function GET() {
  try {
    const filePath: string = path.join(process.cwd(), "public", "formula.xlsx");

    const fileBuffer: Buffer = fs.readFileSync(filePath);
    const workbook: XLSX.WorkBook = XLSX.read(fileBuffer, { type: "buffer" });

    const sheetName: string = "formula";
    const worksheet: XLSX.WorkSheet | undefined = workbook.Sheets[sheetName];

    if (!worksheet) {
      return NextResponse.json(
        { error: `Sheet "${sheetName}" not found` },
        { status: 400 },
      );
    }

    const rawData: (string | number)[][] = XLSX.utils.sheet_to_json<
      (string | number)[]
    >(worksheet, { header: 1 });

    let currentSection: string = "";
    const sections: Sections = {};

    rawData.forEach((row: (string | number)[]) => {
      if (row.length === 0 || typeof row[0] !== "string" || !row[0].trim())
        return; // Skip empty rows

      if (row.length > 1 && row[1] === "Year 1") {
        // New section detected
        currentSection = toCamelCase(row[0]);
        sections[currentSection] = {};
      } else if (currentSection && row.length >= 4) {
        // Data row
        const key: string = toCamelCase(String(row[0]));
        sections[currentSection][key] = [
          { year1: row[1] as string | number },
          { year2: row[2] as string | number },
          { year3: row[3] as string | number },
        ];
      }
    });

    return NextResponse.json(sections, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process file", details: (error as Error).message },
      { status: 500 },
    );
  }
}
