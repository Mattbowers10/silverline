import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { CTABand } from "@/components/sections";
import { getProject } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

type Args = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Args) {
  const { slug } = await params;
  const project = await getProject("developments", slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.title} — Silverline Developments`,
    description:
      project.summary ?? `${project.title} — by the Silverline build team.`,
    path: `/projects/${slug}`,
  });
}

export const revalidate = 60;

export default async function DevelopmentsProjectPage({ params }: Args) {
  const { slug } = await params;
  const project = await getProject("developments", slug);
  if (!project) notFound();
  return (
    <>
      <CaseStudy project={project} backHref="/projects" backLabel="All builds" />
      <CTABand
        eyebrow="Want yours here?"
        headline="Schedule a discovery visit."
        italicWord="discovery"
        sub="90-minute walk of your lot or home. Written, fixed-scope proposal within two weeks."
        emailCapture={{ submitLabel: "Schedule discovery visit" }}
      />
    </>
  );
}
