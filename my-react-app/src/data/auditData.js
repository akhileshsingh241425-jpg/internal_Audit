// Manufacturing Operations Audit - Real Production Focus
export const manufacturingAuditSections = [
  {
    id: 1,
    title: "Production Line Operations",
    maxPoints: 50,
    items: [
      {
        id: "1.1",
        title: "String Assembly Quality",
        description: "सोल्डर जॉइंट्स सही हैं? वायरिंग proper है? String से string connection ठीक है?",
        guidelines: "Check solder quality, wire routing, connector tightness",
        evidence: "Photos of string connections, solder joint images",
        points: 5,
        criticalPoint: true
      },
      {
        id: "1.2", 
        title: "Cell Alignment in String",
        description: "सेल्स properly aligned हैं? Gap uniform है? कोई cell टूटी तो नहीं?",
        guidelines: "Visual inspection of cell placement and spacing",
        evidence: "Photos of cell alignment, gap measurements",
        points: 4
      },
      {
        id: "1.3",
        title: "Lamination Process Check", 
        description: "Lamination temperature सही है? Pressure adequate है? Bubbles नहीं हैं?",
        guidelines: "Check laminator temperature logs, pressure readings",
        evidence: "Temperature logs, pressure readings, laminated panel photos",
        points: 5,
        criticalPoint: true
      },
      {
        id: "1.4",
        title: "Frame Assembly Quality",
        description: "Frame corners properly sealed हैं? Drainage holes clean हैं? Gasket placement ठीक है?",
        guidelines: "Check frame sealing, drainage, gasket installation",
        evidence: "Photos of frame corners, drainage holes, gasket placement",
        points: 4
      }
    ]
  },
  {
    id: 2,
    title: "Quality Control & Testing",
    maxPoints: 60,
    items: [
      {
        id: "2.1",
        title: "IQC (Incoming Quality Control)",
        description: "Raw material inspection हो रही है? Cell quality check हो रहा है? Glass, EVA, backsheet inspect हो रहे हैं?",
        guidelines: "Verify incoming inspection records, sampling procedures",
        evidence: "IQC records, rejection reports, material certificates",
        points: 8,
        criticalPoint: true
      },
      {
        id: "2.2",
        title: "IPQC (In-Process Quality Control)", 
        description: "हर stage पर quality check हो रही है? String testing हो रही है? Visual inspection कर रहे हैं?",
        guidelines: "Check in-process inspection sheets, test records",
        evidence: "IPQC checklists, test reports, process photos",
        points: 10,
        criticalPoint: true
      },
      {
        id: "2.3",
        title: "Flash Test Results",
        description: "Flash test reports accurate हैं? Power output specifications में है? IV curve analysis हो रहा है?",
        guidelines: "Review flash test data, power measurements, IV curves",
        evidence: "Flash test reports, IV curve graphs, calibration certificates",
        points: 8,
        criticalPoint: true
      },
      {
        id: "2.4",
        title: "EL Testing (Electroluminescence)",
        description: "EL testing हो रही है? Micro cracks detect हो रहे हैं? Images properly stored हैं?",
        guidelines: "Check EL test images, crack detection records",
        evidence: "EL images, defect analysis reports, test equipment calibration",
        points: 8,
        criticalPoint: true
      },
      {
        id: "2.5",
        title: "Calibration Records",
        description: "सभी test equipment calibrated हैं? Certificates valid हैं? Traceability maintained है?",
        guidelines: "Verify calibration certificates, due dates, traceability",
        evidence: "Calibration certificates, equipment tags, maintenance records",
        points: 6
      }
    ]
  },
  {
    id: 3,
    title: "Workplace Conditions & Safety",
    maxPoints: 45,
    items: [
      {
        id: "3.1",
        title: "Canteen Hygiene & Food Quality",
        description: "Canteen clean है? Food quality ठीक है? Staff को proper खाना मिल रहा है? Water quality OK है?",
        guidelines: "Check cleanliness, food storage, water quality, staff satisfaction",
        evidence: "Photos of canteen, food samples, water test reports, staff feedback",
        points: 6
      },
      {
        id: "3.2",
        title: "Lighting Conditions",
        description: "Production area में proper lighting है? Lux levels adequate हैं? No shadows on work area?",
        guidelines: "Measure lux levels, check for adequate illumination",
        evidence: "Lux meter readings, photos of work areas, lighting layout",
        points: 5
      },
      {
        id: "3.3",
        title: "Environmental Controls",
        description: "Temperature control है? Humidity levels ठीक हैं? Hygrometer readings regular लिए जा रहे हैं?",
        guidelines: "Check HVAC system, humidity controls, monitoring records",
        evidence: "Temperature logs, humidity readings, hygrometer calibration",
        points: 6,
        criticalPoint: true
      },
      {
        id: "3.4",
        title: "Storage Conditions",
        description: "Raw material storage proper है? Temperature controlled है? Material damage नहीं हो रहा?",
        guidelines: "Inspect storage areas, temperature controls, material handling",
        evidence: "Storage area photos, temperature logs, material condition reports",
        points: 5
      },
      {
        id: "3.5",
        title: "Safety Protocols",
        description: "PPE का proper use हो रहा है? Safety signage लगे हैं? Emergency exits clear हैं?",
        guidelines: "Check PPE usage, safety signage, emergency procedures",
        evidence: "Photos of PPE usage, safety signage, emergency exit photos",
        points: 6
      },
      {
        id: "3.6",
        title: "Fire Safety & Equipment",
        description: "Fire extinguishers की validity OK है? Fire exits accessible हैं? Emergency drill records हैं?",
        guidelines: "Check fire safety equipment, accessibility, drill records",
        evidence: "Fire extinguisher tags, exit photos, drill attendance records",
        points: 5
      }
    ]
  },
  {
    id: 4,
    title: "Human Resources & Communication",
    maxPoints: 40,
    items: [
      {
        id: "4.1",
        title: "Worker-Supervisor Communication",
        description: "Workers और supervisors के बीच communication gap तो नहीं? Issues properly escalate हो रहे हैं?",
        guidelines: "Interview workers and supervisors, check communication channels",
        evidence: "Interview notes, communication logs, feedback forms",
        points: 8
      },
      {
        id: "4.2",
        title: "HR Department Effectiveness",
        description: "HR properly काम कर रहा है? Employee grievances handle हो रहे हैं? Attendance tracking ठीक है?",
        guidelines: "Check HR processes, grievance handling, attendance systems",
        evidence: "HR records, grievance logs, attendance reports",
        points: 7
      },
      {
        id: "4.3",
        title: "Worker Issues & Concerns",
        description: "Workers के पास कोई issues हैं? Salary, overtime, working conditions के complaints हैं?",
        guidelines: "Anonymous worker interviews, suggestion box check",
        evidence: "Worker feedback forms, issue logs, resolution records",
        points: 8
      },
      {
        id: "4.4",
        title: "Training & Skill Development",
        description: "Workers को proper training मिल रही है? Skill upgradation हो रहा है? Safety training current है?",
        guidelines: "Check training records, skill assessments, safety training",
        evidence: "Training certificates, skill matrix, safety training records",
        points: 6
      },
      {
        id: "4.5",
        title: "Leadership Effectiveness",
        description: "Leadership team effective है? Decision making process smooth है? Team coordination ठीक है?",
        guidelines: "Observe leadership interactions, decision making processes",
        evidence: "Meeting minutes, decision logs, team feedback",
        points: 6
      }
    ]
  },
  {
    id: 5,
    title: "Maintenance & Equipment",
    maxPoints: 35,
    items: [
      {
        id: "5.1",
        title: "Preventive Maintenance Checklists",
        description: "PM checklists properly fill हो रही हैं? Schedule के according maintenance हो रहा है?",
        guidelines: "Check PM schedules, completed checklists, maintenance logs",
        evidence: "PM checklists, maintenance schedules, completion records",
        points: 8,
        criticalPoint: true
      },
      {
        id: "5.2",
        title: "Equipment Documentation",
        description: "सभी machines के पास proper documents हैं? Manuals available हैं? SOPs display हैं?",
        guidelines: "Check equipment documentation, operating procedures",
        evidence: "Equipment manuals, SOP displays, documentation files",
        points: 6
      },
      {
        id: "5.3",
        title: "Breakdown Records & Response",
        description: "Equipment breakdown records maintain हैं? Response time adequate है? Root cause analysis हो रहा है?",
        guidelines: "Review breakdown logs, response times, corrective actions",
        evidence: "Breakdown logs, repair records, root cause analysis reports",
        points: 7
      },
      {
        id: "5.4",
        title: "Spare Parts Availability",
        description: "Critical spare parts stock में हैं? Inventory levels proper हैं? Emergency spares available हैं?",
        guidelines: "Check spare parts inventory, stock levels, emergency supplies",
        evidence: "Inventory reports, spare parts list, stock photos",
        points: 5
      },
      {
        id: "5.5",
        title: "Tool & Equipment Calibration",
        description: "Tools properly calibrated हैं? Measurement equipment accuracy maintained है? Records updated हैं?",
        guidelines: "Check tool calibration, measurement accuracy, record keeping",
        evidence: "Calibration records, tool tags, accuracy certificates",
        points: 5
      }
    ]
  }
];

