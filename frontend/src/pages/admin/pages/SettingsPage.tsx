import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Save, Globe, Shield, CreditCard, Bell, Eye, EyeOff } from "lucide-react";
import { containerVariants, itemVariants } from "../utils/variants";
import Toggle from "../components/ui/Toggle";
import { useToast } from "../utils/toast";

interface Settings {
  siteName: string;
  supportEmail: string;
  allowRegistrations: boolean;
  requireEmailVerification: boolean;
  maintenanceMode: boolean;
  enableStripe: boolean;
  notifyOnNewUser: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    siteName: "Ateion Ecosystem",
    supportEmail: "support@ateion.com",
    allowRegistrations: true,
    requireEmailVerification: true,
    maintenanceMode: false,
    enableStripe: true,
    notifyOnNewUser: true,
  });
  const [showStripeKey, setShowStripeKey] = useState(false);
  const { showToast } = useToast();

  const handleToggle = (key: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    showToast("Settings saved successfully!", "success");
  };

  return (
    <>
        <Helmet>
          <title>Ateion Admin — Settings</title>
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
            className="bg-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 shadow-[var(--shadow-accent)] hover:shadow-[var(--shadow-accent-hover)] hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
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
                <Toggle
                  label="Allow New Registrations"
                  description="Enable public sign-ups for new students."
                  checked={settings.allowRegistrations}
                  onChange={() => handleToggle("allowRegistrations")}
                />
                <Toggle
                  label="Require Verification"
                  description="Force email verification before login."
                  checked={settings.requireEmailVerification}
                  onChange={() => handleToggle("requireEmailVerification")}
                />
                <Toggle
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
                <Toggle
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
                <Toggle
                  label="Enable Stripe Integration"
                  description="Process live credit card transactions."
                  checked={settings.enableStripe}
                  onChange={() => handleToggle("enableStripe")}
                />
                <div
                  className={`transition-all duration-300 ${settings.enableStripe ? "opacity-100" : "opacity-50 pointer-events-none"}`}
                >
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                    Stripe Secret Key (Test)
                  </label>
                  <div className="relative">
                    <input
                      type={showStripeKey ? "text" : "password"}
                      defaultValue="sk_test_51NxXXXXXXXXXXXXXXXXXXXXXXXX"
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-border-medium)] bg-[var(--color-background-primary)] text-[var(--color-text-primary)] outline-none transition-all duration-250 focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(232,133,106,0.15)] pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowStripeKey(!showStripeKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
                    >
                      {showStripeKey ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-2">
                    Required for processing course purchases.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
