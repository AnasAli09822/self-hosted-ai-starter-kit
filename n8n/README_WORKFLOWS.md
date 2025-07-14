# ملفات JSON دقيقة لبناء وورك فلوز n8n - Accurate JSON Files for n8n Workflows

## نظرة عامة - Overview

يحتوي هذا المشروع على مجموعة شاملة من ملفات JSON الدقيقة والخالية من الأخطاء لبناء وورك فلوز في n8n. هذه الملفات مصممة للعمل مع مجموعة أدوات الذكاء الاصطناعي المستضافة ذاتياً.

This project contains a comprehensive collection of accurate, error-free JSON files for building workflows in n8n. These files are designed to work with the self-hosted AI starter kit.

## الملفات المتوفرة - Available Files

### 1. سير عمل معالجة الوثائق - Document Processing Workflows
- **DocProcessorWorkflow001.json**: معالجة وتحليل ملفات PDF تلقائياً
- **VectorSearchWorkflow002.json**: البحث الذكي في الوثائق باستخدام اللغة الطبيعية

### 2. سير عمل الذكاء الاصطناعي - AI Workflows  
- **AIAgentWorkflow003.json**: وكيل ذكاء اصطناعي متقدم مع أدوات متعددة
- **srOnR8PAY3u4RSwb.json**: سير عمل تجريبي أساسي للمحادثة

### 3. سير عمل معالجة البيانات - Data Processing Workflows
- **DataTransformWorkflow004.json**: معالجة وتحليل البيانات المتنوعة
- **EmailProcessingWorkflow005.json**: معالجة وتصنيف البريد الإلكتروني تلقائياً

### 4. سير عمل المراقبة - Monitoring Workflows
- **SocialMediaMonitoringWorkflow006.json**: مراقبة وتحليل وسائل التواصل الاجتماعي

## المميزات الرئيسية - Key Features

✅ **JSON خالي من الأخطاء** - Error-free JSON syntax
✅ **وظائف كاملة** - Complete functionality with all necessary nodes
✅ **توثيق شامل** - Comprehensive documentation in Arabic and English
✅ **تكامل مع الذكاء الاصطناعي** - Full AI integration (Ollama, Qdrant)
✅ **جاهز للإنتاج** - Production-ready with error handling
✅ **متعدد الاستخدامات** - Multiple use cases covered

## التثبيت والاستخدام - Installation and Usage

### المتطلبات الأساسية - Prerequisites
```bash
# تشغيل المجموعة الأساسية - Run the basic stack
docker compose --profile cpu up

# أو للمعالجات المدعومة - Or for supported GPUs
docker compose --profile gpu-nvidia up
```

### استيراد الوورك فلوز - Import Workflows
1. انسخ ملفات JSON إلى مجلد `n8n/demo-data/workflows/`
2. أعد تشغيل خدمات n8n
3. ستتم استيراد الوورك فلوز تلقائياً

Copy JSON files to `n8n/demo-data/workflows/` folder, restart n8n services, and workflows will be automatically imported.

## التحقق من الصحة - Validation

تم التحقق من جميع الملفات باستخدام أداة تحقق مخصصة:
All files have been validated using a custom validation tool:

```bash
python validate_n8n_json.py workflow_file.json
```

## أمثلة الاستخدام - Usage Examples

### البحث في الوثائق - Document Search
```bash
curl -X POST http://localhost:5678/webhook/search \
  -H "Content-Type: application/json" \
  -d '{"question": "ما هي الميزات الرئيسية؟"}'
```

### معالجة البيانات - Data Processing
```bash
curl -X POST http://localhost:5678/webhook/process-data \
  -H "Content-Type: application/json" \
  -d '{"data_type": "json", "data": "[{\"name\": \"أحمد\", \"age\": 30}]"}'
```

## إحصائيات المشروع - Project Statistics

- **إجمالي الوورك فلوز**: 7 - **Total Workflows**: 7
- **إجمالي العقد**: 62 - **Total Nodes**: 62  
- **وورك فلوز مع الذكاء الاصطناعي**: 7 - **AI-Enabled Workflows**: 7
- **وورك فلوز مع المحفزات**: 4 - **Triggered Workflows**: 4

## الدعم والمساعدة - Support and Help

للحصول على المساعدة:
- راجع وثائق n8n: https://docs.n8n.io/
- قم بزيارة مجتمع n8n: https://community.n8n.io/
- راجع وثائق المشروع الأساسي

For support:
- Check n8n documentation: https://docs.n8n.io/
- Visit n8n community: https://community.n8n.io/
- Review the main project documentation

## الترخيص - License

هذا المشروع مرخص تحت Apache License 2.0
This project is licensed under Apache License 2.0

## المساهمة - Contributing

نرحب بمساهماتكم في تحسين هذه الوورك فلوز وإضافة المزيد من الأمثلة المفيدة.
Contributions are welcome to improve these workflows and add more useful examples.

---

**ملاحظة**: جميع ملفات JSON في هذا المشروع تم التحقق من صحتها وخلوها من الأخطاء، مما يضمن الاستيراد الناجح في n8n.

**Note**: All JSON files in this project have been validated and are error-free, ensuring successful import into n8n.