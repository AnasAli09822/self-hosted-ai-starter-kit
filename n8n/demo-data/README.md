# n8n Workflow Templates - مجموعة قوالب سير العمل

This collection contains accurate, error-free JSON workflow templates for n8n that can be imported and used with the self-hosted AI starter kit.

## Available Workflows / سير العمل المتاح

### 1. Demo Workflow (srOnR8PAY3u4RSwb.json)
**Purpose:** Basic chat interface with AI
- **Trigger:** Chat interface
- **Features:** Simple conversation with Ollama LLM
- **Use Case:** Getting started with n8n and AI

### 2. PDF Document Analysis Workflow (DocProcessorWorkflow001.json)
**Purpose:** Automated document processing and analysis
- **Trigger:** File system monitoring (PDF files)
- **Features:** 
  - PDF reading and text extraction
  - Text chunking for processing
  - Vector storage in Qdrant
  - AI-powered summarization
- **Use Case:** Document management and analysis

### 3. Intelligent Document Search Workflow (VectorSearchWorkflow002.json)
**Purpose:** Search through processed documents using natural language
- **Trigger:** HTTP webhook
- **Features:**
  - Natural language query processing
  - Vector similarity search
  - RAG (Retrieval-Augmented Generation) responses
  - JSON API responses
- **Use Case:** Knowledge base search and Q&A systems

### 4. Advanced AI Agent with Tools (AIAgentWorkflow003.json)
**Purpose:** Conversational AI agent with multiple capabilities
- **Trigger:** Chat interface
- **Features:**
  - Multiple tool integration
  - Document search capability
  - Calculator functionality
  - File system access
  - Conversation memory
- **Use Case:** Multi-purpose AI assistant

### 5. Data Processing and Analysis Workflow (DataTransformWorkflow004.json)
**Purpose:** Process and analyze various data formats
- **Trigger:** HTTP webhook
- **Features:**
  - JSON data processing
  - CSV data parsing
  - Text analysis with AI
  - Data transformation
  - Statistical analysis
- **Use Case:** Data analytics and transformation

### 6. Intelligent Email Processing Workflow (EmailProcessingWorkflow005.json)
**Purpose:** Automated email classification and response
- **Trigger:** Email monitoring (IMAP)
- **Features:**
  - Email classification
  - Sentiment analysis
  - Automated response generation
  - Priority filtering
  - Database logging
- **Use Case:** Customer service automation

### 7. Social Media Monitoring and Analysis (SocialMediaMonitoringWorkflow006.json)
**Purpose:** Monitor and analyze social media posts
- **Trigger:** Scheduled execution
- **Features:**
  - Multi-platform monitoring (Twitter, LinkedIn)
  - Sentiment analysis
  - Lead identification
  - Urgent alert system
  - Analytics storage
- **Use Case:** Social media management and lead generation

## Installation Instructions / تعليمات التثبيت

1. **Prerequisites:**
   - Running n8n instance (via Docker Compose)
   - Ollama service with models installed
   - Qdrant vector database
   - PostgreSQL database

2. **Import Workflows:**
   - Copy workflow JSON files to `n8n/demo-data/workflows/`
   - Restart n8n services
   - Workflows will be automatically imported

3. **Setup Credentials:**
   - Configure Ollama API credentials
   - Set up Qdrant database connection
   - Configure email accounts (if using email workflows)
   - Set up social media API credentials (if using social media workflows)

## Configuration Requirements / متطلبات التكوين

### Ollama Models
Ensure the following models are installed:
```bash
ollama pull llama3.2:latest
ollama pull nomic-embed-text:latest
```

### Database Tables
Some workflows require specific database tables. Run these SQL commands:

```sql
-- For email processing workflow
CREATE TABLE email_processing_log (
    id SERIAL PRIMARY KEY,
    email_id TEXT,
    subject TEXT,
    from_address TEXT,
    category TEXT,
    sentiment TEXT,
    priority TEXT,
    response_time TEXT,
    topics JSON,
    summary TEXT,
    action_required TEXT,
    processed_at TIMESTAMP,
    response_sent BOOLEAN,
    response_generated TEXT
);

-- For social media monitoring workflow
CREATE TABLE social_media_monitoring (
    id SERIAL PRIMARY KEY,
    post_id TEXT,
    platform TEXT,
    content TEXT,
    author TEXT,
    created_at TIMESTAMP,
    likes INTEGER,
    shares INTEGER,
    comments INTEGER,
    sentiment TEXT,
    sentiment_score REAL,
    key_topics JSON,
    mentions JSON,
    hashtags JSON,
    language TEXT,
    content_type TEXT,
    urgency TEXT,
    brand_mentions JSON,
    potential_leads BOOLEAN,
    requires_response BOOLEAN,
    summary TEXT,
    action_items JSON,
    processed_at TIMESTAMP
);

-- For lead tracking
CREATE TABLE potential_leads (
    id SERIAL PRIMARY KEY,
    source TEXT,
    platform TEXT,
    contact_info TEXT,
    content TEXT,
    sentiment TEXT,
    topics JSON,
    engagement_score INTEGER,
    created_at TIMESTAMP,
    processed_at TIMESTAMP
);
```

## Usage Examples / أمثلة الاستخدام

### Document Search API
```bash
curl -X POST http://localhost:5678/webhook/search \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the main features of AI automation?"}'
```

### Data Processing API
```bash
curl -X POST http://localhost:5678/webhook/process-data \
  -H "Content-Type: application/json" \
  -d '{
    "data_type": "json",
    "data": "[{\"name\": \"John\", \"age\": 30}]"
  }'
```

## Features / الميزات

✅ **Error-Free JSON:** All workflows have been validated for JSON syntax errors

✅ **Complete Functionality:** Each workflow includes all necessary nodes and connections

✅ **Comprehensive Documentation:** Detailed descriptions and usage instructions

✅ **Multiple Use Cases:** Covers document processing, communication, data analysis, and more

✅ **AI Integration:** Full integration with Ollama, Qdrant, and n8n AI components

✅ **Production Ready:** Includes error handling, logging, and monitoring

## Troubleshooting / استكشاف الأخطاء

### Common Issues:
1. **Credentials not configured:** Make sure all required credentials are set up
2. **Models not available:** Ensure Ollama models are downloaded and running
3. **Database connection:** Verify PostgreSQL and Qdrant are accessible
4. **Webhook URLs:** Check that webhook endpoints are properly configured

### Validation:
Use the provided validation script to check workflow integrity:
```bash
python validate_n8n_json.py workflow_file.json
```

## Support / الدعم

For issues or questions:
- Check the n8n documentation: https://docs.n8n.io/
- Visit the n8n community: https://community.n8n.io/
- Review the self-hosted AI starter kit documentation

## License / الترخيص

These workflows are provided under the Apache License 2.0, same as the parent project.