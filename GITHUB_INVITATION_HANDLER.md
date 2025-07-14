# GitHub Invitation Handler - اقبل الدعوة

## Overview | نظرة عامة

This workflow automatically handles GitHub repository invitations, allowing users to accept invitations programmatically. It supports both English and Arabic interactions.

هذا سير العمل يتعامل تلقائياً مع دعوات مستودع GitHub، مما يسمح للمستخدمين بقبول الدعوات برمجياً. يدعم التفاعل باللغتين الإنجليزية والعربية.

## Features | الميزات

### 🔄 Automatic Invitation Processing | المعالجة التلقائية للدعوات
- Webhook-based invitation detection
- Automatic acceptance of GitHub repository invitations
- Real-time processing with AI-powered responses

### 🌐 Bilingual Support | الدعم متعدد اللغات
- English and Arabic language support
- Arabic text recognition: "اقبل الدعوة" (Accept invitation)
- Bilingual response generation

### 📊 Invitation Management | إدارة الدعوات
- List pending invitations
- Check invitation status
- Process multiple invitations
- Log all activities

## API Endpoints | نقاط النهاية لواجهة برمجة التطبيقات

### 1. Accept Invitation | قبول الدعوة
```bash
POST http://localhost:5678/webhook/github-invitation
Content-Type: application/json

{
  "message": "اقبل الدعوة",
  "invitation_url": "https://github.com/AnasAli09822/self-hosted-ai-starter-kit/invitations"
}
```

### 2. Check Invitation Status | فحص حالة الدعوة
```bash
GET http://localhost:5678/webhook/invitation-status
```

### 3. GitHub Webhook Integration | تكامل GitHub Webhook
Configure GitHub webhook to point to:
```
POST http://localhost:5678/webhook/github-invitation
```

## Setup Instructions | تعليمات الإعداد

### 1. GitHub API Token | رمز GitHub API
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Create a new token with the following permissions:
   - `repo:invite` - Accept repository invitations
   - `repo` - Repository access
   - `read:user` - Read user profile

### 2. Configure Credentials | تكوين الشهادات
1. Open n8n interface: http://localhost:5678
2. Go to Settings → Credentials
3. Add new GitHub API credential:
   - Name: "GitHub API for Invitations"
   - Token: Your GitHub personal access token

### 3. Import Workflow | استيراد سير العمل
1. The workflow is automatically imported during container startup
2. Activate the workflow in n8n interface
3. Test the webhook endpoints

## Usage Examples | أمثلة الاستخدام

### Accept Invitation via API | قبول الدعوة عبر API
```bash
# English
curl -X POST http://localhost:5678/webhook/github-invitation \
  -H "Content-Type: application/json" \
  -d '{"message": "Accept invitation", "invitation_url": "https://github.com/AnasAli09822/self-hosted-ai-starter-kit/invitations"}'

# Arabic
curl -X POST http://localhost:5678/webhook/github-invitation \
  -H "Content-Type: application/json" \
  -d '{"message": "اقبل الدعوة", "invitation_url": "https://github.com/AnasAli09822/self-hosted-ai-starter-kit/invitations"}'
```

### Check Pending Invitations | فحص الدعوات المعلقة
```bash
curl -X GET http://localhost:5678/webhook/invitation-status
```

## Response Format | تنسيق الاستجابة

### Success Response | استجابة النجاح
```json
{
  "success": true,
  "message": "GitHub invitation has been accepted successfully",
  "arabicMessage": "تم قبول الدعوة بنجاح",
  "repository": "AnasAli09822/self-hosted-ai-starter-kit",
  "status": "accepted",
  "timestamp": "2024-07-14T14:30:00.000Z",
  "aiResponse": "Your invitation has been accepted! Welcome to the repository."
}
```

### Error Response | استجابة الخطأ
```json
{
  "success": false,
  "message": "No GitHub invitation to process",
  "arabicMessage": "لا توجد دعوة GitHub للمعالجة",
  "timestamp": "2024-07-14T14:30:00.000Z",
  "reason": "Invalid invitation data"
}
```

## Workflow Components | مكونات سير العمل

### 1. Webhook Triggers | محفزات Webhook
- **GitHub Invitation Webhook**: Receives GitHub invitation events
- **Status Check Webhook**: Provides invitation status information

### 2. Processing Nodes | عقد المعالجة
- **Process Invitation Data**: Extracts and validates invitation information
- **Check If Valid Invitation**: Validates invitation data
- **Get Invitation Details**: Retrieves invitation details from GitHub
- **Accept GitHub Invitation**: Accepts the invitation via GitHub API

### 3. AI Integration | تكامل الذكاء الاصطناعي
- **Generate AI Response**: Creates bilingual responses using Ollama
- **Log Success/No Action**: Logs workflow execution results

### 4. Status Management | إدارة الحالة
- **List Pending Invitations**: Retrieves all pending invitations
- **Format Invitations List**: Formats invitation data for display

## Security Considerations | اعتبارات الأمان

### 🔐 Authentication | المصادقة
- GitHub personal access token required
- Encrypted credential storage in n8n
- Webhook endpoint security

### 🛡️ Permissions | الصلاحيات
- Minimal required GitHub permissions
- Repository-specific access control
- Audit logging for all actions

### 🔒 Data Protection | حماية البيانات
- No sensitive data stored in logs
- Encrypted credential management
- Secure webhook communication

## Troubleshooting | استكشاف الأخطاء

### Common Issues | المشاكل الشائعة

1. **Invalid GitHub Token** | **رمز GitHub غير صالح**
   - Verify token permissions
   - Check token expiration
   - Regenerate token if needed

2. **Webhook Not Responding** | **Webhook لا يستجيب**
   - Check n8n container status
   - Verify webhook URL accessibility
   - Review Docker network configuration

3. **Invitation Not Found** | **الدعوة غير موجودة**
   - Verify invitation URL format
   - Check invitation status on GitHub
   - Ensure user has invitation permissions

### Debug Mode | وضع التصحيح
Enable debug logging in n8n:
```bash
docker-compose logs -f n8n
```

## Integration with AI Starter Kit | التكامل مع AI Starter Kit

This workflow integrates seamlessly with the existing AI starter kit:

- **Ollama Integration**: Uses local LLM for response generation
- **Database Logging**: Stores invitation history in PostgreSQL
- **Vector Search**: Can be extended with Qdrant for invitation analytics
- **Workflow Orchestration**: Managed through n8n platform

## Future Enhancements | تحسينات مستقبلية

- [ ] Multi-repository invitation management
- [ ] Invitation analytics and reporting
- [ ] Advanced Arabic NLP processing
- [ ] Integration with team management systems
- [ ] Automated invitation routing based on permissions

## Support | الدعم

For issues or questions related to this workflow:
1. Check n8n logs for error messages
2. Verify GitHub API token permissions
3. Review webhook configuration
4. Contact repository maintainers

للمسائل أو الأسئلة المتعلقة بهذا سير العمل:
1. تحقق من سجلات n8n للعثور على رسائل الخطأ
2. تحقق من صلاحيات رمز GitHub API
3. راجع تكوين webhook
4. اتصل بمشرفي المستودع