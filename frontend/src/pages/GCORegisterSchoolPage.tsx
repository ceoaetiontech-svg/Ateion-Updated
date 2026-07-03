import { useState } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, Mail, Phone, Lock, Eye, EyeOff, Globe, MapPin,
  User, ChevronRight, Hash,
} from "lucide-react";
import GCONavbar from "../app/components/GCONavbar";
import SharedFooter from "../app/components/SharedFooter";
import "../styles/gco/index.css";
import "../styles/gco/fonts.css";
import "../styles/gco/theme.css";
import "../styles/gco/pill-navbar.css";
import "../styles/gco/gco-registration.css";

const SCHOOL_TYPES = ["Government", "Private", "International", "Aided", "Central Government"];
const SCHOOL_BOARDS = ["CBSE", "ICSE", "State Board", "IB", "IGCSE", "Cambridge", "Other"];
const OLYMPIAD_CATS = ["Mathematics", "Science", "AI & Technology", "Coding", "English", "Logical Reasoning", "Social Science", "General Awareness"];
const GRADES = ["Pre-Primary", "Class 1-3", "Class 4-6", "Class 7-9", "Class 10", "Class 11-12"];
const DESIGNATIONS = ["Principal", "Vice Principal", "Head of Department", "Teacher", "Administrative Officer", "Coordinator"];

