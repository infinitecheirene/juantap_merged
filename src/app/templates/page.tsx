import Link from "next/link";
import { TermsModal } from "@/app/TermsModal";
import TemplateGalleryServer from "@/components/templates/template-gallery-server";
import { TemplateHeader } from "@/components/templates/template-header";
import HomeClient, { Logo } from "./layout";

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
      {/* Client UI */}
      <HomeClient />

      {/* Server-rendered content */}
      <TemplateHeader />
      <TemplateGalleryServer />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-12 px-4">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <Logo variant="dark" />
            <p className="text-purple-200/80 mt-4">
              Create and share your digital profile with the world.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.label === "Terms of Service" ? (
                      <TermsModal />
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </>
  );
}
