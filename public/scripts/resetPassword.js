document.getElementById("resetPassword").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();

  if (!email) {
    return alert("Please enter your email");
  }

  try {
    const response = await fetch("/api/email/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Password reset link sent to your email!");
      location.replace("/LogIn");
    } else {
      alert(result.message || "Could not send reset email.");
    }
  } catch (error) {
    console.error("Reset email error:", error);
    alert("An error occurred.");
  }
});