const steps = ["School Info", "Coordinator", "Olympiad Preferences", "Confirm"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function GCORegisterSchoolPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);

  const [form, setForm] = useState({
    schoolName: "", schoolType: "", board: "", website: "",
    country: "India", state: "", city: "", address: "", pinCode: "",
    coordName: "", designation: "", coordEmail: "", coordMobile: "",
    numStudents: "", password: "", confirmPassword: "",
  });

  const setField = (key: keyof typeof form, val: string) => setForm(f => ({ ...f, [key]: val }));

  const toggleCat = (c: string) => setSelectedCats(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  const toggleGrade = (g: string) => setSelectedGrades(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  const handleNext = () => { if (currentStep < steps.length - 1) setCurrentStep(s => s + 1); };
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
        <title>Register as School | GCO – Ateion</title>
        <meta name="description" content="Register your school for the Global Capability Olympiad. Empower your students to measure thinking, not memory." />
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
                    <div className="gco-reg-success-icon">🏫</div>
                    <h2>School Registered!</h2>
                    <p>
                      Thank you for registering <strong style={{ color: "#e8856a" }}>{form.schoolName}</strong> for GCO!
                      Our team will review your application and reach out to your coordinator shortly.
                    </p>
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
                    <div className="gco-reg-badge-dot" style={{ background: "#7c6ef0" }} />
                    Partner Institution
                  </div>
                  <h1 className="gco-reg-title">
                    Register as <span>School</span>
                  </h1>
                  <p className="gco-reg-subtitle">
                    Partner with GCO to bring the world's most innovative Olympiad to your students.
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

                <div className="gco-reg-card">
                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">

                      {/* ── STEP 0: School Information ── */}
                      {currentStep === 0 && (
                        <motion.div key="step0" variants={fadeUp} initial="hidden" animate="show" exit={{ opacity: 0, y: -16 }}>
                          <div className="gco-reg-section-header">
                            <div className="gco-reg-section-icon">🏫</div>
                            <div>
                              <p className="gco-reg-section-title">School Information</p>
                              <p className="gco-reg-section-desc">Tell us about your institution</p>
                            </div>
                          </div>

                          <div className="gco-reg-form-section">
                            <div className="gco-reg-grid">
                              <div className="gco-reg-field gco-reg-full">
                                <label className="gco-reg-label">School Name <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><Building2 size={15} /></span>
                                  <input className="gco-reg-input" type="text" placeholder="e.g. Delhi Public School, R.K. Puram" required
                                    value={form.schoolName} onChange={e => setField("schoolName", e.target.value)} />
                                </div>
                              </div>

                              <div className="gco-reg-field">
                                <label className="gco-reg-label">School Type <span className="required">*</span></label>
                                <select className="gco-reg-select" required value={form.schoolType} onChange={e => setField("schoolType", e.target.value)}>
                                  <option value="" disabled>Select type</option>
                                  {SCHOOL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                              </div>

                              <div className="gco-reg-field">
                                <label className="gco-reg-label">School Board <span className="required">*</span></label>
                                <select className="gco-reg-select" required value={form.board} onChange={e => setField("board", e.target.value)}>
                                  <option value="" disabled>Select board</option>
                                  {SCHOOL_BOARDS.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                              </div>

                              <div className="gco-reg-field gco-reg-full">
                                <label className="gco-reg-label">School Website <span style={{ color: "rgba(241,240,250,0.35)", fontSize: 11, fontWeight: 400 }}>(Optional)</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><Globe size={15} /></span>
                                  <input className="gco-reg-input" type="url" placeholder="https://yourschool.edu.in"
                                    value={form.website} onChange={e => setField("website", e.target.value)} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="gco-reg-form-section-label">Address</div>
                          <div className="gco-reg-form-section">
                            <div className="gco-reg-grid">
                              <div className="gco-reg-field">
                                <label className="gco-reg-label">Country <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><Globe size={15} /></span>
                                  <input className="gco-reg-input" type="text" placeholder="India" required
                                    value={form.country} onChange={e => setField("country", e.target.value)} />
                                </div>
                              </div>
                              <div className="gco-reg-field">
                                <label className="gco-reg-label">State <span className="required">*</span></label>
                                <input className="gco-reg-input" type="text" placeholder="e.g. Delhi" required
                                  value={form.state} onChange={e => setField("state", e.target.value)} />
                              </div>
                              <div className="gco-reg-field">
                                <label className="gco-reg-label">City <span className="required">*</span></label>
                                <input className="gco-reg-input" type="text" placeholder="e.g. New Delhi" required
                                  value={form.city} onChange={e => setField("city", e.target.value)} />
                              </div>
                              <div className="gco-reg-field">
                                <label className="gco-reg-label">PIN Code <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><Hash size={15} /></span>
                                  <input className="gco-reg-input" type="text" placeholder="110001" required
                                    value={form.pinCode} onChange={e => setField("pinCode", e.target.value)} />
                                </div>
                              </div>
                              <div className="gco-reg-field gco-reg-full">
                                <label className="gco-reg-label">Full Address <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><MapPin size={15} /></span>
                                  <input className="gco-reg-input" type="text" placeholder="Street, area, landmark..." required
                                    value={form.address} onChange={e => setField("address", e.target.value)} />
                                </div>
                              </div>
                            </div>
                          </div>

                          <button type="button" className="gco-reg-submit" onClick={handleNext}>
                            Continue to Coordinator Details <ChevronRight size={16} style={{ marginLeft: 6, display: "inline" }} />
                          </button>
                        </motion.div>
                      )}

                      {/* ── STEP 1: Coordinator Details ── */}
                      {currentStep === 1 && (
                        <motion.div key="step1" variants={fadeUp} initial="hidden" animate="show" exit={{ opacity: 0, y: -16 }}>
                          <div className="gco-reg-section-header">
                            <div className="gco-reg-section-icon">👤</div>
                            <div>
                              <p className="gco-reg-section-title">Coordinator Details</p>
                              <p className="gco-reg-section-desc">Primary contact person for GCO coordination</p>
                            </div>
                          </div>

                          <div className="gco-reg-form-section">
                            <div className="gco-reg-grid">
                              <div className="gco-reg-field gco-reg-full">
                                <label className="gco-reg-label">Coordinator Full Name <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><User size={15} /></span>
                                  <input className="gco-reg-input" type="text" placeholder="e.g. Dr. Priya Mehta" required
                                    value={form.coordName} onChange={e => setField("coordName", e.target.value)} />
                                </div>
                              </div>

                              <div className="gco-reg-field">
                                <label className="gco-reg-label">Designation <span className="required">*</span></label>
                                <select className="gco-reg-select" required value={form.designation} onChange={e => setField("designation", e.target.value)}>
                                  <option value="" disabled>Select designation</option>
                                  {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                              </div>

                              <div className="gco-reg-field">
                                <label className="gco-reg-label">Email Address <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><Mail size={15} /></span>
                                  <input className="gco-reg-input" type="email" placeholder="coordinator@school.edu.in" required
                                    value={form.coordEmail} onChange={e => setField("coordEmail", e.target.value)} />
                                </div>
                              </div>

                              <div className="gco-reg-field">
                                <label className="gco-reg-label">Mobile Number <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><Phone size={15} /></span>
                                  <input className="gco-reg-input" type="tel" placeholder="+91 98765 43210" required
                                    value={form.coordMobile} onChange={e => setField("coordMobile", e.target.value)} />
                                </div>
                              </div>

                              <div className="gco-reg-field">
                                <label className="gco-reg-label">Approximate No. of Students <span className="required">*</span></label>
                                <input className="gco-reg-input" type="number" placeholder="e.g. 500" required min="1"
                                  value={form.numStudents} onChange={e => setField("numStudents", e.target.value)} />
                              </div>
                            </div>
                          </div>

                          <div className="gco-reg-form-section">
                            <div className="gco-reg-form-section-label">Account Password</div>
                            <div className="gco-reg-grid">
                              <div className="gco-reg-field">
                                <label className="gco-reg-label">Password <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><Lock size={15} /></span>
                                  <input className="gco-reg-input" type={showPw ? "text" : "password"} placeholder="Create password" required
                                    value={form.password} onChange={e => setField("password", e.target.value)} style={{ paddingRight: 44 }} />
                                  <button type="button" className="gco-reg-pw-toggle" onClick={() => setShowPw(v => !v)}>
                                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                                  </button>
                                </div>
                              </div>
                              <div className="gco-reg-field">
                                <label className="gco-reg-label">Confirm Password <span className="required">*</span></label>
                                <div className="gco-reg-input-wrap">
                                  <span className="gco-reg-input-icon"><Lock size={15} /></span>
                                  <input className="gco-reg-input" type={showConfirmPw ? "text" : "password"} placeholder="Confirm password" required
                                    value={form.confirmPassword} onChange={e => setField("confirmPassword", e.target.value)} style={{ paddingRight: 44 }} />
                                  <button type="button" className="gco-reg-pw-toggle" onClick={() => setShowConfirmPw(v => !v)}>
                                    {showConfirmPw ? <EyeOff size={15} /> : <Eye size={15} />}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="gco-reg-btn-row">
                            <button type="button" className="gco-reg-back-btn" onClick={handleBack}>← Back</button>
                            <button type="button" className="gco-reg-submit" onClick={handleNext}>
                              Continue to Preferences <ChevronRight size={16} style={{ marginLeft: 6, display: "inline" }} />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* ── STEP 2: Olympiad Preferences ── */}
                      {currentStep === 2 && (
                        <motion.div key="step2" variants={fadeUp} initial="hidden" animate="show" exit={{ opacity: 0, y: -16 }}>
                          <div className="gco-reg-section-header">
                            <div className="gco-reg-section-icon">🏆</div>
                            <div>
                              <p className="gco-reg-section-title">Student & Olympiad Info</p>
                              <p className="gco-reg-section-desc">Help us understand your school's participation</p>
                            </div>
                          </div>

                          <div className="gco-reg-form-section">
                            <div className="gco-reg-form-section-label">Grades Available in School</div>
                            <div className="gco-reg-check-grid" style={{ marginBottom: 24 }}>
                              {GRADES.map(g => (
                                <div key={g}
                                  className={`gco-reg-check-item ${selectedGrades.includes(g) ? "selected" : ""}`}
                                  onClick={() => toggleGrade(g)}>
                                  <div className="gco-reg-check-box">
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                      <path d="M1.5 5L3.8 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                  <span className="gco-reg-check-label">{g}</span>
                                </div>
                              ))}
                            </div>

                            <div className="gco-reg-form-section-label">Interested Olympiad Categories</div>
                            <div className="gco-reg-check-grid">
                              {OLYMPIAD_CATS.map(c => (
                                <div key={c}
                                  className={`gco-reg-check-item ${selectedCats.includes(c) ? "selected" : ""}`}
                                  onClick={() => toggleCat(c)}>
                                  <div className="gco-reg-check-box">
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                      <path d="M1.5 5L3.8 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                  <span className="gco-reg-check-label">{c}</span>
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
                            <div className="gco-reg-section-icon">✅</div>
                            <div>
                              <p className="gco-reg-section-title">Review & Confirm</p>
                              <p className="gco-reg-section-desc">Review your school's registration details</p>
                            </div>
                          </div>

                          <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
                            {[
                              { label: "School Name", value: form.schoolName },
                              { label: "Type", value: form.schoolType },
                              { label: "Board", value: form.board },
                              { label: "Address", value: `${form.address}, ${form.city}, ${form.state}, ${form.pinCode}` },
                              { label: "Coordinator", value: form.coordName },
                              { label: "Designation", value: form.designation },
                              { label: "Coordinator Email", value: form.coordEmail },
                              { label: "Number of Students", value: form.numStudents },
                              { label: "Grades", value: selectedGrades.join(", ") || "—" },
                              { label: "Olympiad Categories", value: selectedCats.join(", ") || "—" },
                            ].map(row => (
                              <div key={row.label} style={{
                                display: "flex", justifyContent: "space-between",
                                padding: "12px 16px",
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                borderRadius: 10, gap: 12,
                              }}>
                                <span style={{ fontSize: 13, color: "rgba(241,240,250,0.45)", flexShrink: 0 }}>{row.label}</span>
                                <span style={{ fontSize: 13, color: "#f1f0fa", fontWeight: 600, textAlign: "right" }}>{row.value || "—"}</span>
                              </div>
                            ))}
                          </div>

                          <div className={`gco-reg-terms ${termsChecked ? "checked" : ""}`}
                            onClick={() => setTermsChecked(v => !v)} style={{ marginBottom: 20 }}>
                            <div className="gco-reg-terms-checkbox">
                              {termsChecked && (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                  <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <p className="gco-reg-terms-text">
                              I agree to the <a href="/policies" onClick={e => e.stopPropagation()}>Terms & Conditions</a> and confirm that I am authorised to register this institution.
                            </p>
                          </div>

                          <div className="gco-reg-btn-row">
                            <button type="button" className="gco-reg-back-btn" onClick={handleBack}>← Back</button>
                            <button type="submit" className="gco-reg-submit">🚀 Submit Registration</button>
                          </div>
                          <p className="gco-reg-login-link">
                            Already registered?{" "}
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
