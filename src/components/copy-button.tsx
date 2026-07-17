'use client';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';

export function CopyButton({
  command,
  ...props
}: ButtonProps & {
  command: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button onClick={handleCopy} {...props}>
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="mr-2 h-4 w-4" />
          Copy Command
        </>
      )}
    </Button>
  );
}
