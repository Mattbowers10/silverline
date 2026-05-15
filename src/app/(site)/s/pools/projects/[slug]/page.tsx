import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { CTABand } from "@/components/sections";
import { getProject } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

type Args = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Args) {
  const { slug } = await params;
  const project = await getProject("pools", slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.title} — Silverline Pools`,
    description: project.summary ?? `${project.title} — by the Silverline pool team.`,
    path: `/projects/${slug}`,
  });
}

export const revalidate = 60;

export default async function PoolsProjectPage({ params }: Args) {
  const { slug } = await params;
  const project = await getProject("pools", slug);
  if (!project) notFound();
  return (
    <>
      <CaseStudy project={project} backHref="/projects" backLabel="All pool projects" />
      <CTABand
        eyebrow="Want one of your own?"
        headline="Schedule a site walk."
        italicWord="site walk."
        sub="A 60-minute walk of your yard. A true-to-scale 3D rendering. A line-item quote that matches the build."
        emailCapture={{ submitLabel: "Schedule site walk" }}
      />
    </>
  );
}
