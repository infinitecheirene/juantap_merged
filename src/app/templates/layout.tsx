import Link from "next/link";
import { TermsModal } from "@/app/TermsModal";
import TemplateGalleryServer from "@/components/templates/template-gallery-server";
import { TemplateHeader } from "@/components/templates/template-header";
import HomeClient from "./page";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ variant = "light", className }: LogoProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-400 flex items-center justify-center">
        <span className="text-white font-serif font-bold text-sm">JT</span>
      </div>
      <span
        className={cn(
          "text-xl font-bold",
          variant === "light"
            ? "bg-gradient-to-r from-cyan-500 to-indigo-300 bg-clip-text text-transparent"
            : "text-white"
        )}
      >
        JuanTap
      </span>
    </div>
  );
}


export default function HomePage() {
      const footerSections = [
    {
      title: "Product",
      links: [
        { href: "#", label: "Features" },
        { href: "#", label: "Templates" },
        { href: "#", label: "Pricing" },
      ],
    },
    {
      title: "Support",
      links: [
        { href: "#", label: "Help Center" },
        { href: "#", label: "Contact Us" },
      ],
    },
    {
      title: "User Agreement",
      links: [{ href: "#", label: "Terms of Service" }],
    },
  ];

    return (
        <>
            {/* Client-side UI + hooks */}
            <HomeClient />

            {/* Server components */}
            <TemplateHeader />
            <TemplateGalleryServer />

            {/* Footer */}
      <footer className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Logo variant="dark" />
              </div>
              <p className="text-purple-200/80">
                Create and share your digital profile with the world. One tap,
                endless possibilities.
              </p>
            </div>

            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2 text-purple-200/70">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.label === "Terms of Service" ? (
                        <TermsModal />
                      ) : (
                        <Link
                          href={link.href}
                          className="hover:text-pink-200 transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-purple-200/60">
            <p>&copy; 2025 JuanTap. All rights reserved.</p>
          </div>
        </div>
      </footer>
        </>
    );
}
