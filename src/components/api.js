
// Mock API calls for OTP until backend is ready
export const sendOtp = async (email) => {
  console.log("📩 Sending OTP to:", email);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: "OTP sent successfully" };
};

export const verifyOtp = async (email, otp) => {
  console.log("✅ Verifying OTP for:", email, "OTP:", otp);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // For testing, accept only "1234"
  if (otp === "1234") {
    return { success: true, token: "fake-jwt-token" };
  } else {
    return { success: false, message: "Invalid OTP" };
  }
};
