import { useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import SharedNavbar from "../app/components/SharedNavbar";
import NavbarSpacer from "../app/components/NavbarSpacer";
import SharedFooter from "../app/components/SharedFooter";
import { contactSchema } from "../lib/schemas";
import { Send, CheckCircle2, ArrowRight, MapPin, Quote } from "lucide-react";
import "../styles/contact-styles.css";
import { useRef, useEffect } from "react";

const extendedContactSchema = contactSchema.extend({
  agreed: z.boolean().refine((v) => v === true, "You must accept the privacy policy"),
});

type ContactFormInputs = z.infer<typeof extendedContactSchema>;

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setCount(Math.floor(v)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function AccentBars() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="contact-accent-bar"
    />
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(extendedContactSchema),
  });

  const onSubmit = async (data: ContactFormInputs) => {
    console.log("Contact form data submitted:", data);
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Ateion</title>
        <meta name="description" content="Get in touch with the Ateion team to learn more about the Global Capability Olympiad and modern education ecosystem." />
      </Helmet>

      <SharedNavbar />
      <NavbarSpacer />

      <div className="contact-page-root">
        <div className="contact-glow contact-glow-top" />
        <div className="contact-glow contact-glow-bottom" />

        <main className="contact-main">
          <div className="contact-container">
            {submitted ? (
              <motion.div
                className="contact-success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div
                  className="contact-success-icon-wrap"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                >
                  <CheckCircle2 size={36} />
                </motion.div>

                <motion.h2
                  className="contact-success-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  Message Sent!
                </motion.h2>

                <motion.p
                  className="contact-success-body"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  Thank you for reaching out. We'll get back to you shortly.
                </motion.p>

                <motion.button
                  className="contact-success-btn"
                  onClick={() => setSubmitted(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send another message
                </motion.button>
              </motion.div>
            ) : (
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full"
              >
                <div className="contact-layout">
                  <motion.div
                    className="contact-form-wrap"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.div className="contact-header" variants={itemVariants}>
                      <AccentBars />
                      <h1 className="contact-title">Contact Us</h1>
                    </motion.div>

                    <motion.p className="contact-description" variants={itemVariants}>
                      The Global Capability Olympiad is the world's first
                      preparation-free, syllabus-free, AI-integrated Master Olympiad
                      designed to measure thinking, not memory.
                    </motion.p>

                    <motion.form
                      onSubmit={handleSubmit(onSubmit)}
                      className="contact-form"
                      noValidate
                      variants={itemVariants}
                    >
                      <div className="contact-form-grid">
                        <div className="contact-field">
                          <input
                            type="text"
                            placeholder="First name *"
                            className={errors.firstName ? "contact-input contact-input-error" : "contact-input"}
                            aria-label="First name"
                            {...register("firstName")}
                          />
                          {errors.firstName && (
                            <span className="contact-error">{errors.firstName.message}</span>
                          )}
                        </div>

                        <div className="contact-field">
                          <input
                            type="text"
                            placeholder="Last name *"
                            className={errors.lastName ? "contact-input contact-input-error" : "contact-input"}
                            aria-label="Last name"
                            {...register("lastName")}
                          />
                          {errors.lastName && (
                            <span className="contact-error">{errors.lastName.message}</span>
                          )}
                        </div>

                        <div className="contact-field">
                          <input
                            type="email"
                            placeholder="Email *"
                            className={errors.email ? "contact-input contact-input-error" : "contact-input"}
                            aria-label="Email address"
                            {...register("email")}
                          />
                          {errors.email && (
                            <span className="contact-error">{errors.email.message}</span>
                          )}
                        </div>

                        <div className="contact-field">
                          <input
                            type="tel"
                            placeholder="Phone *"
                            className={errors.phone ? "contact-input contact-input-error" : "contact-input"}
                            aria-label="Phone number"
                            {...register("phone")}
                          />
                          {errors.phone && (
                            <span className="contact-error">{errors.phone.message}</span>
                          )}
                        </div>
                      </div>

                      <div className="contact-field contact-field-full">
                        <textarea
                          placeholder="Type your message..."
                          className={`contact-textarea${errors.message ? " contact-input-error" : ""}`}
                          aria-label="Message"
                          {...register("message")}
                        />
                        {errors.message && (
                          <span className="contact-error">{errors.message.message}</span>
                        )}
                      </div>

                      <div className="contact-footer">
                        <label className="contact-privacy">
                          <input
                            type="checkbox"
                            className="contact-checkbox"
                            {...register("agreed")}
                          />
                          <span className="contact-checkbox-label">
                            I understand that Ateion will securely hold my data in
                            accordance with their privacy policy
                          </span>
                        </label>

                        {errors.agreed && (
                          <span className="contact-error">{errors.agreed.message}</span>
                        )}

                        <button
                          type="submit"
                          className="contact-submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : (
                            <>
                              Submit
                              <Send size={16} className="contact-submit-icon" />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  </motion.div>

                  {/* ── SIDEBAR ── */}
                  <aside className="contact-sidebar">
                    {/* Stat card */}
                    <motion.div
                      className="contact-sidebar-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <div className="contact-sidebar-stat">
                        <span className="contact-sidebar-stat-number">
                          <Counter value={500} suffix="+" />
                        </span>
                        <span className="contact-sidebar-stat-label">students reached out</span>
                      </div>
                    </motion.div>

                    {/* Testimonial */}
                    <motion.div
                      className="contact-sidebar-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Quote size={20} className="contact-sidebar-quote-icon" />
                      <p className="contact-sidebar-quote-text">
                        Ateion completely transformed how we assess student capability. The GCO gave us insights traditional exams never could.
                      </p>
                      <div className="contact-sidebar-author">
                        <div className="contact-sidebar-avatar">RK</div>
                        <div>
                          <p className="contact-sidebar-author-name">Dr. Ramesh Kumar</p>
                          <p className="contact-sidebar-author-role">Principal, Delhi Public School</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Office */}
                    <motion.div
                      className="contact-sidebar-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="contact-sidebar-office">
                        <MapPin size={18} className="contact-sidebar-office-icon" />
                        <div>
                          <p className="contact-sidebar-office-name">Pune Office</p>
                          <p className="contact-sidebar-office-addr">
                            5th Floor, Wing B,<br />
                            One ICC Trade Tower,<br />
                            Senapati Bapat Rd, Pune,<br />
                            Maharashtra 411016
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </aside>
                </div>
              </motion.section>
              )}
              </div>

        </main>

        <div className="contact-footer-spacer" />
        <SharedFooter />
      </div>
    </>
  );
}
