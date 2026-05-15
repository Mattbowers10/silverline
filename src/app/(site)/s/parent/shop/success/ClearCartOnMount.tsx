"use client";

import * as React from "react";
import { useCart } from "@/components/shop/CartContext";

/** Empties the local cart once Stripe Checkout has confirmed the order. */
export function ClearCartOnMount() {
  const { clear } = useCart();
  React.useEffect(() => {
    clear();
  }, [clear]);
  return null;
}
