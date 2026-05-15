import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { CTABand } from "@/components/sections";
import { getProject } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

type Args = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Args) {
  const { slug } = await params;
  const project = await getProject("properties", slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.title} — Silverline Properties`,
    description:
      project.summary ?? `${project.title} — operated by the Silverline properties team.`,
    path: `/projects/${slug}`,
  });
}

export const revalidate = 60;

export default async function PropertiesProjectPage({ params }: Args) {
  const { slug } = await params;
  const project = await getProject("properties", slug);
  if (!project) notFound();
  return (
    <>
      <CaseStudy project={project} backHref="/projects" backLabel="All managed properties" />
      <CTABand
        eyebrow="Want yours here?"
        headline="Schedule a property walk-through."
        italicWord="walk-through."
        sub="30-minute walk-through and listing audit. We tell you what's working, what's not, and what we'd change."
        emailCapture={{ submitLabel: "Schedule walk-through" }}
      />
    </>
  );
}
