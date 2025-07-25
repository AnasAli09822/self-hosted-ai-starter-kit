# Task Management System with n8n

This comprehensive task management system integrates Slack, n8n, Google Sheets, and Google Drive to create a seamless workflow for team task management.

## 🎯 System Overview

### Core Philosophy
- **Slack-First Approach**: All user interactions happen directly within Slack
- **Single Source of Truth**: Google Sheets serves as the central database
- **End-to-End Automation**: n8n handles all integrations seamlessly
- **Organized Archiving**: Files are systematically stored in Google Drive

### Key Features
- Create tasks via Slack slash commands
- Interactive task status updates with buttons
- Automatic file archiving to Google Drive
- Weekly performance reports for management
- Real-time notifications and updates

## 📋 Prerequisites

### 1. n8n Instance
- Running n8n instance (included in this starter kit)
- Access to n8n workflow editor
- Webhook capabilities enabled

### 2. Slack App
- Slack workspace with admin permissions
- Ability to create and install Slack apps

### 3. Google Services
- Google account with access to:
  - Google Sheets API
  - Google Drive API
- OAuth2 credentials setup

## 🚀 Setup Instructions

### Step 1: Google Services Setup

#### 1.1 Enable APIs
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the following APIs:
   - Google Sheets API
   - Google Drive API

#### 1.2 Create OAuth2 Credentials
1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > OAuth 2.0 Client IDs**
3. Configure OAuth consent screen if prompted
4. Set application type to **Web application**
5. Add authorized redirect URIs:
   - `https://your-n8n-instance.com/rest/oauth2-credential/callback`
6. Save the **Client ID** and **Client Secret**

#### 1.3 Create Google Sheet
1. Create a new Google Sheet named **"Task Management System"**
2. Create a sheet tab named **"Tasks"**
3. Add the following columns (exact names, case-sensitive):

| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H | Column I | Column J | Column K | Column L | Column M | Column N |
|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|----------|
| TaskID | Description | Assignee | AssignedBy | AssignedAt | DueAt | Status | StartedAt | CompletedAt | HandedTo | HandedAt | RevisionNotes | SlackMessageID | DriveFolderLink |

4. Note down the **Google Sheet ID** from the URL

#### 1.4 Create Google Drive Folder
1. Create a folder named **"Company Task Files"** in Google Drive
2. Note down the **Folder ID** from the URL

### Step 2: Slack App Setup

