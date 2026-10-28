import { useEffect, useState } from "react";
import ProductsSection from "../components/Products";
import ProductModal from "../components/ProductModal";

export default function ProductsPage() {
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    if (!activeProduct) return;

    const scrollEl = document.querySelector(".content-scroll");
    const scrollY = scrollEl ? scrollEl.scrollTop : 0;
    const prevOverflow = scrollEl ? scrollEl.style.overflow : "";
    if (scrollEl) scrollEl.style.overflow = "hidden";

    return () => {
      if (scrollEl) {
        scrollEl.style.overflow = prevOverflow;
        scrollEl.scrollTop = scrollY;
      }
    };
  }, [activeProduct]);

  return (
    <>
      <div className={activeProduct ? "pointer-events-none blur-md brightness-[0.6]" : ""}>
        <ProductsSection onSelectProduct={setActiveProduct} />
      </div>
      {activeProduct && (
        <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      )}
    </>
  );
}
