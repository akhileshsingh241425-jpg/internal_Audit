import React, { useState, useRef } from 'react';
import { recordKeepingAuditSections, scoringCriteria } from '../data/auditData';

const RecordKeepingAudit = ({ auditData, auditInfo, updateAuditData }) => {
  const [activeSection, setActiveSection] = useState(1);
  const [expandedItems, setExpandedItems] = useState({});
  const fileInputRef = useRef(null);

  const currentSection = recordKeepingAuditSections.find(section => section.id === activeSection);

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

  const handleDocumentVerification = (sectionId, itemId, verification) => {
    updateAuditData(sectionId, itemId, {
      verification: {
        ...verification,
        timestamp: new Date().toISOString()
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
  };

  const getSectionScore = (sectionId) => {
    const section = recordKeepingAuditSections.find(s => s.id === sectionId);
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

    recordKeepingAuditSections.forEach(section => {
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

  const renderDocumentVerificationForm = (sectionId, itemId) => {
    const itemKey = `${sectionId}-${itemId}`;
    const existingVerification = auditData[itemKey]?.verification;

    return (
      <div className="document-verification">
        <h4>📋 Document Verification</h4>
        
        <div className="verification-checklist">
          <div className="check-item">
            <label>
              <input 
                type="checkbox"
                checked={existingVerification?.documentsAvailable || false}
                onChange={(e) => handleDocumentVerification(sectionId, itemId, { 
                  ...existingVerification, 
                  documentsAvailable: e.target.checked 
                })}
              />
              Documents Available / दस्तावेज उपलब्ध हैं
            </label>
          </div>
          
          <div className="check-item">
            <label>
              <input 
                type="checkbox"
                checked={existingVerification?.properlyFilled || false}
                onChange={(e) => handleDocumentVerification(sectionId, itemId, { 
                  ...existingVerification, 
                  properlyFilled: e.target.checked 
                })}
              />
              Properly Filled / सही तरीके से भरे गए हैं
            </label>
          </div>
          
          <div className="check-item">
            <label>
              <input 
                type="checkbox"
                checked={existingVerification?.signatures || false}
                onChange={(e) => handleDocumentVerification(sectionId, itemId, { 
                  ...existingVerification, 
                  signatures: e.target.checked 
                })}
              />
              Proper Signatures / उचित हस्ताक्षर
            </label>
          </div>
          
          <div className="check-item">
            <label>
              <input 
                type="checkbox"
                checked={existingVerification?.updated || false}
                onChange={(e) => handleDocumentVerification(sectionId, itemId, { 
                  ...existingVerification, 
                  updated: e.target.checked 
                })}
              />
              Up-to-Date / अद्यतन हैं
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Document Status / दस्तावेज़ की स्थिति:</label>
          <select 
            value={existingVerification?.status || ''}
            onChange={(e) => handleDocumentVerification(sectionId, itemId, { 
              ...existingVerification, 
              status: e.target.value 
            })}
          >
            <option value="">Select Status</option>
            <option value="complete">Complete / पूर्ण</option>
            <option value="incomplete">Incomplete / अधूरा</option>
            <option value="missing">Missing / गुम</option>
            <option value="outdated">Outdated / पुराना</option>
          </select>
        </div>

        <div className="form-group">
          <label>Missing Documents / गुम दस्तावेज़:</label>
          <textarea 
            value={existingVerification?.missingDocs || ''}
            placeholder="List missing documents / गुम दस्तावेज़ों की सूची"
            onChange={(e) => handleDocumentVerification(sectionId, itemId, { 
              ...existingVerification, 
              missingDocs: e.target.value 
            })}
          />
        </div>

        <div className="form-group">
          <label>Issues Found / पाई गई समस्याएं:</label>
          <textarea 
            value={existingVerification?.issues || ''}
            placeholder="Document related issues / दस्तावेज़ संबंधी समस्याएं"
            onChange={(e) => handleDocumentVerification(sectionId, itemId, { 
              ...existingVerification, 
              issues: e.target.value 
            })}
          />
        </div>

        <div className="form-group">
          <label>Recommendations / सुझाव:</label>
          <textarea 
            value={existingVerification?.recommendations || ''}
            placeholder="Recommended improvements / सुधार के सुझाव"
            onChange={(e) => handleDocumentVerification(sectionId, itemId, { 
              ...existingVerification, 
              recommendations: e.target.value 
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
        <h4>📸 Document Evidence</h4>
        
        <div className="photo-upload">
          <button 
            className="upload-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            📷 Upload Document Photos
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
                  <img src={photo.url} alt={`Document ${index + 1}`} />
                  <span className="photo-info">{photo.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="remarks-section">
          <label>Auditor Notes / ऑडिटर की टिप्पणी:</label>
          <textarea 
            value={auditData[itemKey]?.remarks || ''}
            placeholder="Additional notes about document condition and compliance"
            onChange={(e) => updateAuditData(sectionId, itemId, { remarks: e.target.value })}
          />
        </div>
      </div>
    );
  };

  // WhatsApp Share Function for Record Keeping Audit
  const shareRecordKeepingAuditOnWhatsApp = () => {
    let completedItems = 0;
    let totalScore = 0;
    let maxPossible = 0;
    let verifiedDocs = 0;
    
    recordKeepingAuditSections.forEach(section => {
      section.items.forEach(item => {
        const key = `${section.id}_${item.id}`;
        const itemData = auditData[key];
        maxPossible += 5;
        if (itemData?.score !== undefined) {
          completedItems++;
          totalScore += itemData.score;
          if (itemData.verified) verifiedDocs++;
        }
      });
    });
    
    const percentage = maxPossible > 0 ? (totalScore / maxPossible) * 100 : 0;
    
    let message = `📋 *RECORD KEEPING AUDIT UPDATE* 📋\n\n`;
    message += `🏢 *Gautam Solar pvt. Ltd*\n`;
    message += `📄 *Documentation & Compliance Audit*\n\n`;
    
    message += `📈 *CURRENT STATUS*\n`;
    message += `━━━━━━━━━━━━━━━━━\n`;
    message += `🎯 Score: ${totalScore}/${maxPossible} (${percentage.toFixed(1)}%)\n`;
    message += `✅ Items Completed: ${completedItems}\n`;
    message += `🔍 Documents Verified: ${verifiedDocs}\n`;
    message += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
    
    message += `📂 *DOCUMENT CATEGORIES*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `• Quality Management Documents\n`;
    message += `• Compliance & Regulatory Records\n`;
    message += `• Training & Certification Files\n`;
    message += `• Administrative Documentation\n\n`;
    
    message += `📱 *Record Keeping Audit App*\n`;
    message += `🕐 ${new Date().toLocaleString()}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  const overallScore = getOverallScore();
  const classification = getScoreClassification(overallScore.percentage);

  return (
    <div className="record-keeping-audit">
      <div className="audit-header">
        <div className="audit-title">
          <h1>📋 Record Keeping & Documentation Audit</h1>
          <p>Document Management System Assessment</p>
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
              onClick={shareRecordKeepingAuditOnWhatsApp}
              title="Share Record Keeping Audit Status"
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
          {recordKeepingAuditSections.map(section => {
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
                const hasVerification = itemData.verification;
                const hasEvidence = itemData.evidence?.photos?.length > 0;

                return (
                  <div key={item.id} className="audit-item">
                    <div className="item-header" onClick={() => toggleItemExpansion(item.id)}>
                      <div className="item-info">
                        <span className="item-id">{item.id}</span>
                        <h3 className="item-title">{item.title}</h3>
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
                          {hasVerification && <span className="verified-indicator">✅ Verified</span>}
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
                          <h4>Verification Guidelines:</h4>
                          <p>{item.guidelines}</p>
                          <p><strong>Required Evidence:</strong> {item.evidence}</p>
                        </div>

                        <div className="item-actions">
                          <div className="action-tabs">
                            <button 
                              className="action-btn verification-btn"
                              onClick={() => toggleItemExpansion(`verification-${item.id}`)}
                            >
                              ✅ Document Check
                            </button>
                            <button 
                              className="action-btn evidence-btn"
                              onClick={() => toggleItemExpansion(`evidence-${item.id}`)}
                            >
                              📸 Upload Evidence
                            </button>
                          </div>
                        </div>

                        {expandedItems[`verification-${item.id}`] && 
                          renderDocumentVerificationForm(currentSection.id, item.id)
                        }
                        
                        {expandedItems[`evidence-${item.id}`] && 
                          renderEvidenceSection(currentSection.id, item.id)
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

export default RecordKeepingAudit;