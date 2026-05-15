import { TenantShell } from "@/components/site/TenantShell";
import { CartProvider } from "@/components/shop/CartContext";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <TenantShell tenant="parent">{children}</TenantShell>
    </CartProvider>
  );
}
