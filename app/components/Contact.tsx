"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Copy, Check } from "lucide-react";
import { translations, Language } from "../i18n/translations";

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

  const [copiedContactKey, setCopiedContactKey] = useState<string | null>(null);
  const [copyToastMessage, setCopyToastMessage] = useState<string | null>(null);
  const copyResetTimeoutRef = useRef<number | null>(null);
  const toastResetTimeoutRef = useRef<number | null>(null);

  const [contactForm, setContactForm] = useState<ContactFormData>({
    email: "",
    subject: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [contactStatusMessage, setContactStatusMessage] = useState("");

  useEffect(() => {
    return () => {
      if (copyResetTimeoutRef.current) {
        window.clearTimeout(copyResetTimeoutRef.current);
      }
      if (toastResetTimeoutRef.current) {
        window.clearTimeout(toastResetTimeoutRef.current);
      }
    };
  }, []);

  const showCopyToast = (label: string) => {
    const copiedText = language === "es" ? "copiado correctamente" : "copied successfully";
    setCopyToastMessage(`${label} - ${copiedText}`);

    if (toastResetTimeoutRef.current) {
      window.clearTimeout(toastResetTimeoutRef.current);
    }

    toastResetTimeoutRef.current = window.setTimeout(() => {
      setCopyToastMessage(null);
    }, 1800);
  };

  const copyTextToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch {
      const tempInput = document.createElement("textarea");
      tempInput.value = textToCopy;
      tempInput.setAttribute("readonly", "");
      tempInput.style.position = "absolute";
      tempInput.style.left = "-9999px";
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    }
  };

  const handleCopyContactValue = async (
    event: React.MouseEvent<HTMLButtonElement>,
    itemKey: string,
    textToCopy: string,
    label: string
  ) => {
    event.preventDefault();
    event.stopPropagation();

    await copyTextToClipboard(textToCopy);

    setCopiedContactKey(itemKey);
    showCopyToast(label);

    if (copyResetTimeoutRef.current) {
      window.clearTimeout(copyResetTimeoutRef.current);
    }

    copyResetTimeoutRef.current = window.setTimeout(() => {
      setCopiedContactKey((current) => (current === itemKey ? null : current));
    }, 1400);
  };

  const handleContactInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setContactStatusMessage(t.successMsg);
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
    { icon: Mail, label: t.email, value: "wilmixmer@gmail.com", href: "mailto:wilmixmer@gmail.com", copyOnClick: true },
    { icon: Phone, label: t.phone, value: "+57 302 244 7855", href: "tel:+573022447855", copyOnClick: true },
    { icon: DiscordIcon, label: "Discord", value: "wilmixmer", href: "https://discordapp.com/users/wilmixmer" },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "@wilmer-andres-iriarte-camargo",
      href: "https://www.linkedin.com/in/wilmer-andres-iriarte-camargo-629372291",
    },
    { icon: Github, label: "GitHub Main", value: "@wilmixmerDev", href: "https://github.com/wilmixmerDev" },
    { icon: Github, label: "GitHub Sec.", value: "@wilmixmer", href: "https://github.com/wilmixmer" },
  ];

  return (
    <section
      id="contact"
      className="relative mb-8 px-4 py-8 sm:px-6 sm:py-16 md:mb-20 md:px-24 md:py-40"
    >
      <AnimatePresence>
        {copyToastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-6 right-4 z-120 overflow-hidden rounded-xl border border-white/30 bg-black/80 px-4 py-3 text-[10px] uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-md md:bottom-8 md:right-20"
          >
            <div className="absolute left-0 top-0 flex h-0.5 w-full">
              <div className="h-full w-1/3 bg-[#00A2E8]" />
              <div className="h-full w-1/3 bg-[#10069F]" />
              <div className="h-full w-1/3 bg-[#E32118]" />
            </div>
            {copyToastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed right-6 top-1/2 z-90 hidden -translate-y-1/2 lg:flex">
        <div className="pointer-events-auto flex flex-col gap-3">
          {contactDetails.map((link, index) => {
            const Icon = link.icon;
            const href = link.href ?? "#contact";
            const isGithub = link.label === "GitHub Main" || link.label === "GitHub Sec.";
            const badgeText = link.label === "GitHub Main" ? "Main" : link.label === "GitHub Sec." ? "Sec" : null;

            return (
              <motion.a
                key={`${link.label}-${index}-desktop`}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={
                  link.copyOnClick
                    ? async (event) => {
                        event.preventDefault();
                        await copyTextToClipboard(link.value);
                        showCopyToast(link.label);
                      }
                    : undefined
                }
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.35, ease: "easeOut" }}
                whileHover={{ scale: 1.07, x: -4 }}
                whileTap={{ scale: 0.96 }}
                className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white/90 backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-white/15 hover:text-white"
                aria-label={link.label}
              >
                <Icon size={18} />
                {isGithub && (
                  <span className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 select-none rounded-full border border-white/60 bg-white/90 px-2 py-px text-[9px] font-bold text-[#10069F] shadow-sm">
                    {badgeText}
                  </span>
                )}
              </motion.a>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-16 -left-16 translate-y-1/4 -translate-x-1/4 opacity-[0.04] sm:opacity-[0.06]">
        <svg viewBox="0 0 500 500" className="h-64 w-64 sm:h-80 sm:w-80 md:h-104 md:w-104">
          <circle cx="250" cy="250" r="240" stroke="white" strokeWidth="12" fill="none" />
          <circle cx="250" cy="250" r="155" stroke="white" strokeWidth="12" fill="none" />
          <circle cx="250" cy="250" r="248" stroke="white" strokeWidth="4" fill="none" />
          <path d="M 250 95 A 155 155 0 0 1 405 250 L 250 250 Z" fill="white" />
          <path d="M 250 405 A 155 155 0 0 1 95 250 L 250 250 Z" fill="white" />
        </svg>
      </div>

      <div className="mx-auto grid w-full max-w-full grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col"
        >
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:gap-4 lg:hidden">
            {contactDetails.map((item, index) => {
              const Icon = item.icon;
              const itemKey = `${item.label}-${item.value}`;
              const wasCopied = copiedContactKey === itemKey;

              return (
                <motion.a
                  key={`${itemKey}-${index}`}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.05 * index, duration: 0.35, ease: "easeOut" }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.995 }}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-white/25 bg-black/35 px-4 py-3 text-white/95 backdrop-blur-md transition-all duration-300 hover:border-white/45 hover:bg-white/10 sm:gap-4 sm:px-6 sm:py-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/95 sm:h-11 sm:w-11">
                    <Icon size={20} />
                  </span>

                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-[11px]">
                      {item.label}
                    </span>
                    <span className="block truncate text-base font-semibold text-white sm:text-[1.72rem] md:text-lg">
                      {item.value}
                    </span>
                  </span>

                  <div className="ml-2 flex items-center gap-2 sm:gap-3">
                    {item.copyOnClick && (
                      <button
                        type="button"
                        onClick={(event) => handleCopyContactValue(event, itemKey, item.value, item.label)}
                        aria-label={`Copy ${item.label}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white/85 transition-all duration-300 hover:border-white/45 hover:bg-white/10 hover:text-white"
                      >
                        {wasCopied ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    )}
                    <span className="text-lg leading-none text-white/65 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-white/95">
                      &rarr;
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="mb-4 flex h-0.75 w-20 origin-left overflow-hidden rounded-full sm:mb-6 sm:w-28"
          >
            <div className="h-full w-1/3 bg-[#00A2E8]" />
            <div className="h-full w-1/3 bg-[#10069F]" />
            <div className="h-full w-1/3 bg-[#E32118]" />
          </motion.div>

          <motion.h2
            variants={{
              hidden: { opacity: 1 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            className="font-headline mb-4 text-3xl font-bold leading-[0.95] tracking-tight text-white sm:mb-6 sm:text-4xl md:mb-8 md:text-5xl lg:text-6xl xl:text-7xl"
          >
            {t.title.split(" ").map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="mr-[0.2em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          <p className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base lg:text-lg xl:text-xl">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-2 sm:mt-4 md:mt-0"
        >
          <div className="glass-panel relative overflow-hidden rounded-2xl border border-white/15 p-5 backdrop-blur-xl sm:p-7 md:rounded-3xl md:border-white/20 md:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/5 blur-3xl transition-all duration-700" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-white/5 blur-3xl transition-all duration-700" />
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#00A2E8]/10 blur-2xl sm:h-40 sm:w-40 md:h-52 md:w-52" />

            <p className="relative z-10 mb-5 text-sm font-medium leading-relaxed text-white/55 sm:mb-6 sm:text-base">
              {t.formIntro}
            </p>

            <form onSubmit={handleContactSubmit} className="relative z-10 mt-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="px-1 text-[10px] font-bold uppercase tracking-widest text-white/50">
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
                  className="w-full rounded-2xl border border-white/5 bg-white/5 p-5 text-sm font-light text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-white/30 focus:bg-white/10 focus:ring-4 focus:ring-white/5"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="px-1 text-[10px] font-bold uppercase tracking-widest text-white/50">
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
                  className="w-full rounded-2xl border border-white/5 bg-white/5 p-5 text-sm font-light text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-white/30 focus:bg-white/10 focus:ring-4 focus:ring-white/5"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="px-1 text-[10px] font-bold uppercase tracking-widest text-white/50">
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
                  className="w-full resize-none rounded-2xl border border-white/5 bg-white/5 p-5 text-sm font-light text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-white/30 focus:bg-white/10 focus:ring-4 focus:ring-white/5"
                ></textarea>
              </div>

              <motion.button
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={contactStatus === "sending"}
                className="group relative mt-6 flex w-full cursor-none items-center justify-between overflow-hidden rounded-full bg-linear-to-r from-[#00A2E8] via-[#10069F] to-[#E32118] p-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_40px_rgba(0,0,0,0.25)] transition-all"
              >
                <div className="relative z-10 flex items-center gap-3 pl-6">
                  <span>{contactStatus === "sending" ? t.submitSending : t.submitBtn}</span>
                </div>

                <motion.div
                  variants={{ hover: { rotate: -45, scale: 1.05 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/85 text-white"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </motion.div>

                <motion.div
                  variants={{ hover: { opacity: 1, scale: 1.5 } }}
                  initial={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute right-6 top-1/2 z-0 h-20 w-20 -translate-y-1/2 rounded-full bg-[#10069F]/70 blur-2xl"
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
