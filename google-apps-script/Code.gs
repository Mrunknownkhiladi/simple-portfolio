const TO_EMAIL = "abhayrajtyagi207@gmail.com";
const SUBJECT_PREFIX = "Portfolio Contact";

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function sanitize(value) {
  return String(value || "").trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function doGet() {
  return jsonResponse({
    ok: true,
    message: "Google Apps Script contact backend is running."
  });
}

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};

    const name = sanitize(p.name);
    const email = sanitize(p.email).toLowerCase();
    const subject = sanitize(p.subject);
    const message = sanitize(p.message);
    const source = sanitize(p.source);

    if (!name || name.length < 2 || name.length > 60) {
      return jsonResponse({ ok: false, message: "Invalid name." });
    }

    if (!isValidEmail(email)) {
      return jsonResponse({ ok: false, message: "Invalid email." });
    }

    if (!subject || subject.length < 3 || subject.length > 120) {
      return jsonResponse({ ok: false, message: "Invalid subject." });
    }

    if (!message || message.length < 10 || message.length > 1200) {
      return jsonResponse({ ok: false, message: "Invalid message." });
    }

    const finalSubject = `${SUBJECT_PREFIX}: ${subject}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Source: ${source || "portfolio-site"}`,
      "",
      "Message:",
      message
    ].join("\n");

    MailApp.sendEmail({
      to: TO_EMAIL,
      replyTo: email,
      subject: finalSubject,
      body: body,
      name: "Portfolio Contact Form"
    });

    return jsonResponse({ ok: true, message: "Message sent." });
  } catch (error) {
    return jsonResponse({
      ok: false,
      message: "Server error.",
      error: String(error)
    });
  }
}
