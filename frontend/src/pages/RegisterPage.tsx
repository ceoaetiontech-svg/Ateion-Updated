import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "../lib/schemas";
import "../styles/register.css";

type RegisterFormInputs = z.infer<typeof registerSchema>;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

interface RegisterPageProps {
  closeRegister?: () => void;
}

export default function RegisterPage({ closeRegister }: RegisterPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const loginResponse = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email, password: data.password }),
        });

        if (loginResponse.ok) {
          const responseText = await loginResponse.text();
          let token = responseText;
          try {
            const jsonData = JSON.parse(responseText);
            token = jsonData.token || jsonData.jwt || responseText;
          } catch (err) {}
          localStorage.setItem("token", token);
        }

        alert("Account created! You are now logged in.");
        if (closeRegister) closeRegister();
      } else {
        alert("Error creating account. That email might already be in use.");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  return (
    <motion.div
      className="auth-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <button className="auth-close" onClick={closeRegister}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="auth-left">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Join Ateion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Reimagining education with innovation, workshops and modern learning.
          </motion.p>
        </div>

        <div className="auth-right auth-right-scroll">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Create Account
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div className="auth-field" variants={itemVariants}>
              <input
                type="text"
                placeholder="Full Name"
                className={errors.fullName ? "auth-input auth-input-error" : "auth-input"}
                {...register("fullName")}
              />
              {errors.fullName && <p className="auth-error">{errors.fullName.message}</p>}
            </motion.div>

            <motion.div className="auth-field" variants={itemVariants}>
              <input
                type="email"
                placeholder="Email Address"
                className={errors.email ? "auth-input auth-input-error" : "auth-input"}
                {...register("email")}
              />
              {errors.email && <p className="auth-error">{errors.email.message}</p>}
            </motion.div>

            <motion.div className="auth-field" variants={itemVariants}>
              <input
                type="password"
                placeholder="Password"
                className={errors.password ? "auth-input auth-input-error" : "auth-input"}
                {...register("password")}
              />
              {errors.password && <p className="auth-error">{errors.password.message}</p>}
            </motion.div>

            <motion.div className="auth-field" variants={itemVariants}>
              <input
                type="tel"
                placeholder="Phone Number"
                className={errors.phone ? "auth-input auth-input-error" : "auth-input"}
                {...register("phone")}
              />
              {errors.phone && <p className="auth-error">{errors.phone.message}</p>}
            </motion.div>

            <motion.div className="auth-field" variants={itemVariants}>
              <input
                type="date"
                className={errors.dateOfBirth ? "auth-input auth-input-error" : "auth-input"}
                {...register("dateOfBirth")}
              />
              {errors.dateOfBirth && <p className="auth-error">{errors.dateOfBirth.message}</p>}
            </motion.div>

            <motion.div className="auth-row" variants={itemVariants}>
              <div className="auth-field">
                <input
                  type="text"
                  placeholder="Grade/Standard"
                  className={errors.grade ? "auth-input auth-input-error" : "auth-input"}
                  {...register("grade")}
                />
                {errors.grade && <p className="auth-error">{errors.grade.message}</p>}
              </div>
              <div className="auth-field">
                <input
                  type="text"
                  placeholder="Country"
                  className={errors.country ? "auth-input auth-input-error" : "auth-input"}
                  {...register("country")}
                />
                {errors.country && <p className="auth-error">{errors.country.message}</p>}
              </div>
            </motion.div>

            <motion.div className="auth-field" variants={itemVariants}>
              <input
                type="text"
                placeholder="School/Institution Name"
                className={errors.school ? "auth-input auth-input-error" : "auth-input"}
                {...register("school")}
              />
              {errors.school && <p className="auth-error">{errors.school.message}</p>}
            </motion.div>

            <motion.button
              type="submit"
              className="auth-submit"
              disabled={isSubmitting}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </motion.button>
          </motion.form>

          <motion.div
            className="auth-divider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>OR CONTINUE WITH</span>
          </motion.div>

          <motion.div
            className="auth-social"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.button
              className="auth-social-btn auth-social-google"
              onClick={() => window.location.href = `${backendUrl}/oauth2/authorization/google`}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <GoogleIcon />
              Continue with Google
            </motion.button>
            <motion.button
              className="auth-social-btn auth-social-linkedin"
              onClick={() => window.location.href = `${backendUrl}/oauth2/authorization/linkedin`}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <LinkedInIcon />
              Continue with LinkedIn
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
