import React, { useState, useRef } from 'react';
import { manufacturingAuditSections, scoringCriteria } from '../data/auditData';

const ManufacturingAudit = ({ auditData, auditInfo, updateAuditData }) => {
  const [activeSection, setActiveSection] = useState(1);
  const [expandedItems, setExpandedItems] = useState({});
  const fileInputRef = useRef(null);
  const [uploadingFor, setUploadingFor] = useState(null);

  const currentSection = manufacturingAuditSections.find(section => section.id === activeSection);

  const toggleItemExpansion = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleScoreChange = (sectionId, itemId, score) => {
    const item = currentSection.items.find(item => item.id === itemId);
    const maxScore = item.points;
    
    if (score > maxScore) score = maxScore;
    if (score < 0) score = 0;

    updateAuditData(sectionId, itemId, { 
      score: parseInt(score) || 0,
      maxScore: maxScore,
      timestamp: new Date().toISOString()
    });
  };

  const handleNCReport = (sectionId, itemId, ncDetails) => {
    updateAuditData(sectionId, itemId, {
      ncReport: {
        ...ncDetails,
        timestamp: new Date().toISOString(),
        status: 'Open'
      }
    });
  };

  const handlePhotoUpload = (sectionId, itemId, files) => {
    const photos = Array.from(files).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      uploadTime: new Date().toISOString()
    }));

    updateAuditData(sectionId, itemId, {
      evidence: {
        photos: photos,
        uploadTime: new Date().toISOString()
      }
    });
    
    setUploadingFor(null);
  };

  const getSectionScore = (sectionId) => {
    const section = manufacturingAuditSections.find(s => s.id === sectionId);
    let totalScore = 0;
    let maxPossible = 0;

    section.items.forEach(item => {
      const itemData = auditData[`${sectionId}-${item.id}`] || {};
      totalScore += itemData.score || 0;
      maxPossible += item.points;
    });

    return { totalScore, maxPossible, percentage: maxPossible > 0 ? (totalScore / maxPossible) * 100 : 0 };
  };

  const getOverallScore = () => {
    let totalScore = 0;
    let maxPossible = 0;

    manufacturingAuditSections.forEach(section => {
      const sectionScore = getSectionScore(section.id);
      totalScore += sectionScore.totalScore;
      maxPossible += sectionScore.maxPossible;
    });

    return { totalScore, maxPossible, percentage: maxPossible > 0 ? (totalScore / maxPossible) * 100 : 0 };
  };

  const getScoreClassification = (percentage) => {
    for (const [key, criteria] of Object.entries(scoringCriteria)) {
      if (percentage >= criteria.min && percentage <= criteria.max) {
        return criteria;
      }
    }
    return scoringCriteria.unsatisfactory;
  };

  const renderNCForm = (sectionId, itemId) => {
    const itemKey = `${sectionId}-${itemId}`;
    const existingNC = auditData[itemKey]?.ncReport;

    return (
      <div className="nc-form">
        <h4>🚨 Non-Conformance Report</h4>
        <div className="form-group">
          <label>NC Category:</label>
          <select 
            defaultValue={existingNC?.category || ''}
            onChange={(e) => handleNCReport(sectionId, itemId, { 
              ...existingNC, 
              category: e.target.value 
            })}
          >
            <option value="">Select Category</option>
            <option value="critical">Critical</option>
            <option value="major">Major</option>
            <option value="minor">Minor</option>
            <option value="observation">Observation</option>
          </select>
        </div>
        <div className="form-group">
          <label>NC Description (Hindi/English):</label>
          <textarea 
            defaultValue={existingNC?.description || ''}
            placeholder="समस्या का विस्तृत विवरण / Detailed description of the issue"
            onBlur={(e) => handleNCReport(sectionId, itemId, { 
              ...existingNC, 
              description: e.target.value 
            })}
          />
        </div>
        <div className="form-group">
          <label>Root Cause Analysis:</label>
          <textarea 
            defaultValue={existingNC?.rootCause || ''}
            placeholder="मूल कारण / Root cause of the issue"
            onBlur={(e) => handleNCReport(sectionId, itemId, { 
              ...existingNC, 
              rootCause: e.target.value 
            })}
          />
        </div>
        <div className="form-group">
          <label>Corrective Action Required:</label>
          <textarea 
            defaultValue={existingNC?.correctiveAction || ''}
            placeholder="सुधारात्मक कार्य / Required corrective actions"
            onBlur={(e) => handleNCReport(sectionId, itemId, { 
              ...existingNC, 
              correctiveAction: e.target.value 
            })}
          />
        </div>
        <div className="form-group">
          <label>Target Date:</label>
          <input 
            type="date" 
            defaultValue={existingNC?.targetDate || ''}
            onChange={(e) => handleNCReport(sectionId, itemId, { 
              ...existingNC, 
              targetDate: e.target.value 
            })}
          />
        </div>
        <div className="form-group">
          <label>Responsible Person:</label>
          <input 
            type="text" 
            defaultValue={existingNC?.responsiblePerson || ''}
            placeholder="जिम्मेदार व्यक्ति का नाम"
            onBlur={(e) => handleNCReport(sectionId, itemId, { 
              ...existingNC, 
              responsiblePerson: e.target.value 
            })}
          />
        </div>
      </div>
    );
  };

  const renderEvidenceSection = (sectionId, itemId) => {
    const itemKey = `${sectionId}-${itemId}`;
    const evidence = auditData[itemKey]?.evidence;

    return (
      <div className="evidence-section">
        <h4>📸 Evidence Collection</h4>
        
        <div className="photo-upload">
          <button 
            className="upload-btn"
            onClick={() => {
              setUploadingFor(`${sectionId}-${itemId}`);
              fileInputRef.current?.click();
            }}
          >
            📷 Upload Photos
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => handlePhotoUpload(sectionId, itemId, e.target.files)}
          />
        </div>

        {evidence?.photos && evidence.photos.length > 0 && (
          <div className="photo-gallery">
            <h5>Uploaded Evidence:</h5>
            <div className="photo-grid">
              {evidence.photos.map((photo, index) => (
                <div key={index} className="photo-item">
                  <img src={photo.url} alt={`Evidence ${index + 1}`} />
                  <span className="photo-info">{photo.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="remarks-section">
          <label>Auditor Remarks:</label>
          <textarea 
            defaultValue={auditData[itemKey]?.remarks || ''}
            placeholder="Additional observations, comments, recommendations"
            onBlur={(e) => updateAuditData(sectionId, itemId, { remarks: e.target.value })}
          />
        </div>
      </div>
    );
  };

  // WhatsApp Share Function for Manufacturing Audit
  const shareManufacturingAuditOnWhatsApp = () => {
    let completedItems = 0;
    let totalScore = 0;
    let maxPossible = 0;
    
    manufacturingAuditSections.forEach(section => {
      section.items.forEach(item => {
        const key = `${section.id}_${item.id}`;
        const itemData = auditData[key];
        maxPossible += 5;
        if (itemData?.score !== undefined) {
          completedItems++;
          totalScore += itemData.score;
        }
      });
    });
    
    const percentage = maxPossible > 0 ? (totalScore / maxPossible) * 100 : 0;
    
    let message = `🏭 *MANUFACTURING AUDIT UPDATE* 🏭\n\n`;
    message += `🏢 *Gautam Solar pvt. Ltd*\n`;
    message += `📊 *Production Operations Audit*\n\n`;
    
    message += `📈 *CURRENT STATUS*\n`;
    message += `━━━━━━━━━━━━━━━━━\n`;
    message += `🎯 Score: ${totalScore}/${maxPossible} (${percentage.toFixed(1)}%)\n`;
    message += `✅ Items Completed: ${completedItems}\n`;
    message += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
    
    message += `🔍 *AUDIT AREAS*\n`;
    message += `━━━━━━━━━━━━━━━━━\n`;
    message += `• Production Line Operations\n`;
    message += `• Quality Control & IPQC/IQC\n`;
    message += `• Workplace Safety & Conditions\n`;
    message += `• HR Effectiveness & Communication\n`;
    message += `• Maintenance & Calibration\n\n`;
    
    message += `📱 *Manufacturing Audit App*\n`;
    message += `🕐 ${new Date().toLocaleString()}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  const overallScore = getOverallScore();
  const classification = getScoreClassification(overallScore.percentage);

  return (
    <div className="manufacturing-audit">
      <div className="audit-header">
        <div className="audit-title">
          <h1>🏭 Manufacturing Operations Audit</h1>
          <p>Comprehensive Solar Panel Manufacturing Assessment</p>
        </div>
        
        <div className="audit-info-summary">
          <div className="info-item">
            <strong>Plant:</strong> {auditInfo.plantLocation || 'Not specified'}
          </div>
          <div className="info-item">
            <strong>Date:</strong> {auditInfo.auditDate}
          </div>
          <div className="info-item">
            <strong>Auditor:</strong> {auditInfo.leadAuditor || 'Not specified'}
          </div>
          <div className="info-item">
            <button 
              className="btn-whatsapp-mini"
              onClick={shareManufacturingAuditOnWhatsApp}
              title="Share Manufacturing Audit Status"
            >
              📱 Share
            </button>
          </div>
        </div>
        
        <div className="overall-score">
          <div className="score-display">
            <span className="score-value" style={{ color: classification.color }}>
              {overallScore.totalScore}/{overallScore.maxPossible}
            </span>
            <span className="score-percentage" style={{ color: classification.color }}>
              {overallScore.percentage.toFixed(1)}%
            </span>
          </div>
          <div className="score-classification" style={{ backgroundColor: classification.color }}>
            {classification.label}
          </div>
        </div>
      </div>

      <div className="audit-navigation">
        <div className="section-tabs">
          {manufacturingAuditSections.map(section => {
            const sectionScore = getSectionScore(section.id);
            const sectionClass = getScoreClassification(sectionScore.percentage);
            
            return (
              <button
                key={section.id}
                className={`section-tab ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
                style={{ 
                  borderColor: activeSection === section.id ? sectionClass.color : '#ddd',
                  backgroundColor: activeSection === section.id ? `${sectionClass.color}15` : 'white'
                }}
              >
                <span className="section-title">{section.title}</span>
                <span className="section-score" style={{ color: sectionClass.color }}>
                  {sectionScore.totalScore}/{sectionScore.maxPossible}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="audit-content">
        {currentSection && (
          <div className="current-section">
            <div className="section-header">
              <h2>{currentSection.title}</h2>
              <div className="section-score-display">
                {getSectionScore(currentSection.id).totalScore}/{currentSection.maxPoints} Points
              </div>
            </div>

            <div className="audit-items">
              {currentSection.items.map(item => {
                const itemKey = `${currentSection.id}-${item.id}`;
                const itemData = auditData[itemKey] || {};
                const isExpanded = expandedItems[item.id];
                const hasNC = itemData.ncReport;
                const hasEvidence = itemData.evidence?.photos?.length > 0;

                return (
                  <div key={item.id} className={`audit-item ${item.criticalPoint ? 'critical' : ''}`}>
                    <div className="item-header" onClick={() => toggleItemExpansion(item.id)}>
                      <div className="item-info">
                        <span className="item-id">{item.id}</span>
                        <h3 className="item-title">
                          {item.criticalPoint && '⚠️ '}{item.title}
                        </h3>
                        <p className="item-description">{item.description}</p>
                      </div>
                      
                      <div className="item-scoring">
                        <div className="score-input">
                          <label>Score:</label>
                          <input
                            type="number"
                            min="0"
                            max={item.points}
                            value={itemData.score || 0}
                            onChange={(e) => handleScoreChange(currentSection.id, item.id, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span className="max-score">/ {item.points}</span>
                        </div>
                        
                        <div className="item-status">
                          {hasNC && <span className="nc-indicator">⚠️ NC</span>}
                          {hasEvidence && <span className="evidence-indicator">📷 Evidence</span>}
                        </div>
                      </div>
                      
                      <div className="expand-icon">
                        {isExpanded ? '▼' : '▶'}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="item-details">
                        <div className="guidelines">
                          <h4>Audit Guidelines:</h4>
                          <p>{item.guidelines}</p>
                          <p><strong>Required Evidence:</strong> {item.evidence}</p>
                        </div>

                        <div className="item-actions">
                          <div className="action-tabs">
                            <button 
                              className="action-btn evidence-btn"
                              onClick={() => toggleItemExpansion(`evidence-${item.id}`)}
                            >
                              📸 Add Evidence
                            </button>
                            <button 
                              className="action-btn nc-btn"
                              onClick={() => toggleItemExpansion(`nc-${item.id}`)}
                            >
                              🚨 Report NC
                            </button>
                          </div>
                        </div>

                        {expandedItems[`evidence-${item.id}`] && 
                          renderEvidenceSection(currentSection.id, item.id)
                        }
                        
                        {expandedItems[`nc-${item.id}`] && 
                          renderNCForm(currentSection.id, item.id)
                        }
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManufacturingAudit;