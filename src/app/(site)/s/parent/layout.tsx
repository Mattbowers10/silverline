import { TenantShell } from "@/components/site/TenantShell";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return <TenantShell tenant="parent">{children}</TenantShell>;
}
