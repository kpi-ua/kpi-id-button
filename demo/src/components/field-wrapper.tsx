import { Label } from './ui/label';

export const FieldWrapper = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-2">
    <Label>{label}</Label>
    {children}
  </div>
);
