import type { ContentStatus } from '../../types/database';

const STYLES: Record<ContentStatus, string> = {
  DRAFT: 'border-[#A99EAE] text-[#A99EAE]',
  PUBLISHED: 'border-[#B84DFF] text-[#B84DFF]',
  ARCHIVED: 'border-[#18131D] text-[#A99EAE] opacity-70',
};
const LABEL: Record<ContentStatus, string> = { DRAFT: 'Draft', PUBLISHED: 'Published', ARCHIVED: 'Archived' };

export function StatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span className={`inline-block text-xs border rounded px-2 py-0.5 ${STYLES[status]}`}>{LABEL[status]}</span>
  );
}
