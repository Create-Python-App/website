'use client';

import mermaid from 'mermaid';
import { useEffect, useRef } from 'react';

interface DiagramWorkflowProps {
  chart: string;
  title?: string;
  className?: string;
}

export function DiagramWorkflow({ chart, title, className = '' }: DiagramWorkflowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      securityLevel: 'loose',
    });

    if (ref.current) {
      mermaid.render('mermaid-svg', chart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      });
    }
  }, [chart]);

  return (
    <div className={`overflow-hidden rounded-lg border bg-card ${className}`}>
      {title && (
        <div className="border-b bg-muted/50 px-4 py-2">
          <h3 className="font-medium">{title}</h3>
        </div>
      )}
      <div className="p-4">
        <div ref={ref} className="flex justify-center" />
      </div>
    </div>
  );
}
