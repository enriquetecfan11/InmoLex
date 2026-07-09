import nodemailer from "nodemailer";
import {
  QUERY_TYPE_LABELS,
  type ContactFormPayload,
} from "@/lib/contact-form";
import { PROPERTIES } from "@/lib/properties";

function getMailConfig() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  const notificationEmail = process.env.CONTACT_NOTIFICATION_EMAIL;

  if (!user || !pass || !notificationEmail) {
    throw new Error("Email configuration is missing.");
  }

  return { user, pass, notificationEmail };
}

function createTransporter() {
  const { user, pass } = getMailConfig();

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user,
      pass,
    },
  });
}

function getPropertyLabel(propertyId?: string) {
  if (!propertyId) return "Sin propiedad asociada";

  const property = PROPERTIES.find((item) => item.id === propertyId);
  return property ? `${property.title} (${property.location})` : propertyId;
}

function buildTeamText(payload: ContactFormPayload) {
  return [
    "Nuevo mensaje de contacto — InmoLex",
    "",
    `Nombre: ${payload.name}`,
    `Email: ${payload.email}`,
    `Teléfono: ${payload.phone || "No indicado"}`,
    `Tipo de consulta: ${QUERY_TYPE_LABELS[payload.queryType]}`,
    `Propiedad: ${getPropertyLabel(payload.propertyId)}`,
    "",
    "Mensaje:",
    payload.message,
  ].join("\n");
}

function buildTeamHtml(payload: ContactFormPayload) {
  return `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
      <h2 style="color: #a68b3f; margin-bottom: 16px;">Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Teléfono:</strong> ${payload.phone || "No indicado"}</p>
      <p><strong>Tipo de consulta:</strong> ${QUERY_TYPE_LABELS[payload.queryType]}</p>
      <p><strong>Propiedad:</strong> ${getPropertyLabel(payload.propertyId)}</p>
      <p><strong>Mensaje:</strong></p>
      <p style="white-space: pre-wrap;">${payload.message}</p>
    </div>
  `;
}

function buildUserText(payload: ContactFormPayload) {
  return [
    `Hola ${payload.name},`,
    "",
    "Hemos recibido tu mensaje correctamente. Nuestro equipo te responderá en menos de 24 horas laborables.",
    "",
    "Resumen de tu consulta:",
    `- Tipo: ${QUERY_TYPE_LABELS[payload.queryType]}`,
    `- Propiedad: ${getPropertyLabel(payload.propertyId)}`,
    "",
    "Gracias por confiar en InmoLex.",
  ].join("\n");
}

function buildUserHtml(payload: ContactFormPayload) {
  return `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
      <h2 style="color: #a68b3f; margin-bottom: 16px;">Hemos recibido tu mensaje</h2>
      <p>Hola ${payload.name},</p>
      <p>Hemos recibido tu mensaje correctamente. Nuestro equipo te responderá en menos de 24 horas laborables.</p>
      <p><strong>Tipo de consulta:</strong> ${QUERY_TYPE_LABELS[payload.queryType]}</p>
      <p><strong>Propiedad:</strong> ${getPropertyLabel(payload.propertyId)}</p>
      <p>Gracias por confiar en InmoLex.</p>
    </div>
  `;
}

export async function sendTeamNotification(payload: ContactFormPayload) {
  const { user, notificationEmail } = getMailConfig();
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"InmoLex Web" <${user}>`,
    to: notificationEmail,
    replyTo: payload.email,
    subject: `Nuevo contacto: ${QUERY_TYPE_LABELS[payload.queryType]} — ${payload.name}`,
    text: buildTeamText(payload),
    html: buildTeamHtml(payload),
  });
}

export async function sendUserConfirmation(payload: ContactFormPayload) {
  const { user } = getMailConfig();
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"InmoLex" <${user}>`,
    to: payload.email,
    subject: "Hemos recibido tu mensaje — InmoLex",
    text: buildUserText(payload),
    html: buildUserHtml(payload),
  });
}
