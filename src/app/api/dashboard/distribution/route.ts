import { getBigQueryClient, RiskDistribution } from '@/lib/bigquery';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const bigquery = getBigQueryClient();

    // Risk Distribution for Pie/Bar chart
    // SOURCE: fraud_with_explanations
    const query = `
      SELECT
        risk_level,
        COUNT(*) AS count
      FROM \`gfg-fot.lpg_fraud_detection.fraud_with_explanations\`
      GROUP BY risk_level
    `;

    const [job] = await bigquery.createQueryJob({ query });
    const [rows] = await job.getQueryResults();

    const results: RiskDistribution[] = rows.map((row) => ({
      risk_level: row.risk_level || 'UNKNOWN',
      count: Number(row.count),
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error('Risk Distribution Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
