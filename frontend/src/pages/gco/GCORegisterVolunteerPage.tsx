import { useState } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, Lock, Eye, EyeOff, Calendar,
  GraduationCap, ChevronRight, LinkedinIcon as Linkedin2, Upload, MessageSquare,
} from "lucide-react";
import GCONavbar from "../../app/components/GCONavbar";
import SharedFooter from "../../app/components/SharedFooter";
import "../../styles/gco/index.css";
import "../../styles/gco/fonts.css";
import "../../styles/gco/theme.css";
import "../../styles/gco/pill-navbar.css";
import "../../styles/gco/gco-registration.css";

const VOLUNTEER_TYPES = [
  { value: "event",     label: "Event Volunteer",    icon: "🎪" },
  { value: "campus",    label: "Campus Ambassador",  icon: "🏫" },
  { value: "tech",      label: "Technical Volunteer", icon: "💻" },
  { value: "marketing", label: "Marketing Volunteer", icon: "📣" },
  { value: "content",   label: "Content Creator",    icon: "✍️" },
  { value: "social",    label: "Social Media Volunteer", icon: "📱" },
  { value: "mentor",    label: "Mentor",             icon: "🎓" },
];

const SKILLS = [
  "Communication", "Teaching", "Graphic Design", "Programming",
  "Photography", "Video Editing", "Event Management", "Public Speaking",
  "Writing", "Data Analysis", "Social Media", "Research",
];

