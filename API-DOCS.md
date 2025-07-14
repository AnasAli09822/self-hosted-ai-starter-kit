# API Documentation - دليل واجهة برمجة التطبيقات

## Overview - نظرة عامة

This document describes the API endpoints available in the Arabic AI System. All endpoints return JSON responses and support Arabic language processing.

هذا الدليل يشرح نقاط النهاية المتاحة في نظام الذكاء الاصطناعي العربي. جميع النقاط ترجع استجابات JSON وتدعم معالجة اللغة العربية.

## Base URL - الرابط الأساسي

```
http://localhost:5678
```

## Authentication - المصادقة

Currently, no authentication is required for API endpoints. In production environments, implement proper authentication and authorization.

حالياً، لا توجد حاجة لمصادقة لنقاط النهاية. في بيئة الإنتاج، يجب تطبيق المصادقة والتخويل المناسب.

## Endpoints - نقاط النهاية

### 1. Document Analysis - تحليل الوثائق

**Endpoint:** `POST /webhook/analyze-document`

**Description:** Analyzes documents and provides comprehensive summaries in Arabic.

**وصف:** يحلل الوثائق ويقدم ملخصات شاملة باللغة العربية.

**Request Body:**
```json
{
  "file_path": "/data/shared/document.txt"
}
```

**Response:**
```json
{
  "analysis_result": "تحليل شامل للوثيقة باللغة العربية...",
  "processing_time": "2024-07-14T01:30:00.000Z",
  "status": "success"
}
```

**Example Usage:**
```bash
curl -X POST "http://localhost:5678/webhook/analyze-document" \
  -H "Content-Type: application/json" \
  -d '{
    "file_path": "/data/shared/sample.pdf"
  }'
```

### 2. Translation Service - خدمة الترجمة

**Endpoint:** `POST /webhook/translate`

**Description:** Translates text between multiple languages with Arabic support.

**وصف:** يترجم النصوص بين اللغات المختلفة مع دعم للعربية.

**Request Body:**
```json
{
  "text": "Hello, how are you?",
  "source_language": "english",
  "target_language": "arabic"
}
```

**Response:**
```json
{
  "translated_text": "مرحباً، كيف حالك؟",
  "original_text": "Hello, how are you?",
  "source_language": "english",
  "target_language": "arabic",
  "translation_time": "2024-07-14T01:30:00.000Z",
  "status": "success"
}
```

**Supported Languages:**
- Arabic (العربية)
- English (الإنجليزية)
- French (الفرنسية)
- Spanish (الإسبانية)
- German (الألمانية)

**Example Usage:**
```bash
curl -X POST "http://localhost:5678/webhook/translate" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "مرحباً بكم في نظام الذكاء الاصطناعي",
    "source_language": "arabic",
    "target_language": "english"
  }'
```

### 3. Knowledge Base Indexing - فهرسة قاعدة المعرفة

**Endpoint:** `POST /webhook/index-knowledge`

**Description:** Indexes documents into the knowledge base for Q&A functionality.

**وصف:** يفهرس الوثائق في قاعدة المعرفة لوظيفة الأسئلة والأجوبة.

**Request Body:**
```json
{
  "file_path": "/data/shared/knowledge-base.md"
}
```

**Response:**
```json
{
  "processed_chunks": 15,
  "indexed_file": "knowledge-base.md",
  "processing_time": "2024-07-14T01:30:00.000Z",
  "status": "success"
}
```

**Example Usage:**
```bash
curl -X POST "http://localhost:5678/webhook/index-knowledge" \
  -H "Content-Type: application/json" \
  -d '{
    "file_path": "/data/shared/company-docs.pdf"
  }'
```

## Chat Interfaces - واجهات الدردشة

### 1. Arabic AI Assistant - المساعد العربي

**URL:** `http://localhost:5678/workflow/arabic-ai-assistant`

**Description:** Interactive chat interface for Arabic language assistance.

**وصف:** واجهة دردشة تفاعلية للمساعدة باللغة العربية.

**Features:**
- Natural Arabic conversation
- Context retention
- Automatic logging
- Intelligent responses

### 2. Knowledge Base Q&A - أسئلة وأجوبة قاعدة المعرفة

**URL:** `http://localhost:5678/workflow/knowledge-base-qa`

**Description:** Chat interface for querying the knowledge base.

**وصف:** واجهة دردشة للاستعلام عن قاعدة المعرفة.

**Features:**
- Vector-based search
- Context-aware answers
- Source tracking
- Arabic language support

## Error Handling - معالجة الأخطاء

All API endpoints return appropriate HTTP status codes:

جميع نقاط النهاية ترجع أكواد حالة HTTP مناسبة:

- `200 OK`: Successful request
- `400 Bad Request`: Invalid request parameters
- `404 Not Found`: Endpoint not found
- `500 Internal Server Error`: Server error

**Error Response Format:**
```json
{
  "error": "Error description",
  "status": "error",
  "code": 400
}
```

## Rate Limiting - تحديد المعدل

Currently, no rate limiting is implemented. For production use, implement appropriate rate limiting based on your requirements.

حالياً، لا يوجد تحديد للمعدل. للاستخدام في الإنتاج، طبق تحديد المعدل المناسب حسب احتياجاتك.

## File Upload Guidelines - إرشادات رفع الملفات

When uploading files for analysis or indexing:

عند رفع الملفات للتحليل أو الفهرسة:

1. Place files in the `shared/` directory
2. Use absolute paths starting with `/data/shared/`
3. Supported formats: TXT, PDF, MD, DOC, DOCX
4. Maximum file size: 50MB
5. Ensure proper UTF-8 encoding for Arabic text

## System Status - حالة النظام

**Health Check Endpoints:**

- n8n: `http://localhost:5678/healthz`
- Qdrant: `http://localhost:6333/health`
- Ollama: `http://localhost:11434/api/tags`

## Support - الدعم

For API support and questions:

للدعم والأسئلة حول واجهة برمجة التطبيقات:

- Check the logs: `docker compose logs -f`
- Review the documentation: `README-AR.md`
- Test the system: `./test-arabic-system.sh`

## Examples - أمثلة

### Complete Workflow Example - مثال سير عمل كامل

```bash
# 1. Index a document
curl -X POST "http://localhost:5678/webhook/index-knowledge" \
  -H "Content-Type: application/json" \
  -d '{"file_path": "/data/shared/manual.pdf"}'

# 2. Analyze the document
curl -X POST "http://localhost:5678/webhook/analyze-document" \
  -H "Content-Type: application/json" \
  -d '{"file_path": "/data/shared/manual.pdf"}'

# 3. Translate analysis to English
curl -X POST "http://localhost:5678/webhook/translate" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "التحليل المقدم من الخطوة السابقة",
    "source_language": "arabic",
    "target_language": "english"
  }'
```

This completes the API documentation for the Arabic AI System.

هذا يكمل دليل واجهة برمجة التطبيقات لنظام الذكاء الاصطناعي العربي.