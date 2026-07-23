import Image from 'next/image';
import { COMMUNITY_LOGO_SRC } from '@/lib/community';
import { cn } from '@/lib/utils';

export function CommunityLogo({
  className,
  size = 40,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src={COMMUNITY_LOGO_SRC}
      alt="Create Awesome community"
      width={size}
      height={size}
      priority={priority}
      className={cn('rounded-md object-cover', className)}
    />
  );
}