const LANGUAGES    = ["English","Hindi","Tamil","Telugu","Kannada","Marathi","Bengali","Gujarati","Punjabi","Malayalam","Other"];
const DAYS         = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const QUALIFICATIONS = ["High School","Diploma","Bachelor's Degree","Master's Degree","PhD","Other"];
const GENDERS      = ["Male","Female","Non-Binary","Prefer not to say"];
const steps        = ["Personal Info","Education","Volunteer Role","Confirm"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function GCORegisterVolunteerPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep]     = useState(0);
  const [submitted,   setSubmitted]        = useState(false);
  const [showPw,      setShowPw]           = useState(false);
  const [showConfirmPw, setShowConfirmPw]  = useState(false);
  const [termsChecked,  setTermsChecked]   = useState(false);

  const [selectedSkills,    setSelectedSkills]    = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDays,      setSelectedDays]      = useState<string[]>([]);
  const [volunteerType,     setVolunteerType]     = useState("");

  const [form, setForm] = useState({
    fullName: "", email: "", mobile: "", password: "", confirmPassword: "",
    dob: "", gender: "",
    qualification: "", college: "", course: "", yearOfStudy: "",
    whyVolunteer: "", linkedIn: "",
  });

  const setField = (key: keyof typeof form, val: string) =>
    setForm(f => ({ ...f, [key]: val }));

  const toggleArr = (arr: string[], setArr: (a: string[]) => void, val: string) =>
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

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

  /* ─── Single-child renderer — AnimatePresence needs exactly one child ─── */
  const renderStep = () => {
    const stepProps = {
      key: `step-${currentStep}`,
      variants: fadeUp,
      initial: "hidden" as const,
      animate: "show"   as const,
      exit: { opacity: 0, y: -16 },
    };

    /* ── STEP 0: Personal Info ── */
    if (currentStep === 0) return (
      <motion.div {...stepProps}>
        <div className="gco-reg-section-header">
          <div className="gco-reg-section-icon">❤️</div>
          <div>
            <p className="gco-reg-section-title">Personal Information</p>
            <p className="gco-reg-section-desc">Your basic details to get started</p>
          </div>
        </div>

        <div className="gco-reg-form-section">
          <div className="gco-reg-grid">
            <div className="gco-reg-field gco-reg-full">
              <label className="gco-reg-label">Full Name <span className="required">*</span></label>
              <div className="gco-reg-input-wrap">
                <span className="gco-reg-input-icon"><User size={15} /></span>
                <input className="gco-reg-input" type="text" placeholder="e.g. Riya Kapoor" required
                  value={form.fullName} onChange={e => setField("fullName", e.target.value)} />
              </div>
            </div>

            <div className="gco-reg-field">
              <label className="gco-reg-label">Email Address <span className="required">*</span></label>
              <div className="gco-reg-input-wrap">
                <span className="gco-reg-input-icon"><Mail size={15} /></span>
                <input className="gco-reg-input" type="email" placeholder="you@example.com" required
                  value={form.email} onChange={e => setField("email", e.target.value)} />
              </div>
            </div>

            <div className="gco-reg-field">
              <label className="gco-reg-label">Mobile Number <span className="required">*</span></label>
              <div className="gco-reg-input-wrap">
                <span className="gco-reg-input-icon"><Phone size={15} /></span>
                <input className="gco-reg-input" type="tel" placeholder="+91 98765 43210" required
                  value={form.mobile} onChange={e => setField("mobile", e.target.value)} />
              </div>
            </div>

            <div className="gco-reg-field">
              <label className="gco-reg-label">Password <span className="required">*</span></label>
              <div className="gco-reg-input-wrap">
                <span className="gco-reg-input-icon"><Lock size={15} /></span>
                <input className="gco-reg-input" type={showPw ? "text" : "password"}
                  placeholder="Create a password" required
                  value={form.password} onChange={e => setField("password", e.target.value)}
                  style={{ paddingRight: 44 }} />
                <button type="button" className="gco-reg-pw-toggle" onClick={() => setShowPw(v => !v)}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="gco-reg-field">
              <label className="gco-reg-label">Confirm Password <span className="required">*</span></label>
              <div className="gco-reg-input-wrap">
                <span className="gco-reg-input-icon"><Lock size={15} /></span>
                <input className="gco-reg-input" type={showConfirmPw ? "text" : "password"}
                  placeholder="Confirm password" required
                  value={form.confirmPassword} onChange={e => setField("confirmPassword", e.target.value)}
                  style={{ paddingRight: 44 }} />
                <button type="button" className="gco-reg-pw-toggle" onClick={() => setShowConfirmPw(v => !v)}>
                  {showConfirmPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="gco-reg-field">
              <label className="gco-reg-label">Date of Birth <span className="required">*</span></label>
              <div className="gco-reg-input-wrap">
                <span className="gco-reg-input-icon"><Calendar size={15} /></span>
                <input className="gco-reg-input" type="date" required
                  value={form.dob} onChange={e => setField("dob", e.target.value)} />
              </div>
            </div>

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
          Continue to Education <ChevronRight size={16} style={{ marginLeft: 6, display: "inline" }} />
        </button>
      </motion.div>
    );

    /* ── STEP 1: Education ── */
    if (currentStep === 1) return (
      <motion.div {...stepProps}>
        <div className="gco-reg-section-header">
          <div className="gco-reg-section-icon">🎓</div>
          <div>
            <p className="gco-reg-section-title">Education Details</p>
            <p className="gco-reg-section-desc">Tell us about your educational background</p>
          </div>
        </div>

        <div className="gco-reg-form-section">
          <div className="gco-reg-grid">
            <div className="gco-reg-field">
              <label className="gco-reg-label">Highest Qualification <span className="required">*</span></label>
              <select className="gco-reg-select" required
                value={form.qualification} onChange={e => setField("qualification", e.target.value)}>
                <option value="" disabled>Select qualification</option>
                {QUALIFICATIONS.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>

            <div className="gco-reg-field">
              <label className="gco-reg-label">College / University <span className="required">*</span></label>
              <div className="gco-reg-input-wrap">
                <span className="gco-reg-input-icon"><GraduationCap size={15} /></span>
                <input className="gco-reg-input" type="text" placeholder="e.g. IIT Bombay" required
                  value={form.college} onChange={e => setField("college", e.target.value)} />
              </div>
            </div>

            <div className="gco-reg-field">
              <label className="gco-reg-label">Course / Program <span className="required">*</span></label>
              <input className="gco-reg-input" type="text" placeholder="e.g. B.Tech Computer Science" required
                value={form.course} onChange={e => setField("course", e.target.value)} />
            </div>

            <div className="gco-reg-field">
              <label className="gco-reg-label">Year of Study <span className="required">*</span></label>
              <select className="gco-reg-select" required
                value={form.yearOfStudy} onChange={e => setField("yearOfStudy", e.target.value)}>
                <option value="" disabled>Select year</option>
                {["1st Year","2nd Year","3rd Year","4th Year","5th Year","Graduated"].map(y =>
                  <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="gco-reg-btn-row">
          <button type="button" className="gco-reg-back-btn" onClick={handleBack}>← Back</button>
          <button type="button" className="gco-reg-submit" onClick={handleNext}>
            Continue to Volunteer Role <ChevronRight size={16} style={{ marginLeft: 6, display: "inline" }} />
          </button>
        </div>
      </motion.div>
    );

    /* ── STEP 2: Volunteer Details ── */
    if (currentStep === 2) return (
      <motion.div {...stepProps}>
        <div className="gco-reg-section-header">
          <div className="gco-reg-section-icon">🌟</div>
          <div>
            <p className="gco-reg-section-title">Volunteer Details</p>
            <p className="gco-reg-section-desc">Your role preferences, skills &amp; availability</p>
          </div>
        </div>

        <div className="gco-reg-form-section">
          <div className="gco-reg-form-section-label">
            Volunteer Type <span style={{ color: "#e8856a" }}>*</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 24 }}>
            {VOLUNTEER_TYPES.map(v => (
              <div key={v.value}
                className={`gco-reg-check-item ${volunteerType === v.value ? "selected" : ""}`}
                onClick={() => setVolunteerType(v.value)}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{v.icon}</span>
                <span className="gco-reg-check-label">{v.label}</span>
              </div>
            ))}
          </div>

          <div className="gco-reg-form-section-label">Your Skills</div>
          <div className="gco-reg-check-grid" style={{ marginBottom: 24 }}>
            {SKILLS.map(s => (
              <div key={s}
                className={`gco-reg-check-item ${selectedSkills.includes(s) ? "selected" : ""}`}
                onClick={() => toggleArr(selectedSkills, setSelectedSkills, s)}>
                <div className="gco-reg-check-box">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5L3.8 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="gco-reg-check-label">{s}</span>
              </div>
            ))}
          </div>

          <div className="gco-reg-form-section-label">Languages Known</div>
          <div className="gco-reg-radio-group" style={{ marginBottom: 24 }}>
            {LANGUAGES.map(l => (
              <div key={l}
                className={`gco-reg-radio-pill ${selectedLanguages.includes(l) ? "selected" : ""}`}
                onClick={() => toggleArr(selectedLanguages, setSelectedLanguages, l)}>
                {l}
              </div>
            ))}
          </div>

          <div className="gco-reg-form-section-label">Available Days</div>
          <div className="gco-reg-radio-group" style={{ marginBottom: 24 }}>
            {DAYS.map(d => (
              <div key={d}
                className={`gco-reg-radio-pill ${selectedDays.includes(d) ? "selected" : ""}`}
                onClick={() => toggleArr(selectedDays, setSelectedDays, d)}>
                {d}
              </div>
            ))}
          </div>

          <div className="gco-reg-field" style={{ marginBottom: 16 }}>
            <label className="gco-reg-label">
              <MessageSquare size={13} style={{ display: "inline", marginRight: 4 }} />
              Why do you want to volunteer? <span className="required">*</span>
            </label>
            <textarea className="gco-reg-textarea" required
              placeholder="Tell us about your motivation, what you hope to contribute and gain from this experience..."
              style={{ minHeight: 120 }}
              value={form.whyVolunteer} onChange={e => setField("whyVolunteer", e.target.value)} />
          </div>

          <div className="gco-reg-field" style={{ marginBottom: 16 }}>
            <label className="gco-reg-label">
              LinkedIn Profile{" "}
              <span style={{ color: "rgba(26,24,51,0.4)", fontSize: 11, fontWeight: 400 }}>(Optional)</span>
            </label>
            <div className="gco-reg-input-wrap">
              <span className="gco-reg-input-icon"><Linkedin2 size={15} /></span>
              <input className="gco-reg-input" type="url" placeholder="https://linkedin.com/in/yourprofile"
                value={form.linkedIn} onChange={e => setField("linkedIn", e.target.value)} />
            </div>
          </div>

          <div className="gco-reg-field">
            <label className="gco-reg-label">
              Resume / CV{" "}
              <span style={{ color: "rgba(26,24,51,0.4)", fontSize: 11, fontWeight: 400 }}>(Optional)</span>
            </label>
            <div className="gco-reg-upload">
              <div className="gco-reg-upload-icon"><Upload size={24} color="rgba(26,24,51,0.3)" /></div>
              <p>Drag &amp; drop your resume here, or <span>browse files</span></p>
              <p style={{ fontSize: 11, marginTop: 4 }}>PDF, DOC up to 5MB</p>
            </div>
          </div>
        </div>

        <div className="gco-reg-btn-row">
          <button type="button" className="gco-reg-back-btn" onClick={handleBack}>← Back</button>
          <button type="button" className="gco-reg-submit" onClick={handleNext}>
            Review &amp; Confirm <ChevronRight size={16} style={{ marginLeft: 6, display: "inline" }} />
          </button>
        </div>
      </motion.div>
    );

    /* ── STEP 3: Review & Confirm ── */
    return (
      <motion.div {...stepProps}>
        <div className="gco-reg-section-header">
          <div className="gco-reg-section-icon">✅</div>
          <div>
            <p className="gco-reg-section-title">Review &amp; Confirm</p>
            <p className="gco-reg-section-desc">Almost there! Review and submit your application.</p>
          </div>
        </div>

        <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
          {[
            { label: "Full Name",      value: form.fullName },
            { label: "Email",          value: form.email },
            { label: "Mobile",         value: form.mobile },
            { label: "Gender",         value: form.gender },
            { label: "Qualification",  value: form.qualification },
            { label: "College",        value: form.college },
            { label: "Course",         value: form.course },
            { label: "Year of Study",  value: form.yearOfStudy },
            { label: "Volunteer Role", value: VOLUNTEER_TYPES.find(v => v.value === volunteerType)?.label || "—" },
            { label: "Skills",         value: selectedSkills.join(", ") || "—" },
            { label: "Languages",      value: selectedLanguages.join(", ") || "—" },
            { label: "Available Days", value: selectedDays.join(", ") || "—" },
          ].map(row => (
            <div key={row.label} style={{
              display: "flex", justifyContent: "space-between",
              padding: "12px 16px",
              background: "rgba(26,24,51,0.04)",
              border: "1px solid rgba(26,24,51,0.08)",
              borderRadius: 10, gap: 12,
            }}>
              <span style={{ fontSize: 13, color: "rgba(26,24,51,0.45)", flexShrink: 0 }}>{row.label}</span>
              <span style={{ fontSize: 13, color: "#1a1833", fontWeight: 600, textAlign: "right" }}>{row.value || "—"}</span>
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
            I agree to the{" "}
            <a href="/policies" onClick={e => e.stopPropagation()}>Terms &amp; Conditions</a> and{" "}
            <a href="/policies" onClick={e => e.stopPropagation()}>Volunteer Code of Conduct</a>.
          </p>
        </div>

        <div className="gco-reg-btn-row">
          <button type="button" className="gco-reg-back-btn" onClick={handleBack}>← Back</button>
          <button type="submit" className="gco-reg-submit">❤️ Submit Application</button>
        </div>
        <p className="gco-reg-login-link">
          Already have an account?{" "}
          <button type="button" onClick={() => navigate("/gco/login")}>Sign In</button>
        </p>
      </motion.div>
    );
  };

  /* ─── Page render ─────────────────────────────────────────── */
  return (
    <>
      <Helmet>
        <title>Register as Volunteer | GCO – Ateion</title>
        <meta name="description" content="Join the GCO volunteer team. Contribute your skills to the Global Capability Olympiad and make a difference." />
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
                    <div className="gco-reg-success-icon">❤️</div>
                    <h2>Thank You for Volunteering!</h2>
                    <p>
                      {form.fullName}, your volunteer application has been received. Our team will review
                      your profile and get back to you within 3–5 working days.
                    </p>
                    <button className="gco-reg-submit"
                      style={{ maxWidth: 260, margin: "0 auto" }}
                      onClick={() => navigate("/gco")}>
                      Back to GCO Page
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" variants={fadeUp} initial="hidden" animate="show">
                {/* Header */}
                <div className="gco-reg-header">
                  <div className="gco-reg-badge"
                    style={{ background: "rgba(232,133,106,0.1)", border: "1px solid rgba(232,133,106,0.2)" }}>
                    <div className="gco-reg-badge-dot" style={{ background: "#e8856a" }} />
                    Volunteer with GCO
                  </div>
                  <h1 className="gco-reg-title">
                    Register as <span>Volunteer</span>
                  </h1>
                  <p className="gco-reg-subtitle">
                    Join our passionate team of volunteers and help shape the future of education
                    through the Global Capability Olympiad.
                  </p>
                </div>

                {/* Step indicator */}
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

                {/* Form card — AnimatePresence always gets one child */}
                <div className="gco-reg-card">
                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                      {renderStep()}
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
