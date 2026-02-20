# AI Resume Builder — Test Checklist

Use this checklist to verify all features. Check each item after testing.

---

## 1. All form sections save to localStorage

- [ ] Go to **Builder** (`/builder`).
- [ ] Fill in: **Personal Info** (name, email, phone, location), **Summary**, **Education** (add one entry), **Experience** (add one with bullets), **Projects** (add one), **Skills** (add 5+ in any category), **Links** (GitHub, LinkedIn).
- [ ] Refresh the page (F5).
- [ ] **Pass:** All fields and sections are still filled. In DevTools → Application → Local Storage, key `resumeBuilderData` contains the data.

---

## 2. Live preview updates in real-time

- [ ] On **Builder**, keep the right panel visible.
- [ ] Change name, add a skill, or edit summary.
- [ ] **Pass:** The live preview panel updates immediately without saving or refreshing.

---

## 3. Template switching preserves data

- [ ] On **Builder** or **Preview**, fill in some resume content.
- [ ] Switch template (Classic → Modern → Minimal) using the template thumbnails.
- [ ] **Pass:** Content stays the same; only layout and typography change. No data is lost.

---

## 4. Color theme persists after refresh

- [ ] On **Builder** or **Preview**, select a different color (e.g. Navy or Burgundy).
- [ ] Refresh the page.
- [ ] **Pass:** The selected color is still active. In Local Storage, `resumeBuilderTheme` has the correct `accent` value.

---

## 5. ATS score calculates correctly

- [ ] Start with an empty resume. **Pass:** Score is 0.
- [ ] Add name → +10. Add email → +10. Add summary > 50 chars → +10. Add one experience with bullets → +15. Add one education → +10. Add 5+ skills → +10. Add one project → +10. Add phone → +5. Add LinkedIn → +5. Add GitHub → +5. Use an action verb in summary (e.g. "Built") → +10.
- [ ] **Pass:** Score reaches 100 (or 100 capped). Verify each change adds the expected points.

---

## 6. Score updates live on edit

- [ ] On **Builder**, note the ATS score in the right panel.
- [ ] Add or remove name, summary, a skill, or a project.
- [ ] **Pass:** Score and improvement list update immediately without refresh.

---

## 7. Export buttons work (copy / download)

- [ ] Go to **Preview** (`/preview`).
- [ ] Click **Copy Resume as Text**. Paste in Notepad. **Pass:** Plain-text resume appears.
- [ ] Click **Download PDF**. **Pass:** Toast shows: "PDF export ready! Check your downloads."
- [ ] Click **Print / Save as PDF**. **Pass:** Browser print dialog opens; only the resume is in the print view.

---

## 8. Empty states handled gracefully

- [ ] Clear all resume data (or open in incognito with no localStorage).
- [ ] **Pass:** Preview shows placeholders (e.g. "Your Name"); no errors. ATS score is 0 with improvement suggestions. Export warning may show ("Your resume may look incomplete") but export is not blocked.

---

## 9. Mobile responsive layout works

- [ ] Resize the browser to a narrow width (~375px) or use device toolbar.
- [ ] **Pass:** Builder form and preview stack or scroll; template picker and color circles wrap; Preview sidebar stacks above resume; no horizontal overflow; buttons and inputs remain usable.

---

## 10. No console errors on any page

- [ ] Open DevTools → Console.
- [ ] Visit **/** (Home), **/builder**, **/preview**, **/proof**. Click through template and color options, add data, export.
- [ ] **Pass:** No red errors in the console (warnings are acceptable).

---

## Summary

- **Total items:** 10  
- **Pass criteria:** All checked after manual testing.  
- **ATS rules (reference):** +10 name, +10 email, +10 summary >50 chars, +15 experience with bullets, +10 education, +10 skills ≥5, +10 project ≥1, +5 phone, +5 LinkedIn, +5 GitHub, +10 action verbs in summary. Max 100.
