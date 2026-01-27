import { getBigQueryClient, DashboardSummary } from '@/lib/bigquery';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const bigquery = getBigQueryClient();

    // KPIs - Top summary cards
    // SOURCE: fraud_with_explanations (has flag columns for explainability)
    const query = `
      SELECT
        COUNT(*) AS total_beneficiaries,
        COUNTIF(risk_level = 'HIGH') AS high_risk,
        COUNTIF(risk_level = 'MEDIUM') AS medium_risk,
        COUNTIF(risk_level = 'LOW') AS low_risk
      FROM \`gfg-fot.lpg_fraud_detection.fraud_with_explanations\`
    `;

    const [job] = await bigquery.createQueryJob({ query });
    const [rows] = await job.getQueryResults();

    if (rows.length === 0) {
      return NextResponse.json({
        total_beneficiaries: 0,
        high_risk: 0,
        medium_risk: 0,
        low_risk: 0,
      } as DashboardSummary);
    }

    const result: DashboardSummary = {
      total_beneficiaries: Number(rows[0].total_beneficiaries),
      high_risk: Number(rows[0].high_risk),
      medium_risk: Number(rows[0].medium_risk),
      low_risk: Number(rows[0].low_risk),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Dashboard Summary Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
