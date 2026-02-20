# AI Resume Builder — Proof & Submission Verification

Use these steps to confirm the Proof page and Shipped logic work correctly.

---

## 1. Proof link validation

- Go to **Proof** (`/rb/proof`).
- **Lovable Project Link:** Enter `not-a-url`.  
  **Pass:** Inline error appears (e.g. "Enter a valid URL (e.g. https://...)"), input has invalid styling.
- Enter `https://lovable.app/...`.  
  **Pass:** Error clears.
- **GitHub Repository Link:** Enter `ftp://bad`.  
  **Pass:** Error shown; only `http:` and `https:` are accepted.
- Enter `https://github.com/user/repo`.  
  **Pass:** Error clears.
- **Deployed URL:** Leave empty, then enter `https://myapp.vercel.app`.  
  **Pass:** Empty is invalid for Shipped; valid URL clears any error.

---

## 2. Copy Final Submission format

- Fill all three proof links with valid URLs.
- Click **Copy Final Submission**.
- Paste into a text editor.

**Pass:** Pasted text matches this structure exactly (with your links in place):

```
------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: {your lovable link}
GitHub Repository: {your github link}
Live Deployment: {your deploy link}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------
```

---

## 3. Shipped status rule

- With **some** steps missing artifacts or **some** checklist items unchecked or **any** proof link missing/invalid:
  - **Pass:** Top-right status badge shows **"In Progress"** (not "Shipped").
- Complete all 8 steps (artifact present for each), check all 10 checklist items, and provide three valid proof URLs.
  - **Pass:** Status badge changes to **"Shipped"** (green).
- Uncheck one checklist item or clear one proof link.
  - **Pass:** Status returns to **"In Progress"**.

---

## 4. Checklist lock (no bypass)

- Ensure all 8 steps have artifacts and all 3 proof links are valid.
- Leave at least one of the 10 checklist checkboxes **unchecked**.
  - **Pass:** Status remains **"In Progress"**; "Project 3 Shipped Successfully." does **not** appear.
- Check the remaining box(es).
  - **Pass:** Only then does status become "Shipped" and the completion message appear.

---

## 5. Completion confirmation (calm, no confetti)

- When status is **Shipped** (all 8 steps + 10 checklist + 3 valid links):
  - **Pass:** Page shows the message: **"Project 3 Shipped Successfully."**
  - **Pass:** Message is calm (no confetti, no flashy animations).

---

## 6. Persistence

- On Proof page, fill the three links and check several checklist items.
- Refresh the page (F5).
  - **Pass:** Links and checklist state are restored from `rb_final_submission` and `rb_checklist` in localStorage.
