import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { naam, email, bericht } = await request.json();

  if (!naam || !email || !bericht) {
    return NextResponse.json(
      { error: "Alle velden zijn verplicht." },
      { status: 400 }
    );
  }

  const { error } = await resend.emails.send({
    from: "Mobile Growth Studio <noreply@mobilegrowthstudio.com>",
    to: "info@mobilegrowthstudio.com",
    replyTo: email,
    subject: `Nieuw bericht van ${naam}`,
    html: `
      <p><strong>Naam:</strong> ${naam}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Bericht:</strong></p>
      <p>${bericht.replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
