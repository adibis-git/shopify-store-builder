================================================================================
DARK MODE AUDIT REPORT
================================================================================

Total hardcoded colors found: 69
Files affected: 12

================================================================================
ISSUES BY FILE
================================================================================


📄 app/(auth)/login/page.tsx
   Issues: 3
   Line 11: ⚠️ MANUAL
      Old: bg-slate-950
      New: None
   Line 15: ⚠️ MANUAL
      Old: bg-blue-600
      New: None
   Line 16: ✅ AUTO-FIX
      Old: text-white
      New: text-white dark:text-white

📄 app/(auth)/signup/page.tsx
   Issues: 3
   Line 11: ⚠️ MANUAL
      Old: bg-slate-950
      New: None
   Line 15: ⚠️ MANUAL
      Old: bg-blue-600
      New: None
   Line 16: ✅ AUTO-FIX
      Old: text-white
      New: text-white dark:text-white

📄 app/(auth)/verify-email/page.tsx
   Issues: 10
   Line 13: ⚠️ MANUAL
      Old: bg-slate-950
      New: None
   Line 17: ⚠️ MANUAL
      Old: bg-blue-600
      New: None
   Line 18: ✅ AUTO-FIX
      Old: text-white
      New: text-white dark:text-white
   Line 28: ⚠️ MANUAL
      Old: bg-green-10
      New: None
   Line 28: ⚠️ MANUAL
      Old: bg-green-950
      New: None
   Line 35: ⚠️ MANUAL
      Old: text-slate-100
      New: None
   Line 60: ⚠️ MANUAL
      Old: bg-blue-5
      New: None
   Line 60: ⚠️ MANUAL
      Old: bg-blue-950
      New: None
   Line 60: ⚠️ MANUAL
      Old: border-blue-20
      New: None
   Line 60: ⚠️ MANUAL
      Old: border-blue-800
      New: None

📄 app/(dashboard)/dashboard/page.tsx
   Issues: 2
   Line 90: ✅ AUTO-FIX
      Old: text-slate-600
      New: text-slate-600 dark:text-slate-400
   Line 109: ✅ AUTO-FIX
      Old: text-slate-600
      New: text-slate-600 dark:text-slate-400

📄 app/(dashboard)/layout.tsx
   Issues: 5
   Line 42: ⚠️ MANUAL
      Old: bg-slate-950
      New: None
   Line 45: ⚠️ MANUAL
      Old: bg-blue-600
      New: None
   Line 46: ✅ AUTO-FIX
      Old: text-white
      New: text-white dark:text-white
   Line 93: ⚠️ MANUAL
      Old: bg-slate-950
      New: None
   Line 113: ⚠️ MANUAL
      Old: border-slate-800
      New: None

📄 app/page.tsx
   Issues: 16
   Line 69: ⚠️ MANUAL
      Old: bg-slate-95
      New: None
   Line 69: ⚠️ MANUAL
      Old: text-slate-50
      New: None
   Line 71: ⚠️ MANUAL
      Old: bg-slate-950
      New: None
   Line 74: ⚠️ MANUAL
      Old: bg-blue-600
      New: None
   Line 75: ✅ AUTO-FIX
      Old: text-white
      New: text-white dark:text-white
   Line 143: ⚠️ MANUAL
      Old: bg-red-5
      New: None
   Line 143: ⚠️ MANUAL
      Old: bg-red-950
      New: None
   Line 550: ⚠️ MANUAL
      Old: bg-slate-950
      New: None
   Line 564: ⚠️ MANUAL
      Old: bg-slate-90
      New: None
   Line 564: ⚠️ MANUAL
      Old: bg-slate-950
      New: None
   Line 564: ⚠️ MANUAL
      Old: text-slate-40
      New: None
   Line 564: ⚠️ MANUAL
      Old: text-slate-500
      New: None
   Line 569: ⚠️ MANUAL
      Old: bg-blue-600
      New: None
   Line 570: ✅ AUTO-FIX
      Old: text-white
      New: text-white dark:text-white
   Line 572: ✅ AUTO-FIX
      Old: text-white
      New: text-white dark:text-white
   Line 600: ⚠️ MANUAL
      Old: border-slate-800
      New: None

📄 components/auth/LoginForm.tsx
   Issues: 2
   Line 110: ⚠️ MANUAL
      Old: bg-red-5
      New: None
   Line 110: ⚠️ MANUAL
      Old: bg-red-950
      New: None

📄 components/auth/SignupForm.tsx
   Issues: 4
   Line 157: ⚠️ MANUAL
      Old: bg-red-5
      New: None
   Line 157: ⚠️ MANUAL
      Old: bg-red-950
      New: None
   Line 165: ⚠️ MANUAL
      Old: bg-green-5
      New: None
   Line 165: ⚠️ MANUAL
      Old: bg-green-950
      New: None

📄 components/ui/card.tsx
   Issues: 6
   Line 12: ⚠️ MANUAL
      Old: bg-slate-950
      New: None
   Line 12: ⚠️ MANUAL
      Old: text-slate-95
      New: None
   Line 12: ⚠️ MANUAL
      Old: text-slate-50
      New: None
   Line 12: ⚠️ MANUAL
      Old: border-slate-20
      New: None
   Line 12: ⚠️ MANUAL
      Old: border-slate-800
      New: None
   Line 53: ⚠️ MANUAL
      Old: text-slate-500
      New: None

📄 components/ui/dialog.tsx
   Issues: 4
   Line 39: ⚠️ MANUAL
      Old: bg-slate-950
      New: None
   Line 39: ⚠️ MANUAL
      Old: border-slate-20
      New: None
   Line 39: ⚠️ MANUAL
      Old: border-slate-800
      New: None
   Line 103: ⚠️ MANUAL
      Old: text-slate-500
      New: None

📄 components/ui/input.tsx
   Issues: 7
   Line 13: ⚠️ MANUAL
      Old: bg-slate-950
      New: None
   Line 13: ⚠️ MANUAL
      Old: text-slate-95
      New: None
   Line 13: ⚠️ MANUAL
      Old: text-slate-50
      New: None
   Line 13: ⚠️ MANUAL
      Old: text-slate-50
      New: None
   Line 13: ✅ AUTO-FIX
      Old: text-slate-400
      New: text-slate-400 dark:text-slate-600
   Line 13: ⚠️ MANUAL
      Old: border-slate-20
      New: None
   Line 13: ⚠️ MANUAL
      Old: border-slate-800
      New: None

📄 components/ui/textarea.tsx
   Issues: 7
   Line 14: ⚠️ MANUAL
      Old: bg-slate-950
      New: None
   Line 14: ⚠️ MANUAL
      Old: text-slate-95
      New: None
   Line 14: ⚠️ MANUAL
      Old: text-slate-50
      New: None
   Line 14: ⚠️ MANUAL
      Old: text-slate-50
      New: None
   Line 14: ✅ AUTO-FIX
      Old: text-slate-400
      New: text-slate-400 dark:text-slate-600
   Line 14: ⚠️ MANUAL
      Old: border-slate-20
      New: None
   Line 14: ⚠️ MANUAL
      Old: border-slate-800
      New: None

================================================================================
SUMMARY
================================================================================
Auto-fixable issues: 11
Requires manual review: 58
