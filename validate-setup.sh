#!/bin/bash

# Task Management System Validation Script
# This script validates the n8n workflows and configuration files

echo "🔍 Validating Task Management System Setup..."
echo "=================================================="

# Check if required files exist
required_files=(
    "slack-app-manifest.yml"
    "TASK_MANAGEMENT_SETUP.md"
    "نظام_إدارة_المهام.md"
    "GOOGLE_SHEETS_TEMPLATE.md"
    "n8n/demo-data/workflows/task-create.json"
    "n8n/demo-data/workflows/task-status-updates.json"
    "n8n/demo-data/workflows/file-archiving.json"
    "n8n/demo-data/workflows/weekly-reports.json"
    "n8n/demo-data/credentials/google-sheets-credential.json"
    "n8n/demo-data/credentials/google-drive-credential.json"
    "n8n/demo-data/credentials/slack-oauth-credential.json"
)

echo "📁 Checking required files..."
missing_files=0
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (MISSING)"
        ((missing_files++))
    fi
done

echo ""
echo "📋 Validation Summary:"
echo "======================"
if [ $missing_files -eq 0 ]; then
    echo "✅ All required files are present!"
    echo "✅ Task Management System is ready for setup"
else
    echo "❌ $missing_files file(s) missing"
    echo "❌ Please ensure all files are created before proceeding"
fi

# Validate JSON files
echo ""
echo "🔧 Validating JSON workflows..."
json_files=(
    "n8n/demo-data/workflows/task-create.json"
    "n8n/demo-data/workflows/task-status-updates.json"
    "n8n/demo-data/workflows/file-archiving.json"
    "n8n/demo-data/workflows/weekly-reports.json"
    "n8n/demo-data/credentials/google-sheets-credential.json"
    "n8n/demo-data/credentials/google-drive-credential.json"
    "n8n/demo-data/credentials/slack-oauth-credential.json"
)

json_errors=0
for file in "${json_files[@]}"; do
    if [ -f "$file" ]; then
        if python3 -m json.tool "$file" >/dev/null 2>&1; then
            echo "✅ $file (Valid JSON)"
        else
            echo "❌ $file (Invalid JSON)"
            ((json_errors++))
        fi
    fi
done

echo ""
if [ $json_errors -eq 0 ]; then
    echo "✅ All JSON files are valid!"
else
    echo "❌ $json_errors JSON file(s) have syntax errors"
fi

# Check for placeholder values that need to be updated
echo ""
echo "⚠️  Configuration Placeholders to Update:"
echo "=========================================="
echo "📝 In workflows, replace:"
echo "   - YOUR_GOOGLE_SHEET_ID"
echo "   - YOUR_SLACK_BOT_TOKEN"
echo "   - YOUR_COMPANY_TASK_FILES_FOLDER_ID"
echo ""
echo "📝 In credentials, replace:"
echo "   - YOUR_GOOGLE_CLIENT_ID"
echo "   - YOUR_GOOGLE_CLIENT_SECRET"
echo "   - YOUR_SLACK_CLIENT_ID"
echo "   - YOUR_SLACK_CLIENT_SECRET"
echo ""
echo "📝 In Slack manifest, replace:"
echo "   - https://your-n8n-instance.com"

echo ""
echo "🚀 Next Steps:"
echo "=============="
echo "1. Follow TASK_MANAGEMENT_SETUP.md for detailed setup"
echo "2. Configure Google APIs and Slack app"
echo "3. Update all placeholder values"
echo "4. Import workflows into n8n"
echo "5. Test the system with a sample task"

echo ""
echo "📞 Support:"
echo "==========="
echo "- English Documentation: TASK_MANAGEMENT_SETUP.md"
echo "- Arabic Documentation: نظام_إدارة_المهام.md"
echo "- Google Sheet Setup: GOOGLE_SHEETS_TEMPLATE.md"

echo ""
echo "Validation complete! 🎉"