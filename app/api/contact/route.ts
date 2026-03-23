export const runtime = "nodejs";

import nodemailer from "nodemailer";

type ContactPayload = {
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

const isValidEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const hasSafeLength = (value: string, max: number) => value.length > 0 && value.length <= max;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const email = typeof body.email === "string" ? body.email.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!email || !subject || !message) {
      return Response.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { error: "El correo ingresado no es válido." },
        { status: 400 }
      );
    }

    if (!hasSafeLength(subject, 140) || !hasSafeLength(message, 4000)) {
      return Response.json(
        { error: "El asunto o mensaje excede el tamaño permitido." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT ?? 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = (process.env.SMTP_PASS ?? "").replace(/\s+/g, "");
    const contactToEmail = process.env.CONTACT_TO_EMAIL;
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL ?? smtpUser;
    const contactFromName = process.env.CONTACT_FROM_NAME ?? "Contacto Portafolio";

    if (!smtpHost || !smtpUser || !smtpPass || !contactToEmail || !contactFromEmail) {
      return Response.json(
        { error: "Falta configurar SMTP en variables de entorno." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"${contactFromName} (${email})" <${contactFromEmail}>`,
      sender: contactFromEmail,
      envelope: {
        from: smtpUser,
        to: contactToEmail,
      },
      to: contactToEmail,
      replyTo: email,
      subject: `[Portafolio] ${subject} — de ${email}`,
      headers: {
        "X-Portfolio-Visitor-Email": email,
      },
      text: `Nuevo mensaje desde el formulario de contacto\n\nEmail: ${email}\nAsunto: ${subject}\n\nMensaje:\n${message}`,
      html: `
        <h2>Nuevo mensaje desde el portafolio</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return Response.json({
      message: "Mensaje enviado correctamente. Te responderé pronto.",
    });
  } catch {
    return Response.json(
      { error: "No se pudo enviar el mensaje. Intenta nuevamente." },
      { status: 500 }
    );
  }
}
