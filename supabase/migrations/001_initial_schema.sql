-- AI Automation Agency Database Schema
-- This creates the foundational tables for managing clients, conversations, and multi-platform integrations

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Organizations/Agencies table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) UNIQUE NOT NULL,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clients table (customers of the agency)
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    company VARCHAR(255),
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Platform integrations (WhatsApp, Instagram, Messenger, Telegram, Website)
CREATE TABLE platform_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    platform_type VARCHAR(50) NOT NULL, -- 'whatsapp', 'instagram', 'messenger', 'telegram', 'website'
    platform_identifier VARCHAR(255) NOT NULL, -- phone number, username, page id, bot token, etc.
    configuration JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(client_id, platform_type, platform_identifier)
);

-- Conversations across all platforms
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform_integration_id UUID REFERENCES platform_integrations(id) ON DELETE CASCADE,
    external_conversation_id VARCHAR(255) NOT NULL, -- platform-specific conversation ID
    customer_identifier VARCHAR(255) NOT NULL, -- customer's phone, username, etc.
    customer_name VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'resolved', 'archived'
    assigned_to UUID, -- reference to users table (to be created)
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(platform_integration_id, external_conversation_id)
);

-- Messages within conversations
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    external_message_id VARCHAR(255),
    sender_type VARCHAR(20) NOT NULL, -- 'customer', 'agent', 'bot'
    sender_identifier VARCHAR(255),
    content TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'text', -- 'text', 'image', 'document', 'audio', 'video'
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Bot configurations per platform
CREATE TABLE bot_configurations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform_integration_id UUID REFERENCES platform_integrations(id) ON DELETE CASCADE,
    bot_name VARCHAR(255) NOT NULL,
    prompt_template TEXT NOT NULL,
    model_settings JSONB DEFAULT '{}',
    greeting_message TEXT,
    fallback_message TEXT,
    escalation_triggers JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Knowledge base for AI responses
CREATE TABLE knowledge_base (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    tags TEXT[],
    embedding VECTOR(1536), -- for AI similarity search
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Automation workflows
CREATE TABLE workflows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    trigger_type VARCHAR(100) NOT NULL, -- 'message_received', 'keyword_detected', 'scheduled', etc.
    trigger_config JSONB DEFAULT '{}',
    actions JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics and metrics
CREATE TABLE conversation_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    response_time_seconds INTEGER,
    resolution_time_seconds INTEGER,
    customer_satisfaction_score INTEGER,
    bot_accuracy_score DECIMAL(3,2),
    escalated_to_human BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lead generation and qualification
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES conversations(id),
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    company VARCHAR(255),
    lead_source VARCHAR(100),
    lead_score INTEGER DEFAULT 0,
    qualification_status VARCHAR(50) DEFAULT 'new', -- 'new', 'qualified', 'unqualified', 'contacted'
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Appointments and scheduling
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES leads(id),
    conversation_id UUID REFERENCES conversations(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 30,
    status VARCHAR(50) DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled', 'no_show'
    meeting_link VARCHAR(500),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_clients_organization_id ON clients(organization_id);
CREATE INDEX idx_platform_integrations_client_id ON platform_integrations(client_id);
CREATE INDEX idx_conversations_platform_integration_id ON conversations(platform_integration_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_bot_configurations_platform_integration_id ON bot_configurations(platform_integration_id);
CREATE INDEX idx_knowledge_base_client_id ON knowledge_base(client_id);
CREATE INDEX idx_workflows_client_id ON workflows(client_id);
CREATE INDEX idx_leads_client_id ON leads(client_id);
CREATE INDEX idx_appointments_client_id ON appointments(client_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_platform_integrations_updated_at BEFORE UPDATE ON platform_integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bot_configurations_updated_at BEFORE UPDATE ON bot_configurations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_knowledge_base_updated_at BEFORE UPDATE ON knowledge_base FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON workflows FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();