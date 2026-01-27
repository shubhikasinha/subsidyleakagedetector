import { BigQuery } from '@google-cloud/bigquery';
import path from 'path';

// Singleton BigQuery client
let bigqueryClient: BigQuery | null = null;

export function getBigQueryClient(): BigQuery {
  if (!bigqueryClient) {
    bigqueryClient = new BigQuery({
      projectId: 'gfg-fot',
      keyFilename: path.join(process.cwd(), 'gcp-key.json'),
    });
  }
  return bigqueryClient;
}

// Type definitions for API responses
export interface DashboardSummary {
  total_records: number;
  anomalies_detected: number;
  anomaly_percentage: number;
  avg_risk_score: number;
  last_model_run: string;
}

export interface HighRiskBeneficiary {
  beneficiary_id: string;
  residence_district: string;
  risk_score: number;
  total_txns: number;
  avg_amount: number;
  txns_last_30d: number;
  unique_dealers: number;
  cross_district_txns: number;
  risk_reasons: string[];
}

export interface BeneficiaryDetail {
  beneficiary_id: string;
  residence_district: string;
  residence_block: string;
  household_size: number;
  income_bracket: string;
  risk_score: number;
  is_anomaly: boolean;
  total_txns: number;
  avg_amount: number;
  txns_last_30d: number;
  unique_dealers: number;
  cross_district_txns: number;
  risk_reasons: string[];
}

export interface DistrictRisk {
  residence_district: string;
  anomaly_count: number;
}

export interface AlertCandidate {
  beneficiary_id: string;
  risk_score: number;
}

// Helper: Generate risk reasons based on features
export function generateRiskReasons(
  cross_district_txns: number,
  total_txns: number,
  unique_dealers: number,
  txns_last_30d: number
): string[] {
  const reasons: string[] = [];
  
  if (cross_district_txns > 0) {
    reasons.push(`Cross-district transactions detected (${cross_district_txns})`);
  }
  if (total_txns > 50) {
    reasons.push(`Unusually high transaction count (${total_txns})`);
  }
  if (unique_dealers > 5) {
    reasons.push(`Multiple dealer usage (${unique_dealers} dealers)`);
  }
  if (txns_last_30d > 10) {
    reasons.push(`High recent activity (${txns_last_30d} txns in 30 days)`);
  }
  
  if (reasons.length === 0) {
    reasons.push('Behavioral pattern deviation detected by ML model');
  }
  
  return reasons;
}
