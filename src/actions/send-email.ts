"use server";

import { Resend } from "resend";
import { z } from "zod";

// REMOVI A INICIALIZAÇÃO DAQUI.
// Se a chave falhar aqui, o site inteiro vai abaixo.

const ContactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  success?: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message?: string;
};

export async function sendEmail(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // 1. INICIALIZAR AQUI DENTRO (SEGURANÇA)
  // Assim o site carrega sempre, mesmo se a chave estiver em falta.
  const resend = new Resend(process.env.RESEND_API_KEY);

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const validatedFields = ContactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to send message.",
    };
  }

  const { name, email, message } = validatedFields.data;

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "ricardo.casais.404@example.com", // O teu email real
      subject: `New message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Database Error: Failed to send email." };
  }
}
