"use client";

import * as React from "react";

const STORAGE_KEY = "silverline:cart:v1";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  unitPriceCents: number;
  /** Cached at add-time so the cart can render without re-fetching the product. */
  imageUrl?: string;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotalCents: number;
  add: (line: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

function safeRead(): CartState {
  if (typeof window === "undefined") return { lines: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { lines: [] };
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.lines)) return parsed as CartState;
    return { lines: [] };
  } catch {
    return { lines: [] };
  }
}

function safeWrite(state: CartState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CartState>({ lines: [] });
  const [hydrated, setHydrated] = React.useState(false);

  // Hydrate from localStorage after mount to avoid SSR mismatch.
  React.useEffect(() => {
    setState(safeRead());
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (hydrated) safeWrite(state);
  }, [state, hydrated]);

  const add = React.useCallback(
    (line: Omit<CartLine, "quantity"> & { quantity?: number }) => {
      setState((s) => {
        const qty = line.quantity ?? 1;
        const i = s.lines.findIndex((l) => l.productId === line.productId);
        if (i >= 0) {
          const next = [...s.lines];
          next[i] = { ...next[i], quantity: next[i].quantity + qty };
          return { lines: next };
        }
        return {
          lines: [
            ...s.lines,
            {
              productId: line.productId,
              slug: line.slug,
              name: line.name,
              unitPriceCents: line.unitPriceCents,
              imageUrl: line.imageUrl,
              quantity: qty,
            },
          ],
        };
      });
    },
    [],
  );

  const setQuantity = React.useCallback((productId: string, quantity: number) => {
    setState((s) => ({
      lines: s.lines
        .map((l) => (l.productId === productId ? { ...l, quantity } : l))
        .filter((l) => l.quantity > 0),
    }));
  }, []);

  const remove = React.useCallback((productId: string) => {
    setState((s) => ({ lines: s.lines.filter((l) => l.productId !== productId) }));
  }, []);

  const clear = React.useCallback(() => setState({ lines: [] }), []);

  const count = state.lines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotalCents = state.lines.reduce(
    (sum, l) => sum + l.unitPriceCents * l.quantity,
    0,
  );

  const value: CartContextValue = {
    lines: state.lines,
    count,
    subtotalCents,
    add,
    setQuantity,
    remove,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
