import { TenantShell } from "@/components/site/TenantShell";

export default function DevelopmentsLayout({ children }: { children: React.ReactNode }) {
  return <TenantShell tenant="developments">{children}</TenantShell>;
}
