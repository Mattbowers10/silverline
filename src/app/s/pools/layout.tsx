import { TenantShell } from "@/components/site/TenantShell";

export default function PoolsLayout({ children }: { children: React.ReactNode }) {
  return <TenantShell tenant="pools">{children}</TenantShell>;
}
