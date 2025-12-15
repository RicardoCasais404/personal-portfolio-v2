"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { contactData } from "@/data/content";
import { sendEmail } from "@/actions/send-email";
import { SectionWrapper } from "@/components/SectionWrapper";
import { cn } from "@/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      // INTERAÇÃO MOBILE: active:bg-transparent active:text-[#26150f]
      className="w-full px-8 py-4 bg-[#26150f] text-[#d9d9d9] text-base font-bold uppercase tracking-wider border-2 border-[#26150f] transition-all duration-300 hover:bg-transparent hover:text-[#26150f] active:bg-transparent active:text-[#26150f] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export function Contact() {
  const [state, formAction] = useActionState(sendEmail, {
    success: false,
    message: "",
  });

  return (
    <SectionWrapper
      id="contact"
      className="relative w-full min-h-[80vh] py-20 px-6 md:px-12 md:py-32 bg-[#d9d9d9] flex flex-col justify-center"
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="w-full md:w-1/2">
            <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold uppercase leading-[1.1] text-[#26150f] mb-6">
              {contactData.title}
            </h2>
            <p className="text-xl md:text-2xl font-normal text-[#26150f] max-w-[60ch] mb-12">
              {contactData.text}
            </p>
            <div className="flex flex-wrap items-center gap-8">
              {contactData.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative pb-1 text-base font-bold text-[#26150f] uppercase tracking-wide"
                >
                  {social.name}
                  {/* INTERAÇÃO MOBILE: group-active:w-0 */}
                  <span className="absolute bottom-0 left-0 h-px w-full bg-[#26150f] transition-all duration-300 group-hover:w-0 group-active:w-0" />
                </a>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <form action={formAction} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-bold uppercase tracking-wider text-[#26150f]"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-transparent border-b-2 border-[#26150f]/20 py-3 text-lg text-[#26150f] focus:border-[#26150f] focus:outline-none transition-colors placeholder:text-[#26150f]/30"
                />
                {state.errors?.name && (
                  <p className="text-red-600 text-sm font-medium">
                    {state.errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-bold uppercase tracking-wider text-[#26150f]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-transparent border-b-2 border-[#26150f]/20 py-3 text-lg text-[#26150f] focus:border-[#26150f] focus:outline-none transition-colors placeholder:text-[#26150f]/30"
                />
                {state.errors?.email && (
                  <p className="text-red-600 text-sm font-medium">
                    {state.errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-bold uppercase tracking-wider text-[#26150f]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-transparent border-b-2 border-[#26150f]/20 py-3 text-lg text-[#26150f] focus:border-[#26150f] focus:outline-none transition-colors resize-none placeholder:text-[#26150f]/30"
                />
                {state.errors?.message && (
                  <p className="text-red-600 text-sm font-medium">
                    {state.errors.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <SubmitButton />
              </div>

              {state.message && (
                <p
                  className={cn(
                    "text-sm font-bold uppercase tracking-wide mt-2",
                    state.success ? "text-green-700" : "text-red-600"
                  )}
                >
                  {state.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
