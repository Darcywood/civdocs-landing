import OpenAI from 'openai';
import type { Step1Data, Step2Data, PdfContent } from './schema';
import { buildContentFromAnswers } from './buildContent';

const OUTPUT_SCHEMA = `{
  "company_overview": "string (3-4 short paragraphs separated by \\n\\n. Each paragraph is 2-3 sentences. Paragraph 1: establish who they are, location, years of experience. Paragraph 2: what they specialise in and how they work. Paragraph 3: team, plant, and delivery approach. Paragraph 4 (optional): safety, compliance, client commitment. Use industry phrasing like 'mobilise', 'scope of works', 'practical completion'. Incorporate mission statement if provided.)",
  "core_capabilities": ["string (each 1-2 sentences describing the capability, not just a label)"],
  "regions": ["string"],
  "project_experience": [{"name": "string", "client": "string | null", "location": "string | null", "duration": "string | null", "scope": "string (2-3 sentences expanding on the scope with industry language — describe methodology, scale, deliverables. Do NOT fabricate facts, but expand on what's provided.)", "challenges": "string | null (if provided, expand into 1-2 sentences about the challenge and how it was overcome)", "value": "string | null", "outcome": "string | null (if provided, expand into a sentence)"}],
  "plant_and_equipment": [{"name": "string", "description": "string (1-2 sentences on capability, capacity, or how it is used on civil projects)"}],
  "key_personnel": [{"name": "string", "role": "string", "experience": "string (expand into 2-3 sentences about their background, skills, and contribution to the business)"}],
  "compliance": ["string"],
  "audience_note": "string | null"
}`;

export async function enrichWithAI(
  step1: Step1Data,
  step2: Step2Data
): Promise<{ content: PdfContent; aiUsed: boolean }> {
  const fallback = buildContentFromAnswers(step1, step2);
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { content: fallback, aiUsed: false };
  }

  try {
    const openai = new OpenAI({ apiKey });
    const answersText = JSON.stringify(
      {
        step1: {
          businessName: step1.businessName,
          locationRegions: step1.locationRegions,
          yearsOperating: step1.yearsOperating,
          businessType: step1.businessType,
          coreServices: step1.coreServices,
          coreServicesOther: step1.coreServicesOther,
          typicalClients: step1.typicalClients,
          missionStatement: step1.missionStatement,
          phone: step1.phone,
          abn: step1.abn,
          website: step1.website,
          contactEmail: step1.contactEmail,
        },
        step2: {
          projects: step2.projects,
          averageProjectSize: step2.averageProjectSize,
          keyPersonnel: step2.keyPersonnel,
          plantEquipment: step2.plantEquipment,
          plantEquipmentOther: step2.plantEquipmentOther,
          compliance: step2.compliance,
          complianceOther: step2.complianceOther,
          audience: step2.audience,
        },
      },
      null,
      2
    );

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an elite copywriter specialising in Australian civil construction capability statements for tenders.

Your tone: authoritative, professional, confident. Write like a senior estimator who knows the industry inside-out.

Industry phrasing to use naturally: "mobilise", "scope of works", "practical completion", "subcontractor management", "program of works", "quality assurance", "site establishment", "earthworks operations", "civil infrastructure", "asset delivery", "compliance framework".

Rules:
- ONLY use information provided. Never invent certifications, project values, client names, awards, or capabilities not mentioned.
- You MAY expand on provided scope descriptions with industry-appropriate detail (e.g. methodology, scale) — but do not fabricate specific facts.
- Write longer, more descriptive copy. The company overview should be 4-6 sentences. Project scopes should be 2-3 sentences each.
- Core capabilities should each be a 1-2 sentence description, not just a label.
- Key personnel experience should be a full sentence about their contribution.
- If a mission statement is provided, weave it into the company overview.
- If a field is missing or empty, omit it entirely.
- Output valid JSON matching this schema exactly: ${OUTPUT_SCHEMA}`,
        },
        {
          role: 'user',
          content: `Transform these answers into a premium, tender-ready capability statement JSON. Expand the copy to read like a professionally written document, but stay faithful to the provided data:\n\n${answersText}`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const raw = response.choices[0]?.message?.content;
    if (!raw) throw new Error('Empty AI response');

    const parsed = JSON.parse(raw) as PdfContent;
    if (!parsed.company_overview || !Array.isArray(parsed.core_capabilities)) {
      throw new Error('Invalid AI output structure');
    }

    return { content: parsed, aiUsed: true };
  } catch (err) {
    console.warn('[AI] Enrichment failed, using fallback:', err);
    return { content: fallback, aiUsed: false };
  }
}
