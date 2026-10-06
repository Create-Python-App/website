import { ArrowDown } from 'lucide-react';

interface DiagramWorkflowProps {
  title?: string;
  className?: string;
  steps: readonly string[];
  decision?: {
    question: string;
    branches: readonly { label: string; outcome: string }[];
  };
}

export function DiagramWorkflow({ title, className = '', steps, decision }: DiagramWorkflowProps) {
  return (
    <figure className={`overflow-hidden rounded-lg border bg-card ${className}`}>
      {title && (
        <figcaption className="border-b bg-muted/50 px-4 py-2">
          <h3 className="font-medium">{title}</h3>
        </figcaption>
      )}
      <div className="space-y-3 p-4">
        <ol className="mx-auto max-w-2xl space-y-2">
          {steps.map((step, index) => (
            <li key={step} className="flex flex-col items-center gap-2">
              <div className="flex w-full items-center gap-3 rounded-md border bg-background px-4 py-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-foreground">{step}</span>
              </div>
              {index < steps.length - 1 && <ArrowDown aria-hidden="true" className="size-4 text-muted-foreground" />}
            </li>
          ))}
        </ol>
        {decision && (
          <section className="mx-auto max-w-2xl space-y-3" aria-label={decision.question}>
            <h4 className="text-center text-sm font-semibold text-foreground">{decision.question}</h4>
            <ul className="grid gap-3 sm:grid-cols-2">
              {decision.branches.map((branch) => (
                <li key={branch.label} className="rounded-md border bg-background p-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">{branch.label}</span>
                  <p className="mt-1 text-sm text-muted-foreground">{branch.outcome}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </figure>
  );
}
