#!/usr/bin/env python3
"""
Complete Dark Mode Fix - Comprehensive Solution
Fixes all remaining dark mode issues in the entire application
"""

import os
import re
from pathlib import Path

class CompleteDarkModeFix:
    def __init__(self, root_path: str):
        self.root_path = Path(root_path)
        self.changes_made = []
        
    def fix_landing_page(self):
        """Fix all dark mode issues in landing page"""
        file_path = self.root_path / "app/page.tsx"
        
        with open(file_path, 'r') as f:
            content = f.read()
        
        original = content
        
        # Fix PAS section background
        content = re.sub(
            r'<section className="bg-muted py-20">',
            '<section className="bg-muted dark:bg-slate-900 py-20">',
            content
        )
        
        # Fix Features section background
        content = re.sub(
            r'<section id="features" className="bg-muted py-20">',
            '<section id="features" className="bg-muted dark:bg-slate-900 py-20">',
            content
        )
        
        # Fix Social Proof section background
        content = re.sub(
            r'<section className="bg-muted py-20">\s*<div className="container mx-auto px-4">\s*<h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">\s*Trusted by Growing Brands',
            '<section className="bg-muted dark:bg-slate-900 py-20">\n        <div className="container mx-auto px-4">\n          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16">\n            Trusted by Growing Brands',
            content
        )
        
        # Fix mobile sticky CTA background
        content = re.sub(
            r'<div className="fixed bottom-0 left-0 right-0 md:hidden bg-background border-t border-border p-4 shadow-lg dark:bg-slate-950">',
            '<div className="fixed bottom-0 left-0 right-0 md:hidden bg-background dark:bg-slate-950 border-t border-border dark:border-slate-800 p-4 shadow-lg">',
            content
        )
        
        # Fix footer styling
        content = re.sub(
            r'<footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 dark:text-slate-500 py-12 mt-20">',
            '<footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 dark:text-slate-400 py-12 mt-20">',
            content
        )
        
        # Fix footer border
        content = re.sub(
            r'<div className="border-t border-slate-800 pt-8 text-center text-sm">',
            '<div className="border-t border-slate-800 dark:border-slate-700 pt-8 text-center text-sm">',
            content
        )
        
        if content != original:
            with open(file_path, 'w') as f:
                f.write(content)
            self.changes_made.append("✅ Fixed landing page dark mode styling")
            return True
        return False
    
    def fix_auth_pages(self):
        """Fix dark mode in all auth pages"""
        auth_files = [
            "app/(auth)/signup/page.tsx",
            "app/(auth)/login/page.tsx",
            "app/(auth)/verify-email/page.tsx",
        ]
        
        for file_name in auth_files:
            file_path = self.root_path / file_name
            if not file_path.exists():
                continue
            
            with open(file_path, 'r') as f:
                content = f.read()
            
            original = content
            
            # Fix background gradient
            content = re.sub(
                r'className="min-h-screen bg-background dark:bg-slate-950',
                'className="min-h-screen bg-background dark:bg-slate-950',
                content
            )
            
            if content != original:
                with open(file_path, 'w') as f:
                    f.write(content)
                self.changes_made.append(f"✅ Fixed {file_name}")
    
    def fix_dashboard(self):
        """Fix dark mode in dashboard"""
        file_path = self.root_path / "app/(dashboard)/layout.tsx"
        
        with open(file_path, 'r') as f:
            content = f.read()
        
        original = content
        
        # Ensure proper dark mode styling
        content = re.sub(
            r'className="min-h-screen bg-background"',
            'className="min-h-screen bg-background dark:bg-slate-950"',
            content
        )
        
        if content != original:
            with open(file_path, 'w') as f:
                f.write(content)
            self.changes_made.append("✅ Fixed dashboard layout dark mode")
    
    def fix_ui_components(self):
        """Fix all UI components for dark mode"""
        components = {
            "components/ui/button.tsx": [
                (r'className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"',
                 'className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background dark:ring-offset-slate-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50"'),
            ],
            "components/ui/label.tsx": [
                (r'className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"',
                 'className="text-sm font-medium leading-none text-foreground dark:text-slate-200 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"'),
            ],
        }
        
        for file_name, replacements in components.items():
            file_path = self.root_path / file_name
            if not file_path.exists():
                continue
            
            with open(file_path, 'r') as f:
                content = f.read()
            
            original = content
            
            for old, new in replacements:
                content = content.replace(old, new)
            
            if content != original:
                with open(file_path, 'w') as f:
                    f.write(content)
                self.changes_made.append(f"✅ Fixed {file_name}")
    
    def run(self):
        """Run all fixes"""
        print("🔧 Running comprehensive dark mode fixes...")
        print("=" * 80)
        
        self.fix_landing_page()
        self.fix_auth_pages()
        self.fix_dashboard()
        self.fix_ui_components()
        
        print("\n".join(self.changes_made))
        print("=" * 80)
        print(f"\n✅ Completed {len(self.changes_made)} fixes")
        print("\nNext steps:")
        print("1. Review all changes")
        print("2. Test dark mode thoroughly")
        print("3. Make single comprehensive commit")
        print("4. Push to GitHub")


def main():
    root_path = "/Users/aditya/SAAS/Ecommerce"
    fixer = CompleteDarkModeFix(root_path)
    fixer.run()


if __name__ == "__main__":
    main()
