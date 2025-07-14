#!/bin/bash

# Test script for the Arabic AI System
# هذا اختبار لنظام الذكاء الاصطناعي العربي

echo "🚀 بدء اختبار نظام الذكاء الاصطناعي العربي"
echo "======================================="

# Wait for services to be ready
echo "⏳ انتظار تشغيل الخدمات..."
sleep 30

# Test 1: Document Analysis API
echo "📄 اختبار تحليل الوثائق..."
curl -X POST "http://localhost:5678/webhook/analyze-document" \
  -H "Content-Type: application/json" \
  -d '{
    "file_path": "/data/shared/knowledge-base-sample.md"
  }' \
  -w "\nResponse Time: %{time_total}s\n" \
  -o /tmp/document_analysis_response.json

if [ $? -eq 0 ]; then
  echo "✅ تحليل الوثائق يعمل بنجاح"
else
  echo "❌ فشل في تحليل الوثائق"
fi

# Test 2: Translation API
echo "🔄 اختبار خدمة الترجمة..."
curl -X POST "http://localhost:5678/webhook/translate" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Hello, this is a test message for translation",
    "source_language": "english",
    "target_language": "arabic"
  }' \
  -w "\nResponse Time: %{time_total}s\n" \
  -o /tmp/translation_response.json

if [ $? -eq 0 ]; then
  echo "✅ خدمة الترجمة تعمل بنجاح"
else
  echo "❌ فشل في خدمة الترجمة"
fi

# Test 3: Check n8n workflows
echo "🔍 فحص سير العمل في n8n..."
curl -s "http://localhost:5678/rest/workflows" \
  -H "Accept: application/json" \
  -o /tmp/workflows_response.json

if [ $? -eq 0 ]; then
  echo "✅ واجهة n8n تعمل بنجاح"
  echo "📊 عدد سير العمل المتاحة: $(cat /tmp/workflows_response.json | grep -o '"id"' | wc -l)"
else
  echo "❌ فشل في الوصول لواجهة n8n"
fi

# Test 4: Check Ollama model
echo "🤖 فحص نموذج Ollama..."
curl -s "http://localhost:11434/api/tags" \
  -o /tmp/ollama_response.json

if [ $? -eq 0 ]; then
  echo "✅ خدمة Ollama تعمل بنجاح"
else
  echo "❌ فشل في الوصول لخدمة Ollama"
fi

# Test 5: Check Qdrant
echo "🔍 فحص قاعدة بيانات Qdrant..."
curl -s "http://localhost:6333/collections" \
  -o /tmp/qdrant_response.json

if [ $? -eq 0 ]; then
  echo "✅ قاعدة بيانات Qdrant تعمل بنجاح"
else
  echo "❌ فشل في الوصول لقاعدة بيانات Qdrant"
fi

echo "======================================="
echo "🎉 انتهى اختبار النظام"
echo "📋 النتائج محفوظة في /tmp/"
echo "🌐 يمكنك الوصول للنظام عبر: http://localhost:5678"

# Display some useful information
echo ""
echo "📚 معلومات مفيدة:"
echo "- المساعد العربي: http://localhost:5678/workflow/arabic-ai-assistant"
echo "- تحليل الوثائق: POST http://localhost:5678/webhook/analyze-document"
echo "- خدمة الترجمة: POST http://localhost:5678/webhook/translate"
echo "- قاعدة المعرفة: http://localhost:5678/workflow/knowledge-base-qa"