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

// ============================================
// Type definitions for API responses
// Using NEW table: fraud_with_explanations
// ============================================

export interface DashboardSummary {
  total_beneficiaries: number;
  high_risk: number;
  medium_risk: number;
  low_risk: number;
}

export interface RiskDistribution {
  risk_level: string;
  count: number;
}

// NEW: Updated to include flag columns from fraud_with_explanations
export interface HighRiskBeneficiary {
  beneficiary_id: string;
  risk_level: string;
  mean_squared_error: number;
  flag_high_recent_activity: boolean;
  flag_multiple_dealers: boolean;
  flag_cross_district: boolean;
  flag_high_lifetime_usage: boolean;
}

export interface BeneficiaryDetail {
  beneficiary_id: string;
  risk_level: string;
  mean_squared_error: number;
  flags: {
    high_recent_activity: boolean;
    multiple_dealers: boolean;
    cross_district: boolean;
    high_lifetime_usage: boolean;
  };
  reasons: string[];           // Human-readable reasons (static)
  gemini_explanation?: string; // AI-polished explanation (optional)
}

export interface DistrictRisk {
  residence_district: string;
  anomaly_count: number;
}

// ============================================
// Helper: Generate human-readable reasons from flags
// DETERMINISTIC - No AI inference here
// ============================================
export function generateReasonsFromFlags(flags: {
  high_recent_activity: boolean;
  multiple_dealers: boolean;
  cross_district: boolean;
  high_lifetime_usage: boolean;
}): string[] {
  const reasons: string[] = [];
  
  if (flags.high_recent_activity) {
    reasons.push('Unusually high number of LPG refills in the last 30 days');
  }
  
  if (flags.multiple_dealers) {
    reasons.push('Refills taken from multiple dealers');
  }
  
  if (flags.cross_district) {
    reasons.push('LPG refills detected across districts');
  }
  
  if (flags.high_lifetime_usage) {
    reasons.push('Higher-than-expected lifetime refill count');
  }
  
  if (reasons.length === 0) {
    reasons.push('Refill behavior aligns with historical and regional norms');
  }
  
  return reasons;
}
