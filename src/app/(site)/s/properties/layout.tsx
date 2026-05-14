import { TenantShell } from "@/components/site/TenantShell";

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return <TenantShell tenant="properties">{children}</TenantShell>;
}
