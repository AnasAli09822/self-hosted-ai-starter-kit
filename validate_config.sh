#!/bin/bash

# Configuration Validation Script for Dual-Workflow AI Chatbot System
# This script helps validate that all required environment variables and services are properly configured

echo "🔍 Dual-Workflow AI Chatbot System - Configuration Validation"
echo "============================================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ .env file not found!${NC}"
    echo "Please create .env file with required configuration."
    exit 1
fi

echo -e "${GREEN}✅ .env file found${NC}"

# Source the .env file
source .env

# Function to check if variable is set and not empty
check_var() {
    local var_name=$1
    local var_value="${!var_name}"
    
    if [ -z "$var_value" ] || [ "$var_value" = "your_${var_name,,}_here" ] || [[ "$var_value" == *"placeholder"* ]]; then
        echo -e "${RED}❌ $var_name is not configured${NC}"
        return 1
    else
        echo -e "${GREEN}✅ $var_name is configured${NC}"
        return 0
    fi
}

echo ""
echo "📋 Checking required environment variables..."
echo "--------------------------------------------"

# Check all required variables
variables=(
    "OPENAI_API_KEY"
    "MONGODB_CONNECTION_STRING"
    "TELEGRAM_ADMIN_BOT_TOKEN"
    "TELEGRAM_USER_BOT_TOKEN"
    "TELEGRAM_ADMIN_CHAT_ID"
    "GOOGLE_SHEETS_SERVICE_ACCOUNT_EMAIL"
    "GOOGLE_SHEETS_PRIVATE_KEY"
    "GOOGLE_SHEETS_SPREADSHEET_ID"
)

missing_vars=0
for var in "${variables[@]}"; do
    if ! check_var "$var"; then
        ((missing_vars++))
    fi
done

echo ""
echo "🧪 Testing service connectivity..."
echo "--------------------------------"

# Test OpenAI API connection
if [ ! -z "$OPENAI_API_KEY" ] && [ "$OPENAI_API_KEY" != "your_openai_api_key_here" ]; then
    echo -n "Testing OpenAI API connection... "
    response=$(curl -s -w "%{http_code}" -o /dev/null -H "Authorization: Bearer $OPENAI_API_KEY" "https://api.openai.com/v1/models")
    if [ "$response" = "200" ]; then
        echo -e "${GREEN}✅ Connected${NC}"
    else
        echo -e "${RED}❌ Failed (HTTP $response)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Skipping OpenAI test - API key not configured${NC}"
fi

# Test MongoDB connection
if [ ! -z "$MONGODB_CONNECTION_STRING" ] && [ "$MONGODB_CONNECTION_STRING" != "your_mongodb_atlas_connection_string_here" ]; then
    echo -n "Testing MongoDB Atlas connection... "
    # This would require mongosh to be installed, so we'll skip actual testing
    echo -e "${YELLOW}⚠️  Manual verification required${NC}"
else
    echo -e "${YELLOW}⚠️  Skipping MongoDB test - connection string not configured${NC}"
fi

# Test Telegram bot tokens
test_telegram_bot() {
    local bot_name=$1
    local bot_token=$2
    
    if [ ! -z "$bot_token" ] && [ "$bot_token" != "your_${bot_name,,}_telegram_bot_token_here" ]; then
        echo -n "Testing $bot_name Telegram bot... "
        response=$(curl -s -w "%{http_code}" -o /dev/null "https://api.telegram.org/bot$bot_token/getMe")
        if [ "$response" = "200" ]; then
            echo -e "${GREEN}✅ Connected${NC}"
        else
            echo -e "${RED}❌ Failed (HTTP $response)${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  Skipping $bot_name bot test - token not configured${NC}"
    fi
}

test_telegram_bot "Admin" "$TELEGRAM_ADMIN_BOT_TOKEN"
test_telegram_bot "User" "$TELEGRAM_USER_BOT_TOKEN"

echo ""
echo "📁 Checking required directories and files..."
echo "--------------------------------------------"

# Check if shared directory exists
if [ -d "shared" ]; then
    echo -e "${GREEN}✅ shared directory exists${NC}"
else
    echo -e "${YELLOW}⚠️  Creating shared directory...${NC}"
    mkdir -p shared
    echo -e "${GREEN}✅ shared directory created${NC}"
fi

# Check if credential files exist
credential_files=(
    "n8n/demo-data/credentials/2490939ceec8479a.json"  # MongoDB
    "n8n/demo-data/credentials/70ce000c498e4754.json"  # OpenAI
    "n8n/demo-data/credentials/8ebd6f58e8664446.json"  # Telegram Admin
    "n8n/demo-data/credentials/c944e795ec3f443b.json"  # Telegram User
    "n8n/demo-data/credentials/9759085b796e48fc.json"  # Google Sheets
)

for file in "${credential_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $(basename "$file") credential file exists${NC}"
    else
        echo -e "${RED}❌ $(basename "$file") credential file missing${NC}"
    fi
done

# Check if workflow files exist
workflow_files=(
    "n8n/demo-data/workflows/e0f0c4c07f004425.json"  # Admin Workflow
    "n8n/demo-data/workflows/ef18f7b17ee94b28.json"  # User Workflow
)

for file in "${workflow_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $(basename "$file") workflow file exists${NC}"
    else
        echo -e "${RED}❌ $(basename "$file") workflow file missing${NC}"
    fi
done

echo ""
echo "📊 Summary"
echo "----------"

if [ $missing_vars -eq 0 ]; then
    echo -e "${GREEN}✅ All environment variables are configured${NC}"
else
    echo -e "${RED}❌ $missing_vars environment variable(s) need configuration${NC}"
fi

echo ""
echo "🚀 Next Steps:"
echo "1. Configure any missing environment variables in .env file"
echo "2. Start the system: docker compose --profile cpu up"
echo "3. Open n8n at http://localhost:5678"
echo "4. Configure credentials with actual values"
echo "5. Activate both workflows (Admin and User)"
echo ""
echo "📖 For detailed setup instructions, see DUAL_WORKFLOW_SETUP.md"

if [ $missing_vars -gt 0 ]; then
    exit 1
fi