'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { getOptimizationSuggestions } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Briefcase, FileText, Lightbulb, Loader2, Wand2 } from 'lucide-react';

const initialState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto" size="lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Optimizing...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Optimize My Resume
        </>
      )}
    </Button>
  );
}

export function OptimizationTool() {
  const [state, formAction] = useFormState(getOptimizationSuggestions, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <div className="w-full max-w-7xl flex-1">
      <form action={formAction} className="grid h-full gap-8 md:grid-cols-2">
        <Card className="flex flex-col shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline">Your Details</CardTitle>
            </div>
            <CardDescription>
              Paste your resume and the job description you're targeting.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col space-y-6">
            <div className="space-y-2">
              <Label htmlFor="resumeText" className="flex items-center gap-2 font-medium">
                <FileText className="h-4 w-4 text-muted-foreground" />
                Your Resume
              </Label>
              <Textarea
                id="resumeText"
                name="resumeText"
                placeholder="Paste your full resume text here..."
                className="min-h-[200px] flex-1 md:min-h-[250px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobDescription" className="flex items-center gap-2 font-medium">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                Job Description
              </Label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                placeholder="Paste the job description here..."
                className="min-h-[200px] flex-1 md:min-h-[250px]"
                required
              />
            </div>
          </CardContent>
          <div className="p-6 pt-0">
             <SubmitButton />
          </div>
        </Card>

        <Card className="flex flex-col shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lightbulb className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline">AI-Powered Suggestions</CardTitle>
            </div>
            <CardDescription>
              Receive tailored advice to beat the bots and land an interview.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col">
            {state.data?.suggestions ? (
              <div className="text-sm max-w-none flex-1 overflow-auto rounded-md border bg-muted/50 p-4 whitespace-pre-wrap font-sans">
                {state.data.suggestions}
              </div>
            ) : (
              <div className="flex h-full min-h-[400px] flex-1 flex-col items-center justify-center rounded-md border border-dashed bg-muted/20 text-center">
                <div className="p-8">
                  <Wand2 className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Your optimization suggestions will appear here once you submit your details.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
