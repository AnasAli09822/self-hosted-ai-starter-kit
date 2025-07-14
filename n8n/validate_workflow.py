#!/usr/bin/env python3
"""
Quick N8N Workflow Validation Script
Usage: python validate_workflow.py [workflow_file]
"""

import json
import sys
import os

def quick_validate(workflow_path):
    """Quick validation of n8n workflow."""
    try:
        with open(workflow_path, 'r', encoding='utf-8') as f:
            workflow = json.load(f)
        
        # Check basic structure
        required_fields = ['id', 'name', 'nodes', 'connections']
        for field in required_fields:
            if field not in workflow:
                return False, f"Missing required field: {field}"
        
        # Check nodes
        if not isinstance(workflow['nodes'], list) or len(workflow['nodes']) == 0:
            return False, "Invalid or empty nodes array"
        
        # Check connections
        if not isinstance(workflow['connections'], dict):
            return False, "Invalid connections object"
        
        # Check for common error patterns
        workflow_str = json.dumps(workflow)
        
        # Check for proper expression syntax
        if '{{ $json.' in workflow_str:
            print("✅ Found proper expression syntax")
        
        # Check for Arabic text
        if any(keyword in workflow_str for keyword in ['دعم', 'مبيعات', 'تسويق']):
            print("✅ Arabic keywords found")
        
        return True, f"Workflow '{workflow['name']}' is valid"
        
    except Exception as e:
        return False, f"Error validating workflow: {e}"

def main():
    if len(sys.argv) > 1:
        workflow_path = sys.argv[1]
    else:
        workflow_path = 'n8n/demo-data/workflows/telegram-multi-intent-routing.json'
    
    if not os.path.exists(workflow_path):
        print(f"❌ Workflow file not found: {workflow_path}")
        return 1
    
    print(f"🔍 Validating: {workflow_path}")
    is_valid, message = quick_validate(workflow_path)
    
    if is_valid:
        print(f"✅ {message}")
        return 0
    else:
        print(f"❌ {message}")
        return 1

if __name__ == "__main__":
    sys.exit(main())