import { getBigQueryClient, BeneficiaryDetail, generateRiskReasons } from '@/lib/bigquery';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ beneficiary_id: string }> }
) {
  try {
    const { beneficiary_id } = await params;

    if (!beneficiary_id) {
      return NextResponse.json(
        { success: false, error: 'beneficiary_id is required' },
        { status: 400 }
      );
    }

    const bigquery = getBigQueryClient();

    // Exact SQL as per requirement - Full beneficiary detail
    const query = `
      SELECT
        fr.beneficiary_id,
        fr.is_anomaly,
        fr.mean_squared_error AS risk_score,
        fr.total_txns,
        fr.avg_amount,
        fr.txns_last_30d,
        fr.unique_dealers,
        fr.cross_district_txns,
        b.residence_district,
        b.residence_block,
        b.household_size,
        b.income_bracket
      FROM \`gfg-fot.lpg_fraud_detection.fraud_results\` fr
      JOIN \`gfg-fot.lpg_fraud_detection.Beneficiaries\` b
      ON fr.beneficiary_id = b.beneficiary_id
      WHERE fr.beneficiary_id = @beneficiary_id
    `;

    const options = {
      query,
      params: { beneficiary_id },
    };

    const [job] = await bigquery.createQueryJob(options);
    const [rows] = await job.getQueryResults();

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Beneficiary not found' },
        { status: 404 }
      );
    }

    const row = rows[0];
    const result: BeneficiaryDetail = {
      beneficiary_id: row.beneficiary_id,
      residence_district: row.residence_district || 'Unknown',
      residence_block: row.residence_block || 'Unknown',
      household_size: Number(row.household_size) || 0,
      income_bracket: row.income_bracket || 'Unknown',
      risk_score: Number(row.risk_score) || 0,
      is_anomaly: row.is_anomaly || false,
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
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Beneficiary Detail Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
