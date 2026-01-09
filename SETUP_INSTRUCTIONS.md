# Product-2-Reputation-Booster Workflow Setup Instructions

## Current Status

The workflow structure has been prepared but cannot be created in n8n due to API connectivity issues (404 error). The complete workflow JSON is saved in `product-2-reputation-booster-workflow.json`.

## Workflow Overview

This workflow:
1. Triggers when a Google Sheet row's Status column is updated
2. Filters to only proceed when Status = 'Done'
3. Waits 24 hours
4. Sends a Gmail follow-up email requesting a Google Review

## Steps to Complete Setup

### 1. Verify n8n Instance Connectivity

Ensure your n8n instance is running and accessible. Check:
- n8n API endpoint is configured correctly
- API credentials are valid
- Network connectivity to n8n instance

### 2. Get Google Sheet ID from Existing Workflow

1. Access your n8n instance
2. Open the workflow: **Product-1-Lead-Capture**
3. Find the "Append row in sheet" node
4. Copy the Google Sheet ID from the node configuration
5. Replace `PLACEHOLDER_SHEET_ID` in the workflow JSON with the actual Sheet ID

### 3. Verify Column Names

From the existing workflow, confirm:
- The column name for email addresses (likely "Email")
- The column name for status (should be "Status")
- The column name for customer name (if used, likely "Name")

Update the workflow expressions if column names differ:
- `{{ $json['Email'] }}` - for email address
- `{{ $json['Status'] }}` - for status check
- `{{ $json['Name'] }}` - for customer name in email

### 4. Create the Workflow in n8n

Once n8n is accessible, you can:

**Option A: Import the JSON file**
1. Open n8n UI
2. Click "Import from File"
3. Select `product-2-reputation-booster-workflow.json`
4. Update the Sheet ID placeholder
5. Configure credentials for Google Sheets and Gmail

**Option B: Create manually using the MCP tools**
Once connectivity is restored, the workflow can be created programmatically.

### 5. Configure Credentials

Ensure the following credentials are set up in n8n:
- **Google Sheets Trigger OAuth2** - for the trigger node
- **Gmail OAuth2** - for sending emails

### 6. Configure Google Sheets Trigger

1. Select the Google Sheet document
2. Select the specific sheet/tab
3. Set "Columns to Watch" to include "Status"
4. Verify the trigger is active

### 7. Test the Workflow

1. Update a row in your Google Sheet with Status = 'Done'
2. Verify the workflow triggers
3. Check that the IF condition filters correctly
4. Verify the wait period (consider testing with a shorter duration first)
5. Confirm the email is sent correctly

### 8. Replace Placeholder Link

Update the email message body to replace `[Google Review Link - Placeholder]` with your actual Google Review link.

## Workflow Node Details

### Node 1: Google Sheets Trigger
- **Event**: Row Updated
- **Filter**: Watches "Status" column
- **Output**: New version of updated row

### Node 2: IF Node (Check Status = Done)
- **Condition**: Status equals "Done"
- **Purpose**: Only proceed if status is "Done"

### Node 3: Wait Node
- **Duration**: 24 hours
- **Purpose**: Delay before sending review request

### Node 4: Gmail Send
- **Recipient**: Email from sheet row
- **Subject**: "Quick question about your experience with Agency Automation"
- **Body**: Professional review request email

## Troubleshooting

If the workflow doesn't work:
1. Check n8n execution logs
2. Verify Google Sheet permissions
3. Confirm Gmail credentials are valid
4. Ensure column names match exactly (case-sensitive)
5. Check that the Status column value is exactly "Done" (no extra spaces)

---

# Dashboard Environment Variables

## Required Environment Variables

The Business Owner Dashboard requires the following environment variables to be set in your `.env.local` file:

```bash
# n8n API Key (already exists from contact form)
N8N_API_KEY=your_api_key_here

# Webhook URL for reading leads from Google Sheets
N8N_READ_LEADS_WEBHOOK_URL=https://your-n8n-instance.com/webhook/dashboard-read-leads

# Webhook URL for updating lead status
N8N_UPDATE_STATUS_WEBHOOK_URL=https://your-n8n-instance.com/webhook/dashboard-update-status
```

## Getting Webhook URLs

After creating the n8n workflows "Dashboard - Read Leads" and "Dashboard - Update Lead Status":

1. **Activate both workflows** in the n8n UI
2. **Get the webhook URLs:**
   - Open each workflow in n8n
   - Click on the "Webhook" trigger node
   - Copy the "Production URL" shown in the node
   - Use this URL for the corresponding environment variable

## Workflow IDs

- **Dashboard - Read Leads**: `49G5JHPWBlXJW4Y4`
- **Dashboard - Update Lead Status**: `MMD4MqaKi5QnJbS2`

## Important Notes

- Both workflows need to be **activated** in n8n for the dashboard to work
- The workflows require **Google Sheets credentials** to be configured in n8n
- The API key must match the one used in your existing workflows
- The webhook URLs should point to your n8n instance's production webhooks

