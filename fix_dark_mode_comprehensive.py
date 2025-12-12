#!/usr/bin/env python3
"""
Comprehensive Dark Mode Fixer
Converts all hardcoded colors to dark mode compatible semantic classes
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Tuple

class ComprehensiveDarkModeFixer:
    def __init__(self, root_path: str):
        self.root_path = Path(root_path)
        
        # Comprehensive color replacement mappings
        self.replacements = [
            # Background colors - light backgrounds
            (r'\bbg-white\b(?!\s+dark:)', 'bg-white dark:bg-slate-950'),
            (r'\bbg-slate-50\b(?!\s+dark:)', 'bg-slate-50 dark:bg-slate-900'),
            (r'\bbg-slate-100\b(?!\s+dark:)', 'bg-slate-100 dark:bg-slate-800'),
            (r'\bbg-blue-50\b(?!\s+dark:)', 'bg-blue-50 dark:bg-blue-950'),
            (r'\bbg-green-50\b(?!\s+dark:)', 'bg-green-50 dark:bg-green-950'),
            (r'\bbg-red-50\b(?!\s+dark:)', 'bg-red-50 dark:bg-red-950'),
            (r'\bbg-yellow-50\b(?!\s+dark:)', 'bg-yellow-50 dark:bg-yellow-900'),
            (r'\bbg-orange-50\b(?!\s+dark:)', 'bg-orange-50 dark:bg-orange-950'),
            (r'\bbg-purple-50\b(?!\s+dark:)', 'bg-purple-50 dark:bg-purple-950'),
            
            # Text colors - dark text
            (r'\btext-slate-900\b(?!\s+dark:)', 'text-slate-900 dark:text-slate-50'),
            (r'\btext-slate-700\b(?!\s+dark:)', 'text-slate-700 dark:text-slate-200'),
            (r'\btext-slate-600\b(?!\s+dark:)', 'text-slate-600 dark:text-slate-400'),
            (r'\btext-gray-900\b(?!\s+dark:)', 'text-gray-900 dark:text-gray-50'),
            (r'\btext-gray-700\b(?!\s+dark:)', 'text-gray-700 dark:text-gray-200'),
            (r'\btext-gray-600\b(?!\s+dark:)', 'text-gray-600 dark:text-gray-400'),
            
            # Accent colors
            (r'\btext-blue-600\b(?!\s+dark:)', 'text-blue-600 dark:text-blue-400'),
            (r'\btext-green-600\b(?!\s+dark:)', 'text-green-600 dark:text-green-400'),
            (r'\btext-red-600\b(?!\s+dark:)', 'text-red-600 dark:text-red-400'),
            (r'\btext-yellow-500\b(?!\s+dark:)', 'text-yellow-500 dark:text-yellow-400'),
            (r'\btext-orange-600\b(?!\s+dark:)', 'text-orange-600 dark:text-orange-400'),
            (r'\btext-purple-600\b(?!\s+dark:)', 'text-purple-600 dark:text-purple-400'),
            
            # Fill colors
            (r'\bfill-yellow-500\b(?!\s+dark:)', 'fill-yellow-500 dark:fill-yellow-400'),
            (r'\bfill-green-600\b(?!\s+dark:)', 'fill-green-600 dark:fill-green-400'),
            
            # Borders
            (r'\bborder-slate-200\b(?!\s+dark:)', 'border-slate-200 dark:border-slate-800'),
            (r'\bborder-slate-100\b(?!\s+dark:)', 'border-slate-100 dark:border-slate-800'),
            (r'\bborder-blue-200\b(?!\s+dark:)', 'border-blue-200 dark:border-blue-800'),
            (r'\bborder-green-200\b(?!\s+dark:)', 'border-green-200 dark:border-green-800'),
            (r'\bborder-red-200\b(?!\s+dark:)', 'border-red-200 dark:border-red-800'),
            (r'\bborder-yellow-200\b(?!\s+dark:)', 'border-yellow-200 dark:border-yellow-800'),
            (r'\bborder-gray-200\b(?!\s+dark:)', 'border-gray-200 dark:border-gray-800'),
            
            # Hover states
            (r'\bhover:text-slate-900\b(?!\s+dark:)', 'hover:text-slate-900 dark:hover:text-slate-50'),
            (r'\bhover:text-white\b(?!\s+dark:)', 'hover:text-white dark:hover:text-slate-100'),
            (r'\bhover:text-slate-700\b(?!\s+dark:)', 'hover:text-slate-700 dark:hover:text-slate-300'),
            
            # Gradient backgrounds
            (r'\bfrom-blue-50\b(?!\s+dark:)', 'from-blue-50 dark:from-blue-950'),
            (r'\bto-indigo-100\b(?!\s+dark:)', 'to-indigo-100 dark:to-indigo-950'),
            (r'\bfrom-slate-100\b(?!\s+dark:)', 'from-slate-100 dark:from-slate-800'),
            (r'\bto-slate-200\b(?!\s+dark:)', 'to-slate-200 dark:to-slate-700'),
        ]
        
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
    
    def fix_file(self, file_path: Path) -> Tuple[int, str]:
        """Fix a single file and return number of changes and summary"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            changes = 0
            
            # Apply all replacements
            for pattern, replacement in self.replacements:
                new_content = re.sub(pattern, replacement, content)
                if new_content != content:
                    changes += content.count(re.search(pattern, content).group() if re.search(pattern, content) else '')
                    content = new_content
            
            # Write back if changed
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                return changes, f"✅ Fixed {file_path.relative_to(self.root_path)}"
            
            return 0, None
        
        except Exception as e:
            return 0, f"❌ Error in {file_path}: {e}"
    
    def run(self):
        """Run the comprehensive fixer"""
        print("🚀 Starting comprehensive dark mode fix...")
        print("=" * 80)
        
        total_changes = 0
        files_modified = 0
        
        for root, dirs, files in os.walk(self.root_path):
            # Skip directories
            dirs[:] = [d for d in dirs if not self.should_skip_file(Path(root) / d)]
            
            for file in files:
                if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
                    file_path = Path(root) / file
                    if self.should_skip_file(file_path):
                        continue
                    
                    changes, message = self.fix_file(file_path)
                    if changes > 0:
                        files_modified += 1
                        total_changes += changes
                        if message:
                            print(message)
        
        print("=" * 80)
        print(f"\n✅ COMPLETE!")
        print(f"   Files modified: {files_modified}")
        print(f"   Total replacements: {total_changes}")
        print("\n📋 Next steps:")
        print("   1. Review the changes in your IDE")
        print("   2. Test the app in both light and dark modes")
        print("   3. Check for any visual issues")
        print("   4. Commit the changes to git")


def main():
    root_path = "/Users/aditya/SAAS/Ecommerce"
    fixer = ComprehensiveDarkModeFixer(root_path)
    fixer.run()


if __name__ == "__main__":
    main()
