# 🚀 AI Automation Agency Starter Kit

**Complete AI Automation Agency Platform** - A comprehensive, self-hosted solution for building professional AI automation agencies with multi-platform customer service capabilities.

![AI Agency Platform](https://raw.githubusercontent.com/n8n-io/self-hosted-ai-starter-kit/main/assets/n8n-demo.gif)

This enhanced starter kit transforms the original n8n AI platform into a **complete AI automation agency system** with multi-platform customer service, lead generation, appointment scheduling, and comprehensive business automation capabilities.

> [!IMPORTANT]
> **Built for Arabic-speaking agencies** - Comprehensive system designed for AI automation agencies serving Arabic and international markets.

## 🌟 What's Included

### Core Infrastructure
✅ [**n8n Workflow Automation**](https://n8n.io/) - 400+ integrations with advanced AI components  
✅ [**Supabase Backend**](https://supabase.com/) - Complete backend-as-a-service with real-time capabilities  
✅ [**Ollama Local AI**](https://ollama.com/) - Self-hosted LLM processing with Llama 3.2  
✅ [**Qdrant Vector DB**](https://qdrant.tech/) - High-performance vector search for AI  
✅ [**PostgreSQL Database**](https://www.postgresql.org/) - Enterprise-grade data storage  

### Agency Services Platform
🤖 **Multi-Platform Customer Service**
- WhatsApp Business API automation
- Instagram Direct Message handling  
- Facebook Messenger chatbots
- Telegram bot integration
- Website embedded chat widgets

📈 **Lead Generation & Qualification**
- Automated lead scoring and qualification
- Multi-channel lead capture
- Intelligent lead nurturing sequences  
- CRM integration workflows

📅 **Appointment Scheduling System**
- AI-powered meeting scheduling
- Calendar integration and management
- Automated confirmation and reminders
- Video meeting link generation

💼 **Business Process Automation**
- Document processing and analysis
- Email marketing automation
- Social media management
- Analytics and reporting dashboards

## 🎯 Complete Agency Services

### Customer Service Automation
⭐️ **WhatsApp Business Automation** - Professional customer service via WhatsApp API  
⭐️ **Instagram DM Management** - Automated Instagram Direct Message responses  
⭐️ **Facebook Messenger Bots** - Intelligent Messenger customer support  
⭐️ **Telegram Bot Services** - 24/7 Telegram customer assistance  
⭐️ **Website Chat Widgets** - Embedded AI chat for websites  

### Sales & Marketing Automation  
⭐️ **Lead Generation Systems** - Multi-platform lead capture and qualification  
⭐️ **Sales Funnel Automation** - Automated nurturing and conversion workflows  
⭐️ **Appointment Scheduling** - AI-powered meeting coordination  
⭐️ **Email Marketing Campaigns** - Personalized email automation  
⭐️ **Social Media Automation** - Automated posting and engagement  

### Business Intelligence
⭐️ **Analytics Dashboards** - Real-time performance monitoring  
⭐️ **Conversation Analytics** - Customer interaction insights  
⭐️ **Lead Performance Tracking** - ROI and conversion analytics  
⭐️ **Multi-Client Management** - Agency client portal and management

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- At least 8GB RAM available
- 20GB free disk space

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/AnasAli09822/self-hosted-ai-starter-kit.git
cd self-hosted-ai-starter-kit
```

#### 2. Environment Setup
```bash
cp .env.example .env
# Edit .env with your configuration
```

#### 3. Launch the Platform

##### For GPU Users (Nvidia)
```bash
docker compose --profile gpu-nvidia up -d
```

##### For CPU-Only Systems
```bash
docker compose --profile cpu up -d
```

#### 4. Access Your Services
- **n8n Automation Platform**: http://localhost:5678
- **Supabase Studio**: http://localhost:3001  
- **Supabase API**: http://localhost:8000
- **Qdrant Vector DB**: http://localhost:6333

## 📋 Platform Configuration

### 1. Set Up n8n (http://localhost:5678)
1. Create your admin account
2. Import the provided workflow templates
3. Configure your credentials for each platform

### 2. Configure Supabase (http://localhost:3001)
1. Access the database schema
2. Set up your organization and client data
3. Configure authentication and API keys

### 3. Set Up Platform Integrations

#### WhatsApp Business API
```bash
# Required environment variables
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WEBHOOK_VERIFY_TOKEN=your_webhook_token
```

#### Instagram & Facebook Messenger
```bash
# Required environment variables  
FACEBOOK_PAGE_ACCESS_TOKEN=your_page_access_token
INSTAGRAM_PAGE_ID=your_instagram_page_id
```

#### Telegram Bot
```bash
# Required environment variables
TELEGRAM_BOT_TOKEN=your_bot_token
```

#### Business Email Configuration
```bash
# SMTP Configuration
BUSINESS_EMAIL=your_business@example.com
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your_email@example.com  
SMTP_PASSWORD=your_app_password
```

## 🔧 Workflow Templates

### Customer Service Workflows
| Platform | File | Description |
|----------|------|-------------|
| WhatsApp | `workflows/customer-service/whatsapp-customer-service.json` | WhatsApp Business API automation |
| Instagram | `workflows/customer-service/instagram-customer-service.json` | Instagram DM automation |
| Messenger | `workflows/customer-service/messenger-customer-service.json` | Facebook Messenger bot |
| Telegram | `workflows/customer-service/telegram-customer-service.json` | Telegram bot automation |
| Website | `workflows/customer-service/website-chat-service.json` | Website chat widget |

### Business Automation Workflows
| Service | File | Description |
|---------|------|-------------|
| Lead Generation | `workflows/lead-generation/lead-qualification-system.json` | Lead capture and qualification |
| Appointments | `workflows/automation-templates/appointment-scheduling.json` | Meeting scheduling system |

### Importing Workflows
1. Open n8n at http://localhost:5678
2. Go to **Workflows** → **Import from file**
3. Select the workflow JSON files from the `workflows/` directory
4. Configure the credentials for each workflow

## 🗄️ Database Schema

The platform includes a comprehensive database schema with tables for:

- **Organizations & Clients** - Multi-tenant client management
- **Platform Integrations** - WhatsApp, Instagram, Messenger, Telegram, Website
- **Conversations & Messages** - Cross-platform message storage
- **Lead Management** - Lead capture, scoring, and qualification
- **Appointments** - Meeting scheduling and management
- **Knowledge Base** - AI training data and responses
- **Analytics** - Performance tracking and reporting

### Database Setup
The database schema is automatically created on first launch. You can find the migration files in:
```
supabase/migrations/001_initial_schema.sql
```

## 🎨 Customization

### Adding New Platforms
1. Create a new workflow template in `workflows/customer-service/`
2. Add the platform integration to the database schema
3. Configure the API credentials
4. Import and activate the workflow in n8n

### Customizing AI Responses
1. Access the Ollama service at http://localhost:11434
2. Modify the prompt templates in the workflow nodes
3. Train custom models using your business data
4. Update the knowledge base in Supabase

### White-Label Configuration
1. Update branding in workflow templates
2. Customize email templates and responses
3. Configure your domain and SSL certificates
4. Set up custom API endpoints

## 📊 Analytics & Monitoring

### Built-in Analytics
- Conversation volume and response times
- Lead generation and conversion rates  
- Customer satisfaction scores
- Platform performance metrics

### Integration Options
- Google Analytics integration
- Custom dashboard development
- Third-party CRM connections
- Business intelligence tools

## 🔒 Security & Privacy

### Data Protection
- All data stored locally in your infrastructure
- End-to-end encryption for sensitive communications
- GDPR/privacy compliance built-in
- Secure API key management

### Access Control
- Role-based access control (RBAC)
- API rate limiting and security
- Webhook signature verification
- Secure credential storage

## 🆘 Support & Documentation

### Getting Help
- **Issues**: [GitHub Issues](https://github.com/AnasAli09822/self-hosted-ai-starter-kit/issues)
- **Discussions**: [GitHub Discussions](https://github.com/AnasAli09822/self-hosted-ai-starter-kit/discussions)
- **n8n Community**: [n8n Forum](https://community.n8n.io/)

### Documentation
- [n8n Documentation](https://docs.n8n.io/)
- [Supabase Documentation](https://supabase.com/docs)
- [Ollama Documentation](https://ollama.ai/docs)
- [Qdrant Documentation](https://qdrant.tech/documentation/)

## 🎯 Roadmap

### Upcoming Features
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (Arabic, English, French)
- [ ] Voice message handling
- [ ] Advanced AI training interface
- [ ] Mobile app for agency management
- [ ] White-label client portals

### Integration Roadmap  
- [ ] Google Calendar integration
- [ ] Zoom/Teams meeting integration
- [ ] Advanced CRM connections
- [ ] Payment processing automation
- [ ] Social media scheduling
- [ ] Advanced reporting tools

## 📜 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 🙏 Acknowledgments

Built on top of the excellent work by:
- [n8n.io](https://n8n.io/) - Workflow automation platform
- [Supabase](https://supabase.com/) - Backend-as-a-service
- [Ollama](https://ollama.com/) - Local AI model serving
- [Qdrant](https://qdrant.tech/) - Vector database

---

**Start building your AI automation agency today!** 🚀

For questions or support, please open an issue or start a discussion in our GitHub repository.