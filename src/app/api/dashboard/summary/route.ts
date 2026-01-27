import { getBigQueryClient, DashboardSummary } from '@/lib/bigquery';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const bigquery = getBigQueryClient();

    const query = `
      SELECT
        COUNT(*) AS total_records,
        COUNTIF(is_anomaly = TRUE) AS anomalies_detected,
        ROUND(COUNTIF(is_anomaly = TRUE) * 100.0 / COUNT(*), 2) AS anomaly_percentage,
        ROUND(AVG(mean_squared_error), 4) AS avg_risk_score,
        MAX(CURRENT_TIMESTAMP()) AS last_model_run
      FROM \`gfg-fot.lpg_fraud_detection.fraud_results\`
    `;

    const [job] = await bigquery.createQueryJob({ query });
    const [rows] = await job.getQueryResults();

    if (rows.length === 0) {
      return NextResponse.json({
        total_records: 0,
        anomalies_detected: 0,
        anomaly_percentage: 0,
        avg_risk_score: 0,
        last_model_run: new Date().toISOString(),
      } as DashboardSummary);
    }

    const result: DashboardSummary = {
      total_records: Number(rows[0].total_records),
      anomalies_detected: Number(rows[0].anomalies_detected),
      anomaly_percentage: Number(rows[0].anomaly_percentage),
      avg_risk_score: Number(rows[0].avg_risk_score),
      last_model_run: rows[0].last_model_run?.value || new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Dashboard Summary Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
