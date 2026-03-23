"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { translations, Language } from "../i18n/translations";
import { Mail, Phone, Github, Linkedin } from "lucide-react";

const DiscordIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

type ContactFormData = {
  email: string;
  subject: string;
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact({ language }: { language: Language }) {
  const t = translations[language].contact;

  const [contactForm, setContactForm] = useState<ContactFormData>({
    email: "",
    subject: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [contactStatusMessage, setContactStatusMessage] = useState("");

  const handleContactInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setContactForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (contactStatus !== "idle") {
      setContactStatus("idle");
      setContactStatusMessage("");
    }
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      email: contactForm.email.trim(),
      subject: contactForm.subject.trim(),
      message: contactForm.message.trim(),
    };

    if (!formData.email || !formData.subject || !formData.message) {
      setContactStatus("error");
      setContactStatusMessage(t.requiredMsg);
      return;
    }

    if (!EMAIL_REGEX.test(formData.email)) {
      setContactStatus("error");
      setContactStatusMessage(t.invalidEmailMsg);
      return;
    }

    setContactStatus("sending");
    setContactStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error((response.status >= 500 ? t.errorMsg : data?.error) || t.errorMsg);
      }

      setContactStatus("success");
      setContactStatusMessage(data?.message || t.successMsg);
      setContactForm({ email: "", subject: "", message: "" });
      setTimeout(() => {
        setContactStatus("idle");
        setContactStatusMessage("");
      }, 2000);
    } catch (error) {
      setContactStatus("error");
      setContactStatusMessage(error instanceof Error ? error.message : t.errorMsg);
      setTimeout(() => {
        setContactStatus("idle");
        setContactStatusMessage("");
      }, 2000);
    }
  };

  const contactDetails = [
    { icon: Mail, label: t.email, value: "wilmixmer@gmail.com" },
    { icon: Phone, label: t.phone, value: "+57 302 244 7855" },
    { icon: DiscordIcon, label: "Discord", value: "wilmixmer", href: "https://discordapp.com/users/wilmixmer" },
    { icon: Linkedin, label: "LinkedIn", value: "@wilmer-andres-iriarte-camargo", href: "https://www.linkedin.com/in/wilmer-andres-iriarte-camargo-629372291" },
    { icon: Github, label: "GitHub Main", value: "@wilmixmerDev", href: "https://github.com/wilmixmerDev" },
    { icon: Github, label: "GitHub Sec.", value: "@wilmixmer", href: "https://github.com/wilmixmer" },
  ];

  return (
    <section id="contact" className="mb-12 px-5 py-16 sm:px-6 sm:py-24 md:mb-20 md:px-24 md:py-40">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            variants={{
              hidden: { opacity: 1 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className="font-headline mb-8 text-3xl font-bold leading-[0.95] tracking-tight text-white sm:mb-10 sm:text-4xl md:mb-14 md:text-5xl lg:text-6xl xl:text-7xl"
          >
            {t.title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                className="inline-block mr-[0.2em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p 
            variants={{
              hidden: { opacity: 1 },
              show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.3 } }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className="mb-10 max-w-lg text-base font-light leading-relaxed text-white/50 sm:mb-12 sm:text-lg md:mb-14 md:text-xl"
          >
            {t.subtitle.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 }
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
          
          <div className="flex flex-wrap gap-4 mt-8 relative z-50">
            {contactDetails.map((link, index) => {
              const Icon = link.icon;
              
              const Element = link.href ? motion.a : motion.div;
              
              return (
                <Element
                  key={index}
                  href={link.href}
                  target={link.href ? "_blank" : undefined}
                  rel={link.href ? "noopener noreferrer" : undefined}
                  whileHover="hover"
                  initial="initial"
                  className="group flex items-center rounded-full border border-white/10 bg-white/5 p-4 transition-colors duration-300 hover:bg-white hover:border-white cursor-none"
                >
                  <div className="text-white group-hover:text-black transition-colors duration-300">
                    <Icon size={22} />
                  </div>
                  <motion.div 
                    variants={{
                      initial: { width: 0, opacity: 0, marginLeft: 0 },
                      hover: { width: "auto", opacity: 1, marginLeft: 12 }
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden whitespace-nowrap flex flex-col"
                  >
                    <span className="text-[9px] uppercase tracking-widest text-black/50 leading-none mb-1">
                      {link.label}
                    </span>
                    <span className="text-xs font-semibold text-black leading-none">
                      {link.value}
                    </span>
                  </motion.div>
                </Element>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass-panel relative overflow-hidden rounded-2xl border border-white/15 p-5 backdrop-blur-xl sm:p-7 md:rounded-3xl md:p-12 md:border-white/20">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl transition-all duration-700 bg-white/5" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full blur-3xl transition-all duration-700 bg-white/5" />

            <p className="relative z-10 mb-5 text-sm font-medium leading-relaxed text-white/55 sm:mb-6 sm:text-base">
              {t.formIntro}
            </p>

            <form onSubmit={handleContactSubmit} className="relative z-10 flex flex-col gap-6 mt-8">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 px-1">
                  {t.formFields.email}
                </label>
                <input
                  name="email"
                  type="email"
                  value={contactForm.email}
                  onChange={handleContactInputChange}
                  placeholder={t.placeholders.email}
                  required
                  disabled={contactStatus === "sending"}
                  className="w-full rounded-2xl border border-white/5 bg-white/5 p-5 text-sm font-light text-white outline-none transition-all duration-300 focus:border-white/30 focus:bg-white/10 focus:ring-4 focus:ring-white/5 placeholder:text-white/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 px-1">
                  {t.formFields.subject}
                </label>
                <input
                  name="subject"
                  type="text"
                  value={contactForm.subject}
                  onChange={handleContactInputChange}
                  placeholder={t.placeholders.subject}
                  required
                  disabled={contactStatus === "sending"}
                  className="w-full rounded-2xl border border-white/5 bg-white/5 p-5 text-sm font-light text-white outline-none transition-all duration-300 focus:border-white/30 focus:bg-white/10 focus:ring-4 focus:ring-white/5 placeholder:text-white/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/50 px-1">
                  {t.formFields.message}
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={contactForm.message}
                  onChange={handleContactInputChange}
                  placeholder={t.placeholders.message}
                  required
                  disabled={contactStatus === "sending"}
                  className="w-full resize-none rounded-2xl border border-white/5 bg-white/5 p-5 text-sm font-light text-white outline-none transition-all duration-300 focus:border-white/30 focus:bg-white/10 focus:ring-4 focus:ring-white/5 placeholder:text-white/20"
                ></textarea>
              </div>

              <motion.button
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={contactStatus === "sending"}
                className="mt-6 w-full rounded-full bg-white p-[6px] text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all flex items-center justify-between relative overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.15)] group cursor-none"
              >
                <div className="pl-6 flex items-center gap-3 relative z-10">
                  <span>{contactStatus === "sending" ? t.submitSending : t.submitBtn}</span>
                </div>
                <motion.div 
                  variants={{ hover: { rotate: -45, scale: 1.05, backgroundColor: "#3b82f6" } }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white relative z-10"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </motion.div>
                <motion.div 
                  variants={{ hover: { opacity: 1, scale: 1.5 } }}
                  initial={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-blue-500 blur-2xl z-0"
                />
              </motion.button>
              
              {contactStatusMessage && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-xs ${contactStatus === "success" ? "text-green-400" : "text-red-400"}`}
                >
                  {contactStatusMessage}
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
