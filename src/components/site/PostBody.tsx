import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

type Props = {
  content: unknown;
};

/**
 * Renders Payload Lexical rich text inside our editorial post layout.
 * Wrapped in a typography container that styles headings, lists, links,
 * blockquotes consistently across all blog posts.
 */
export function PostBody({ content }: Props) {
  if (!content) {
    return (
      <p className="text-[length:var(--text-18)] leading-relaxed text-[var(--color-muted)]">
        This post has no body content yet.
      </p>
    );
  }

  const data = content as SerializedEditorState;

  return (
    <div className="prose-silverline space-y-6 text-[length:var(--text-18)] leading-[1.7] text-[var(--color-text)]/90">
      <RichText data={data} />
    </div>
  );
}
