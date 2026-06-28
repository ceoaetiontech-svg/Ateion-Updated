import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import GCONavbar from "../app/components/GCONavbar";
import SharedFooter from "../app/components/SharedFooter";
import "../styles/gco/index.css";
import "../styles/gco/fonts.css";
import "../styles/gco/theme.css";
import "../styles/gco/pill-navbar.css";
import "../styles/gco/VolunteerRegistration.css";

const roles = [
  {
    title: "1. Outreach & Institutional Relations",
    description: `Connect schools, colleges and institutions to GCO across the country.`,
    content: `
      <h4>Department Objective</h4>
      <p>Expand GCO's reach by building meaningful relationships with schools, colleges and educational institutions across India while representing the organisation professionally.</p>

      <h4>Key Responsibilities</h4>
      <ul>
        <li>Build and maintain relationships with educational institutions.</li>
        <li>Coordinate outreach campaigns and institutional partnerships.</li>
        <li>Schedule meetings with school and college representatives.</li>
        <li>Assist with onboarding partner institutions.</li>
        <li>Maintain outreach databases and communication records.</li>
        <li>Represent GCO professionally during meetings and events.</li>
      </ul>

      <h4>Ideal Qualities</h4>
      <ul>
        <li>Excellent communication and interpersonal skills.</li>
        <li>Professional and confident personality.</li>
        <li>Strong networking abilities.</li>
        <li>Self-motivated and organised.</li>
        <li>Persistent and solution-oriented.</li>
        <li>Comfortable interacting with educators and professionals.</li>
      </ul>

      <h4>Preferred Qualifications &amp; Experience</h4>
      <p>Experience in any of the following is an advantage:</p>
      <ul>
        <li>Student councils or leadership positions.</li>
        <li>Outreach for clubs, organisations or businesses.</li>
        <li>Campus ambassador programs.</li>
        <li>Business development or client-facing roles.</li>
        <li>Event coordination or community engagement.</li>
        <li>Networking, cold calling or relationship management.</li>
        <li>Personal startups or partnership-building projects.</li>
      </ul>
      <p>Relevant experience may come from internships, volunteer work, hackathons, student organisations, freelance work or personal initiatives.</p>

      <div class="role-apply">
        <h4>Don't Meet Every Qualification? Apply Anyway.</h4>
        <p>At Ateion, we believe capability extends beyond resumes. If you're passionate, eager to learn and believe you can contribute meaningfully, we encourage you to apply.</p>
        <p>Selection is based on your skills, initiative, mindset and potential, not solely on previous experience.</p>
         <a class="role-apply-btn" href="https://docs.google.com/forms/d/e/1FAIpQLScz1rB6V7y_IA9S72189TrDzV-h8oXIxWyI-yW7FBt4k_2Yig/viewform" target="_blank" rel="noopener noreferrer">Apply Now</a>
      </div>
    `,
  },
  {
    title: "2. Sponsorship Squad",
    description: "Build corporate relationships and drive sponsorship campaigns.",
    content: `
      <h4>Department Objective</h4>
      <p>Develop meaningful partnerships with organisations that share our vision and help secure the resources required to successfully launch GCO.</p>

      <h4>Key Responsibilities</h4>
      <ul>
        <li>Identify potential sponsors and partners.</li>
        <li>Prepare sponsorship proposals and presentations.</li>
        <li>Coordinate sponsor meetings and follow-ups.</li>
        <li>Build long-term corporate relationships.</li>
        <li>Maintain sponsorship databases.</li>
        <li>Support fundraising initiatives.</li>
      </ul>

      <h4>Ideal Qualities</h4>
      <ul>
        <li>Excellent communication skills.</li>
        <li>Professional and persuasive approach.</li>
        <li>Confidence during conversations and presentations.</li>
        <li>Strong research abilities.</li>
        <li>Relationship-building mindset.</li>
        <li>Persistence and resilience.</li>
      </ul>

      <h4>Preferred Qualifications &amp; Experience</h4>
      <p>Experience in any of the following is preferred:</p>
      <ul>
        <li>Sponsorship acquisition for hackathons or college festivals.</li>
        <li>Corporate relations or partnership development.</li>
        <li>Fundraising or NGO initiatives.</li>
        <li>Business development or sales.</li>
        <li>Client management.</li>
        <li>Negotiation experience.</li>
      </ul>
      <p>Relevant experience from student clubs, competitions, freelance work or personal ventures is equally valued.</p>

      <div class="role-apply">
        <h4>Don't Meet Every Qualification? Apply Anyway.</h4>
        <p>Many successful partnerships begin with determination rather than experience. If you enjoy communicating, negotiating and building relationships, we'd love to hear from you.</p>
        <p>We recruit based on capability, professionalism and potential.</p>
         <a class="role-apply-btn" href="https://docs.google.com/forms/d/e/1FAIpQLScz1rB6V7y_IA9S72189TrDzV-h8oXIxWyI-yW7FBt4k_2Yig/viewform" target="_blank" rel="noopener noreferrer">Apply Now</a>
      </div>
    `,
  },
  {
    title: "3. Marketing Team",
    description: "Create content, run campaigns, and grow GCO's voice online and offline.",
    content: `
      <h4>Department Objective</h4>
      <p>Tell the story of GCO and build awareness among students, educators, institutions and the wider community through impactful communication.</p>

      <h4>Key Responsibilities</h4>
      <ul>
        <li>Create engaging digital content.</li>
        <li>Support branding campaigns.</li>
        <li>Design promotional material.</li>
        <li>Assist with video and graphic content.</li>
        <li>Manage social media engagement.</li>
        <li>Contribute creative campaign ideas.</li>
      </ul>

      <h4>Ideal Qualities</h4>
      <ul>
        <li>Creative mindset.</li>
        <li>Strong written and verbal communication.</li>
        <li>Storytelling ability.</li>
        <li>Curiosity and adaptability.</li>
        <li>Attention to detail.</li>
        <li>Collaborative approach.</li>
      </ul>

      <h4>Preferred Qualifications &amp; Experience</h4>
      <p>Experience in any of the following is an advantage:</p>
      <ul>
        <li>Social media management.</li>
        <li>Graphic design.</li>
        <li>Video editing.</li>
        <li>Photography.</li>
        <li>Branding.</li>
        <li>Copywriting.</li>
        <li>Content creation.</li>
        <li>Personal Instagram, LinkedIn, YouTube or blog projects.</li>
        <li>Marketing campaigns for clubs, startups or organisations.</li>
      </ul>
      <p>Portfolio work and personal creative projects are highly encouraged.</p>

      <div class="role-apply">
        <h4>Don't Meet Every Qualification? Apply Anyway.</h4>
        <p>Great marketers are built through experimentation and creativity. If you've created, designed or built something you're proud of, we'd like to see it.</p>
        <p>Your portfolio matters more than your job title.</p>
         <a class="role-apply-btn" href="https://docs.google.com/forms/d/e/1FAIpQLScz1rB6V7y_IA9S72189TrDzV-h8oXIxWyI-yW7FBt4k_2Yig/viewform" target="_blank" rel="noopener noreferrer">Apply Now</a>
      </div>
    `,
  },
  {
    title: "4. Business Analysts",
    description: "Research, analyse data and support strategic planning.",
    content: `
      <h4>Department Objective</h4>
      <p>Support strategic decision-making through research, analysis and data-driven insights that strengthen every aspect of GCO.</p>

      <h4>Key Responsibilities</h4>
      <ul>
        <li>Conduct market research.</li>
        <li>Perform competitor analysis.</li>
        <li>Analyse survey and registration data.</li>
        <li>Prepare reports and recommendations.</li>
        <li>Maintain strategic databases.</li>
        <li>Support organisational planning.</li>
      </ul>

      <h4>Ideal Qualities</h4>
      <ul>
        <li>Analytical mindset.</li>
        <li>Strong problem-solving ability.</li>
        <li>Curiosity.</li>
        <li>Critical thinking.</li>
        <li>Attention to detail.</li>
        <li>Structured approach to work.</li>
      </ul>

      <h4>Preferred Qualifications &amp; Experience</h4>
      <p>Experience in any of the following is preferred:</p>
      <ul>
        <li>Market or competitor research.</li>
        <li>Excel or Google Sheets.</li>
        <li>Data analysis.</li>
        <li>Consulting or case competitions.</li>
        <li>Financial analysis.</li>
        <li>Startup strategy.</li>
        <li>Business planning.</li>
        <li>Research projects.</li>
        <li>Personal analytical or research initiatives.</li>
      </ul>
      <p>Experience from coursework, competitions, internships or independent projects is equally valuable.</p>

      <div class="role-apply">
        <h4>Don't Meet Every Qualification? Apply Anyway.</h4>
        <p>You don't need to be an expert to think analytically. If you enjoy solving problems, asking questions and making decisions using evidence, we encourage you to apply.</p>
        <p>Potential is just as important as experience.</p>
         <a class="role-apply-btn" href="https://docs.google.com/forms/d/e/1FAIpQLScz1rB6V7y_IA9S72189TrDzV-h8oXIxWyI-yW7FBt4k_2Yig/viewform" target="_blank" rel="noopener noreferrer">Apply Now</a>
      </div>
    `,
  },
  {
    title: "5. Project Managers",
    description: "Coordinate cross-functional teams, track timelines and ensure execution.",
    content: `
      <h4>Department Objective</h4>
      <p>Coordinate teams, manage timelines and ensure projects are executed efficiently across every department.</p>

      <h4>Key Responsibilities</h4>
      <ul>
        <li>Coordinate cross-functional teams.</li>
        <li>Track timelines and deliverables.</li>
        <li>Organise meetings.</li>
        <li>Monitor project progress.</li>
        <li>Maintain documentation.</li>
        <li>Resolve operational challenges.</li>
      </ul>

      <h4>Ideal Qualities</h4>
      <ul>
        <li>Strong organisational skills.</li>
        <li>Leadership potential.</li>
        <li>Accountability.</li>
        <li>Excellent communication.</li>
        <li>Time management.</li>
        <li>Calm decision-making under pressure.</li>
      </ul>

      <h4>Preferred Qualifications &amp; Experience</h4>
      <p>Experience in any of the following is beneficial:</p>
      <ul>
        <li>Managing student organisations.</li>
        <li>Leading clubs or societies.</li>
        <li>Organising college festivals.</li>
        <li>Team leadership during hackathons.</li>
        <li>Startup operations.</li>
        <li>Volunteer management.</li>
        <li>Community building.</li>
        <li>Freelance or independent project management.</li>
      </ul>
      <p>Leadership demonstrated through personal initiatives is equally valued.</p>

      <div class="role-apply">
        <h4>Don't Meet Every Qualification? Apply Anyway.</h4>
        <p>Leadership is demonstrated through ownership—not titles. If you're organised, dependable and enjoy helping teams succeed, we'd like to hear from you.</p>
        <p>We look for leaders with the willingness to learn and grow.</p>
         <a class="role-apply-btn" href="https://docs.google.com/forms/d/e/1FAIpQLScz1rB6V7y_IA9S72189TrDzV-h8oXIxWyI-yW7FBt4k_2Yig/viewform" target="_blank" rel="noopener noreferrer">Apply Now</a>
      </div>
    `,
  },
  {
    title: "6. Assessment Design Team",
    description: "Design case studies, evaluation rubrics and exam frameworks.",
    content: `
      <h4>Department Objective</h4>
      <p>Design innovative assessments that measure creativity, critical thinking and real-world problem-solving instead of memorisation.</p>

      <h4>Key Responsibilities</h4>
      <ul>
        <li>Design case-based assessments.</li>
        <li>Develop evaluation rubrics.</li>
        <li>Create question papers.</li>
        <li>Review assessment quality.</li>
        <li>Improve examination standards.</li>
        <li>Support research into capability-based evaluation.</li>
      </ul>

      <h4>Ideal Qualities</h4>
      <ul>
        <li>Creative thinker.</li>
        <li>Strong logical reasoning.</li>
        <li>Curiosity.</li>
        <li>Attention to detail.</li>
        <li>Passion for education.</li>
        <li>Ability to think beyond traditional examinations.</li>
      </ul>

      <h4>Preferred Qualifications &amp; Experience</h4>
      <p>Experience in any of the following is an advantage:</p>
      <ul>
        <li>Olympiads or academic competitions.</li>
        <li>Teaching or tutoring.</li>
        <li>Educational content creation.</li>
        <li>Research projects.</li>
        <li>Psychology or education initiatives.</li>
        <li>Question paper design.</li>
        <li>Curriculum development.</li>
        <li>Personal learning or educational projects.</li>
      </ul>
      <p>Academic excellence is appreciated but innovative thinking is equally important.</p>

      <div class="role-apply">
        <h4>Don't Meet Every Qualification? Apply Anyway.</h4>
        <p>Some of the best assessment designers are simply curious people who love asking better questions. If improving education excites you, we encourage you to apply.</p>
        <p>Capability begins with curiosity.</p>
         <a class="role-apply-btn" href="https://docs.google.com/forms/d/e/1FAIpQLScz1rB6V7y_IA9S72189TrDzV-h8oXIxWyI-yW7FBt4k_2Yig/viewform" target="_blank" rel="noopener noreferrer">Apply Now</a>
      </div>
    `,
  },
  {
    title: "7. Web Developers",
    description: "Build the GCO platform. Front-end, back-end or full-stack. Shape the digital home of India's first capability Olympiad.",
    content: `
      <h4>Department Objective</h4>
      <p>Build and maintain the digital infrastructure that powers India's first Capability-Based Olympiad.</p>

      <h4>Key Responsibilities</h4>
      <ul>
        <li>Develop front-end and back-end systems.</li>
        <li>Build new platform features.</li>
        <li>Collaborate with designers and project teams.</li>
        <li>Test and optimise applications.</li>
        <li>Resolve technical issues.</li>
        <li>Support future product development.</li>
      </ul>

      <h4>Ideal Qualities</h4>
      <ul>
        <li>Strong problem-solving ability.</li>
        <li>Curiosity.</li>
        <li>Ownership mindset.</li>
        <li>Collaborative attitude.</li>
        <li>Passion for technology.</li>
        <li>Continuous learner.</li>
      </ul>

      <h4>Preferred Qualifications &amp; Experience</h4>
      <p>Experience in any of the following is preferred:</p>
      <ul>
        <li>Front-end development.</li>
        <li>Back-end development.</li>
        <li>Full-stack development.</li>
        <li>UI/UX design.</li>
        <li>Mobile application development.</li>
        <li>Open-source contributions.</li>
        <li>Hackathons.</li>
        <li>Freelance development.</li>
        <li>GitHub projects.</li>
        <li>Personal websites or applications.</li>
      </ul>
      <p>Whether you've worked professionally or built projects independently, we'd love to see what you've created.</p>

      <div class="role-apply">
        <h4>Don't Meet Every Qualification? Apply Anyway.</h4>
        <p>Some of the world's best developers are self-taught. If you enjoy building products, solving problems and continuously learning, don't hesitate to apply.</p>
        <p>We're looking for builders—not perfect resumes.</p>
         <a class="role-apply-btn" href="https://docs.google.com/forms/d/e/1FAIpQLScz1rB6V7y_IA9S72189TrDzV-h8oXIxWyI-yW7FBt4k_2Yig/viewform" target="_blank" rel="noopener noreferrer">Apply Now</a>
      </div>
    `,
  },
];