// Record Keeping Audit - Documentation Focus  
export const recordKeepingAuditSections = [
  {
    id: 1,
    title: "Quality Documentation",
    maxPoints: 40,
    items: [
      {
        id: "R1.1",
        title: "IQC Records Completeness",
        description: "IQC records complete हैं? Signatures proper हैं? Data traceability है?",
        guidelines: "Check completeness of incoming quality records",
        evidence: "IQC forms, signatures, data sheets",
        points: 8
      },
      {
        id: "R1.2", 
        title: "IPQC Documentation",
        description: "In-process quality records maintain हैं? Real-time data entry हो रही है?",
        guidelines: "Verify in-process quality documentation",
        evidence: "IPQC sheets, real-time logs",
        points: 8
      },
      {
        id: "R1.3",
        title: "Final QC Records",
        description: "Final inspection records complete हैं? Test certificates proper हैं?",
        guidelines: "Check final quality control documentation",
        evidence: "FQC records, test certificates",
        points: 8
      },
      {
        id: "R1.4",
        title: "Calibration Certificates",
        description: "सभी equipment के calibration certificates updated हैं? Validity check की गई है?",
        guidelines: "Verify calibration certificate validity and traceability",
        evidence: "Calibration certificates, validity schedules",
        points: 8
      },
      {
        id: "R1.5",
        title: "Non-Conformance Records",
        description: "NC reports properly documented हैं? Corrective actions recorded हैं?",
        guidelines: "Check NC documentation and corrective action records",
        evidence: "NC reports, CAPA records",
        points: 8
      }
    ]
  },
  {
    id: 2,
    title: "Production Documentation", 
    maxPoints: 35,
    items: [
      {
        id: "R2.1",
        title: "Production Reports",
        description: "Daily production reports complete हैं? Shift-wise data available है?",
        guidelines: "Check production reporting completeness",
        evidence: "Production reports, shift logs",
        points: 7
      },
      {
        id: "R2.2",
        title: "Material Consumption Records",
        description: "Raw material consumption properly recorded है? Wastage analysis की गई है?",
        guidelines: "Verify material usage and wastage documentation",
        evidence: "Material consumption logs, wastage reports",
        points: 7
      },
      {
        id: "R2.3",
        title: "Process Parameter Logs",
        description: "Critical process parameters logged हैं? Deviation reports maintained हैं?",
        guidelines: "Check process parameter documentation",
        evidence: "Process logs, parameter sheets, deviation reports",
        points: 7
      },
      {
        id: "R2.4",
        title: "Batch/Lot Traceability",
        description: "Batch traceability maintain की गई है? Serial number tracking proper है?",
        guidelines: "Verify batch and lot traceability systems",
        evidence: "Batch records, serial number logs, traceability matrix",
        points: 7
      },
      {
        id: "R2.5",
        title: "Yield & Efficiency Records",
        description: "Production yield calculations correct हैं? Efficiency metrics tracked हैं?",
        guidelines: "Check yield calculations and efficiency tracking",
        evidence: "Yield reports, efficiency charts, performance metrics",
        points: 7
      }
    ]
  },
  {
    id: 3,
    title: "Safety & Compliance Records",
    maxPoints: 30,
    items: [
      {
        id: "R3.1",
        title: "Safety Training Records",
        description: "Safety training attendance proper documented है? Refresher training records हैं?",
        guidelines: "Verify safety training documentation",
        evidence: "Training attendance, certificates, refresher records",
        points: 8
      },
      {
        id: "R3.2",
        title: "Incident Reports",
        description: "Safety incidents properly reported हैं? Investigation records complete हैं?",
        guidelines: "Check incident reporting and investigation records",
        evidence: "Incident reports, investigation files, corrective actions",
        points: 8
      },
      {
        id: "R3.3",
        title: "Compliance Certificates",
        description: "BIS, ISO और अन्य compliance certificates updated हैं? Audit reports filed हैं?",
        guidelines: "Verify regulatory compliance documentation",
        evidence: "Compliance certificates, audit reports, regulatory filings",
        points: 7
      },
      {
        id: "R3.4",
        title: "Environmental Records",
        description: "Environmental monitoring records maintained हैं? Waste disposal certificates हैं?",
        guidelines: "Check environmental compliance records",
        evidence: "Environmental logs, disposal certificates, monitoring reports",
        points: 7
      }
    ]
  },
  {
    id: 4,
    title: "Administrative Records",
    maxPoints: 25,
    items: [
      {
        id: "R4.1",
        title: "HR Documentation",
        description: "Employee files complete हैं? Attendance records proper maintained हैं?",
        guidelines: "Check HR record completeness and organization",
        evidence: "Employee files, attendance logs, HR registers",
        points: 6
      },
      {
        id: "R4.2",
        title: "Maintenance Records",
        description: "Equipment maintenance logs updated हैं? PM schedules followed हैं?",
        guidelines: "Verify maintenance record keeping",
        evidence: "Maintenance logs, PM schedules, work orders",
        points: 6
      },
      {
        id: "R4.3",
        title: "Inventory Records",
        description: "Stock records accurate हैं? Physical verification done है? Discrepancy reports हैं?",
        guidelines: "Check inventory record accuracy and verification",
        evidence: "Stock registers, physical verification reports, discrepancy logs",
        points: 7
      },
      {
        id: "R4.4",
        title: "Financial Documentation",
        description: "Cost records properly maintained हैं? Budget vs actual analysis है?",
        guidelines: "Verify financial record keeping and analysis",
        evidence: "Cost sheets, budget reports, variance analysis",
        points: 6
      }
    ]
  }
];

