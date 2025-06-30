document.getElementById("resetPassword").addEventListener("click", async () => {
  const password = document.getElementById("newPassowrd").value.trim();
  const confirm = document.getElementById("confirmNewPassword").value.trim();

  if (!password || !confirm) {
    return alert("Please fill both fields");
  }

  if (password !== confirm) {
    return alert("Passwords do not match");
  }
  const token = window.location.pathname.split("/").pop(); // Extract token from URL

  try {
    const response = await fetch(`/api/email/new-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPassword: password,
        confirmNewPassword: confirm,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Password successfully reset!");
      location.replace("/LogIn");
    } else {
      alert(result.message || "Could not reset password.");
    }
  } catch (error) {
    console.error("Password reset error:", error);
    alert("An error occurred.");
  }
});
