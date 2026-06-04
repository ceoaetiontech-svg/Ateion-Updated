import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Globe, Shield, CreditCard, Bell } from "lucide-react";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Ateion Ecosystem",
    supportEmail: "support@ateion.com",
    allowRegistrations: true,
    requireEmailVerification: true,
    maintenanceMode: false,
    enableStripe: true,
    notifyOnNewUser: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <>
      <Helmet>
        <title>Admin Settings | Ateion</title>
        <meta name="description" content="Manage Ateion platform settings, billing, and security preferences." />
      </Helmet>
    <motion.div
      className="pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div className="flex justify-between items-end mb-8" variants={itemVariants}>
        <div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-12 h-[3px] rounded-full bg-[var(--color-accent)] mb-4"
            style={{ transformOrigin: "left" }}
          />
          <h2 className="text-3xl font-bold font-['OV_Soge'] mb-2">
            Platform Settings
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Configure global ecosystem parameters, security, and notifications.
          </p>
        </div>
        <motion.button
          onClick={handleSave}
          className="bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-[0_4px_16px_rgba(232,133,106,0.25)] hover:shadow-[0_6px_24px_rgba(232,133,106,0.4)] hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Save size={18} />
          Save Changes
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div className="lg:col-span-1 space-y-6" variants={itemVariants}>
          <div className="clay-card bg-[var(--color-background-secondary)] rounded-2xl p-6 border border-[var(--color-border-light)]">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--color-border-light)]">
              <Shield className="text-blue-500" size={24} />
              <h3 className="font-bold text-lg">Security & Access</h3>
            </div>
            <div className="space-y-5">
              <ToggleRow
                label="Allow New Registrations"
                description="Enable public sign-ups for new students."
                checked={settings.allowRegistrations}
                onChange={() => handleToggle("allowRegistrations")}
              />
              <ToggleRow
                label="Require Verification"
                description="Force email verification before login."
                checked={settings.requireEmailVerification}
                onChange={() => handleToggle("requireEmailVerification")}
              />
              <ToggleRow
                label="Maintenance Mode"
                description="Temporarily disable public access."
                checked={settings.maintenanceMode}
                onChange={() => handleToggle("maintenanceMode")}
                danger
              />
            </div>
          </div>

          <div className="clay-card bg-[var(--color-background-secondary)] rounded-2xl p-6 border border-[var(--color-border-light)]">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--color-border-light)]">
              <Bell className="text-amber-500" size={24} />
              <h3 className="font-bold text-lg">Notifications</h3>
            </div>
            <div className="space-y-5">
              <ToggleRow
                label="Admin Alerts"
                description="Notify admins on new user signup."
                checked={settings.notifyOnNewUser}
                onChange={() => handleToggle("notifyOnNewUser")}
              />
            </div>
          </div>
        </motion.div>

        <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
          <div className="clay-card bg-[var(--color-background-secondary)] rounded-2xl p-6 border border-[var(--color-border-light)]">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--color-border-light)]">
              <Globe className="text-emerald-500" size={24} />
              <h3 className="font-bold text-lg">General Configuration</h3>
            </div>
            <div className="space-y-5">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Platform Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border-medium)] bg-[var(--color-background-primary)] text-[var(--color-text-primary)] outline-none transition-all duration-250 focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.15)]"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Support Email</label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border-medium)] bg-[var(--color-background-primary)] text-[var(--color-text-primary)] outline-none transition-all duration-250 focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.15)]"
                />
              </motion.div>
            </div>
          </div>

          <div className="clay-card bg-[var(--color-background-secondary)] rounded-2xl p-6 border border-[var(--color-border-light)]">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--color-border-light)]">
              <CreditCard className="text-purple-500" size={24} />
              <h3 className="font-bold text-lg">Billing & Payments</h3>
            </div>
            <div className="space-y-5">
              <ToggleRow
                label="Enable Stripe Integration"
                description="Process live credit card transactions."
                checked={settings.enableStripe}
                onChange={() => handleToggle("enableStripe")}
              />
              <div
                className={`transition-all duration-300 ${settings.enableStripe ? "opacity-100 h-auto" : "opacity-50 h-auto pointer-events-none"}`}
              >
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                  Stripe Secret Key (Test)
                </label>
                <input
                  type="password"
                  defaultValue="sk_test_51NxXXXXXXXXXXXXXXXXXXXXXXXX"
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border-medium)] bg-[var(--color-background-primary)] text-[var(--color-text-primary)] outline-none transition-all duration-250 focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.15)]"
                />
                <p className="text-xs text-[var(--color-text-tertiary)] mt-2">
                  Required for processing course purchases.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
  danger = false,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  danger?: boolean;
}) {
  return (
    <motion.div
      className="flex items-center justify-between gap-4"
      variants={itemVariants}
    >
      <div>
        <p className="font-semibold text-[var(--color-text-primary)]">{label}</p>
        <p className="text-sm text-[var(--color-text-tertiary)]">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
          checked
            ? danger
              ? "bg-red-500"
              : "bg-[var(--color-accent)]"
            : "bg-gray-300 dark:bg-gray-700"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </motion.div>
    </>
  );
}
