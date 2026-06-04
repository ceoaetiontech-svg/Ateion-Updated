import { Helmet } from "react-helmet-async";

export default function ResetPasswordPage() {
  return (
    <>
      <Helmet>
        <title>Reset Password | Ateion</title>
        <meta name="description" content="Reset your Ateion account password securely." />
      </Helmet>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          className="w-full border rounded-xl p-3 mb-4"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border rounded-xl p-3 mb-4"
        />

        <button className="w-full bg-green-600 text-white rounded-xl p-3">
          Update Password
        </button>
      </div>
    </div>
    </>
  );
}