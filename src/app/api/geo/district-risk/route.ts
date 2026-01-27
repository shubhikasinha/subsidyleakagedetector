import { getBigQueryClient, DistrictRisk } from '@/lib/bigquery';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const bigquery = getBigQueryClient();

    // Exact SQL as per requirement - District-wise anomaly count for heatmap
    const query = `
      SELECT
        b.residence_district,
        COUNT(*) AS anomaly_count
      FROM \`gfg-fot.lpg_fraud_detection.fraud_results\` fr
      JOIN \`gfg-fot.lpg_fraud_detection.Beneficiaries\` b
      ON fr.beneficiary_id = b.beneficiary_id
      WHERE fr.is_anomaly = TRUE
      GROUP BY b.residence_district
      ORDER BY anomaly_count DESC
    `;

    const [job] = await bigquery.createQueryJob({ query });
    const [rows] = await job.getQueryResults();

    const results: DistrictRisk[] = rows.map((row) => ({
      residence_district: row.residence_district || 'Unknown',
      anomaly_count: Number(row.anomaly_count),
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error('District Risk Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
