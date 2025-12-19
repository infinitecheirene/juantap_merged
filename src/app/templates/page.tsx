"use client";

import { useEffect, useState } from "react";
import { TemplateGallery } from "@/components/templates/template-gallery";
import { TemplateHeader } from "@/components/templates/template-header";
import { getAllTemplates } from "@/lib/template-data";

export default function HomePage() {
  const [templates, setTemplates] = useState<any[]>([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const data = await getAllTemplates();
      setTemplates(data);
    };
    fetchTemplates();
  }, []);

  return (
    <main>
      <TemplateHeader />
      <TemplateGallery templates={templates} />
    </main>
  );
}