#### 2.1 Create Slack App
1. Go to [Slack API](https://api.slack.com/apps)
2. Click **Create New App**
3. Choose **From an app manifest**
4. Select your workspace
5. Copy and paste the content from `slack-app-manifest.yml`
6. Update the webhook URLs with your n8n instance URL
7. Click **Create**

#### 2.2 Install App to Workspace
1. Go to **OAuth & Permissions**
2. Click **Install to Workspace**
3. Authorize the app
4. Save the **Bot User OAuth Token**

#### 2.3 Configure Interactive Components
1. Go to **Interactivity & Shortcuts**
2. Enable interactivity
3. Set Request URL: `https://your-n8n-instance.com/webhook/task-interaction`

#### 2.4 Configure Slash Commands
1. Go to **Slash Commands**
2. The `/create-task` command should already be configured from the manifest
3. Verify the Request URL: `https://your-n8n-instance.com/webhook/create-task`

### Step 3: n8n Configuration

#### 3.1 Import Workflows
The following workflows are included in this repository:
- `task-create.json` - Task Creation Workflow
- `task-status-updates.json` - Status Update Workflow  
- `file-archiving.json` - File Archiving Workflow
- `weekly-reports.json` - Weekly Reports Workflow

These will be automatically imported when you start n8n.

#### 3.2 Configure Credentials
1. Go to n8n **Credentials** section
2. Create the following credentials:

**Google Sheets OAuth2 API:**
- Name: "Google Sheets Account"
- Client ID: Your Google OAuth2 Client ID
- Client Secret: Your Google OAuth2 Client Secret
- Complete OAuth2 flow

**Google Drive OAuth2 API:**
- Name: "Google Drive Account"
- Client ID: Your Google OAuth2 Client ID  
- Client Secret: Your Google OAuth2 Client Secret
- Complete OAuth2 flow

**Slack OAuth2 API:**
- Name: "Slack OAuth2 API"
- Client ID: Your Slack App Client ID
- Client Secret: Your Slack App Client Secret
- Access Token: Your Bot User OAuth Token

#### 3.3 Update Workflow Parameters
For each workflow, update the following placeholders:

**In all workflows:**
- `YOUR_GOOGLE_SHEET_ID` → Your actual Google Sheet ID
- `YOUR_SLACK_BOT_TOKEN` → Your Slack Bot User OAuth Token

**In file-archiving.json:**
- `YOUR_COMPANY_TASK_FILES_FOLDER_ID` → Your Google Drive folder ID

**In weekly-reports.json:**
- `#management-reports` → Your management Slack channel
- `YOUR_GOOGLE_SHEET_LINK` → Link to your Google Sheet
- Manager user IDs in the "Prepare Manager DMs" node

#### 3.4 Activate Workflows
1. Open each workflow in n8n
2. Click **Active** toggle to enable
3. Test each webhook endpoint

### Step 4: Usage

#### Creating Tasks
Use the slash command in Slack:
```
/create-task @username "Task description" "2024-12-31"
```

#### Updating Task Status
- Click **🚀 Start Work** when you begin a task
- Click **✅ Complete Task** when finished

#### File Archiving
- Upload files to any Slack thread
- Mention the task ID in the message
- Files will be automatically archived to Google Drive

#### Weekly Reports
- Reports are automatically generated every Sunday at 8 PM
- Sent to #management-reports channel
- Individual reports sent to managers via DM

## 🔧 Customization

### Adding New Statuses
1. Modify the Google Sheet to include new status values
2. Update workflow logic in status update nodes
3. Add new interactive buttons if needed

### Changing Report Schedule
1. Open the weekly-reports workflow
2. Modify the cron expression in the trigger node
3. Current: `0 20 * * 0` (Sunday 8 PM)

### Adding Custom Fields
1. Add columns to the Google Sheet
2. Update workflow nodes to handle new fields
3. Modify Slack message templates as needed

## 🚨 Troubleshooting

### Common Issues

**Webhook Not Responding:**
- Check n8n webhook URLs are publicly accessible
- Verify Slack app configuration matches n8n endpoints
- Check n8n logs for errors

**Google API Errors:**
- Verify API access is enabled
- Check OAuth2 credentials are valid
- Ensure proper permissions on sheets/folders

**Slack Permissions:**
- Verify bot has necessary scopes
- Check channel permissions
- Ensure app is installed to workspace

**Task ID Issues:**
- Ensure Google Sheet has proper column headers
- Check that TaskID is being generated correctly
- Verify lookup logic in workflows

### Debugging Steps
1. Check n8n execution logs
2. Test individual workflow nodes
3. Verify credential configurations
4. Check Google Sheet data format
5. Monitor Slack app event logs

## 📊 Data Structure

### Google Sheet Columns Explained

| Column | Purpose | Example |
|--------|---------|---------|
| TaskID | Unique identifier | 1, 2, 3... |
| Description | Task description | "Update website content" |
| Assignee | Slack user ID | U01234ABCD |
| AssignedBy | Manager's name | john.doe |
| AssignedAt | Creation timestamp | 2024-01-15T10:30:00Z |
| DueAt | Due date | 2024-01-20T23:59:59Z |
| Status | Current status | Assigned/In Progress/Completed |
| StartedAt | Start timestamp | 2024-01-16T09:00:00Z |
| CompletedAt | Completion timestamp | 2024-01-19T15:30:00Z |
| HandedTo | Transfer recipient | U05678EFGH |
| HandedAt | Transfer timestamp | 2024-01-17T11:00:00Z |
| RevisionNotes | Feedback notes | "Please add more details" |
| SlackMessageID | Message reference | 1642251234.000100 |
| DriveFolderLink | File storage link | https://drive.google.com/... |

## 🔒 Security Considerations

- Store all credentials securely in n8n
- Use OAuth2 for API authentication
- Restrict Google API access to necessary scopes
- Monitor webhook endpoints for abuse
- Regularly review Slack app permissions
- Keep n8n instance updated and secure

## 📈 Performance Tips

- Use batch operations for large datasets
- Implement error handling in all workflows
- Monitor API rate limits
- Archive old completed tasks periodically
- Optimize Google Sheet structure for queries

## 🆘 Support

For issues and questions:
1. Check n8n community forums
2. Review Google API documentation
3. Consult Slack API documentation
4. Check workflow execution logs
5. Verify all configuration steps

---

*This system was designed for AnasAli09822 and can be customized for any organization's needs.*