import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { LuLeaf } from "react-icons/lu";
import { getProduct, relatedProducts, PRODUCTS } from "@/lib/products";
import ShopHeader from "@/components/cart/ShopHeader";
import ProductGallery from "@/components/cart/ProductGallery";
import AddToCart from "@/components/cart/AddToCart";
import ProductInfoTabs from "@/components/cart/ProductInfoTabs";
import JanoshikReportModal from "@/components/cart/JanoshikReportModal";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  return {
    title: product ? `${product.name} — Vora Labs` : "Product — Vora Labs",
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedProducts(slug);

  return (
    <main className="min-h-screen bg-ivory">
      <ShopHeader />

      <div className="container-x py-12 lg:py-16">
        {/* breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-navy/50">
          <Link href="/" className="hover:text-navy">
            Home
          </Link>
          <span>/</span>
          <Link href="/#products" className="hover:text-navy">
            Products
          </Link>
          <span>/</span>
          <span className="text-navy/80">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-14">
          {/* LEFT — product image gallery */}
          <div className="relative">
            <ProductGallery images={product.gallery} alt={product.name} />
          </div>

          {/* RIGHT — short details + cart */}
          <div className="flex flex-col">
            <span className="inline-flex w-fit rounded-full bg-beige px-4 py-1.5 text-[13px] font-semibold uppercase tracking-wider text-navy/70">
              {product.category}
            </span>
            <h1 className="mt-5 font-serif text-4xl leading-tight text-navy lg:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-navy/70">
              {product.tagline}
            </p>

            <div className="mt-6 flex items-end gap-3">
              <span className="font-serif text-5xl text-navy">
                {product.priceLabel}
              </span>
              <span className="mb-1.5 text-navy/50">GBP</span>
            </div>

            {/* tags */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {product.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#f0fbd9] px-4 py-1.5 text-[13px] font-medium text-navy"
                >
                  <FiCheck size={13} /> {t}
                </span>
              ))}
            </div>

            {/* add to cart */}
            <div className="mt-8">
              <AddToCart product={product} />
            </div>

            {/* Description + Safety Protocol */}
            <div className="mt-8 rounded-2xl border border-sand bg-white/60 p-5 text-[15px] leading-relaxed text-navy/75">
              <p>{product.description}</p>
              <p className="mt-4 rounded-xl bg-[#fff6d6]/60 px-4 py-3 text-[13px] leading-relaxed text-navy/80">
                <strong className="text-navy">Safety Protocol:</strong>{" "}
                Produced for laboratory research only. Not for human or veterinary consumption.
              </p>
            </div>

            {/* Janoshik Analytical Report button (opens modal) */}
            {product.janoshikUrl ? (
              <JanoshikReportModal
                reportUrl={product.janoshikUrl}
                productName={product.name}
                batchNumber={product.batchNumber}
                sampleImages={product.janoshikSamples}
              />
            ) : (
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-navy/15 bg-white/50 px-6 py-3 text-[14px] font-semibold text-navy/50">
                <LuLeaf size={16} />
                Janoshik Analytical Report — coming soon
              </span>
            )}

            {/* Janoshik Third-Party Lab Analysis panel */}
            <section className="mt-8 rounded-[24px] border border-sand bg-white p-6 sm:p-7">
              <div className="text-center">
                <h2 className="font-serif text-2xl text-navy">
                  Janoshik Third-Party Lab Analysis
                </h2>
                <p className="mt-2 text-[14px] text-navy/60">
                  Independently tested and verified by Janoshik Analytical.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <StatCard label="Batch Number" value={product.batchNumber} />
                <StatCard label="Fill Volume" value={product.fillVolume} />
                <StatCard label="Purity" value={product.purity} />
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-sand">
                <table className="w-full text-left text-[14px]">
                  <thead>
                    <tr className="bg-beige text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/60">
                      <th className="px-4 py-3">Compound</th>
                      <th className="px-4 py-3">Concentration</th>
                      <th className="px-4 py-3">Verified Content</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand bg-white text-navy">
                    {product.analytes.map((a) => (
                      <tr key={a.compound}>
                        <td className="px-4 py-3.5 font-medium">{a.compound}</td>
                        <td className="px-4 py-3.5">{a.concentration}</td>
                        <td className="px-4 py-3.5">{a.verifiedContent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-[12px] text-navy/55">
                Concentration is measured per mL; verified content reflects the total
                assayed mass across the stated fill volume.
              </p>
            </section>

            {/* Info tabs */}
            <section className="mt-6 rounded-[24px] border border-sand bg-white p-6 sm:p-7">
              <ProductInfoTabs
                tabs={[
                  {
                    key: "package",
                    label: "Package Contents",
                    body: (
                      <ul className="space-y-3">
                        {product.packageContents.map((c) => (
                          <li key={c} className="flex items-start gap-3">
                            <span className="mt-1 grid h-5 w-5 flex-none place-items-center rounded-full bg-lime/50 text-navy">
                              <FiCheck size={12} />
                            </span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    key: "storage",
                    label: "Storage Logic",
                    body: <p>{product.storageLogic}</p>,
                  },
                  {
                    key: "supply",
                    label: "Supply Chain",
                    body: <p>{product.supplyChain}</p>,
                  },
                ]}
              />
            </section>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <section className="mt-24">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-serif text-3xl text-navy lg:text-4xl">
              Related Products
            </h2>
            <Link
              href="/#products"
              className="group hidden items-center gap-2 text-[15px] font-medium text-navy/70 hover:text-navy sm:flex"
            >
              View all
              <FiArrowUpRight className="transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group rounded-[26px] border border-sand bg-white p-4 transition-all duration-500 ease-smooth hover:-translate-y-1.5 hover:shadow-[0_40px_70px_-50px_rgba(4,52,96,0.5)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-beige">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width:1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.2s] ease-smooth group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-5">
                  <div>
                    <p className="font-serif text-xl text-navy">{p.name}</p>
                    <p className="mt-1 text-sm text-navy/50">{p.category}</p>
                  </div>
                  <span className="font-serif text-2xl text-navy">
                    {p.priceLabel}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-sand bg-beige/40 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-navy/50">
        {label}
      </p>
      <p className="mt-1.5 font-serif text-lg text-navy">{value}</p>
    </div>
  );
}
