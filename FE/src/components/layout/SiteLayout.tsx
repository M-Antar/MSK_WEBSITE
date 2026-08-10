import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer/Footer";
import { Navbar } from "./Navbar/Navbar.module";

/**
 * Site chrome (sticky navbar + footer) used by every route except /checkout.
 */
 
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="shop-root">
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