function RoleCard({ title, description, content, isOpen, toggle }: { title: string; description: string; content: string; isOpen: boolean; toggle: () => void }) {
  const answerId = `role-answer-${title.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`;
  const buttonId = `role-button-${title.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <motion.div
      layout
      className={`volunteer-role-card ${isOpen ? "volunteer-role-card-open" : ""}`}
    >
      <motion.div
        className="volunteer-role-accent"
        animate={{
          background: isOpen ? "var(--color-accent)" : "var(--color-border-light)",
        }}
        transition={{ duration: 0.3 }}
      />

      <button
        type="button"
        id={buttonId}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className="volunteer-role-btn"
      >
        <span className="volunteer-role-title">{title}</span>
        <motion.div
          className={`volunteer-role-arrow ${isOpen ? "volunteer-role-arrow-open" : ""}`}
          animate={{
            rotate: isOpen ? 90 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <ChevronRight size={20} className={isOpen ? "text-white" : "text-[var(--color-text-primary)]"} strokeWidth={1.7} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={answerId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="volunteer-role-desc">
              {content ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <p>{description}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const VolunteerRegistrationPage = () => {
  const navigate = useNavigate();
  const [openStates, setOpenStates] = useState<boolean[]>(roles.map(() => false));

  const toggle = (index: number) => {
    setOpenStates((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Register as Volunteer | GCO - Ateion</title>
        <meta name="description" content="Join the Global Capability Olympiad as a volunteer. Choose your role and contribute to India's first capability Olympiad." />
      </Helmet>
      <GCONavbar />
      <div id="gco-root" className="ateion-metallic-bg min-h-screen w-full relative">
        <div id="gco-background-pattern" />

        <section className="volunteer-hero">
          <div className="volunteer-hero-overlay">
            <motion.h1
              className="volunteer-title"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-display)",
                background: "linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-accent) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Register as Volunteer
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 80,
                height: 4,
                borderRadius: 4,
                background: "var(--color-accent)",
                margin: "0 auto 24px",
                transformOrigin: "center",
              }}
            />

            <motion.p
              className="volunteer-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              The Global Capability Olympiad (GCO) is assembling a multidisciplinary Founding Team to help build one of India's most ambitious education initiatives. Whether your strengths lie in strategy, technology, marketing, partnerships or operations, every department plays a vital role in bringing GCO to life.
            </motion.p>

            <motion.div
              className="volunteer-benefits"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="volunteer-benefits-header">
                <div className="volunteer-benefits-title" style={{
                  background: "linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-accent) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>What You'll Gain</div>
                <div className="volunteer-benefits-bar">
                  <div className="volunteer-benefits-bar-line" />
                  <div className="volunteer-benefits-bar-dot" />
                  <div className="volunteer-benefits-bar-line" />
                </div>
              </div>
              <div className="volunteer-benefits-grid">
                <div className="volunteer-benefit-card">
                  <span className="volunteer-benefit-emoji">⭐</span>
                  <span className="volunteer-benefit-name">Premium Playground</span>
                  <span className="volunteer-benefit-value">Worth ₹35k</span>
                </div>
                <div className="volunteer-benefit-card">
                  <span className="volunteer-benefit-emoji">🎓</span>
                  <span className="volunteer-benefit-name">Internship Certificate</span>
                </div>
                <div className="volunteer-benefit-card">
                  <span className="volunteer-benefit-emoji">💌</span>
                  <span className="volunteer-benefit-name">Founder Recommendation</span>
                </div>
                <div className="volunteer-benefit-card">
                  <span className="volunteer-benefit-emoji">🏆</span>
                  <span className="volunteer-benefit-name">Awards</span>
                </div>
                <div className="volunteer-benefit-card">
                  <span className="volunteer-benefit-emoji">👨‍🏫</span>
                  <span className="volunteer-benefit-name">Mentorship</span>
                </div>
                <div className="volunteer-benefit-card">
                  <span className="volunteer-benefit-emoji">🥇</span>
                  <span className="volunteer-benefit-name">Achievement Badge</span>
                </div>
                <div className="volunteer-benefit-card">
                  <span className="volunteer-benefit-emoji">🚀</span>
                  <span className="volunteer-benefit-name">Future Opportunities</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="volunteer-roles-section">
          <div className="volunteer-roles-header">
            <motion.h2
              className="volunteer-roles-header-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                background: "linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-accent) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Categories
            </motion.h2>
            <motion.div
              className="volunteer-roles-header-bar"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <div className="volunteer-roles-header-bar-line" />
              <div className="volunteer-roles-header-bar-dot" />
              <div className="volunteer-roles-header-bar-line" />
            </motion.div>
          </div>
          <div className="volunteer-roles-list">
            {roles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              >
                <RoleCard title={role.title} description={role.description} content={role.content} isOpen={openStates[index]} toggle={() => toggle(index)} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      <SharedFooter />
    </>
  );
};

export default VolunteerRegistrationPage;
