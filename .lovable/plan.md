# Verify drumsarchives.dev in Resend so contact form delivers to archivedrums@gmail.com

## What needs to happen

**Important constraint:** DNS records for `drumsarchives.dev` live at the registrar (Name.com), outside Lovable. I cannot add them for you — only you can, in the Name.com dashboard. I will give you the exact steps, and I will handle everything on the code/site side.

## Steps

### 1. Add the domain in Resend (you, ~2 min)
- Open your Resend dashboard → **Domains → Add Domain**
- Enter `drumsarchives.dev`
- Resend will show the DNS records it needs (DKIM TXT records, plus optional SPF/MX).

### 2. Add those records at Name.com (you, ~5 min)
- Log in at Name.com → select `drumsarchives.dev` → **DNS Records**
- Add each record exactly as Resend shows (typically a TXT record like `resend._domainkey` with the DKIM value, plus the SPF/MX records Resend lists).
- **Do not delete** the existing A records (`@` and `www` → `185.158.133.1`) or the `_lovable` TXT record — those keep the website live.

### 3. Verify in Resend (you, 1 click)
- Back in Resend → Domains → click **Verify** on `drumsarchives.dev`.
- If it fails, DNS may still be propagating — wait up to 72h and re-click Verify. Check propagation at dnschecker.org.

### 4. Site side (already done — I verify, no changes expected)
- `src/lib/contact.functions.ts` already sends **from** `inquiries@drumsarchives.dev` **to** `archivedrums@gmail.com`, with the sender's email set as `reply_to`. Once the domain is verified in Resend, inquiries land in the DRUMS inbox with no code change.

### 5. End-to-end test (me, after you confirm "Verified")
- Publish the site and submit a real test inquiry through the live contact form at drumsarchives.dev.
- Confirm the success message appears and you receive it at archivedrums@gmail.com.

## What I will NOT do
- No switch away from Resend, no changes to form fields, copy, or design.
- No DNS changes from my side — records at an external registrar can only be added by the domain owner.
