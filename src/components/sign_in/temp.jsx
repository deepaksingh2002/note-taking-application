import { useState, useEffect } from "react";
import images from "../../assets/background.webp";
import { Eye, EyeOff } from "lucide-react";
import Input from "../Input";
import Button from "../Button";
// import { sendOtp, verifyOtp } from "./api";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [showOtp, setShowOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [resendVisible, setResendVisible] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Countdown for Resend OTP
  useEffect(() => {
    let timer;
    if (otpSent && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else if (otpSent && resendTimer === 0) {
      setResendVisible(true);
    }
    return () => clearTimeout(timer);
  }, [otpSent, resendTimer]);

  const handleGetOtp = async () => {
    if (!formData.email) return alert("Enter your email first!");
    setLoading(true);
    const res = await sendOtp(formData.email); // your API call
    if (res.success) {
      setOtpSent(true);
      setResendVisible(false);
      setResendTimer(30);
      alert("OTP sent!");
    }
    setLoading(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!otpSent) {
      handleGetOtp();
    } else {
      if (!formData.otp) return alert("Enter OTP!");
      setLoading(true);
      const res = await verifyOtp(formData.email, formData.otp);
      if (res.success) {
        console.log("Logged in:", { ...formData, keepLoggedIn });
        // TODO: redirect or save token
      } else {
        alert("Invalid OTP");
      }
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    const res = await sendOtp(formData.email);
    if (res.success) {
      setResendVisible(false);
      setResendTimer(30);
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
      {/* Left side */}
      <div className="relative w-full sm:w-1/2 bg-white flex flex-col items-center px-6 py-8">
        {/* Logo */}
        <div className="flex justify-center sm:justify-start w-full">
          <img src="/logo.png" alt="Logo" className="h-12 w-auto sm:ml-6" />
        </div>

        <div className="w-full max-w-md mt-12 sm:mt-6">
          <h2 className="text-3xl font-bold text-center sm:text-left">Sign in</h2>
          <p className="my-3 text-center sm:text-left">Sign in with your email & OTP</p>

          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            {/* Email input */}
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* OTP input - show only after OTP is sent */}
            {otpSent && (
              <div className="relative">
                <Input
                  label="OTP"
                  type={showOtp ? "text" : "password"}
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="pr-10"
                  placeholder="Enter OTP"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-500"
                  onClick={() => setShowOtp(!showOtp)}
                >
                  {showOtp ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>

                {!resendVisible && (
                  <p className="mt-1 text-sm text-gray-500">
                    Resend OTP in {resendTimer}s
                  </p>
                )}
                {resendVisible && (
                  <p
                    onClick={handleResendOtp}
                    className="mt-1 text-sm text-blue-600 cursor-pointer hover:underline"
                  >
                    Resend OTP
                  </p>
                )}
              </div>
            )}

            {/* Keep me logged in */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="keepLoggedIn"
                checked={keepLoggedIn}
                onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                className="h-4 w-4"
              />
              <label htmlFor="keepLoggedIn" className="text-sm text-gray-700">
                Keep me logged in
              </label>
            </div>

            {/* Submit button */}
            <Button type="submit" loading={loading}>
              {otpSent ? "Sign In" : "Get OTP"}
            </Button>
          </form>

          <p className="mt-3 text-center sm:text-left">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Right side image */}
      <div className="hidden sm:block sm:w-1/2">
        <img src={images} alt="background" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

export default SignIn;