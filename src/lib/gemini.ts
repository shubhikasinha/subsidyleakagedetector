// Gemini API Integration for Multi-language Explanations
// IMPORTANT: Gemini is ONLY a language polisher - NOT a decision maker
// All fraud flags come from deterministic BigQuery rules

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

// Reason code to human-readable mapping (used as fallback)
const REASON_TEMPLATES: Record<string, Record<string, string>> = {
  en: {
    high_recent_activity: 'Unusually high number of LPG refills detected in the last 30 days',
    multiple_dealers: 'Refills recorded from multiple dealers in short time period',
    cross_district: 'LPG refills detected across different districts',
    high_lifetime_usage: 'Higher-than-expected lifetime refill count compared to regional norms',
    normal: 'Refill behavior aligns with historical and regional norms',
  },
  hi: {
    high_recent_activity: 'पिछले 30 दिनों में असामान्य रूप से अधिक एलपीजी रिफिल पाए गए',
    multiple_dealers: 'कम समय में एकाधिक डीलरों से रिफिल दर्ज किए गए',
    cross_district: 'विभिन्न जिलों से एलपीजी रिफिल पाए गए',
    high_lifetime_usage: 'क्षेत्रीय मानकों की तुलना में अपेक्षा से अधिक जीवनकाल रिफिल संख्या',
    normal: 'रिफिल व्यवहार ऐतिहासिक और क्षेत्रीय मानकों के अनुरूप है',
  },
  hinglish: {
    high_recent_activity: 'Pichhle 30 dinon mein unusually zyada LPG refills detect hui hain',
    multiple_dealers: 'Multiple dealers se short time mein refills recorded hain',
    cross_district: 'Alag-alag districts se LPG refills detect hui hain',
    high_lifetime_usage: 'Regional norms ki tulna mein lifetime refill count zyada hai',
    normal: 'Refill behavior historical aur regional norms ke according hai',
  },
};

// Convert flag codes to reason strings
export function flagsToReasonCodes(flags: {
  flag_high_recent_activity: boolean;
  flag_multiple_dealers: boolean;
  flag_cross_district: boolean;
  flag_high_lifetime_usage: boolean;
}): string[] {
  const reasons: string[] = [];
  
  if (flags.flag_high_recent_activity) reasons.push('high_recent_activity');
  if (flags.flag_multiple_dealers) reasons.push('multiple_dealers');
  if (flags.flag_cross_district) reasons.push('cross_district');
  if (flags.flag_high_lifetime_usage) reasons.push('high_lifetime_usage');
  
  if (reasons.length === 0) reasons.push('normal');
  
  return reasons;
}

// Get static explanations (fallback - no API call)
export function getStaticExplanations(
  reasonCodes: string[],
  language: 'en' | 'hi' | 'hinglish' = 'en'
): string[] {
  const templates = REASON_TEMPLATES[language] || REASON_TEMPLATES.en;
  return reasonCodes.map(code => templates[code] || templates.normal);
}

// Generate AI-powered explanation via Gemini (with safety guards)
export async function generateGeminiExplanation(
  riskLevel: string,
  reasonCodes: string[],
  language: 'en' | 'hi' | 'hinglish' = 'hinglish'
): Promise<string> {
  // If no API key, use static fallback
  if (!GEMINI_API_KEY) {
    const staticReasons = getStaticExplanations(reasonCodes, language);
    return staticReasons.join('\n');
  }

  const languageMap: Record<string, string> = {
    en: 'English (formal, administrative)',
    hi: 'Hindi (formal, government style)',
    hinglish: 'Hinglish (simple Hindi + English mix)',
  };

  // STRICT prompt - Gemini only polishes language, never adds reasons
  const prompt = `You are generating explanations for a government audit dashboard.

Rules:
- Do NOT add new reasons
- Do NOT infer intent or fraud
- Do NOT mention machine learning or prediction
- Do NOT use words like "suspicious", "fraud", "illegal", "criminal"
- Use neutral, administrative language

Risk Level: ${riskLevel}
Reasons:
${reasonCodes.map(r => `- ${r}`).join('\n')}

Output Language: ${languageMap[language] || languageMap.hinglish}
Tone: Clear, non-accusatory, human-readable

Generate a brief explanation (2-3 sentences max) suitable for a government officer reviewing this case.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3, // Low temperature for consistent output
          maxOutputTokens: 200,
        },
      }),
    });

    if (!response.ok) {
      console.error('Gemini API error:', response.status);
      return getStaticExplanations(reasonCodes, language).join('\n');
    }

    const data = await response.json();
    const explanation = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // SAFETY GUARD: Filter out any inappropriate language that slipped through
    const blockedWords = ['fraud', 'intent', 'prediction', 'suspicious', 'criminal', 'illegal', 'model thinks'];
    const hasBlockedWord = blockedWords.some(word => 
      explanation.toLowerCase().includes(word)
    );

    if (hasBlockedWord || !explanation.trim()) {
      console.warn('Gemini output filtered due to policy constraints');
      return getStaticExplanations(reasonCodes, language).join('\n');
    }

    return explanation.trim();
  } catch (error) {
    console.error('Gemini API call failed:', error);
    return getStaticExplanations(reasonCodes, language).join('\n');
  }
}

// Get risk level badge text
export function getRiskBadgeText(riskLevel: string, language: 'en' | 'hi' | 'hinglish' = 'en'): string {
  const badges: Record<string, Record<string, string>> = {
    en: {
      HIGH: 'High Risk – Review Recommended',
      MEDIUM: 'Medium Risk – Monitor',
      LOW: 'Low Risk – Normal',
    },
    hi: {
      HIGH: 'उच्च जोखिम – समीक्षा आवश्यक',
      MEDIUM: 'मध्यम जोखिम – निगरानी',
      LOW: 'कम जोखिम – सामान्य',
    },
    hinglish: {
      HIGH: 'High Risk – Audit Review Recommended',
      MEDIUM: 'Medium Risk – Monitoring Required',
      LOW: 'Low Risk – Normal Pattern',
    },
  };
  
  return badges[language]?.[riskLevel] || badges.en[riskLevel] || 'Unknown Risk';
}
