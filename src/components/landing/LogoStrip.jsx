const LOGOS = [
  "Stripe", "Shopify", "Notion", "Linear", "Figma",
  "Loom", "PlanetScale", "Supabase", "Resend", "Cal.com",
  "Vercel", "Hashicorp", "Cloudflare", "Prisma", "Raycast",
  "Stripe", "Shopify", "Notion", "Linear", "Figma",
  "Loom", "PlanetScale", "Supabase", "Resend", "Cal.com",
  "Vercel", "Hashicorp", "Cloudflare", "Prisma", "Raycast",
];

export default function LogoStrip() {
  return (
    <section
      className="py-16 border-t border-b"
      style={{
        backgroundColor: "#091540",
        borderColor: "rgba(245,240,246,0.06)",
      }}
    >
      <p className="text-center text-white/25 text-xs font-semibold uppercase tracking-widest mb-10">
        Trusted by engineering teams worldwide
      </p>
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #091540, transparent)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #091540, transparent)" }}
        />

        <div className="flex animate-marquee gap-14 w-max items-center">
          {LOGOS.map((logo, i) => (
            <span
              key={i}
              className="text-white/20 hover:text-white/50 transition-colors duration-300 font-semibold text-lg whitespace-nowrap cursor-default font-space-grotesk select-none"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}