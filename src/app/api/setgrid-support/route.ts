import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX = { name: 200, email: 200, topic: 200, message: 5000 };

function clean(value: unknown, max: number) {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const name = clean(input.name, MAX.name);
  const email = clean(input.email, MAX.email);
  const topic = clean(input.topic, MAX.topic);
  const message = clean(input.message, MAX.message);
  const lang = clean(input.lang, 5);

  if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Setgrid support <noreply@mobilegrowthstudio.com>",
    to: "info@mobilegrowthstudio.com",
    replyTo: email,
    subject: `Setgrid support — ${topic || "message"} (${name})`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${topic ? `<p><strong>Subject:</strong> ${escapeHtml(topic)}</p>` : ""}
      ${lang ? `<p><strong>Page language:</strong> ${escapeHtml(lang)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
