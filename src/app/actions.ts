
'use server';

import {
  atsResumeOptimization,
  type AtsResumeOptimizationOutput,
} from '@/ai/flows/ats-resume-optimization';

interface ActionResult {
  data: AtsResumeOptimizationOutput | null;
  error: string | null;
}

export async function getOptimizationSuggestions(
  prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const resumeText = formData.get('resumeText') as string;
  const jobDescription = formData.get('jobDescription') as string;

  if (!resumeText || !jobDescription) {
    return { data: null, error: 'Resume and job description cannot be empty.' };
  }

  try {
    const result = await atsResumeOptimization({ resumeText, jobDescription });
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
    return { data: null, error: `AI analysis failed: ${errorMessage}` };
  }
}
