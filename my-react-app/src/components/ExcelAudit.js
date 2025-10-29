import React, { useState } from 'react';
import { excelAuditSections } from '../data/excelAuditData';

const ExcelAudit = ({ auditData, auditInfo, updateAuditData }) => {
  const [activeSection, setActiveSection] = useState(1);
  const [showNCRForm, setShowNCRForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [ncrData, setNcrData] = useState({
    description: '',
    severity: 'Medium',
    status: 'Open',
    correctiveAction: '',
    responsiblePerson: '',
    targetDate: ''
  });

  const handleScoreChange = (sectionId, itemId, score) => {
    const key = `${sectionId}_${itemId}`;
    const currentData = auditData[key] || {};
    updateAuditData(key, {
      ...currentData,
      score: parseInt(score),
      timestamp: new Date().toISOString()
    });
  };

  const handleRemarksChange = (sectionId, itemId, remarks) => {
    const key = `${sectionId}_${itemId}`;
    const currentData = auditData[key] || {};
    updateAuditData(key, {
      ...currentData,
      remarks: remarks
    });
  };

  const handlePhotoUpload = (sectionId, itemId, files) => {
    const key = `${sectionId}_${itemId}`;
    const currentData = auditData[key] || {};
    const photos = currentData.photos || [];
    
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          id: Date.now() + Math.random(),
          name: file.name,
          data: e.target.result,
          timestamp: new Date().toISOString()
        };
        
        updateAuditData(key, {
          ...currentData,
          photos: [...photos, newPhoto]
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const createNCR = (sectionId, itemId, ncrFormData) => {
    const key = `${sectionId}_${itemId}`;
    const currentData = auditData[key] || {};
    updateAuditData(key, {
      ...currentData,
      ncr: {
        id: `NCR-${Date.now()}`,
        sectionId,
        itemId,
        ...ncrFormData,
        createdAt: new Date().toISOString()
      }
    });
    setShowNCRForm(false);
    setSelectedItem(null);
    // Reset NCR form data
    setNcrData({
      description: '',
      severity: 'Medium',
      status: 'Open',
      correctiveAction: '',
      responsiblePerson: '',
      targetDate: ''
    });
  };

  const getSectionProgress = (sectionId) => {
    const section = excelAuditSections.find(s => s.id === sectionId);
    if (!section) return 0;
    
    const completedItems = section.items.filter(item => {
      const key = `${sectionId}_${item.id}`;
      return auditData[key]?.score !== undefined;
    }).length;
    
    return (completedItems / section.items.length) * 100;
  };

  const getSectionScore = (sectionId) => {
    const section = excelAuditSections.find(s => s.id === sectionId);
    if (!section) return { score: 0, maxPoints: 0 };
    
    let totalScore = 0;
    section.items.forEach(item => {
      const key = `${sectionId}_${item.id}`;
      const itemData = auditData[key];
      if (itemData?.score !== undefined) {
        totalScore += itemData.score;
      }
    });
    
    return { score: totalScore, maxPoints: section.maxPoints };
  };

  const getOverallScore = () => {
    let totalScore = 0;
    let maxPoints = 0;
    
    excelAuditSections.forEach(section => {
      const sectionScore = getSectionScore(section.id);
      totalScore += sectionScore.score;
      maxPoints += sectionScore.maxPoints;
    });
    
    return { score: totalScore, maxPoints, percentage: maxPoints > 0 ? (totalScore / maxPoints) * 100 : 0 };
  };

  const shareExcelAuditOnWhatsApp = () => {
    const overallScore = getOverallScore();
    const completedSections = excelAuditSections.filter(section => getSectionProgress(section.id) > 0).length;
    
    let message = `📊 *EXCEL AUDIT STATUS* 📊\n\n`;
    message += `🏢 *Gautam Solar pvt. Ltd*\n`;
    message += `📋 *9-Section Traditional Audit*\n\n`;
    
    message += `📈 *OVERALL PROGRESS*\n`;
    message += `━━━━━━━━━━━━━━━━━\n`;
    message += `🎯 Score: ${overallScore.score}/295 (${overallScore.percentage.toFixed(1)}%)\n`;
    message += `✅ Sections: ${completedSections}/${excelAuditSections.length} completed\n`;
    message += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
    
    message += `📋 *SECTION STATUS*\n`;
    message += `━━━━━━━━━━━━━━━━━\n`;
    excelAuditSections.slice(0, 5).forEach(section => {
      const progress = getSectionProgress(section.id);
      const sectionScore = getSectionScore(section.id);
      const icon = progress > 80 ? '✅' : progress > 50 ? '🟡' : progress > 0 ? '🟠' : '⭕';
      message += `${icon} ${section.title}: ${sectionScore.score}/${section.maxPoints} (${progress.toFixed(0)}%)\n`;
    });
    
    if (excelAuditSections.length > 5) {
      message += `... और ${excelAuditSections.length - 5} sections\n`;
    }
    
    message += `\n📱 *Excel Audit App से generated*\n`;
    message += `🕐 ${new Date().toLocaleString()}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  const renderNCRForm = () => {
    return (
      <div className="ncr-form-overlay">
        <div className="ncr-form">
          <h3>Create Non-Conformance Report</h3>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={ncrData.description}
              onChange={(e) => setNcrData({...ncrData, description: e.target.value})}
              placeholder="Describe the non-conformance..."
              rows="3"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Severity</label>
              <select
                value={ncrData.severity}
                onChange={(e) => setNcrData({...ncrData, severity: e.target.value})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={ncrData.status}
                onChange={(e) => setNcrData({...ncrData, status: e.target.value})}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Corrective Action</label>
            <textarea
              value={ncrData.correctiveAction}
              onChange={(e) => setNcrData({...ncrData, correctiveAction: e.target.value})}
              placeholder="Describe corrective actions to be taken..."
              rows="2"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Responsible Person</label>
              <input
                type="text"
                value={ncrData.responsiblePerson}
                onChange={(e) => setNcrData({...ncrData, responsiblePerson: e.target.value})}
                placeholder="Person responsible for action"
              />
            </div>
            <div className="form-group">
              <label>Target Date</label>
              <input
                type="date"
                value={ncrData.targetDate}
                onChange={(e) => setNcrData({...ncrData, targetDate: e.target.value})}
              />
            </div>
          </div>
          <div className="form-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setShowNCRForm(false);
                setSelectedItem(null);
                // Reset NCR form data
                setNcrData({
                  description: '',
                  severity: 'Medium',
                  status: 'Open',
                  correctiveAction: '',
                  responsiblePerson: '',
                  targetDate: ''
                });
              }}
            >
              Cancel
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => createNCR(selectedItem.sectionId, selectedItem.itemId, ncrData)}
            >
              Create NCR
            </button>
          </div>
        </div>
      </div>
    );
  };

  const activeSection_data = excelAuditSections.find(s => s.id === activeSection);
  
  return (
    <div className="excel-audit">
      <div className="excel-audit-header">
        <div className="header-info">
          <h1>📊 Excel-Based Internal Audit</h1>
          <p>Original 9-Section Checklist | Document: GSPL/ADT/HR/008</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-value">295</span>
            <span className="stat-label">Total Points</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{excelAuditSections.length}</span>
            <span className="stat-label">Sections</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{getSectionProgress(activeSection).toFixed(0)}%</span>
            <span className="stat-label">Progress</span>
          </div>
          <div className="stat-item">
            <button 
              className="btn-whatsapp-mini"
              onClick={shareExcelAuditOnWhatsApp}
              title="Share on WhatsApp"
            >
              📱 Share
            </button>
          </div>
        </div>
      </div>

      <div className="excel-audit-container">
        {/* Section Navigation */}
        <div className="section-navigator">
          <h3>Audit Sections</h3>
          <div className="sections-list">
            {excelAuditSections.map((section) => {
              const progress = getSectionProgress(section.id);
              const sectionScore = getSectionScore(section.id);
              
              return (
                <div
                  key={section.id}
                  className={`section-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <div className="section-header">
                    <span className="section-number">{section.id}</span>
                    <div className="section-info">
                      <h4>{section.title}</h4>
                      <p>{section.items.length} items • {section.maxPoints} points</p>
                    </div>
                  </div>
                  <div className="section-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">
                      {sectionScore.score}/{section.maxPoints}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Section Content */}
        <div className="section-content">
          {activeSection_data && (
            <>
              <div className="section-title">
                <h2>Section {activeSection_data.id}: {activeSection_data.title}</h2>
                <p>Maximum Points: {activeSection_data.maxPoints} | Items: {activeSection_data.items.length}</p>
              </div>

              <div className="audit-items">
                {activeSection_data.items.map((item) => {
                  const key = `${activeSection_data.id}_${item.id}`;
                  const itemData = auditData[key] || {};
                  const hasNCR = itemData.ncr;
                  const hasPhotos = itemData.photos && itemData.photos.length > 0;
                  
                  return (
                    <div key={item.id} className="audit-item">
                      <div className="item-header">
                        <div className="item-info">
                          <h4>{activeSection_data.id}.{item.id}</h4>
                          <p>{item.criteria}</p>
                        </div>
                        <div className="item-points">
                          <span>Max: {item.points} points</span>
                        </div>
                      </div>
                      
                      <div className="item-actions">
                        <div className="scoring-section">
                          <label>Score:</label>
                          <select
                            value={itemData.score || ''}
                            onChange={(e) => handleScoreChange(activeSection_data.id, item.id, e.target.value)}
                            className="score-select"
                          >
                            <option value="">Select Score</option>
                            {Array.from({length: item.points + 1}, (_, i) => (
                              <option key={i} value={i}>{i}</option>
                            ))}
                          </select>
                          <span className="max-points">/ {item.points}</span>
                        </div>
                        
                        <div className="item-controls">
                          <input
                            type="file"
                            id={`photo-${key}`}
                            multiple
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(activeSection_data.id, item.id, e.target.files)}
                            style={{ display: 'none' }}
                          />
                          <button
                            className="btn btn-outline"
                            onClick={() => document.getElementById(`photo-${key}`).click()}
                          >
                            📸 Photo ({itemData.photos?.length || 0})
                          </button>
                          
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              setSelectedItem({ sectionId: activeSection_data.id, itemId: item.id });
                              setShowNCRForm(true);
                            }}
                          >
                            ⚠️ Create NCR
                          </button>
                        </div>
                      </div>
                      
                      <div className="item-remarks">
                        <label>Remarks:</label>
                        <textarea
                          value={itemData.remarks || ''}
                          onChange={(e) => handleRemarksChange(activeSection_data.id, item.id, e.target.value)}
                          placeholder="Add remarks or observations..."
                          rows="2"
                        />
                      </div>
                      
                      {/* Status Indicators */}
                      <div className="item-status">
                        {hasNCR && <span className="status-badge ncr">NCR Created</span>}
                        {hasPhotos && <span className="status-badge photos">Photos: {itemData.photos.length}</span>}
                        {itemData.score !== undefined && (
                          <span className="status-badge scored">
                            Scored: {itemData.score}/{item.points}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* NCR Form Modal */}
      {showNCRForm && renderNCRForm()}
    </div>
  );
};

export default ExcelAudit;