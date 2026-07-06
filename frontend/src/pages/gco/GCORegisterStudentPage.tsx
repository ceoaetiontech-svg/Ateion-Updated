import { useState } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, Lock, Eye, EyeOff, Calendar, School, Globe,
  ChevronRight, GraduationCap, Trophy, CheckCircle, Rocket, Heart,
} from "lucide-react";
import GCONavbar from "../../app/components/GCONavbar";
import SharedFooter from "../../app/components/SharedFooter";
import "../../styles/gco/index.css";
import "../../styles/gco/fonts.css";
import "../../styles/gco/theme.css";
import "../../styles/gco/pill-navbar.css";
import "../../styles/gco/gco-registration.css";

const SUBJECTS = ["Mathematics", "Science", "AI & Technology", "Coding", "English", "Social Studies", "Commerce", "Arts"];
const BOARDS = ["CBSE", "ICSE", "State Board", "IB", "IGCSE", "Other"];
const AGE_GROUPS = ["Primary (Class 1-5)", "Secondary (Class 6-10)", "Higher Secondary (Class 11-12)", "College / University"];
const GENDERS = ["Male", "Female", "Non-Binary", "Prefer not to say"];

const steps = ["Personal Details", "Academic Info", "Olympiad Preferences", "Confirm"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function GCORegisterStudentPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const [form, setForm] = useState({
    fullName: "", email: "", mobile: "", password: "", confirmPassword: "",
    dob: "", gender: "",
    ageGroup: "", schoolName: "", classGrade: "", board: "", city: "", state: "", country: "India",
    subjects: [] as string[], previousExperience: "",
  });

  const setField = (key: keyof typeof form, val: any) => setForm(f => ({ ...f, [key]: val }));

  const toggleSubject = (s: string) => {
    setForm(f => ({
      ...f,
      subjects: f.subjects.includes(s) ? f.subjects.filter(x => x !== s) : [...f.subjects, s],
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(s => s + 1);
  };
  const handleBack = () => setCurrentStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { alert("Passwords do not match!"); return; }
    if (!termsChecked) { alert("Please agree to the Terms & Conditions."); return; }
    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>Register as Student | GCO – Ateion</title>
        <meta name="description" content="Register as a student for the Global Capability Olympiad. Join thousands of students measuring thinking, not memory." />
      </Helmet>
      <GCONavbar />

      <div className="gco-reg-page">
        <div className="gco-reg-floater gco-reg-floater-1" />
        <div className="gco-reg-floater gco-reg-floater-2" />

        <div className="gco-reg-content">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" variants={fadeUp} initial="hidden" animate="show">
                <div className="gco-reg-card">
                  <div className="gco-reg-success">
                    <div className="gco-reg-success-icon"><GraduationCap size={28} /></div>
                    <h2>Registration Submitted!</h2>
                    <p>Welcome aboard, {form.fullName}! Your student registration for the Global Capability Olympiad has been received. Check your email for confirmation.</p>
                    <button className="gco-reg-submit" style={{ maxWidth: 260, margin: "0 auto" }} onClick={() => navigate("/gco")}>
                      Back to GCO Page
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" variants={fadeUp} initial="hidden" animate="show">
                {/* Header */}
                <div className="gco-reg-header">
                  <div className="gco-reg-badge">
                    <div className="gco-reg-badge-dot" />
                    Global Capability Olympiad
                  </div>
                  <h1 className="gco-reg-title">
                    Register as <span>Student</span>
                  </h1>
                  <p className="gco-reg-subtitle">
                    Join the world's first preparation-free, syllabus-free Olympiad. Measure your thinking, not memory.
                  </p>
                </div>

                {/* Steps */}
                <div className="gco-reg-steps" style={{ marginBottom: 32 }}>
                  {steps.map((label, i) => (
                    <div key={label} style={{ display: "flex", alignItems: "center" }}>
                      <div className={`gco-reg-step ${i < currentStep ? "done" : i === currentStep ? "active" : ""}`}>
                        <div className="gco-reg-step-num">
                          {i < currentStep ? (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : i + 1}
                        </div>
                        <span className="gco-reg-step-label">{label}</span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`gco-reg-step-line ${i < currentStep ? "done" : ""}`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Card */}
                <div className="gco-reg-card">
                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">

                      {/* ── STEP 0: Personal Details ── */}
                      {currentStep === 0 && (
                        <motion.div key="step0" variants={fadeUp} initial="hidden" animate="show" exit={{ opacity: 0, y: -16 }}>
                          <div className="gco-reg-section-header">
                            <div className="gco-reg-section-icon"><User size={18} /></div>
                            <div>
                              <p className="gco-reg-section-title">Personal Details</p>
                              <p className="gco-reg-section-desc">Basic information about you</p>
                            </div>
                          </div>

                          <div className="gco-reg-form-section">
                            <div className="gco-reg-grid">
                              {/* Full Name */}
                              <div className="gco-reg-field gco-reg-full">
                                <label className="gco-reg-label">Full Name <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><User size={15} /></span>
                                  <input className="gco-reg-input" type="text" placeholder="e.g. Aarav Sharma" required
                                    value={form.fullName} onChange={e => setField("fullName", e.target.value)} />
                                </div>
                              </div>

                              {/* Email */}
                              <div className="gco-reg-field">
                                <label className="gco-reg-label">Email Address <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><Mail size={15} /></span>
                                  <input className="gco-reg-input" type="email" placeholder="you@example.com" required
                                    value={form.email} onChange={e => setField("email", e.target.value)} />
                                </div>
                              </div>

                              {/* Mobile */}
                              <div className="gco-reg-field">
                                <label className="gco-reg-label">Mobile Number <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><Phone size={15} /></span>
                                  <input className="gco-reg-input" type="tel" placeholder="+91 98765 43210" required
                                    value={form.mobile} onChange={e => setField("mobile", e.target.value)} />
                                </div>
                              </div>

                              {/* Password */}
                              <div className="gco-reg-field">
                                <label className="gco-reg-label">Password <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><Lock size={15} /></span>
                                  <input className="gco-reg-input" type={showPw ? "text" : "password"} placeholder="Create a strong password" required
                                    value={form.password} onChange={e => setField("password", e.target.value)}
                                    style={{ paddingRight: 44 }} />
                                  <button type="button" className="gco-reg-pw-toggle" onClick={() => setShowPw(v => !v)}>
                                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                                  </button>
                                </div>
                              </div>

                              {/* Confirm Password */}
                              <div className="gco-reg-field">
                                <label className="gco-reg-label">Confirm Password <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><Lock size={15} /></span>
                                  <input className="gco-reg-input" type={showConfirmPw ? "text" : "password"} placeholder="Repeat your password" required
                                    value={form.confirmPassword} onChange={e => setField("confirmPassword", e.target.value)}
                                    style={{ paddingRight: 44 }} />
                                  <button type="button" className="gco-reg-pw-toggle" onClick={() => setShowConfirmPw(v => !v)}>
                                    {showConfirmPw ? <EyeOff size={15} /> : <Eye size={15} />}
                                  </button>
                                </div>
                              </div>

                              {/* Date of Birth */}
                              <div className="gco-reg-field">
                                <label className="gco-reg-label">Date of Birth <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><Calendar size={15} /></span>
                                  <input className="gco-reg-input" type="date" required
                                    value={form.dob} onChange={e => setField("dob", e.target.value)} />
                                </div>
                              </div>

                              {/* Gender */}
                              <div className="gco-reg-field">
                                <label className="gco-reg-label">Gender <span className="required">*</span></label>
                                <select className="gco-reg-select" required
                                  value={form.gender} onChange={e => setField("gender", e.target.value)}>
                                  <option value="" disabled>Select gender</option>
                                  {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                                </select>
                              </div>
                            </div>
                          </div>

                          <button type="button" className="gco-reg-submit" onClick={handleNext}>
                            Continue to Academic Details <ChevronRight size={16} style={{ marginLeft: 6, display: "inline" }} />
                          </button>
                        </motion.div>
                      )}

                      {/* ── STEP 1: Academic Details ── */}
                      {currentStep === 1 && (
                        <motion.div key="step1" variants={fadeUp} initial="hidden" animate="show" exit={{ opacity: 0, y: -16 }}>
                          <div className="gco-reg-section-header">
                            <div className="gco-reg-section-icon"><GraduationCap size={18} /></div>
                            <div>
                              <p className="gco-reg-section-title">Academic Details</p>
                              <p className="gco-reg-section-desc">Tell us about your educational background</p>
                            </div>
                          </div>

                          <div className="gco-reg-form-section">
                            <div className="gco-reg-form-section-label">Age Group</div>
                            <div className="gco-reg-radio-group" style={{ marginBottom: 20 }}>
                              {AGE_GROUPS.map(ag => (
                                <div key={ag}
                                  className={`gco-reg-radio-pill ${form.ageGroup === ag ? "selected" : ""}`}
                                  onClick={() => setField("ageGroup", ag)}>
                                  {ag}
                                </div>
                              ))}
                            </div>

                            <div className="gco-reg-grid">
                              <div className="gco-reg-field gco-reg-full">
                                <label className="gco-reg-label">School / College Name <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><School size={15} /></span>
                                  <input className="gco-reg-input" type="text" placeholder="e.g. Delhi Public School" required
                                    value={form.schoolName} onChange={e => setField("schoolName", e.target.value)} />
                                </div>
                              </div>

                              <div className="gco-reg-field">
                                <label className="gco-reg-label">Class / Grade <span className="required">*</span></label>
                                <input className="gco-reg-input" type="text" placeholder="e.g. Grade 10 / 2nd Year" required
                                  value={form.classGrade} onChange={e => setField("classGrade", e.target.value)} />
                              </div>

                              <div className="gco-reg-field">
                                <label className="gco-reg-label">Board / Curriculum <span className="required">*</span></label>
                                <select className="gco-reg-select" required
                                  value={form.board} onChange={e => setField("board", e.target.value)}>
                                  <option value="" disabled>Select board</option>
                                  {BOARDS.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                              </div>

                              <div className="gco-reg-field">
                                <label className="gco-reg-label">City <span className="required">*</span></label>
                                <input className="gco-reg-input" type="text" placeholder="e.g. Mumbai" required
                                  value={form.city} onChange={e => setField("city", e.target.value)} />
                              </div>

                              <div className="gco-reg-field">
                                <label className="gco-reg-label">State <span className="required">*</span></label>
                                <input className="gco-reg-input" type="text" placeholder="e.g. Maharashtra" required
                                  value={form.state} onChange={e => setField("state", e.target.value)} />
                              </div>

                              <div className="gco-reg-field">
                                <label className="gco-reg-label">Country <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><Globe size={15} /></span>
                                  <input className="gco-reg-input" type="text" placeholder="e.g. India" required
                                    value={form.country} onChange={e => setField("country", e.target.value)} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="gco-reg-btn-row">
                            <button type="button" className="gco-reg-back-btn" onClick={handleBack}>← Back</button>
                            <button type="button" className="gco-reg-submit" onClick={handleNext}>
                              Continue to Olympiad Details <ChevronRight size={16} style={{ marginLeft: 6, display: "inline" }} />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* ── STEP 2: Olympiad Details ── */}
                      {currentStep === 2 && (
                        <motion.div key="step2" variants={fadeUp} initial="hidden" animate="show" exit={{ opacity: 0, y: -16 }}>
                          <div className="gco-reg-section-header">
                            <div className="gco-reg-section-icon"><Trophy size={18} /></div>
                            <div>
                              <p className="gco-reg-section-title">Olympiad Preferences</p>
                              <p className="gco-reg-section-desc">Choose your subjects and experience level</p>
                            </div>
                          </div>

                          <div className="gco-reg-form-section">
                            <div className="gco-reg-form-section-label">Subjects Interested In</div>
                            <div className="gco-reg-check-grid" style={{ marginBottom: 24 }}>
                              {SUBJECTS.map(s => (
                                <div key={s}
                                  className={`gco-reg-check-item ${form.subjects.includes(s) ? "selected" : ""}`}
                                  onClick={() => toggleSubject(s)}>
                                  <div className="gco-reg-check-box">
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                      <path d="M1.5 5L3.8 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                  <span className="gco-reg-check-label">{s}</span>
                                </div>
                              ))}
                            </div>

                            <div className="gco-reg-form-section-label">Previous Olympiad Experience</div>
                            <div className="gco-reg-radio-group" style={{ marginBottom: 24 }}>
                              {["Yes – I have participated before", "No – This will be my first time"].map(opt => (
                                <div key={opt}
                                  className={`gco-reg-radio-pill ${form.previousExperience === opt ? "selected" : ""}`}
                                  onClick={() => setField("previousExperience", opt)}>
                                  {opt}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="gco-reg-btn-row">
                            <button type="button" className="gco-reg-back-btn" onClick={handleBack}>← Back</button>
                            <button type="button" className="gco-reg-submit" onClick={handleNext}>
                              Review & Confirm <ChevronRight size={16} style={{ marginLeft: 6, display: "inline" }} />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* ── STEP 3: Confirm ── */}
                      {currentStep === 3 && (
                        <motion.div key="step3" variants={fadeUp} initial="hidden" animate="show" exit={{ opacity: 0, y: -16 }}>
                          <div className="gco-reg-section-header">
                            <div className="gco-reg-section-icon"><CheckCircle size={18} /></div>
                            <div>
                              <p className="gco-reg-section-title">Review &amp; Confirm</p>
                              <p className="gco-reg-section-desc">Review your information before submitting</p>
                            </div>
                          </div>

                          {/* Summary cards */}
                          <div style={{ display: "grid", gap: 14, marginBottom: 28 }}>
                            {[
                              { label: "Full Name", value: form.fullName },
                              { label: "Email", value: form.email },
                              { label: "Mobile", value: form.mobile },
                              { label: "Date of Birth", value: form.dob },
                              { label: "Gender", value: form.gender },
                              { label: "Age Group", value: form.ageGroup },
                              { label: "School / College", value: form.schoolName },
                              { label: "Class / Grade", value: form.classGrade },
                              { label: "Board", value: form.board },
                              { label: "Location", value: `${form.city}, ${form.state}, ${form.country}` },
                              { label: "Subjects", value: form.subjects.join(", ") || "—" },
                              { label: "Experience", value: form.previousExperience || "—" },
                            ].map(row => (
                              <div key={row.label} style={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "12px 16px",
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 10,
                                gap: 12,
                              }}>
                                <span style={{ fontSize: 13, color: "rgba(241,240,250,0.45)", flexShrink: 0 }}>{row.label}</span>
                                <span style={{ fontSize: 13, color: "#f1f0fa", fontWeight: 600, textAlign: "right" }}>{row.value || "—"}</span>
                              </div>
                            ))}
                          </div>

                          {/* Terms */}
                          <div className={`gco-reg-terms ${termsChecked ? "checked" : ""}`}
                            onClick={() => setTermsChecked(v => !v)}
                            style={{ marginBottom: 20 }}>
                            <div className="gco-reg-terms-checkbox">
                              {termsChecked && (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                  <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <p className="gco-reg-terms-text">
                              I agree to the <a href="/policies" onClick={e => e.stopPropagation()}>Terms & Conditions</a> and{" "}
                              <a href="/policies" onClick={e => e.stopPropagation()}>Privacy Policy</a> of Ateion GCO.
                            </p>
                          </div>

                          <div className="gco-reg-btn-row">
                            <button type="button" className="gco-reg-back-btn" onClick={handleBack}>← Back</button>
                            <button type="submit" className="gco-reg-submit">
                              <Rocket size={16} /> Submit Registration
                            </button>
                          </div>

                          <p className="gco-reg-login-link">
                            Already have an account?{" "}
                            <button type="button" onClick={() => navigate("/gco/login")}>Sign In</button>
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <SharedFooter />
    </>
  );
}
