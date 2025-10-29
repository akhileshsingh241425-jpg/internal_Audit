import React from 'react';
import { manufacturingAuditSections, recordKeepingAuditSections, scoringCriteria } from '../data/auditData';

const Dashboard = ({ auditData, auditInfo, auditMode, setAuditMode, setActiveView, onUpdateAuditInfo, user }) => {

  const calculateAuditTypeScore = (auditType, sections) => {
    let totalScore = 0;
    let maxPossible = 0;
    let completedItems = 0;
    let totalItems = 0;

    sections.forEach(section => {
      section.items.forEach(item => {
        const itemKey = `${section.id}-${item.id}`;
        const itemData = auditData[auditType]?.[itemKey] || {};
        
        totalItems++;
        maxPossible += item.points;
        
        if (itemData.score !== undefined) {
          completedItems++;
          totalScore += itemData.score;
        }
      });
    });

    return { 
      totalScore, 
      maxPossible, 
      completedItems,
      totalItems,
      percentage: maxPossible > 0 ? (totalScore / maxPossible) * 100 : 0,
      progress: totalItems > 0 ? (completedItems / totalItems) * 100 : 0
    };
  };

  const getScoreClassification = (percentage) => {
    for (const criteria of Object.values(scoringCriteria)) {
      if (percentage >= criteria.min && percentage <= criteria.max) {
        return criteria;
      }
    }
    return scoringCriteria.unsatisfactory;
  };

  const getOverallAuditStatus = () => {
    const manufacturingStats = calculateAuditTypeScore('manufacturing', manufacturingAuditSections);
    const recordKeepingStats = calculateAuditTypeScore('recordKeeping', recordKeepingAuditSections);
    
    const totalScore = manufacturingStats.totalScore + recordKeepingStats.totalScore;
    const totalMaxPossible = manufacturingStats.maxPossible + recordKeepingStats.maxPossible;
    const totalCompleted = manufacturingStats.completedItems + recordKeepingStats.completedItems;
    const totalItems = manufacturingStats.totalItems + recordKeepingStats.totalItems;
    
    return {
      totalScore,
      totalMaxPossible,
      overallPercentage: totalMaxPossible > 0 ? (totalScore / totalMaxPossible) * 100 : 0,
      overallProgress: totalItems > 0 ? (totalCompleted / totalItems) * 100 : 0,
      manufacturing: manufacturingStats,
      recordKeeping: recordKeepingStats
    };
  };

  const overallStatus = getOverallAuditStatus();
  const overallClassification = getScoreClassification(overallStatus.overallPercentage);

  return (
    <div className="dashboard">

      {/* Audit Type Selection */}
      <div className="audit-type-selection">
        <h3>📋 Select Audit Type</h3>
        <div className="audit-type-options">
          <div 
            className={`audit-option ${auditMode === 'current' ? 'active' : ''}`}
            onClick={() => setAuditMode('current')}
          >
            <div className="option-icon">🔧</div>
            <div className="option-content">
              <h4>Current Professional Audit</h4>
              <p>Manufacturing Operations + Record Keeping (Enhanced Version)</p>
              <ul>
                <li>✓ Photo Evidence Capture</li>
                <li>✓ NCR Reporting System</li>
                <li>✓ Hindi/English Interface</li>
                <li>✓ Professional Scoring (5-point scale)</li>
                <li>✓ Real Manufacturing Focus</li>
              </ul>
            </div>
          </div>
          
          <div 
            className={`audit-option ${auditMode === 'excel' ? 'active' : ''}`}
            onClick={() => setAuditMode('excel')}
          >
            <div className="option-icon">📊</div>
            <div className="option-content">
              <h4>Excel-Based Original Audit</h4>
              <p>Traditional 9-Section Audit Checklist (295 Points)</p>
              <ul>
                <li>✓ Original Excel Structure</li>
                <li>✓ 9 Audit Sections</li>
                <li>✓ Traditional Point System</li>
                <li>✓ Basic Photo Upload</li>
                <li>✓ Classic NCR Format</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Content Based on Audit Mode */}
      {auditMode === 'current' ? (
        // Current Professional Audit Dashboard
        <>
          <div className="audit-mode-indicator current">
            <h3>🔧 Current Professional Audit Mode</h3>
            <p>Manufacturing Operations & Record Keeping with Enhanced Features</p>
          </div>

      <div className="summary-cards">
        <div className="summary-card overall">
          <div className="card-header">
            <h3>📊 Overall Audit Status</h3>
          </div>
          <div className="card-content">
            <div className="score-display">
              <div className="score-circle" style={{ borderColor: overallClassification.color }}>
                <span className="score-value" style={{ color: overallClassification.color }}>
                  {overallStatus.overallPercentage.toFixed(1)}%
                </span>
                <span className="score-label">Score</span>
              </div>
              <div className="score-details">
                <div className="detail-item">
                  <span className="detail-value">{overallStatus.totalScore}/{overallStatus.totalMaxPossible}</span>
                  <span className="detail-label">Total Points</span>
                </div>
                <div className="detail-item">
                  <span className="detail-value">{overallStatus.overallProgress.toFixed(1)}%</span>
                  <span className="detail-label">Progress</span>
                </div>
                <div className="classification" style={{ backgroundColor: overallClassification.color }}>
                  {overallClassification.label}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="summary-card manufacturing">
          <div className="card-header">
            <h3>🏭 Manufacturing Operations</h3>
            <button 
              className="btn btn-secondary"
              onClick={() => setActiveView('manufacturing-audit')}
            >
              Start Audit
            </button>
          </div>
          <div className="card-content">
            <div className="audit-stats">
              <div className="stat-row">
                <span className="stat-label">Score:</span>
                <span className="stat-value" style={{ color: getScoreClassification(overallStatus.manufacturing.percentage).color }}>
                  {overallStatus.manufacturing.totalScore}/{overallStatus.manufacturing.maxPossible} 
                  ({overallStatus.manufacturing.percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Progress:</span>
                <span className="stat-value">
                  {overallStatus.manufacturing.completedItems}/{overallStatus.manufacturing.totalItems} items 
                  ({overallStatus.manufacturing.progress.toFixed(1)}%)
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill manufacturing-progress" 
                  style={{ width: `${overallStatus.manufacturing.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="audit-description">
              <p>Production line operations, quality control, workplace conditions, HR effectiveness, maintenance systems</p>
            </div>
          </div>
        </div>

        <div className="summary-card record-keeping">
          <div className="card-header">
            <h3>📋 Record Keeping & Documentation</h3>
            <button 
              className="btn btn-secondary"
              onClick={() => setActiveView('record-keeping-audit')}
            >
              Start Audit
            </button>
          </div>
          <div className="card-content">
            <div className="audit-stats">
              <div className="stat-row">
                <span className="stat-label">Score:</span>
                <span className="stat-value" style={{ color: getScoreClassification(overallStatus.recordKeeping.percentage).color }}>
                  {overallStatus.recordKeeping.totalScore}/{overallStatus.recordKeeping.maxPossible} 
                  ({overallStatus.recordKeeping.percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Progress:</span>
                <span className="stat-value">
                  {overallStatus.recordKeeping.completedItems}/{overallStatus.recordKeeping.totalItems} items 
                  ({overallStatus.recordKeeping.progress.toFixed(1)}%)
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill record-keeping-progress" 
                  style={{ width: `${overallStatus.recordKeeping.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="audit-description">
              <p>Document management, compliance records, quality documentation, administrative systems</p>
            </div>
          </div>
        </div>
      </div>

          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
              <button 
                className="action-btn manufacturing"
                onClick={() => setActiveView('manufacturing-audit')}
              >
                <span className="action-icon">🏭</span>
                <span className="action-text">
                  <strong>Manufacturing Audit</strong>
                  <p>Production, Quality, Safety, HR, Maintenance</p>
                </span>
              </button>
              
              <button 
                className="action-btn record-keeping"
                onClick={() => setActiveView('record-keeping-audit')}
              >
                <span className="action-icon">📋</span>
                <span className="action-text">
                  <strong>Record Keeping Audit</strong>
                  <p>Documentation, Compliance, Records</p>
                </span>
              </button>
              
              <button 
                className="action-btn reports"
                onClick={() => setActiveView('reports')}
              >
                <span className="action-icon">📈</span>
                <span className="action-text">
                  <strong>Generate Reports</strong>
                  <p>Analysis, Summary, Export</p>
                </span>
              </button>

              <button 
                className="action-btn whatsapp-share"
                onClick={() => {
                  // Quick WhatsApp share from dashboard
                  const manufacturingStats = calculateAuditTypeScore('manufacturingAuditData', manufacturingAuditSections);
                  const recordKeepingStats = calculateAuditTypeScore('recordKeepingAuditData', recordKeepingAuditSections);
                  const totalScore = manufacturingStats.totalScore + recordKeepingStats.totalScore;
                  const maxPoints = manufacturingStats.maxPossible + recordKeepingStats.maxPossible;
                  const percentage = maxPoints > 0 ? (totalScore / maxPoints) * 100 : 0;
                  
                  let message = `🏭 *GAUTAM SOLAR QUICK UPDATE* 🏭\n\n`;
                  message += `📊 *Current Audit Status*\n`;
                  message += `━━━━━━━━━━━━━━━━━\n`;
                  message += `🎯 Score: ${totalScore}/${maxPoints} (${percentage.toFixed(1)}%)\n`;
                  message += `🏭 Manufacturing: ${manufacturingStats.percentage.toFixed(1)}%\n`;
                  message += `📋 Records: ${recordKeepingStats.percentage.toFixed(1)}%\n`;
                  message += `📅 ${new Date().toLocaleDateString()}\n\n`;
                  message += `Complete report के लिए audit app देखें।`;
                  
                  const encodedMessage = encodeURIComponent(message);
                  window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
                }}
              >
                <span className="action-icon">📱</span>
                <span className="action-text">
                  <strong>Quick WhatsApp Share</strong>
                  <p>Share current status instantly</p>
                </span>
              </button>
            </div>
          </div>
        </>
      ) : (
        // Excel-Based Original Audit Dashboard
        <div className="excel-audit-dashboard">
          <div className="audit-mode-indicator excel">
            <h3>📊 Excel-Based Original Audit Mode</h3>
            <p>Traditional 9-Section Audit Checklist (295 Points Total)</p>
          </div>
          
          <div className="excel-audit-summary">
            <div className="summary-grid">
              <div className="summary-card excel-overview">
                <div className="card-header">
                  <h3>📊 Excel Audit Overview</h3>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setActiveView('excel-audit')}
                  >
                    Start Excel Audit
                  </button>
                </div>
                <div className="card-content">
                  <div className="excel-stats">
                    <div className="stat-item">
                      <span className="stat-number">9</span>
                      <span className="stat-label">Sections</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">295</span>
                      <span className="stat-label">Total Points</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">70</span>
                      <span className="stat-label">Audit Items</span>
                    </div>
                  </div>
                  <div className="excel-description">
                    <p>Original internal audit checklist with traditional scoring system</p>
                    <ul>
                      <li>✓ General Operations & Safety</li>
                      <li>✓ Inventory & Equipment Management</li>
                      <li>✓ Quality Control & HR</li>
                      <li>✓ Training & Documentation</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="summary-card excel-sections">
                <div className="card-header">
                  <h3>📑 Audit Sections</h3>
                </div>
                <div className="card-content">
                  <div className="sections-overview">
                    <div className="section-item">
                      <span className="section-icon">⚙️</span>
                      <span>General Operations (35 pts)</span>
                    </div>
                    <div className="section-item">
                      <span className="section-icon">🛡️</span>
                      <span>Safety & Compliance (40 pts)</span>
                    </div>
                    <div className="section-item">
                      <span className="section-icon">📦</span>
                      <span>Inventory Management (30 pts)</span>
                    </div>
                    <div className="section-item">
                      <span className="section-icon">🔧</span>
                      <span>Equipment Maintenance (25 pts)</span>
                    </div>
                    <div className="section-item">
                      <span className="section-icon">🔍</span>
                      <span>Quality Control (45 pts)</span>
                    </div>
                    <div className="section-item">
                      <span className="section-icon">👥</span>
                      <span>Human Resources (30 pts)</span>
                    </div>
                    <div className="section-item">
                      <span className="section-icon">📚</span>
                      <span>Training & Development (25 pts)</span>
                    </div>
                    <div className="section-item">
                      <span className="section-icon">🧹</span>
                      <span>Housekeeping & 5S (30 pts)</span>
                    </div>
                    <div className="section-item">
                      <span className="section-icon">📄</span>
                      <span>Record Keeping (25 pts)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="excel-actions">
              <h3>Quick Actions</h3>
              <div className="actions-row">
                <button 
                  className="action-btn excel-start"
                  onClick={() => setActiveView('excel-audit')}
                >
                  <span className="action-icon">📊</span>
                  <span className="action-text">
                    <strong>Start Excel Audit</strong>
                    <p>Begin traditional 9-section audit</p>
                  </span>
                </button>
                
                <button 
                  className="action-btn switch-mode"
                  onClick={() => setAuditMode('current')}
                >
                  <span className="action-icon">🔄</span>
                  <span className="action-text">
                    <strong>Switch to Professional Audit</strong>
                    <p>Use enhanced manufacturing audit</p>
                  </span>
                </button>
                
                <button 
                  className="action-btn reports"
                  onClick={() => setActiveView('reports')}
                >
                  <span className="action-icon">📈</span>
                  <span className="action-text">
                    <strong>View Reports</strong>
                    <p>Generate audit reports</p>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;