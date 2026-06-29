import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import { getProduct, relatedProducts, PRODUCTS } from "@/lib/products";
import ShopHeader from "@/components/cart/ShopHeader";
import ProductGallery from "@/components/cart/ProductGallery";
import AddToCart from "@/components/cart/AddToCart";
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

        <div className="grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-14">
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
