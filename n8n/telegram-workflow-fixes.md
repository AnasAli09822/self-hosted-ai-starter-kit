# Telegram Multi-Intent Routing Workflow - Fix Documentation

## Problem Description
The original n8n workflow was encountering the error: **"Problem importing workflow: propertyValues[itemName] is not iterable"**

## Root Cause Analysis
The error was caused by several structural issues in the workflow JSON:

1. **Incorrect Node Parameter Structure**: The error typically occurs when node parameters are not properly formatted as arrays or objects when n8n expects specific data structures.

2. **Missing or Malformed Properties**: The `propertyValues[itemName]` error specifically indicates that the workflow tried to iterate over a property that wasn't properly defined as an iterable structure.

3. **Incorrect Node Type Versions**: Using outdated or incorrect node type versions can cause compatibility issues during import.

## Fixes Applied

### 1. **Telegram Trigger Node Configuration**
- **Fixed**: Proper parameters structure with `updates` array and `additionalFields` object
- **Node Type**: `n8n-nodes-base.telegramTrigger`
- **Parameters Structure**:
  ```json
  "parameters": {
    "updates": ["message"],
    "additionalFields": {}
  }
  ```

### 2. **Set Metadata Node**
- **Fixed**: Proper `values` object with `string` array containing name-value pairs
- **Node Type**: `n8n-nodes-base.set`
- **Key Fix**: Ensured all expression references (like `$json.message.from.id`) are properly formatted
- **Parameters Structure**:
  ```json
  "parameters": {
    "values": {
      "string": [
        {
          "name": "platform",
          "value": "telegram"
        },
        // ... other metadata fields
      ]
    },
    "options": {}
  }
  ```

### 3. **Switch Intent Node**
- **Fixed**: Proper `conditions` object structure with array of condition objects
- **Node Type**: `n8n-nodes-base.switch`
- **Key Fix**: Each condition properly structured with `id`, `leftValue`, `rightValue`, and `operator`
- **Arabic Keywords Support**: Added support for Arabic keywords ("دعم", "مبيعات", "تسويق")

### 4. **Reply Nodes**
- **Fixed**: Proper Telegram API parameters structure
- **Node Type**: `n8n-nodes-base.telegram`
- **Key Fixes**:
  - Proper `chatId` parameter using expression `{{ $json.chat_id }}`
  - Proper `additionalFields` structure for inline keyboards
  - Correct `reply_markup` structure

### 5. **Connections Structure**
- **Fixed**: Proper connection object with correct node references
- **Key Fix**: Each connection properly references nodes by their exact `name` property
- **Structure**: Each connection includes `node`, `type`, and `index` properties

## Workflow Features

### Multi-Intent Routing
The workflow supports three main intents:
- **Support** (دعم): Technical support inquiries
- **Sales** (مبيعات): Sales-related inquiries  
- **Marketing** (تسويق): Marketing service inquiries
- **Default**: Fallback for unrecognized intents

### Bilingual Support
All responses are provided in both Arabic and English to cater to a diverse user base.

### Interactive Buttons
Each response includes inline keyboard buttons for better user experience.

## Usage Instructions

### 1. Prerequisites
- n8n instance running
- Telegram Bot Token (obtain from @BotFather)
- Telegram Bot API credentials configured in n8n

### 2. Import the Workflow
1. Navigate to your n8n instance
2. Go to Workflows section
3. Click "Import from File"
4. Select the `telegram-multi-intent-routing.json` file
5. Click Import

### 3. Configure Credentials
1. Go to Credentials section in n8n
2. Create new "Telegram Bot API" credentials
3. Enter your Bot Token
4. Save the credentials
5. Update the workflow nodes to use your credentials

### 4. Activate the Workflow
1. Open the imported workflow
2. Click "Activate" to start listening for Telegram messages
3. Test by sending messages to your bot

## Testing the Workflow

### Test Cases
1. **Support Intent**: Send a message containing "دعم" (Arabic for support)
2. **Sales Intent**: Send a message containing "مبيعات" (Arabic for sales)
3. **Marketing Intent**: Send a message containing "تسويق" (Arabic for marketing)
4. **Default Case**: Send any other message to trigger the default response

### Expected Behavior
- The workflow should respond appropriately to each intent
- Unrecognized messages should trigger the default response with option buttons
- All responses should be in both Arabic and English

## Technical Details

### Node Structure Validation
The workflow follows n8n's required JSON schema:
- All nodes have proper `id`, `name`, `type`, `typeVersion`, and `position`
- Parameters are structured according to each node type's requirements
- Connections reference nodes by their exact names
- All required fields are present and properly formatted

### Error Prevention
The fixes specifically address the "propertyValues[itemName] is not iterable" error by:
- Ensuring all parameter values are properly structured as arrays/objects when required
- Using correct expression syntax for dynamic values
- Proper node type versions that are compatible with current n8n versions
- Consistent naming and referencing throughout the workflow

## Troubleshooting

### Common Issues
1. **Credentials Error**: Ensure Telegram Bot API credentials are properly configured
2. **Webhook Issues**: Make sure your n8n instance is accessible from the internet
3. **Expression Errors**: Verify that all expressions use the correct syntax `={{ $json.property }}`

### Support
For additional support or questions about this workflow, refer to the n8n documentation or community forums.