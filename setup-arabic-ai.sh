#!/bin/bash

# Arabic AI System Setup Script
# سكريبت إعداد نظام الذكاء الاصطناعي العربي

echo "🚀 مرحباً بك في نظام الذكاء الاصطناعي العربي"
echo "=========================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker غير مثبت. يرجى تثبيت Docker أولاً."
    exit 1
fi

# Check if Docker Compose is available
if ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose غير متاح. يرجى تثبيت Docker Compose أولاً."
    exit 1
fi

echo "✅ Docker و Docker Compose متاحان"
echo ""

# Create shared directory if it doesn't exist
mkdir -p shared
echo "📁 تم إنشاء المجلد المشترك: shared/"

# Detect GPU support
echo "🔍 فحص دعم GPU..."
if command -v nvidia-smi &> /dev/null; then
    echo "✅ تم اكتشاف GPU من نوع NVIDIA"
    PROFILE="gpu-nvidia"
elif [ -d "/dev/dri" ]; then
    echo "✅ تم اكتشاف GPU من نوع AMD"
    PROFILE="gpu-amd"
else
    echo "ℹ️ لم يتم اكتشاف GPU، سيتم استخدام CPU"
    PROFILE="cpu"
fi

echo ""
echo "🐳 بدء تشغيل النظام..."
echo "استخدام الملف الشخصي: $PROFILE"
echo ""

# Start the system
if [ "$PROFILE" = "cpu" ]; then
    docker compose --profile cpu up -d
else
    docker compose --profile $PROFILE up -d
fi

# Wait for services to start
echo "⏳ انتظار تشغيل الخدمات..."
sleep 10

# Check if services are running
echo "🔍 فحص حالة الخدمات..."

if docker compose ps | grep -q "n8n.*Up"; then
    echo "✅ n8n يعمل بنجاح"
else
    echo "❌ مشكلة في تشغيل n8n"
fi

if docker compose ps | grep -q "postgres.*Up"; then
    echo "✅ PostgreSQL يعمل بنجاح"
else
    echo "❌ مشكلة في تشغيل PostgreSQL"
fi

if docker compose ps | grep -q "qdrant.*Up"; then
    echo "✅ Qdrant يعمل بنجاح"
else
    echo "❌ مشكلة في تشغيل Qdrant"
fi

# Check for Ollama based on profile
if [ "$PROFILE" = "cpu" ]; then
    OLLAMA_SERVICE="ollama-cpu"
elif [ "$PROFILE" = "gpu-nvidia" ]; then
    OLLAMA_SERVICE="ollama-gpu"
else
    OLLAMA_SERVICE="ollama-gpu-amd"
fi

if docker compose ps | grep -q "$OLLAMA_SERVICE.*Up"; then
    echo "✅ Ollama يعمل بنجاح"
else
    echo "❌ مشكلة في تشغيل Ollama"
fi

echo ""
echo "🎉 تم تشغيل النظام بنجاح!"
echo "=========================================="
echo ""
echo "🌐 الوصول للنظام:"
echo "- n8n: http://localhost:5678"
echo "- Qdrant: http://localhost:6333"
echo "- Ollama: http://localhost:11434"
echo ""
echo "📚 سير العمل المتاحة:"
echo "- المساعد العربي: http://localhost:5678/workflow/arabic-ai-assistant"
echo "- محلل الوثائق: http://localhost:5678/workflow/document-analyzer"
echo "- قاعدة المعرفة: http://localhost:5678/workflow/knowledge-base-qa"
echo "- خدمة الترجمة: http://localhost:5678/workflow/translation-service"
echo "- مفهرس المعرفة: http://localhost:5678/workflow/knowledge-indexer"
echo ""
echo "🛠️ أوامر مفيدة:"
echo "- إيقاف النظام: docker compose down"
echo "- مراقبة السجلات: docker compose logs -f"
echo "- اختبار النظام: ./test-arabic-system.sh"
echo ""
echo "📖 للمزيد من المعلومات، راجع README-AR.md"

# Check if embedding model is available
echo ""
echo "🔍 فحص نموذج التضمين..."
sleep 30  # Wait for Ollama to be ready

if docker compose exec $OLLAMA_SERVICE ollama list | grep -q "nomic-embed-text"; then
    echo "✅ نموذج التضمين متاح"
else
    echo "📥 تحميل نموذج التضمين..."
    docker compose exec $OLLAMA_SERVICE ollama pull nomic-embed-text
    echo "✅ تم تحميل نموذج التضمين"
fi

echo ""
echo "🎯 النظام جاهز للاستخدام!"
echo "انتقل إلى: http://localhost:5678"