export const auditCategories = {
  manufacturing: {
    title: "Manufacturing Operations Audit",
    description: "Comprehensive audit of solar panel manufacturing operations",
    sections: manufacturingAuditSections,
    totalPoints: manufacturingAuditSections.reduce((sum, section) => sum + section.maxPoints, 0)
  },
  recordKeeping: {
    title: "Record Keeping & Documentation Audit", 
    description: "Audit of documentation systems and record maintenance",
    sections: recordKeepingAuditSections,
    totalPoints: recordKeepingAuditSections.reduce((sum, section) => sum + section.maxPoints, 0)
  }
};

export const scoringCriteria = {
  excellent: { min: 85, max: 100, label: "Excellent", color: "#22c55e" },
  good: { min: 70, max: 84, label: "Good", color: "#3b82f6" }, 
  satisfactory: { min: 55, max: 69, label: "Satisfactory", color: "#f59e0b" },
  needsImprovement: { min: 40, max: 54, label: "Needs Improvement", color: "#f97316" },
  unsatisfactory: { min: 0, max: 39, label: "Unsatisfactory", color: "#ef4444" }
};

// Legacy data structure for backward compatibility
export const auditSections = [
  {
    id: 1,
    title: "General Operations",
    maxPoints: 35,
    items: [
      {
        id: "1.2",
        criteria: "Are store policies and procedures documented and accessible to employees?",
        guidelines: "Verify availability of SOPs/manuals in store area.",
        evidence: "SOPs, Quality Manual",
        maxPoints: 3,
        category: "Store Operations"
      },
      {
        id: "1.3",
        criteria: "Is there a designated Store Manager/Supervisor?",
        guidelines: "Check org chart, role allocation.",
        evidence: "Organization chart, Responsibility matrix",
        maxPoints: 2,
        category: "Store Operations"
      },
      {
        id: "1.4",
        criteria: "Are roles & responsibilities defined for store staff?",
        guidelines: "Interview staff, check JD.",
        evidence: "Job descriptions",
        maxPoints: 2,
        category: "Store Operations"
      },
      {
        id: "1.6",
        criteria: "Are maintenance policies & procedures documented and accessible?",
        guidelines: "Check SOPs, maintenance manuals availability in maintenance office.",
        evidence: "SOPs, Maintenance manuals",
        maxPoints: 3,
        category: "Maintenance Operations"
      },
      {
        id: "1.7",
        criteria: "Is there a designated Maintenance Manager/Supervisor?",
        guidelines: "Verify organization chart & role allocation.",
        evidence: "Org. chart, Appointment letters",
        maxPoints: 2,
        category: "Maintenance Operations"
      },
      {
        id: "1.8",
        criteria: "Are roles & responsibilities defined for maintenance staff?",
        guidelines: "Check job descriptions, skill matrix.",
        evidence: "JD, Responsibility matrix",
        maxPoints: 2,
        category: "Maintenance Operations"
      },
      {
        id: "1.10",
        criteria: "Are HR policies & procedures documented and accessible to employees?",
        guidelines: "Verify availability of HR policy manual, employee handbook, online HR portal.",
        evidence: "HR policy manual, Employee handbook",
        maxPoints: 3,
        category: "HR Operations"
      },
      {
        id: "1.11",
        criteria: "Is there a designated HR Manager/Officer?",
        guidelines: "Check org chart & appointment letters.",
        evidence: "Org chart, Appointment record",
        maxPoints: 2,
        category: "HR Operations"
      },
      {
        id: "1.12",
        criteria: "Are roles & responsibilities defined for HR personnel?",
        guidelines: "Review JD, role matrix.",
        evidence: "Job descriptions, Role responsibility matrix",
        maxPoints: 2,
        category: "HR Operations"
      },
      {
        id: "1.14",
        criteria: "Are QC (IQC/IPQC/FQC) policies, SOPs & WIs documented and accessible to all staff?",
        guidelines: "Verify that updated SOPs are available at point of use; check revision number; confirm operators know where documents are kept.",
        evidence: "SOPs, WIs, QAP",
        maxPoints: 3,
        category: "QC Operations"
      },
      {
        id: "1.15",
        criteria: "Is QC Manager/Supervisor designated with authority for incoming, in-process & final QC?",
        guidelines: "Review org chart, delegation matrix; interview QC staff to confirm reporting hierarchy.",
        evidence: "Org chart, JD",
        maxPoints: 2,
        category: "QC Operations"
      },
      {
        id: "1.16",
        criteria: "Are roles & responsibilities clearly defined for IQC, IPQC & FQC inspectors?",
        guidelines: "Check responsibility matrix, Job Descriptions, and whether inspectors can explain their duties.",
        evidence: "Responsibility matrix",
        maxPoints: 3,
        category: "QC Operations"
      },
      {
        id: "1.18",
        criteria: "Are housekeeping & 5S policies documented and accessible to all staff?",
        guidelines: "Check if SOPs/policies are displayed on shopfloor and available to operators.",
        evidence: "SOPs, Policy documents",
        maxPoints: 2,
        category: "Housekeeping & 5S"
      },
      {
        id: "1.19",
        criteria: "Is there a designated supervisor/manager for housekeeping & 5S?",
        guidelines: "Verify responsibility assignment in organization chart.",
        evidence: "Org chart, JD",
        maxPoints: 2,
        category: "Housekeeping & 5S"
      },
      {
        id: "1.20",
        criteria: "Are staff roles & responsibilities clearly defined?",
        guidelines: "Interview workers, check delegation matrix.",
        evidence: "Responsibility matrix",
        maxPoints: 2,
        category: "Housekeeping & 5S"
      }
    ]
  },
  {
    id: 2,
    title: "Safety & Compliance",
    maxPoints: 40,
    items: [
      {
        id: "2.02",
        criteria: "Is there a procedure for reporting safety hazards/incidents?",
        guidelines: "Verify escalation process & NCR records.",
        evidence: "NCR Log, CAPA forms",
        maxPoints: 3,
        category: "General Safety"
      },
      {
        id: "2.03",
        criteria: "Are employees trained on safety protocols & material handling?",
        guidelines: "Check training records & PPE usage.",
        evidence: "Training attendance, Safety records",
        maxPoints: 3,
        category: "General Safety"
      },
      {
        id: "2.04",
        criteria: "Are signage, fire extinguishers, PPE & equipment checks in place?",
        guidelines: "Spot check store safety measures.",
        evidence: "Safety inspection records",
        maxPoints: 3,
        category: "General Safety"
      },
      {
        id: "2.05",
        criteria: "Are hazardous materials stored/handled as per MSDS?",
        guidelines: "Verify segregation, PPE usage.",
        evidence: "MSDS, PPE records",
        maxPoints: 3,
        category: "General Safety"
      },
      {
        id: "2.07",
        criteria: "Are safety inspections done for tools & maintenance areas?",
        guidelines: "Spot check inspection tags, audit records.",
        evidence: "Safety inspection reports",
        maxPoints: 3,
        category: "Maintenance Safety"
      },
      {
        id: "2.08",
        criteria: "Are Lockout/Tagout (LOTO) procedures followed?",
        guidelines: "Spot check ongoing maintenance jobs.",
        evidence: "LOTO checklist, Permit log",
        maxPoints: 3,
        category: "Maintenance Safety"
      },
      {
        id: "2.09",
        criteria: "Are environmental regulations considered in maintenance?",
        guidelines: "Verify waste oil disposal, effluent logs.",
        evidence: "Environmental compliance records",
        maxPoints: 2,
        category: "Maintenance Safety"
      },
      {
        id: "2.10",
        criteria: "Is PPE provided & used appropriately?",
        guidelines: "Spot check PPE use by technicians.",
        evidence: "PPE issue records, Training",
        maxPoints: 2,
        category: "Maintenance Safety"
      },
      {
        id: "2.12",
        criteria: "Are QC operations compliant with IS/IEC/BIS standards & customer-specific needs?",
        guidelines: "Verify compliance checklist vs standard clauses.",
        evidence: "Compliance matrix",
        maxPoints: 4,
        category: "QC Safety"
      },
      {
        id: "2.13",
        criteria: "Are BIS requirements (R-91017574) followed for all finished goods?",
        guidelines: "Check BIS mark on products & reports.",
        evidence: "BIS records",
        maxPoints: 3,
        category: "QC Safety"
      },
      {
        id: "2.14",
        criteria: "Are workplace safety measures (PPE, signage, equipment checks) followed?",
        guidelines: "Observe PPE use, safety signage, extinguishers.",
        evidence: "Safety reports",
        maxPoints: 2,
        category: "QC Safety"
      },
      {
        id: "2.15",
        criteria: "Are safety audits & inspections conducted regularly with closure of findings?",
        guidelines: "Review last safety audit & closure actions.",
        evidence: "Safety audit reports",
        maxPoints: 3,
        category: "QC Safety"
      },
      {
        id: "2.17",
        criteria: "Are fire exits & firefighting equipment accessible/valid?",
        guidelines: "Fire exit not blocked, extinguisher expiry valid.",
        evidence: "Fire safety log",
        maxPoints: 3,
        category: "Housekeeping Safety"
      },
      {
        id: "2.18",
        criteria: "Are hazardous materials stored safely & labeled?",
        guidelines: "Check MSDS availability, hazard labeling.",
        evidence: "MSDS, hazard labels",
        maxPoints: 3,
        category: "Housekeeping Safety"
      },
      {
        id: "2.19",
        criteria: "Is PPE provided & used properly?",
        guidelines: "Spot check workers, PPE issue records.",
        evidence: "PPE register",
        maxPoints: 3,
        category: "Housekeeping Safety"
      }
    ]
  },
  {
    id: 3,
    title: "Inventory & Material Management",
    maxPoints: 30,
    items: [
      {
        id: "3.01",
        criteria: "Is there an inventory management system to track stock levels, orders, deliveries?",
        guidelines: "Verify ERP/WMS system, barcode/QR tracking.",
        evidence: "ERP screenshots, Stock records",
        maxPoints: 3,
        category: "Inventory Control"
      },
      {
        id: "3.02",
        criteria: "Are regular stock counts done and variances resolved?",
        guidelines: "Check cycle counts, reconciliation reports.",
        evidence: "Stock audit reports",
        maxPoints: 3,
        category: "Inventory Control"
      },
      {
        id: "3.03",
        criteria: "Is obsolete/slow-moving inventory identified & actioned?",
        guidelines: "Verify scrap/aging reports.",
        evidence: "Scrap register, Aging analysis",
        maxPoints: 2,
        category: "Inventory Control"
      },
      {
        id: "3.04",
        criteria: "Are stock levels monitored to avoid shortages?",
        guidelines: "Review safety stock/reorder level settings.",
        evidence: "Inventory reports",
        maxPoints: 3,
        category: "Inventory Control"
      },
      {
        id: "3.05",
        criteria: "Is there a system for tracking returns or damaged goods?",
        guidelines: "Verify return process & quarantine area.",
        evidence: "Return log, NCR records",
        maxPoints: 2,
        category: "Inventory Control"
      },
      {
        id: "3.07",
        criteria: "Is there a documented procedure for receiving goods?",
        guidelines: "Verify GRN process & checklists.",
        evidence: "GRN records, SOP",
        maxPoints: 3,
        category: "Receiving and Storage"
      },
      {
        id: "3.08",
        criteria: "Are items checked for quality, quantity, and compliance with PO/specs?",
        guidelines: "Spot check against PO & QC records.",
        evidence: "Incoming inspection reports",
        maxPoints: 3,
        category: "Receiving and Storage"
      },
      {
        id: "3.09",
        criteria: "Is stock stored in an organized & labeled manner?",
        guidelines: "Visual check for labels, segregation.",
        evidence: "Store layout, Bin cards",
        maxPoints: 2,
        category: "Receiving and Storage"
      },
      {
        id: "3.10",
        criteria: "Are conditions (temperature, humidity, ventilation) maintained?",
        guidelines: "Verify monitoring logs, instruments.",
        evidence: "Temp/humidity records",
        maxPoints: 3,
        category: "Receiving and Storage"
      },
      {
        id: "3.12",
        criteria: "Is there a process for issuing stock to production/dispatch?",
        guidelines: "Verify issue slip process & FIFO/FEFO usage.",
        evidence: "Issue slips, FIFO log",
        maxPoints: 2,
        category: "Issuing and Distribution"
      },
      {
        id: "3.13",
        criteria: "Are issuance records accurate (qty, lot, recipient)?",
        guidelines: "Spot check random transactions.",
        evidence: "Issue register, ERP logs",
        maxPoints: 2,
        category: "Issuing and Distribution"
      },
      {
        id: "3.14",
        criteria: "Is inter-location stock transfer tracked properly?",
        guidelines: "Verify transfer notes & acknowledgements.",
        evidence: "Transfer records",
        maxPoints: 2,
        category: "Issuing and Distribution"
      }
    ]
  },
  {
    id: 4,
    title: "Equipment Maintenance",
    maxPoints: 25,
    items: [
      {
        id: "4.01",
        criteria: "Are preventive maintenance (PM) schedules established & followed?",
        guidelines: "Check PM calendar vs. actual execution.",
        evidence: "PM schedule, PM checklists",
        maxPoints: 3,
        category: "Preventive Maintenance"
      },
      {
        id: "4.02",
        criteria: "Are maintenance records maintained accurately?",
        guidelines: "Review work orders, inspection checklists, history cards.",
        evidence: "Work orders, Equipment logbook",
        maxPoints: 3,
        category: "Preventive Maintenance"
      },
      {
        id: "4.03",
        criteria: "Is there a system for prioritizing maintenance tasks?",
        guidelines: "Verify breakdown priority coding (critical, major, minor).",
        evidence: "CMMS/Manual priority records",
        maxPoints: 2,
        category: "Preventive Maintenance"
      },
      {
        id: "4.04",
        criteria: "Are spare parts & consumables managed efficiently?",
        guidelines: "Spot check spares store, min-max stock levels.",
        evidence: "Spare part register, ERP",
        maxPoints: 2,
        category: "Preventive Maintenance"
      },
      {
        id: "4.06",
        criteria: "Are emergency shutdown procedures established & communicated?",
        guidelines: "Verify display of SOPs, staff awareness.",
        evidence: "Emergency SOP, Drill records",
        maxPoints: 3,
        category: "Emergency Maintenance"
      },
      {
        id: "4.07",
        criteria: "Is emergency repair/downtime tracked & documented?",
        guidelines: "Check downtime logs & repair tickets.",
        evidence: "Breakdown records, Downtime log",
        maxPoints: 2,
        category: "Emergency Maintenance"
      },
      {
        id: "4.08",
        criteria: "Are contingency plans/backups in place for critical failures?",
        guidelines: "Verify redundancy plans, standby equipment.",
        evidence: "Contingency plan docs",
        maxPoints: 2,
        category: "Emergency Maintenance"
      },
      {
        id: "4.10",
        criteria: "Are equipment changes documented properly?",
        guidelines: "Verify updated engineering drawings, approvals.",
        evidence: "Change request forms, Drawing records",
        maxPoints: 2,
        category: "Equipment Upgrades"
      },
      {
        id: "4.11",
        criteria: "Is testing & validation done before implementation?",
        guidelines: "Review FAT/SAT/validation reports.",
        evidence: "Test records, Validation reports",
        maxPoints: 2,
        category: "Equipment Upgrades"
      },
      {
        id: "4.12",
        criteria: "Are staff trained on new configurations/features?",
        guidelines: "Verify training logs after upgrades.",
        evidence: "Training attendance, Circulars",
        maxPoints: 2,
        category: "Equipment Upgrades"
      },
      {
        id: "4.13",
        criteria: "Is there a procedure for reporting equipment breakdowns & maintenance requests?",
        guidelines: "Verify breakdown log, escalation process.",
        evidence: "Breakdown register, NCR",
        maxPoints: 2,
        category: "Equipment Upgrades"
      }
    ]
  },
  {
    id: 5,
    title: "Quality Control & Inspection",
    maxPoints: 45,
    items: [
      {
        id: "5.1",
        criteria: "Are incoming material inspections conducted per sampling plan (IS 2500/ISO 2859)?",
        guidelines: "Check sampling records, verify AQL tables in use, cross-check lot approval vs rejection.",
        evidence: "Sampling records",
        maxPoints: 3,
        category: "Process Monitoring"
      },
      {
        id: "5.2",
        criteria: "Are critical process parameters (stringing temp, lamination cycle, curing, etc.) monitored?",
        guidelines: "Verify logs at machines; check if operators record values shift-wise.",
        evidence: "Process monitoring logs",
        maxPoints: 3,
        category: "Process Monitoring"
      },
      {
        id: "5.3",
        criteria: "Are shopfloor environmental conditions (Temp, RH, dust) controlled & recorded?",
        guidelines: "Check hygrometer/thermometer calibration; see if readings are within limits.",
        evidence: "Monitoring logs",
        maxPoints: 2,
        category: "Process Monitoring"
      },
      {
        id: "5.4",
        criteria: "Are in-process checkpoints aligned with QAP (EL after lamination, peel tests, etc.)?",
        guidelines: "Confirm EL images are taken, peel tests performed, and results filed.",
        evidence: "Process check records",
        maxPoints: 3,
        category: "Process Monitoring"
      },
      {
        id: "5.5",
        criteria: "Are real-time alerts & corrective actions implemented for deviations?",
        guidelines: "Ask operators about alarm handling; review deviation reports and closure actions.",
        evidence: "Deviation reports, CAPA",
        maxPoints: 3,
        category: "Process Monitoring"
      },
      {
        id: "5.7",
        criteria: "Are incoming materials inspected visually & dimensionally (cells, glass, ribbon, EVA, etc.)?",
        guidelines: "Check inspection sheets; verify storage segregation of rejected lots.",
        evidence: "IQC records",
        maxPoints: 4,
        category: "Product Inspection"
      },
      {
        id: "5.8",
        criteria: "Are electrical parameters verified (cell tester, IV curves, EL)?",
        guidelines: "Ensure test reports match COC; check calibration of tester.",
        evidence: "Test reports",
        maxPoints: 4,
        category: "Product Inspection"
      },
      {
        id: "5.9",
        criteria: "Are in-process inspections performed at critical stages (stringing, lamination, framing)?",
        guidelines: "Verify in-process checklists; confirm operator sign-off per shift.",
        evidence: "IPQC records",
        maxPoints: 4,
        category: "Product Inspection"
      },
      {
        id: "5.10",
        criteria: "Are Final EL tests performed to detect cracks, dark lines, micro-defects?",
        guidelines: "Verify saved EL images; compare with acceptance criteria.",
        evidence: "EL test images/reports",
        maxPoints: 4,
        category: "Product Inspection"
      },
      {
        id: "5.11",
        criteria: "Are Flasher test results verified against rated power ± tolerance?",
        guidelines: "Review flasher results for last 5 lots; check pass/fail limits.",
        evidence: "Flasher data",
        maxPoints: 4,
        category: "Product Inspection"
      },
      {
        id: "5.12",
        criteria: "Are Safety tests performed (IR, Hi-Pot, Ground continuity, Wet leakage)?",
        guidelines: "Observe ongoing tests; verify records and test setup compliance.",
        evidence: "Test records",
        maxPoints: 4,
        category: "Product Inspection"
      },
      {
        id: "5.13",
        criteria: "Is Packaging (carton, pallet, barcode, labels, RFID) verified before dispatch?",
        guidelines: "Inspect final FG storage; verify labeling and packaging as per SOP.",
        evidence: "Packing checklists",
        maxPoints: 3,
        category: "Product Inspection"
      },
      {
        id: "5.15",
        criteria: "Is measuring & testing equipment (Cell tester, Flasher, EL, IR, Hi-Pot) calibrated & validated?",
        guidelines: "Verify calibration stickers, certificates, traceability to NABL/standard labs.",
        evidence: "Calibration certificates",
        maxPoints: 4,
        category: "Equipment Calibration"
      },
      {
        id: "5.16",
        criteria: "Are monitoring records accurate, complete & reviewed by QC supervisor?",
        guidelines: "Cross-check signed logs, verify random entries against actual machine conditions.",
        evidence: "Signed logs",
        maxPoints: 3,
        category: "Equipment Calibration"
      },
      {
        id: "5.17",
        criteria: "Is product traceability maintained from raw material → process → FG storage → dispatch?",
        guidelines: "Cross-check ERP/barcode against sample serial numbers.",
        evidence: "ERP/Barcode records",
        maxPoints: 3,
        category: "Equipment Calibration"
      }
    ]
  },
  {
    id: 6,
    title: "Human Resources",
    maxPoints: 30,
    items: [
      {
        id: "6.1",
        criteria: "Are job descriptions created & updated?",
        guidelines: "Verify JD repository & last review date.",
        evidence: "Updated job descriptions",
        maxPoints: 3,
        category: "Recruitment & Selection"
      },
      {
        id: "6.2",
        criteria: "Is there a defined hiring process (advertising, screening, interviews)?",
        guidelines: "Check recruitment SOP & sample hiring case.",
        evidence: "Recruitment SOP, Interview records",
        maxPoints: 3,
        category: "Recruitment & Selection"
      },
      {
        id: "6.3",
        criteria: "Are background & reference checks conducted?",
        guidelines: "Spot check recent hires for compliance.",
        evidence: "Background verification records",
        maxPoints: 2,
        category: "Recruitment & Selection"
      },
      {
        id: "6.4",
        criteria: "Is recruitment tracked with defined metrics?",
        guidelines: "Verify recruitment dashboard (time-to-hire, source).",
        evidence: "Recruitment reports",
        maxPoints: 2,
        category: "Recruitment & Selection"
      },
      {
        id: "6.6",
        criteria: "Is there a grievance handling procedure?",
        guidelines: "Verify grievance log, escalation process.",
        evidence: "Grievance redressal records",
        maxPoints: 3,
        category: "Employee Relations"
      },
      {
        id: "6.7",
        criteria: "Are grievances handled promptly & fairly?",
        guidelines: "Verify closure timelines in grievance log.",
        evidence: "Grievance handling register",
        maxPoints: 3,
        category: "Employee Relations"
      },
      {
        id: "6.8",
        criteria: "Are exit interviews conducted & analyzed?",
        guidelines: "Verify exit interview forms, trend analysis.",
        evidence: "Exit interview reports",
        maxPoints: 2,
        category: "Employee Relations"
      },
      {
        id: "6.10",
        criteria: "Are performance evaluations conducted regularly?",
        guidelines: "Check appraisal calendar & sample evaluations.",
        evidence: "Performance review records",
        maxPoints: 3,
        category: "Performance Management"
      },
      {
        id: "6.11",
        criteria: "Is training need identification done from reviews?",
        guidelines: "Verify TNI records from appraisal data.",
        evidence: "TNI reports",
        maxPoints: 2,
        category: "Performance Management"
      },
      {
        id: "6.12",
        criteria: "Are performance improvement plans implemented?",
        guidelines: "Check PIP records for low performers.",
        evidence: "PIP forms, Monitoring reports",
        maxPoints: 2,
        category: "Performance Management"
      },
      {
        id: "6.14",
        criteria: "Is there a process for salary reviews, promotions & bonuses?",
        guidelines: "Verify appraisal cycle & reward approval records.",
        evidence: "Appraisal letters, Bonus approval docs",
        maxPoints: 3,
        category: "Compensation & Benefits"
      },
      {
        id: "6.15",
        criteria: "Are employee benefits administered effectively?",
        guidelines: "Check health insurance, PF, retirement plan.",
        evidence: "Benefit policy records",
        maxPoints: 2,
        category: "Compensation & Benefits"
      }
    ]
  },
  {
    id: 7,
    title: "Training & Development",
    maxPoints: 25,
    items: [
      {
        id: "7.1",
        criteria: "Are personnel trained on maintenance, safety & troubleshooting?",
        guidelines: "Spot check training certificates, toolbox talk records.",
        evidence: "Training records",
        maxPoints: 3,
        category: "General Training"
      },
      {
        id: "7.2",
        criteria: "Are HR staff trained on labor laws & company culture?",
        guidelines: "Check training records, induction sessions.",
        evidence: "Training certificates, Attendance records",
        maxPoints: 2,
        category: "General Training"
      },
      {
        id: "7.3",
        criteria: "Are QC personnel trained on inspection techniques, equipment operation, acceptance criteria?",
        guidelines: "Review training records; conduct spot interviews of operators (e.g., EL test acceptance criteria).",
        evidence: "Training records",
        maxPoints: 4,
        category: "General Training"
      },
      {
        id: "7.4",
        criteria: "Are staff trained on cleaning methods, 5S practices & PPE usage?",
        guidelines: "Check training records, operator awareness.",
        evidence: "Training matrix, attendance sheet",
        maxPoints: 3,
        category: "General Training"
      },
      {
        id: "7.6",
        criteria: "Is there a training calendar & schedule?",
        guidelines: "Verify annual training plan vs. execution.",
        evidence: "Training calendar",
        maxPoints: 3,
        category: "Training Programs"
      },
      {
        id: "7.7",
        criteria: "Are training programs evaluated for effectiveness?",
        guidelines: "Review post-training feedback & skill assessment.",
        evidence: "Training evaluation reports",
        maxPoints: 2,
        category: "Training Programs"
      },
      {
        id: "7.8",
        criteria: "Is training record tracking system in place?",
        guidelines: "Check LMS/HRMS or manual records.",
        evidence: "Training attendance records",
        maxPoints: 2,
        category: "Training Programs"
      },
      {
        id: "7.10",
        criteria: "Is there a system for assessing skills gaps?",
        guidelines: "Verify skill matrix, gap analysis.",
        evidence: "Competency matrix",
        maxPoints: 2,
        category: "Skills Assessment"
      },
      {
        id: "7.11",
        criteria: "Are refresher trainings & skill-up programs conducted periodically?",
        guidelines: "Look for training calendar, last conducted session, and attendance.",
        evidence: "Training calendar, attendance",
        maxPoints: 2,
        category: "Skills Assessment"
      },
      {
        id: "7.12",
        criteria: "Are training records maintained for maintenance staff?",
        guidelines: "Spot check training attendance & qualification records.",
        evidence: "Training files",
        maxPoints: 2,
        category: "Skills Assessment"
      }
    ]
  },
  {
    id: 8,
    title: "Housekeeping & Workplace Organization",
    maxPoints: 30,
    items: [
      {
        id: "8.1",
        criteria: "Are unnecessary tools, materials & equipment removed?",
        guidelines: "Visual inspection, check red tag area.",
        evidence: "Red tag log",
        maxPoints: 3,
        category: "Workplace Cleanliness & Sorting (5S – Seiri)"
      },
      {
        id: "8.2",
        criteria: "Are obsolete/damaged items disposed appropriately?",
        guidelines: "Verify scrap yard & disposal process.",
        evidence: "Scrap records",
        maxPoints: 2,
        category: "Workplace Cleanliness & Sorting (5S – Seiri)"
      },
      {
        id: "8.3",
        criteria: "Are floors, work surfaces & equipment cleaned regularly?",
        guidelines: "Spot check cleaning activity.",
        evidence: "Cleaning checklist",
        maxPoints: 3,
        category: "Workplace Cleanliness & Sorting (5S – Seiri)"
      },
      {
        id: "8.4",
        criteria: "Are waste bins emptied regularly & disposed as per norms?",
        guidelines: "Check bins, segregation of waste.",
        evidence: "Waste disposal records",
        maxPoints: 2,
        category: "Workplace Cleanliness & Sorting (5S – Seiri)"
      },
      {
        id: "8.5",
        criteria: "Are spillages/leaks promptly cleaned & reported?",
        guidelines: "Spot check, review incident report.",
        evidence: "Spill log",
        maxPoints: 2,
        category: "Workplace Cleanliness & Sorting (5S – Seiri)"
      },
      {
        id: "8.7",
        criteria: "Are all tools & materials stored in designated/labeled locations?",
        guidelines: "Inspect racks, shadow boards, bins.",
        evidence: "Storage layout, labeling records",
        maxPoints: 3,
        category: "Arrangement & Visual Management (5S – Seiton/Seiso)"
      },
      {
        id: "8.8",
        criteria: "Are frequently used items easily accessible?",
        guidelines: "Observe workstation layout.",
        evidence: "Layout plan",
        maxPoints: 2,
        category: "Arrangement & Visual Management (5S – Seiton/Seiso)"
      },
      {
        id: "8.9",
        criteria: "Are work areas clutter-free?",
        guidelines: "Walkthrough observation.",
        evidence: "Audit checklist",
        maxPoints: 2,
        category: "Arrangement & Visual Management (5S – Seiton/Seiso)"
      },
      {
        id: "8.10",
        criteria: "Is visual management in place (signage, shadow boards, color codes)?",
        guidelines: "Spot check labeling, signage, SOP displays.",
        evidence: "Photos, charts",
        maxPoints: 3,
        category: "Arrangement & Visual Management (5S – Seiton/Seiso)"
      },
      {
        id: "8.11",
        criteria: "Are machines & equipment maintained clean & functional?",
        guidelines: "Check machine cleanliness & operation.",
        evidence: "Maintenance records",
        maxPoints: 3,
        category: "Arrangement & Visual Management (5S – Seiton/Seiso)"
      },
      {
        id: "8.13",
        criteria: "Are restrooms cleaned & stocked with supplies?",
        guidelines: "Soap, tissue, sanitizer availability.",
        evidence: "Cleaning log",
        maxPoints: 2,
        category: "Facility Maintenance"
      },
      {
        id: "8.14",
        criteria: "Are lighting, windows & ventilation maintained?",
        guidelines: "Spot check condition of facility.",
        evidence: "Maintenance schedule",
        maxPoints: 2,
        category: "Facility Maintenance"
      },
      {
        id: "8.15",
        criteria: "Are pest control measures in place?",
        guidelines: "Check pest control vendor log, visual inspection.",
        evidence: "Pest control records",
        maxPoints: 2,
        category: "Facility Maintenance"
      }
    ]
  },
  {
    id: 9,
    title: "Record Keeping & Documentation",
    maxPoints: 25,
    items: [
      {
        id: "9.1",
        criteria: "Are relevant docs (invoices, GRN, delivery notes, packing lists) organized?",
        guidelines: "Spot check filing & ERP storage.",
        evidence: "Document files",
        maxPoints: 3,
        category: "Document Management"
      },
      {
        id: "9.2",
        criteria: "Are electronic records securely stored & backed up?",
        guidelines: "Verify IT backup policy.",
        evidence: "Backup logs",
        maxPoints: 2,
        category: "Document Management"
      },
      {
        id: "9.3",
        criteria: "Are records retained as per regulatory/legal requirements?",
        guidelines: "Cross-check retention policy.",
        evidence: "Retention matrix",
        maxPoints: 2,
        category: "Document Management"
      },
      {
        id: "9.4",
        criteria: "Is there a process for archiving/disposing outdated records?",
        guidelines: "Verify archiving/disposal procedure.",
        evidence: "Archive/disposal records",
        maxPoints: 2,
        category: "Document Management"
      },
      {
        id: "9.6",
        criteria: "Are all QC checksheets (IQC, IPQC, FQC) properly filled, signed & maintained?",
        guidelines: "Verify random checksheets for completeness.",
        evidence: "Completed records",
        maxPoints: 4,
        category: "QC Documentation"
      },
      {
        id: "9.7",
        criteria: "Is traceability ensured through lot number, ERP & barcode system?",
        guidelines: "Trace back a finished module to raw material.",
        evidence: "Traceability records",
        maxPoints: 3,
        category: "QC Documentation"
      },
      {
        id: "9.8",
        criteria: "Are records (incoming → process → final) securely stored & backed up?",
        guidelines: "Verify digital backups, access control.",
        evidence: "Backup procedures",
        maxPoints: 3,
        category: "QC Documentation"
      },
      {
        id: "9.9",
        criteria: "Is record retention as per BIS/IEC/Customer requirements?",
        guidelines: "Check retention policy & archived docs.",
        evidence: "Retention policy",
        maxPoints: 3,
        category: "QC Documentation"
      },
      {
        id: "9.10",
        criteria: "Are obsolete/outdated records archived or disposed systematically?",
        guidelines: "Inspect record disposal logs.",
        evidence: "Archival log",
        maxPoints: 2,
        category: "QC Documentation"
      },
      {
        id: "9.11",
        criteria: "Is complaint documentation system in place?",
        guidelines: "Check complaint forms, investigation reports.",
        evidence: "Complaint logs, Investigation records",
        maxPoints: 1,
        category: "QC Documentation"
      }
    ]
  }
];

export const auditClassifications = [
  { range: "85-100%", points: "289-340", classification: "Excellent" },
  { range: "70-84%", points: "238-288", classification: "Good" },
  { range: "55-69%", points: "187-237", classification: "Satisfactory" },
  { range: "40-54%", points: "136-186", classification: "Needs Improvement" },
  { range: "Below 40%", points: "<136", classification: "Unsatisfactory" }
];

export const auditHeader = {
  documentNo: "GSPL/ADT/HR/008",
  issueDate: "01-12-2024",
  revNo: "0",
  company: "Gautam Solar pvt. Ltd"
};