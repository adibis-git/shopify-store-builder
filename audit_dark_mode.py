#!/usr/bin/env python3
"""
Dark Mode Audit and Fix Script
Analyzes the entire app for hardcoded colors and converts them to dark mode compatible versions
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Tuple
import json

class DarkModeAuditor:
    def __init__(self, root_path: str):
        self.root_path = Path(root_path)
        self.issues = []
        self.fixes = []
        
        # Color mappings: hardcoded -> dark mode compatible
        self.color_mappings = {
            # Backgrounds
            'bg-white': 'bg-white dark:bg-slate-950',
            'bg-slate-50': 'bg-slate-50 dark:bg-slate-900',
            'bg-slate-100': 'bg-slate-100 dark:bg-slate-800',
            'bg-blue-50': 'bg-blue-50 dark:bg-blue-950',
            'bg-green-50': 'bg-green-50 dark:bg-green-950',
            'bg-red-50': 'bg-red-50 dark:bg-red-950',
            'bg-yellow-50': 'bg-yellow-50 dark:bg-yellow-900',
            'bg-orange-50': 'bg-orange-50 dark:bg-orange-950',
            'bg-purple-50': 'bg-purple-50 dark:bg-purple-950',
            
            # Text colors
            'text-white': 'text-white dark:text-white',
            'text-slate-900': 'text-slate-900 dark:text-slate-50',
            'text-slate-700': 'text-slate-700 dark:text-slate-200',
            'text-slate-600': 'text-slate-600 dark:text-slate-400',
            'text-slate-400': 'text-slate-400 dark:text-slate-600',
            'text-gray-400': 'text-gray-400 dark:text-gray-600',
            'text-gray-900': 'text-gray-900 dark:text-gray-50',
            
            # Accent colors with dark variants
            'text-blue-600': 'text-blue-600 dark:text-blue-400',
            'text-green-600': 'text-green-600 dark:text-green-400',
            'text-red-600': 'text-red-600 dark:text-red-400',
            'text-yellow-500': 'text-yellow-500 dark:text-yellow-400',
            'text-orange-600': 'text-orange-600 dark:text-orange-400',
            'text-purple-600': 'text-purple-600 dark:text-purple-400',
            
            # Borders
            'border-slate-200': 'border-slate-200 dark:border-slate-800',
            'border-slate-100': 'border-slate-100 dark:border-slate-800',
            'border-blue-200': 'border-blue-200 dark:border-blue-800',
            'border-green-200': 'border-green-200 dark:border-green-800',
            'border-red-200': 'border-red-200 dark:border-red-800',
            'border-yellow-200': 'border-yellow-200 dark:border-yellow-800',
            
            # Fill colors
            'fill-yellow-500': 'fill-yellow-500 dark:fill-yellow-400',
            'fill-green-600': 'fill-green-600 dark:fill-green-400',
        }
        
        # Files to skip
        self.skip_patterns = [
            'node_modules',
            '.next',
            '.git',
            '__pycache__',
            '.env',
            'dist',
            'build',
        ]
    
    def should_skip_file(self, file_path: Path) -> bool:
        """Check if file should be skipped"""
        path_str = str(file_path)
        return any(pattern in path_str for pattern in self.skip_patterns)
    
    def find_hardcoded_colors(self) -> Dict[str, List[Tuple[str, int]]]:
        """Find all hardcoded colors in the codebase"""
        hardcoded_colors = {}
        
        # Patterns to search for
        patterns = [
            r'bg-white(?!\s*dark:)',
            r'bg-slate-\d+(?!\s*dark:)',
            r'bg-blue-\d+(?!\s*dark:)',
            r'bg-green-\d+(?!\s*dark:)',
            r'bg-red-\d+(?!\s*dark:)',
            r'text-slate-\d+(?!\s*dark:)',
            r'text-white(?!\s*dark:)',
            r'text-gray-\d+(?!\s*dark:)',
            r'border-slate-\d+(?!\s*dark:)',
            r'border-blue-\d+(?!\s*dark:)',
        ]
        
        for root, dirs, files in os.walk(self.root_path):
            # Skip directories
            dirs[:] = [d for d in dirs if not self.should_skip_file(Path(root) / d)]
            
            for file in files:
                if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
                    file_path = Path(root) / file
                    if self.should_skip_file(file_path):
                        continue
                    
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                            lines = content.split('\n')
                            
                            for line_num, line in enumerate(lines, 1):
                                for pattern in patterns:
                                    matches = re.finditer(pattern, line)
                                    for match in matches:
                                        color = match.group()
                                        key = str(file_path.relative_to(self.root_path))
                                        if key not in hardcoded_colors:
                                            hardcoded_colors[key] = []
                                        hardcoded_colors[key].append((color, line_num))
                    except Exception as e:
                        print(f"Error reading {file_path}: {e}")
        
        return hardcoded_colors
    
    def generate_fixes(self, hardcoded_colors: Dict[str, List[Tuple[str, int]]]) -> Dict[str, List[Dict]]:
        """Generate fixes for hardcoded colors"""
        fixes = {}
        
        for file_path, colors in hardcoded_colors.items():
            fixes[file_path] = []
            for color, line_num in colors:
                if color in self.color_mappings:
                    fixes[file_path].append({
                        'line': line_num,
                        'old': color,
                        'new': self.color_mappings[color],
                        'type': 'direct_replacement'
                    })
                else:
                    fixes[file_path].append({
                        'line': line_num,
                        'old': color,
                        'new': None,
                        'type': 'needs_manual_review'
                    })
        
        return fixes
    
    def generate_report(self, hardcoded_colors: Dict[str, List[Tuple[str, int]]], 
                       fixes: Dict[str, List[Dict]]) -> str:
        """Generate audit report"""
        report = []
        report.append("=" * 80)
        report.append("DARK MODE AUDIT REPORT")
        report.append("=" * 80)
        report.append("")
        
        total_issues = sum(len(colors) for colors in hardcoded_colors.values())
        report.append(f"Total hardcoded colors found: {total_issues}")
        report.append(f"Files affected: {len(hardcoded_colors)}")
        report.append("")
        
        report.append("=" * 80)
        report.append("ISSUES BY FILE")
        report.append("=" * 80)
        report.append("")
        
        for file_path in sorted(hardcoded_colors.keys()):
            colors = hardcoded_colors[file_path]
            file_fixes = fixes.get(file_path, [])
            
            report.append(f"\n📄 {file_path}")
            report.append(f"   Issues: {len(colors)}")
            
            for fix in file_fixes:
                status = "✅ AUTO-FIX" if fix['type'] == 'direct_replacement' else "⚠️ MANUAL"
                report.append(f"   Line {fix['line']}: {status}")
                report.append(f"      Old: {fix['old']}")
                report.append(f"      New: {fix['new']}")
        
        report.append("")
        report.append("=" * 80)
        report.append("SUMMARY")
        report.append("=" * 80)
        
        auto_fixable = sum(1 for file_fixes in fixes.values() 
                          for fix in file_fixes if fix['type'] == 'direct_replacement')
        manual_review = total_issues - auto_fixable
        
        report.append(f"Auto-fixable issues: {auto_fixable}")
        report.append(f"Requires manual review: {manual_review}")
        report.append("")
        
        return "\n".join(report)
    
    def run_audit(self):
        """Run the complete audit"""
        print("🔍 Scanning codebase for hardcoded colors...")
        hardcoded_colors = self.find_hardcoded_colors()
        
        print("🔧 Generating fixes...")
        fixes = self.generate_fixes(hardcoded_colors)
        
        print("📝 Generating report...")
        report = self.generate_report(hardcoded_colors, fixes)
        
        # Save report
        report_path = self.root_path / "DARK_MODE_AUDIT.md"
        with open(report_path, 'w') as f:
            f.write(report)
        
        print(f"\n✅ Audit complete! Report saved to: {report_path}")
        print(report)
        
        # Save fixes as JSON for reference
        fixes_path = self.root_path / "dark_mode_fixes.json"
        with open(fixes_path, 'w') as f:
            json.dump(fixes, f, indent=2)
        
        print(f"✅ Fixes saved to: {fixes_path}")
        
        return hardcoded_colors, fixes


class DarkModeAutoFixer:
    def __init__(self, root_path: str, fixes: Dict[str, List[Dict]]):
        self.root_path = Path(root_path)
        self.fixes = fixes
    
    def apply_fixes(self):
        """Apply auto-fixable changes to files"""
        print("\n🚀 Applying auto-fixes...")
        
        files_modified = 0
        total_fixes = 0
        
        for file_path_str, file_fixes in self.fixes.items():
            file_path = self.root_path / file_path_str
            
            if not file_path.exists():
                print(f"⚠️  File not found: {file_path}")
                continue
            
            auto_fixes = [f for f in file_fixes if f['type'] == 'direct_replacement']
            if not auto_fixes:
                continue
            
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                
                # Sort by line number in reverse to avoid offset issues
                for fix in sorted(auto_fixes, key=lambda x: x['line'], reverse=True):
                    old = fix['old']
                    new = fix['new']
                    # Replace all occurrences (not just by line to be safe)
                    content = content.replace(f' {old}', f' {new}')
                    content = content.replace(f'"{old}', f'"{new}')
                    content = content.replace(f"'{old}", f"'{new}")
                
                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    files_modified += 1
                    total_fixes += len(auto_fixes)
                    print(f"✅ Fixed {len(auto_fixes)} issues in {file_path_str}")
            
            except Exception as e:
                print(f"❌ Error fixing {file_path}: {e}")
        
        print(f"\n✅ Applied {total_fixes} fixes to {files_modified} files")


def main():
    root_path = "/Users/aditya/SAAS/Ecommerce"
    
    # Run audit
    auditor = DarkModeAuditor(root_path)
    hardcoded_colors, fixes = auditor.run_audit()
    
    # Ask user if they want to apply fixes
    print("\n" + "=" * 80)
    print("Would you like to apply auto-fixes? (y/n)")
    print("=" * 80)
    response = input("Apply fixes? (y/n): ").strip().lower()
    
    if response == 'y':
        fixer = DarkModeAutoFixer(root_path, fixes)
        fixer.apply_fixes()
        print("\n✅ Dark mode fixes applied successfully!")
        print("Please review the changes and test the application.")
    else:
        print("\n📋 Audit complete. Review DARK_MODE_AUDIT.md for details.")


if __name__ == "__main__":
    main()
