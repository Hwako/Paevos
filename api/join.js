// Paevos waitlist: Vercel serverless function at /api/join
// Adds the email to Resend Contacts and, if RESEND_FROM is set, sends a one-time welcome email.
//
// Environment variables (Vercel > Project > Settings > Environment Variables):
//   RESEND_API_KEY     required. A Resend API key with Full access (contacts need it).
//   RESEND_SEGMENT_ID  optional. Puts every signup in this segment, e.g. "Waitlist".
//   RESEND_FROM        optional. e.g. "Paevos <hello@paevos.com>". Turns on the welcome email.
//                      The domain must be verified in Resend first.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RESEND = 'https://api.resend.com';

function welcomeEmail() {
  const subject = "You're in. Paevos says hi.";
  const text = [
    "You're on the list.",
    '',
    'Smart move. That was the easiest money decision you will make all week.',
    '',
    'PAEVOS CHECK',
    'Joining the waitlist ........ $0.00',
    'Launch date ................. soon',
    'Verdict ..................... FITS',
    '',
    "Paevos is a money assistant for your iPhone. Connect your bank once and it tells you what you can spend today, whether that thing in your cart actually fits, and how close you are to the stuff you're saving for.",
    '',
    'Know it. See where every dollar goes.',
    'Plan it. A fresh daily budget every morning.',
    'Own it. Goals with real finish dates.',
    '',
    "What happens now? We keep building. You'll get exactly one more email from us: the day Paevos hits the App Store.",
    '',
    'Talk soon,',
    'Hamza, building Paevos in Los Angeles',
    '',
    'P.S. Know someone who checks their bank app with one eye closed? Send them paevos.com.'
  ].join('\n');
  const serif = "Georgia,'Times New Roman',serif";
  const sans = "-apple-system,'Segoe UI',Helvetica,Arial,sans-serif";
  const mono = "'SFMono-Regular',Menlo,Consolas,'Courier New',monospace";
  const row = (label, value, color) => `<tr><td style="padding:10px 0;border-top:1px solid #E7E6E2;font:15px/1.5 ${sans};color:#17161D"><span style="display:inline-block;width:10px;height:10px;border-radius:5px;background:${color};margin-right:10px"></span><b style="font-family:${serif};font-size:18px;font-weight:600">${label}</b> <span style="color:#64626C">${value}</span></td></tr>`;
  const line = (l, r) => `<tr><td style="padding:3px 0;font:13px/1.5 ${mono};color:#1C1B22">${l}</td><td align="right" style="padding:3px 0;font:13px/1.5 ${mono};color:#1C1B22">${r}</td></tr>`;
  const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#F1F1EF">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">One less money question to worry about. Here's what happens next.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F1F1EF"><tr><td align="center" style="padding:28px 14px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
<tr><td style="background:#2D2552;padding:22px 28px 0">
  <table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td style="vertical-align:middle"><img src="https://paevos.com/assets/logo-email.png" width="36" height="36" alt="" style="display:block;border:0;border-radius:8px"></td>
    <td style="vertical-align:middle;padding-left:10px;font:600 18px ${sans};color:#FFFFFF;letter-spacing:-0.2px">Paevos</td>
  </tr></table>
</td></tr>
<tr><td style="background:#2D2552;padding:26px 28px 30px">
  <div style="font:500 44px/1.02 ${serif};color:#FFFFFF;letter-spacing:-1px">You're on<br>the <span style="color:#B7ADE8">list.</span></div>
  <div style="font:16px/1.55 ${sans};color:#D9D6EE;margin-top:14px">Smart move. That was the easiest money decision you'll make all week.</div>
</td></tr>
<tr><td style="background:#2D2552;padding:0 28px 30px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F6F5F1;border-radius:2px">
    <tr><td style="padding:18px 20px 6px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding-bottom:8px;border-bottom:1px solid #1C1B22;font:600 12px ${sans};letter-spacing:2px;color:#1C1B22">PAEVOS CHECK</td><td align="right" style="padding-bottom:8px;border-bottom:1px solid #1C1B22;font:12px ${mono};color:#6B6973">paevos.com</td></tr>
        <tr><td colspan="2" style="height:8px"></td></tr>
        ${line('Joining the waitlist', '$0.00')}
        ${line('Launch date', 'soon')}
        ${line('Effort required', 'none')}
      </table>
    </td></tr>
    <tr><td style="padding:6px 20px 18px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td style="border-top:2px dashed #C9C7C0;padding-top:12px;font:13px ${mono};color:#6B6973">Verdict</td>
        <td align="right" style="border-top:2px dashed #C9C7C0;padding-top:10px"><span style="display:inline-block;border:2px solid #3F7A52;color:#3F7A52;font:700 14px ${mono};letter-spacing:3px;padding:3px 12px">FITS</span></td>
      </tr></table>
    </td></tr>
  </table>
</td></tr>
<tr><td style="background:#FFFFFF;padding:30px 28px 8px;font:16px/1.6 ${sans};color:#17161D">
  Paevos is a money assistant for your iPhone. Connect your bank once and it tells you what you can spend <i>today</i>, whether that thing in your cart actually fits, and how close you are to the stuff you're saving for.
</td></tr>
<tr><td style="background:#FFFFFF;padding:14px 28px 6px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    ${row('Know it.', 'See where every dollar goes.', '#8F82D6')}
    ${row('Plan it.', 'A fresh daily budget every morning.', '#C3A260')}
    ${row('Own it.', 'Goals with real finish dates.', '#6F9680')}
  </table>
</td></tr>
<tr><td style="background:#FFFFFF;padding:18px 28px 6px;font:16px/1.6 ${sans};color:#17161D">
  <b>What happens now?</b> We keep building. You'll get exactly one more email from us: the day Paevos hits the App Store.
</td></tr>
<tr><td style="background:#FFFFFF;padding:18px 28px 28px;font:16px/1.6 ${sans};color:#17161D">
  Talk soon,<br><span style="font:500 22px ${serif}">Hamza</span><br><span style="color:#64626C;font-size:14px">Building Paevos in Los Angeles</span>
</td></tr>
<tr><td style="background:#EDEAFB;padding:16px 28px;font:14px/1.55 ${sans};color:#2D2552">
  <b>P.S.</b> Know someone who checks their bank app with one eye closed? Send them <a href="https://paevos.com" style="color:#2D2552;font-weight:600">paevos.com</a>.
</td></tr>
<tr><td style="padding:18px 28px;font:12px/1.6 ${sans};color:#8A8893;text-align:center">
  You're getting this because you joined the waitlist at <a href="https://paevos.com" style="color:#8A8893">paevos.com</a>. Not you? You can ignore this email.
</td></tr>
</table>
</td></tr></table>
</body></html>`;
  return { subject, html, text };
}

async function join({ email, source, company }) {
  if (company) return { code: 200, body: { status: 'ok' } };                       // honeypot: pretend success
  email = String(email || '').trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) return { code: 400, body: { error: 'invalid_email' } };

  const key = process.env.RESEND_API_KEY;
  if (!key) { console.error('RESEND_API_KEY is not set'); return { code: 500, body: { error: 'not_configured' } }; }
  const headers = { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };

  const contact = { email, unsubscribed: false };
  if (process.env.RESEND_SEGMENT_ID) contact.segments = [{ id: process.env.RESEND_SEGMENT_ID }];

  const res = await fetch(`${RESEND}/contacts`, { method: 'POST', headers, body: JSON.stringify(contact) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = `${data.name || ''} ${data.message || ''}`;
    if (res.status === 409 || /already exist/i.test(msg)) return { code: 200, body: { status: 'dupe' } };
    console.error('Resend contact error', res.status, msg, 'source:', source);
    return { code: 502, body: { error: 'save_failed' } };
  }

  if (process.env.RESEND_FROM) {
    const mail = welcomeEmail();
    const sent = await fetch(`${RESEND}/emails`, {
      method: 'POST',
      headers: { ...headers, 'Idempotency-Key': `paevos-welcome-${email}` },
      body: JSON.stringify({ from: process.env.RESEND_FROM, to: email, ...mail })
    });
    if (!sent.ok) console.error('Resend welcome email error', sent.status, await sent.text().catch(() => ''));
  }
  return { code: 200, body: { status: 'ok' } };
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'method_not_allowed' }); }
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  try {
    const out = await join(body || {});
    res.status(out.code).json(out.body);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server_error' });
  }
};
module.exports.join = join;
