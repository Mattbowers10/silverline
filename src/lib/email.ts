import { Resend } from "resend";

/**
 * Resend transactional email wrapper.
 * Returns { skipped: true } when RESEND_API_KEY is unset so the lead
 * pipeline keeps working without an email provider configured.
 */
let cached: Resend | null | undefined;

function getResend(): Resend | null {
  if (cached !== undefined) return cached;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    cached = null;
    return null;
  }
  cached = new Resend(key);
  return cached;
}

const DEFAULT_FROM =
  process.env.RESEND_FROM_EMAIL ?? "Silverline <hello@silverlineind.com>";

export type SendResult =
  | { ok: true; id: string }
  | { ok: false; error: string }
  | { skipped: true; reason: string };

type SendArgs = {
  to: string;
  subject: string;
  text: string;
  /** Optional HTML — falls back to wrapping `text` in a basic dark-themed template. */
  html?: string;
  replyTo?: string;
};

export async function sendEmail(args: SendArgs): Promise<SendResult> {
  const client = getResend();
  if (!client) return { skipped: true, reason: "RESEND_API_KEY not set" };

  try {
    const res = await client.emails.send({
      from: DEFAULT_FROM,
      to: args.to,
      subject: args.subject,
      text: args.text,
      html: args.html ?? wrapHtml(args.text, args.subject),
      replyTo: args.replyTo,
    });
    if (res.error) return { ok: false, error: res.error.message };
    return { ok: true, id: res.data?.id ?? "" };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/** Minimal branded HTML wrapper — dark page, accent links, system fonts so
 *  every email client renders them. */
function wrapHtml(text: string, _subject: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const html = escaped.replace(/\n\n+/g, "</p><p>").replace(/\n/g, "<br>");
  return `<!doctype html>
<html lang="en">
<body style="margin:0;background:#040406;color:#ffffff;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#040406;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background:#0b0c0e;border:1px solid #1b1b20;border-radius:16px;">
        <tr><td style="padding:32px;">
          <p style="margin:0 0 24px;font-size:14px;letter-spacing:0.18em;text-transform:uppercase;color:#a1a1aa;">Silverline</p>
          <div style="font-size:16px;line-height:1.65;color:rgba(255,255,255,0.9);"><p>${html}</p></div>
          <p style="margin:32px 0 0;font-size:12px;color:#6b7280;">
            Silverline Industries · Knoxville, TN<br>
            <a href="https://silverlineind.com" style="color:#82d8f9;text-decoration:none;">silverlineind.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
