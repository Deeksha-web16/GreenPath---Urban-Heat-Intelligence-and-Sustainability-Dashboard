
"use server";

// This file is currently not in use due to the localStorage refactor,
// but is kept for potential future use with a real backend.
// All logic has been moved to client-side components.

export async function updateUserSetup(prevState: any, formData: FormData) {
  // This function is disabled in demo mode.
  console.log("updateUserSetup called, but is disabled in demo mode.");
  return { success: false, message: "This feature is not available in demo mode." };
}

export async function submitFeedback(prevState: any, formData: FormData) {
  // This function is disabled in demo mode.
  console.log("submitFeedback called, but is disabled in demo mode.");
  return { success: false, message: "This feature is not available in demo mode." };
}
