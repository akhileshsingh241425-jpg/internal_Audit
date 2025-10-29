// Excel-based Original Audit Data Structure (9 Sections, 295 Points Total)
// Based on original internal audit checklist

export const excelAuditSections = [
  {
    id: 1,
    title: "General Operations",
    maxPoints: 35,
    items: [
      // Store Operations
      { id: 1, criteria: "Store Operations - Raw material storage area is clean and organized", points: 4 },
      { id: 2, criteria: "Store Operations - Materials are properly labeled and identified", points: 4 },
      { id: 3, criteria: "Store Operations - FIFO (First In First Out) system is maintained", points: 4 },
      { id: 4, criteria: "Store Operations - Inventory records are updated and accurate", points: 3 },
      
      // Maintenance Operations
      { id: 5, criteria: "Maintenance Operations - Equipment maintenance schedules are followed", points: 4 },
      { id: 6, criteria: "Maintenance Operations - Maintenance logs are properly maintained", points: 3 },
      { id: 7, criteria: "Maintenance Operations - Spare parts inventory is adequate", points: 3 },
      
      // HR Operations
      { id: 8, criteria: "HR Operations - Employee attendance records are maintained", points: 3 },
      { id: 9, criteria: "HR Operations - Training records are up to date", points: 3 },
      
      // QC Operations
      { id: 10, criteria: "QC Operations - Quality control procedures are followed", points: 4 },
      
      // Housekeeping & 5S
      { id: 11, criteria: "Housekeeping & 5S - Workplace organization (Sort, Set in Order, Shine)", points: 4 }
    ]
  },
  {
    id: 2,
    title: "Safety & Compliance",
    maxPoints: 40,
    items: [
      // General Safety
      { id: 1, criteria: "General Safety - Personal Protective Equipment (PPE) usage", points: 5 },
      { id: 2, criteria: "General Safety - Safety signage and instructions are visible", points: 4 },
      { id: 3, criteria: "General Safety - Emergency evacuation procedures are known", points: 4 },
      { id: 4, criteria: "General Safety - First aid facilities are available and accessible", points: 4 },
      { id: 5, criteria: "General Safety - Fire safety equipment is functional", points: 5 },
      
      // Maintenance Safety
      { id: 6, criteria: "Maintenance Safety - LOTO (Lock Out Tag Out) procedures followed", points: 4 },
      { id: 7, criteria: "Maintenance Safety - Electrical safety protocols observed", points: 4 },
      
      // QC Safety
      { id: 8, criteria: "QC Safety - Chemical handling procedures followed", points: 4 },
      { id: 9, criteria: "QC Safety - Testing equipment safety measures in place", points: 3 },
      
      // Housekeeping Safety
      { id: 10, criteria: "Housekeeping Safety - Walkways and aisles are clear and safe", points: 4 },
      { id: 11, criteria: "Housekeeping Safety - Waste disposal procedures followed", points: 3 }
    ]
  },
  {
    id: 3,
    title: "Inventory & Material Management",
    maxPoints: 30,
    items: [
      // Inventory Control
      { id: 1, criteria: "Inventory Control - Physical inventory matches records", points: 5 },
      { id: 2, criteria: "Inventory Control - Stock rotation system implemented", points: 4 },
      { id: 3, criteria: "Inventory Control - Minimum stock levels maintained", points: 4 },
      
      // Receiving and Storage
      { id: 4, criteria: "Receiving and Storage - Incoming materials inspection process", points: 4 },
      { id: 5, criteria: "Receiving and Storage - Proper storage conditions maintained", points: 4 },
      { id: 6, criteria: "Receiving and Storage - Material identification system in place", points: 4 },
      
      // Issuing and Distribution
      { id: 7, criteria: "Issuing and Distribution - Material requisition process followed", points: 3 },
      { id: 8, criteria: "Issuing and Distribution - Issue documentation maintained", points: 2 }
    ]
  },
  {
    id: 4,
    title: "Equipment Maintenance",
    maxPoints: 25,
    items: [
      // Preventive Maintenance
      { id: 1, criteria: "Preventive Maintenance - Scheduled maintenance performed on time", points: 5 },
      { id: 2, criteria: "Preventive Maintenance - Maintenance checklists completed", points: 4 },
      { id: 3, criteria: "Preventive Maintenance - Equipment calibration records maintained", points: 4 },
      
      // Emergency Maintenance
      { id: 4, criteria: "Emergency Maintenance - Breakdown response procedures followed", points: 4 },
      { id: 5, criteria: "Emergency Maintenance - Emergency repair documentation", points: 3 },
      
      // Equipment Upgrades
      { id: 6, criteria: "Equipment Upgrades - Technology upgrade assessments conducted", points: 3 },
      { id: 7, criteria: "Equipment Upgrades - Equipment modification controls in place", points: 2 }
    ]
  },
  {
    id: 5,
    title: "Quality Control & Inspection",
    maxPoints: 45,
    items: [
      // Process Monitoring
      { id: 1, criteria: "Process Monitoring - In-process quality checks performed", points: 5 },
      { id: 2, criteria: "Process Monitoring - Process parameters monitored and recorded", points: 5 },
      { id: 3, criteria: "Process Monitoring - Non-conformance identification and handling", points: 5 },
      { id: 4, criteria: "Process Monitoring - Statistical process control implemented", points: 4 },
      
      // Product Inspection
      { id: 5, criteria: "Product Inspection - Final product inspection procedures", points: 5 },
      { id: 6, criteria: "Product Inspection - Product testing and certification", points: 5 },
      { id: 7, criteria: "Product Inspection - Rejection and rework procedures", points: 4 },
      
      // Equipment Calibration
      { id: 8, criteria: "Equipment Calibration - Measurement equipment calibrated", points: 4 },
      { id: 9, criteria: "Equipment Calibration - Calibration records maintained", points: 4 },
      { id: 10, criteria: "Equipment Calibration - Traceability to national standards", points: 4 }
    ]
  },
  {
    id: 6,
    title: "Human Resources",
    maxPoints: 30,
    items: [
      // Recruitment & Selection
      { id: 1, criteria: "Recruitment & Selection - Job descriptions are current and accurate", points: 3 },
      { id: 2, criteria: "Recruitment & Selection - Selection criteria followed", points: 3 },
      
      // Employee Relations
      { id: 3, criteria: "Employee Relations - Employee grievance procedures in place", points: 4 },
      { id: 4, criteria: "Employee Relations - Communication channels effective", points: 4 },
      { id: 5, criteria: "Employee Relations - Employee satisfaction assessments conducted", points: 3 },
      
      // Performance Management
      { id: 6, criteria: "Performance Management - Performance evaluation system implemented", points: 4 },
      { id: 7, criteria: "Performance Management - Goal setting and tracking processes", points: 4 },
      
      // Compensation & Benefits
      { id: 8, criteria: "Compensation & Benefits - Salary administration policies followed", points: 3 },
      { id: 9, criteria: "Compensation & Benefits - Benefits administration accurate", points: 2 }
    ]
  },
  {
    id: 7,
    title: "Training & Development",
    maxPoints: 25,
    items: [
      // General Training
      { id: 1, criteria: "General Training - Employee orientation program conducted", points: 4 },
      { id: 2, criteria: "General Training - Job-specific training provided", points: 4 },
      { id: 3, criteria: "General Training - Safety training programs implemented", points: 5 },
      
      // Training Programs
      { id: 4, criteria: "Training Programs - Training needs assessment conducted", points: 3 },
      { id: 5, criteria: "Training Programs - Training effectiveness evaluated", points: 3 },
      { id: 6, criteria: "Training Programs - Training records maintained", points: 3 },
      
      // Skills Assessment
      { id: 7, criteria: "Skills Assessment - Employee competency assessments performed", points: 3 }
    ]
  },
  {
    id: 8,
    title: "Housekeeping & Workplace Organization",
    maxPoints: 30,
    items: [
      // Workplace Cleanliness & Sorting (5S – Seiri)
      { id: 1, criteria: "Workplace Cleanliness - Sort (Seiri): Unnecessary items removed", points: 5 },
      { id: 2, criteria: "Workplace Cleanliness - General cleanliness maintained", points: 5 },
      { id: 3, criteria: "Workplace Cleanliness - Equipment and tools kept clean", points: 4 },
      
      // Arrangement & Visual Management (5S – Seiton/Seiso)
      { id: 4, criteria: "Arrangement - Set in Order (Seiton): Items have designated places", points: 5 },
      { id: 5, criteria: "Arrangement - Visual management systems implemented", points: 4 },
      { id: 6, criteria: "Arrangement - Work area organization maintained", points: 4 },
      
      // Facility Maintenance
      { id: 7, criteria: "Facility Maintenance - Building and infrastructure maintained", points: 3 }
    ]
  },
  {
    id: 9,
    title: "Record Keeping & Documentation",
    maxPoints: 25,
    items: [
      // Document Management
      { id: 1, criteria: "Document Management - Document control system in place", points: 5 },
      { id: 2, criteria: "Document Management - Document version control maintained", points: 4 },
      { id: 3, criteria: "Document Management - Document access controls implemented", points: 4 },
      { id: 4, criteria: "Document Management - Record retention policies followed", points: 4 },
      
      // QC Documentation
      { id: 5, criteria: "QC Documentation - Quality records properly maintained", points: 4 },
      { id: 6, criteria: "QC Documentation - Test certificates and reports filed", points: 2 },
      { id: 7, criteria: "QC Documentation - Audit trail maintained for all activities", points: 2 }
    ]
  }
];

// Excel Audit Classification Criteria
export const excelAuditClassifications = [
  {
    classification: "Excellent",
    range: "85-100%",
    points: "251-295 points",
    color: "#10b981",
    min: 85,
    max: 100
  },
  {
    classification: "Good", 
    range: "70-84%",
    points: "207-250 points",
    color: "#059669",
    min: 70,
    max: 84
  },
  {
    classification: "Satisfactory",
    range: "55-69%", 
    points: "162-206 points",
    color: "#eab308",
    min: 55,
    max: 69
  },
  {
    classification: "Needs Improvement",
    range: "40-54%",
    points: "118-161 points", 
    color: "#f97316",
    min: 40,
    max: 54
  },
  {
    classification: "Unsatisfactory",
    range: "Below 40%",
    points: "Below 118 points",
    color: "#ef4444",
    min: 0,
    max: 39
  }
];

// Audit Header Information
export const excelAuditHeader = {
  company: "Gautam Solar pvt. Ltd",
  documentNo: "GSPL/ADT/HR/008",
  issueDate: "15/01/2024",
  revNo: "Rev.01/15/01/2024",
  title: "INTERNAL AUDIT CHECKLIST"
};