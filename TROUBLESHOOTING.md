# Troubleshooting Guide - Dual-Workflow AI Chatbot System

## Common Issues and Solutions

### 1. Bot Not Responding to Messages

#### Symptoms:
- Messages sent to Telegram bots receive no response
- Webhooks not triggering in n8n

#### Solutions:
1. **Check Bot Tokens:**
   ```bash
   # Test admin bot
   curl "https://api.telegram.org/bot<ADMIN_BOT_TOKEN>/getMe"
   
   # Test user bot
   curl "https://api.telegram.org/bot<USER_BOT_TOKEN>/getMe"
   ```

2. **Verify Webhook Configuration:**
   - Go to n8n workflows
   - Check if Telegram Trigger nodes are properly configured
   - Ensure workflows are activated

3. **Check n8n Logs:**
   ```bash
   docker compose logs n8n
   ```

### 2. Product Search Not Working

#### Symptoms:
- User queries don't return product information
- "No products found" messages

#### Solutions:
1. **Verify MongoDB Connection:**
   - Check MongoDB Atlas dashboard for connection status
   - Ensure IP address is whitelisted
   - Verify connection string format

2. **Check Vector Embeddings:**
   - Ensure products were properly indexed via admin bot
   - Check MongoDB collections for `knowledge_base` data

3. **OpenAI API Issues:**
   - Verify API key has sufficient credits
   - Check rate limits and quotas

### 3. Voice Messages Not Working

#### Symptoms:
- Voice messages not transcribed
- Bot doesn't respond to voice input

#### Solutions:
1. **Check OpenAI Whisper API:**
   - Ensure sufficient API credits
   - Verify file format compatibility

2. **File Upload Issues:**
   - Check Telegram file size limits
   - Verify n8n file handling configuration

### 4. Google Sheets Logging Not Working

#### Symptoms:
- Conversations not appearing in Google Sheets
- Authentication errors

#### Solutions:
1. **Verify Service Account:**
   - Check service account email in Google Cloud Console
   - Ensure Google Sheets API is enabled

2. **Check Spreadsheet Permissions:**
   - Share spreadsheet with service account email
   - Verify sheet name matches configuration ("المحادثات")

3. **Private Key Format:**
   - Ensure private key includes proper line breaks
   - Check for special characters in environment variable

### 5. MongoDB Atlas Connection Issues

#### Symptoms:
- Database connection timeouts
- Authentication failures

#### Solutions:
1. **Network Access:**
   ```bash
   # Check if your IP is whitelisted in MongoDB Atlas
   # Or allow access from anywhere (0.0.0.0/0) for testing
   ```

2. **Database User:**
   - Verify database user has read/write permissions
   - Check username/password in connection string

3. **Connection String Format:**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database_name
   ```

### 6. Docker Container Issues

#### Symptoms:
- Containers not starting
- Port conflicts

#### Solutions:
1. **Check Port Availability:**
   ```bash
   netstat -tulpn | grep :5678
   netstat -tulpn | grep :11434
   ```

2. **Container Logs:**
   ```bash
   docker compose logs --tail=50
   ```

3. **Restart Services:**
   ```bash
   docker compose down
   docker compose --profile cpu up
   ```

### 7. n8n Configuration Issues

#### Symptoms:
- Workflows not executing
- Credential authentication failures

#### Solutions:
1. **Credential Configuration:**
   - Go to n8n Settings > Credentials
   - Test each credential connection
   - Update with actual values (not placeholders)

2. **Workflow Activation:**
   - Ensure both workflows are activated
   - Check for error messages in workflow execution

3. **Node Configuration:**
   - Verify all required fields are filled
   - Check data mapping between nodes

## Performance Optimization

### 1. MongoDB Atlas
- Use appropriate cluster tier for your usage
- Create proper indexes for vector search
- Monitor query performance

### 2. OpenAI API
- Monitor token usage and costs
- Use appropriate model sizes (gpt-4o-mini for efficiency)
- Implement rate limiting if needed

### 3. Telegram Bots
- Handle rate limits (30 messages per second)
- Implement message queuing for high volume

## Security Best Practices

### 1. Environment Variables
- Never commit .env file to version control
- Use strong, unique passwords
- Rotate API keys regularly

### 2. Network Security
- Use HTTPS in production
- Implement proper firewall rules
- Monitor for unusual activity

### 3. Data Protection
- Encrypt sensitive data at rest
- Implement proper backup procedures
- Follow GDPR/privacy regulations

## Getting Help

### 1. Debug Mode
Enable verbose logging in n8n:
```env
N8N_LOG_LEVEL=debug
```

### 2. Community Support
- n8n Community Forum: https://community.n8n.io/
- MongoDB Atlas Support
- OpenAI Support Documentation

### 3. Log Analysis
Check these log files for detailed error information:
```bash
# n8n logs
docker compose logs n8n

# All services
docker compose logs

# Specific timeframe
docker compose logs --since 30m
```

## Emergency Recovery

### 1. Data Backup
- Export n8n workflows regularly
- Backup MongoDB collections
- Save Google Sheets data

### 2. Service Recovery
```bash
# Stop all services
docker compose down

# Clean up and restart
docker system prune -f
docker compose --profile cpu up --force-recreate
```

### 3. Configuration Reset
If all else fails:
1. Backup your .env file
2. Reset to default configuration
3. Reconfigure services one by one
4. Test each component individually

Remember to always test changes in a development environment before applying to production!