import { getBigQueryClient, HighRiskBeneficiary, generateRiskReasons } from '@/lib/bigquery';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(Number(searchParams.get('limit')) || 50, 100); // Max 100

    const bigquery = getBigQueryClient();

    // Exact SQL as per requirement
    const query = `
      SELECT
        fr.beneficiary_id,
        b.residence_district,
        fr.mean_squared_error AS risk_score,
        fr.total_txns,
        fr.avg_amount,
        fr.txns_last_30d,
        fr.unique_dealers,
        fr.cross_district_txns
      FROM \`gfg-fot.lpg_fraud_detection.fraud_results\` fr
      JOIN \`gfg-fot.lpg_fraud_detection.Beneficiaries\` b
      ON fr.beneficiary_id = b.beneficiary_id
      WHERE fr.is_anomaly = TRUE
      ORDER BY fr.mean_squared_error DESC
      LIMIT @limit
    `;

    const options = {
      query,
      params: { limit },
    };

    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();

    const results: HighRiskBeneficiary[] = rows.map((row) => ({
      beneficiary_id: row.beneficiary_id,
      residence_district: row.residence_district || 'Unknown',
      risk_score: Number(row.risk_score),
      total_txns: Number(row.total_txns) || 0,
      avg_amount: Number(row.avg_amount) || 0,
      txns_last_30d: Number(row.txns_last_30d) || 0,
      unique_dealers: Number(row.unique_dealers) || 0,
      cross_district_txns: Number(row.cross_district_txns) || 0,
      risk_reasons: generateRiskReasons(
        Number(row.cross_district_txns) || 0,
        Number(row.total_txns) || 0,
        Number(row.unique_dealers) || 0,
        Number(row.txns_last_30d) || 0
      ),
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error('High-Risk Beneficiaries Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
