import React, { useState } from "react";
import images from "../../assets/background.webp";
import Input from "../Input";
import Button from "../Button";
import { Eye, EyeOff } from "lucide-react";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [showOtp, setShowOtp] = useState(false);

  // Handle input change (special restriction for OTP)
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "otp") {
      value = value.replace(/\D/g, ""); // only numbers
      if (value.length > 6) value = value.slice(0, 6); // max 6 digits
    }

    setFormData({ ...formData, [name]: value });
  };

  // Step 1: Send OTP
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      try {
        // 🔹 Attach your SEND OTP API here
        // Example: await axios.post("/api/send-otp", { email: formData.email });
        console.log("OTP sent to:", formData.email);

        setOtpSent(true);
      } catch (error) {
        console.error(error);
        alert("Failed to send OTP");
      }
    } else {
      // Step 2: Verify OTP
      try {
        if (formData.otp.length !== 6) {
          alert("Please enter a valid 6-digit OTP");
          return;
        }

        // 🔹 Attach your VERIFY OTP API here
        // Example: await axios.post("/api/verify-otp", formData);
        console.log("Verifying OTP:", formData.otp);

        alert("Signup successful!");
      } catch (error) {
        console.error(error);
        alert("Invalid OTP");
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col sm:flex-row">
  {/* Left side (50%) */}
  <div className="relative w-full sm:w-1/2 bg-white flex flex-col items-center px-6 py-8">
    
    {/* 🔹 Logo */}
    <div className="flex justify-center sm:justify-start w-full">
      <img src="/logo.png" alt="Logo" className="h-12 w-auto sm:ml-6" />
    </div>

    {/* Form with top margin on mobile */}
    <div className="w-full max-w-md mt-12 sm:mt-6">
      <h2 className="text-3xl font-bold text-center sm:text-left">Sign up</h2>
      <p className="my-3 text-center sm:text-left">
        Sign up to enjoy the feature of HD
      </p>

      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <Input
          label="Your Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Date of Birth"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {otpSent && (
          <div className="relative">
            <Input
              label="OTP"
              type={showOtp ? "text" : "password"}
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-4 text-gray-500"
              onClick={() => setShowOtp(!showOtp)}
            >
              {showOtp ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        )}

        <Button type="submit">{otpSent ? "Sign Up" : "Get OTP"}</Button>
      </form>

      <p className="mt-3 text-center sm:text-left">
        Already have an account??{" "}
        <a href="/login" className="text-blue-600 font-medium">
          Sign in
        </a>
      </p>
    </div>
  </div>

  {/* Right side (50%) */}
  <div className="hidden sm:block sm:w-1/2">
    <img
      src={images}
      alt="background"
      className="h-full w-full object-cover"
    />
  </div>
</div>


  );
}

export default SignUp;
