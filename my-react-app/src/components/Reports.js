import React from 'react';
import { manufacturingAuditSections, recordKeepingAuditSections } from '../data/auditData';

const Reports = ({ auditData, auditInfo }) => {
  // Get score classification based on percentage
  const getScoreClassification = (percentage) => {
    if (percentage >= 90) return { label: 'Excellent', class: 'excellent' };
    if (percentage >= 80) return { label: 'Good', class: 'good' };
    if (percentage >= 70) return { label: 'Satisfactory', class: 'satisfactory' };
    if (percentage >= 60) return { label: 'Needs Improvement', class: 'needs-improvement' };
    return { label: 'Unsatisfactory', class: 'unsatisfactory' };
  };

  // Calculate total score for both audit types
  const calculateTotalScore = () => {
    const manufacturingData = auditData.manufacturingAuditData || {};
    const recordKeepingData = auditData.recordKeepingAuditData || {};

    // Calculate manufacturing audit score
    let manufacturingScore = 0;
    let manufacturingMaxPossible = 0;
    manufacturingAuditSections.forEach(section => {
      section.items.forEach(item => {
        const key = `${section.id}_${item.id}`;
        const itemData = manufacturingData[key];
        if (itemData && itemData.score !== undefined) {
          manufacturingScore += itemData.score;
        }
        manufacturingMaxPossible += 5; // Max score per item is 5
      });
    });

    // Calculate record keeping audit score
    let recordKeepingScore = 0;
    let recordKeepingMaxPossible = 0;
    recordKeepingAuditSections.forEach(section => {
      section.items.forEach(item => {
        const key = `${section.id}_${item.id}`;
        const itemData = recordKeepingData[key];
        if (itemData && itemData.score !== undefined) {
          recordKeepingScore += itemData.score;
        }
        recordKeepingMaxPossible += 5; // Max score per item is 5
      });
    });

    const totalScore = manufacturingScore + recordKeepingScore;
    const totalMaxPossible = manufacturingMaxPossible + recordKeepingMaxPossible;
    const overallPercentage = totalMaxPossible > 0 ? (totalScore / totalMaxPossible) * 100 : 0;

    return {
      score: totalScore,
      maxPoints: totalMaxPossible,
      percentage: overallPercentage,
      manufacturing: {
        totalScore: manufacturingScore,
        maxPossible: manufacturingMaxPossible,
        percentage: manufacturingMaxPossible > 0 ? (manufacturingScore / manufacturingMaxPossible) * 100 : 0
      },
      recordKeeping: {
        totalScore: recordKeepingScore,
        maxPossible: recordKeepingMaxPossible,
        percentage: recordKeepingMaxPossible > 0 ? (recordKeepingScore / recordKeepingMaxPossible) * 100 : 0
      }
    };
  };

  // Get all NCRs from both audit types
  const getAllNCRs = () => {
    const allNCRs = [];
    const manufacturingData = auditData.manufacturingAuditData || {};
    const recordKeepingData = auditData.recordKeepingAuditData || {};

    // Manufacturing NCRs
    manufacturingAuditSections.forEach(section => {
      section.items.forEach(item => {
        const key = `${section.id}_${item.id}`;
        const itemData = manufacturingData[key];
        if (itemData?.ncr) {
          allNCRs.push({
            ...itemData.ncr,
            auditType: 'manufacturing',
            sectionId: section.id,
            itemId: item.id,
            sectionTitle: section.title,
            itemTitle: item.criteria
          });
        }
      });
    });

    // Record Keeping NCRs
    recordKeepingAuditSections.forEach(section => {
      section.items.forEach(item => {
        const key = `${section.id}_${item.id}`;
        const itemData = recordKeepingData[key];
        if (itemData?.ncr) {
          allNCRs.push({
            ...itemData.ncr,
            auditType: 'recordkeeping',
            sectionId: section.id,
            itemId: item.id,
            sectionTitle: section.title,
            itemTitle: item.criteria
          });
        }
      });
    });

    return allNCRs;
  };

  // WhatsApp Share function
  const shareOnWhatsApp = () => {
    const totalScore = calculateTotalScore();
    const classification = getScoreClassification(totalScore.percentage);
    const allNCRs = getAllNCRs();
    
    let message = `🏭 *GAUTAM SOLAR AUDIT REPORT* 🏭\n\n`;
    message += `📅 *Date:* ${new Date().toLocaleDateString()}\n`;
    message += `🏢 *Company:* Gautam Solar pvt. Ltd\n`;
    if (auditInfo.plantLocation) message += `📍 *Location:* ${auditInfo.plantLocation}\n`;
    if (auditInfo.leadAuditor) message += `👤 *Lead Auditor:* ${auditInfo.leadAuditor}\n\n`;
    
    message += `📊 *AUDIT SUMMARY*\n`;
    message += `━━━━━━━━━━━━━━━━━\n`;
    message += `🎯 *Overall Score:* ${totalScore.score}/${totalScore.maxPoints} (${totalScore.percentage.toFixed(1)}%)\n`;
    message += `⭐ *Classification:* ${classification.label}\n\n`;
    
    message += `📈 *AUDIT TYPE BREAKDOWN*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🏭 *Manufacturing:* ${totalScore.manufacturing.totalScore}/${totalScore.manufacturing.maxPossible} (${totalScore.manufacturing.percentage.toFixed(1)}%)\n`;
    message += `📋 *Record Keeping:* ${totalScore.recordKeeping.totalScore}/${totalScore.recordKeeping.maxPossible} (${totalScore.recordKeeping.percentage.toFixed(1)}%)\n\n`;
    
    if (allNCRs.length > 0) {
      message += `⚠️ *NON-CONFORMANCES (${allNCRs.length})*\n`;
      message += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
      allNCRs.slice(0, 3).forEach((ncr, index) => {
        message += `${index + 1}. ${ncr.auditType === 'manufacturing' ? '🏭' : '📋'} ${ncr.sectionTitle}\n`;
        message += `   📝 ${ncr.description ? ncr.description.substring(0, 50) + '...' : 'No description'}\n`;
      });
      if (allNCRs.length > 3) {
        message += `   ... और ${allNCRs.length - 3} NCRs\n`;
      }
      message += `\n`;
    } else {
      message += `✅ *NO NON-CONFORMANCES FOUND*\n\n`;
    }
    
    message += `📱 *Generated by Solar Audit App*\n`;
    message += `🕐 ${new Date().toLocaleString()}\n\n`;
    message += `डिटेल्ड रिपोर्ट के लिए PDF डाउनलोड करें।`;
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
  };

  // WhatsApp Share to Specific Number
  const shareToSpecificWhatsApp = (phoneNumber) => {
    const totalScore = calculateTotalScore();
    const classification = getScoreClassification(totalScore.percentage);
    
    let message = `🏭 *SOLAR AUDIT SUMMARY* 🏭\n\n`;
    message += `📊 Score: ${totalScore.score}/${totalScore.maxPoints} (${totalScore.percentage.toFixed(1)}%)\n`;
    message += `⭐ Status: ${classification.label}\n`;
    message += `📅 Date: ${new Date().toLocaleDateString()}\n`;
    message += `🏢 Plant: ${auditInfo.plantLocation || 'Gautam Solar'}\n\n`;
    message += `कम्प्लीट रिपोर्ट app में देखें।`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
  };

  // Export to CSV function
  const exportToCSV = () => {
    const totalScore = calculateTotalScore();
    const allNCRs = getAllNCRs();
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Solar Manufacturing Audit Report\n";
    csvContent += `Date,${new Date().toLocaleDateString()}\n`;
    csvContent += `Company,Gautam Solar pvt. Ltd\n\n`;
    
    csvContent += "Audit Summary\n";
    csvContent += "Audit Type,Score,Max Points,Percentage\n";
    csvContent += `Manufacturing Operations,${totalScore.manufacturing.totalScore},${totalScore.manufacturing.maxPossible},${totalScore.manufacturing.percentage.toFixed(1)}%\n`;
    csvContent += `Record Keeping,${totalScore.recordKeeping.totalScore},${totalScore.recordKeeping.maxPossible},${totalScore.recordKeeping.percentage.toFixed(1)}%\n`;
    csvContent += `Total,${totalScore.score},${totalScore.maxPoints},${totalScore.percentage.toFixed(1)}%\n\n`;
    
    if (allNCRs.length > 0) {
      csvContent += "Non-Conformance Reports\n";
      csvContent += "NCR#,Audit Type,Section,Item,Category,Description,Root Cause,Corrective Action,Responsible Person,Target Date\n";
      allNCRs.forEach((ncr, index) => {
        csvContent += `${index + 1},${ncr.auditType},${ncr.sectionTitle},${ncr.itemTitle},${ncr.category || 'N/A'},${ncr.description || 'N/A'},${ncr.rootCause || 'N/A'},${ncr.correctiveAction || 'N/A'},${ncr.responsiblePerson || 'N/A'},${ncr.targetDate || 'N/A'}\n`;
      });
    }
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `audit_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate PDF report
  const generatePDFReport = () => {
    const reportWindow = window.open('', '_blank');
    const reportContent = generateReportHTML();
    
    reportWindow.document.write(reportContent);
    reportWindow.document.close();
    reportWindow.print();
  };

  const generateReportHTML = () => {
    const totalScore = calculateTotalScore();
    const classification = getScoreClassification(totalScore.percentage);
    const allNCRs = getAllNCRs();
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Solar Manufacturing Audit Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .info-table th, .info-table td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            .score-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .score-table th, .score-table td { border: 1px solid #ccc; padding: 8px; text-align: center; }
            .classification { background-color: #f0f9ff; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .ncr-section { margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Gautam Solar pvt. Ltd</h1>
            <h2>SOLAR MANUFACTURING AUDIT REPORT</h2>
            <p>Document No: GSPL/ADT/MFG/001 | Date: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <table class="info-table">
            <tr><th>Company Name</th><td>Gautam Solar pvt. Ltd</td></tr>
            <tr><th>Plant/Location</th><td>${auditInfo.plantLocation || 'N/A'}</td></tr>
            <tr><th>Audit Date</th><td>${auditInfo.auditDate || 'N/A'}</td></tr>
            <tr><th>Lead Auditor</th><td>${auditInfo.leadAuditor || 'N/A'}</td></tr>
            <tr><th>Audit Team</th><td>${auditInfo.auditTeam || 'N/A'}</td></tr>
            <tr><th>Department(s) Audited</th><td>${auditInfo.departmentAudited || 'N/A'}</td></tr>
          </table>
          
          <h3>AUDIT SUMMARY</h3>
          <table class="score-table">
            <tr><th>Audit Type</th><th>Score</th><th>Max Points</th><th>Percentage</th></tr>
            <tr><td>Manufacturing Operations</td><td>${totalScore.manufacturing.totalScore}</td><td>${totalScore.manufacturing.maxPossible}</td><td>${totalScore.manufacturing.percentage.toFixed(1)}%</td></tr>
            <tr><td>Record Keeping</td><td>${totalScore.recordKeeping.totalScore}</td><td>${totalScore.recordKeeping.maxPossible}</td><td>${totalScore.recordKeeping.percentage.toFixed(1)}%</td></tr>
            <tr style="font-weight: bold;"><td>TOTAL</td><td>${totalScore.score}</td><td>${totalScore.maxPoints}</td><td>${totalScore.percentage.toFixed(1)}%</td></tr>
          </table>
          
          <div class="classification">
            <h3>AUDIT CLASSIFICATION: ${classification.label}</h3>
            <p>Overall Score: ${totalScore.score}/${totalScore.maxPoints} (${totalScore.percentage.toFixed(1)}%)</p>
          </div>
          
          ${allNCRs.length > 0 ? `
            <div class="ncr-section">
              <h3>NON-CONFORMANCE REPORTS (${allNCRs.length})</h3>
              ${allNCRs.map((ncr, index) => `
                <div style="border: 1px solid #ccc; margin: 10px 0; padding: 10px;">
                  <h4>NCR #${index + 1} - ${ncr.auditType}</h4>
                  <p><strong>Section:</strong> ${ncr.sectionTitle}</p>
                  <p><strong>Item:</strong> ${ncr.itemTitle}</p>
                  <p><strong>Category:</strong> ${ncr.category || 'N/A'}</p>
                  <p><strong>Description:</strong> ${ncr.description || 'N/A'}</p>
                  <p><strong>Root Cause:</strong> ${ncr.rootCause || 'N/A'}</p>
                  <p><strong>Corrective Action:</strong> ${ncr.correctiveAction || 'N/A'}</p>
                  <p><strong>Responsible Person:</strong> ${ncr.responsiblePerson || 'N/A'}</p>
                  <p><strong>Target Date:</strong> ${ncr.targetDate || 'N/A'}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </body>
      </html>
    `;
  };

  const totalScore = calculateTotalScore();
  const classification = getScoreClassification(totalScore.percentage);
  const allNCRs = getAllNCRs();

  return (
    <div className="reports">
      <div className="reports-header">
        <h2>📊 Audit Reports & Analysis</h2>
        <div className="report-actions">
          <button className="btn-whatsapp" onClick={shareOnWhatsApp}>
            📱 Share on WhatsApp
          </button>
          <button className="btn-primary" onClick={generatePDFReport}>
            📄 Generate PDF Report
          </button>
          <button className="btn-secondary" onClick={exportToCSV}>
            📊 Export to CSV
          </button>
        </div>
      </div>

      <div className="reports-grid">
        {/* Overall Score Card */}
        <div className="report-card score-card">
          <h3>Overall Audit Score</h3>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-percentage">{totalScore.percentage.toFixed(1)}%</span>
            </div>
            <div className="score-details">
              <p>Score: {totalScore.score}/{totalScore.maxPoints}</p>
              <p className={`classification ${classification.class}`}>
                {classification.label}
              </p>
            </div>
          </div>
        </div>

        {/* Manufacturing Audit */}
        <div className="report-card sections-card">
          <h3>Manufacturing Operations</h3>
          <div className="audit-type-score">
            <div className="score-bar">
              <div 
                className="score-fill" 
                style={{width: `${totalScore.manufacturing.percentage}%`}}
              ></div>
              <span className="score-text">{totalScore.manufacturing.percentage.toFixed(1)}%</span>
            </div>
            <p>Score: {totalScore.manufacturing.totalScore}/{totalScore.manufacturing.maxPossible}</p>
            <small>{Object.keys(auditData.manufacturingAuditData || {}).length} items completed</small>
          </div>
        </div>

        {/* Record Keeping Audit */}
        <div className="report-card sections-card">
          <h3>Record Keeping</h3>
          <div className="audit-type-score">
            <div className="score-bar">
              <div 
                className="score-fill" 
                style={{width: `${totalScore.recordKeeping.percentage}%`}}
              ></div>
              <span className="score-text">{totalScore.recordKeeping.percentage.toFixed(1)}%</span>
            </div>
            <p>Score: {totalScore.recordKeeping.totalScore}/{totalScore.recordKeeping.maxPossible}</p>
            <small>{Object.keys(auditData.recordKeepingAuditData || {}).length} items completed</small>
          </div>
        </div>

        {/* NCRs Summary */}
        <div className="report-card ncr-card">
          <h3>Non-Conformance Summary</h3>
          <div className="ncr-stats">
            <div className="ncr-count">
              <span className="ncr-number">{allNCRs.length}</span>
              <span className="ncr-label">Total NCRs</span>
            </div>
            <div className="ncr-breakdown">
              <div className="ncr-by-type">
                <h4>By Audit Type</h4>
                <div className="type-items">
                  <div className="type-item">
                    <span className="type-dot manufacturing"></span>
                    Manufacturing: {allNCRs.filter(ncr => ncr.auditType === 'manufacturing').length}
                  </div>
                  <div className="type-item">
                    <span className="type-dot recordkeeping"></span>
                    Record Keeping: {allNCRs.filter(ncr => ncr.auditType === 'recordkeeping').length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="report-card trend-card">
          <h3>Performance Indicators</h3>
          <div className="kpi-grid">
            <div className="kpi-item">
              <span className="kpi-value">{totalScore.percentage.toFixed(1)}%</span>
              <span className="kpi-label">Overall Score</span>
            </div>
            <div className="kpi-item">
              <span className="kpi-value">
                {manufacturingAuditSections.length + recordKeepingAuditSections.length}
              </span>
              <span className="kpi-label">Sections Available</span>
            </div>
            <div className="kpi-item">
              <span className="kpi-value">{allNCRs.length}</span>
              <span className="kpi-label">Issues Found</span>
            </div>
            <div className="kpi-item">
              <span className="kpi-value">
                {Object.keys(auditData.manufacturingAuditData || {}).length + 
                 Object.keys(auditData.recordKeepingAuditData || {}).length}
              </span>
              <span className="kpi-label">Items Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed NCR List */}
      {allNCRs.length > 0 && (
        <div className="ncr-detailed-list">
          <h3>Detailed Non-Conformance Reports</h3>
          <div className="ncr-items">
            {allNCRs.map((ncr, index) => (
              <div key={`${ncr.auditType}_${ncr.sectionId}_${ncr.itemId}_${index}`} className="ncr-item">
                <div className="ncr-header">
                  <h4>NCR #{index + 1} - {ncr.auditType}</h4>
                  <span className={`ncr-badge ${ncr.auditType}`}>
                    {ncr.auditType === 'manufacturing' ? 'Manufacturing' : 'Record Keeping'}
                  </span>
                </div>
                <div className="ncr-details">
                  <p><strong>Section:</strong> {ncr.sectionTitle}</p>
                  <p><strong>Item:</strong> {ncr.itemTitle}</p>
                  <p><strong>Category:</strong> {ncr.category || 'N/A'}</p>
                  <p><strong>Description:</strong> {ncr.description || 'N/A'}</p>
                  <p><strong>Root Cause:</strong> {ncr.rootCause || 'N/A'}</p>
                  <p><strong>Corrective Action:</strong> {ncr.correctiveAction || 'N/A'}</p>
                  <p><strong>Responsible Person:</strong> {ncr.responsiblePerson || 'N/A'}</p>
                  <p><strong>Target Date:</strong> {ncr.targetDate || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Data Message */}
      {totalScore.maxPoints === 0 && (
        <div className="no-data">
          <h3>No Audit Data Available</h3>
          <p>Please complete some audit sections to view reports.</p>
          <div className="no-data-actions">
            <button 
              className="btn-primary"
              onClick={() => window.location.href = '#manufacturing-audit'}
            >
              Start Manufacturing Audit
            </button>
            <button 
              className="btn-secondary"
              onClick={() => window.location.href = '#recordkeeping-audit'}
            >
              Start Record Keeping Audit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;