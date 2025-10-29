import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Camera, 
  Upload, 
  FileImage, 
  AlertTriangle, 
  XCircle, 
  ArrowLeft, 
  ArrowRight,
  Download
} from 'lucide-react';

const AuditSection = ({ auditSections, auditData, onUpdateAuditItem }) => {
  const { sectionId } = useParams();
  const section = auditSections.find(s => s.id === parseInt(sectionId));
  const [selectedItem, setSelectedItem] = useState(null);
  const fileInputRef = useRef(null);

  if (!section) {
    return <div>Section not found</div>;
  }

  const handleScoreChange = (itemId, score) => {
    onUpdateAuditItem(section.id, itemId, { score: parseInt(score) });
  };

  const handleRemarksChange = (itemId, remarks) => {
    onUpdateAuditItem(section.id, itemId, { remarks });
  };

  const handleEvidenceUpload = (itemId, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const evidenceData = {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          fileData: e.target.result,
          uploadDate: new Date().toISOString()
        };
        
        const existingData = auditData[`${section.id}-${itemId}`] || {};
        const existingEvidence = existingData.evidence || [];
        
        onUpdateAuditItem(section.id, itemId, {
          ...existingData,
          evidence: [...existingEvidence, evidenceData]
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (itemId) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setSelectedItem(itemId);
      // In a real app, you would implement camera capture here
      // For now, we'll just trigger the file input
      fileInputRef.current?.click();
    } else {
      alert('Camera not available. Please use the upload option.');
    }
  };

  const handleNCRCreate = (itemId) => {
    const ncrData = {
      id: `NCR-${section.id}-${itemId}-${Date.now()}`,
      itemId,
      sectionId: section.id,
      dateCreated: new Date().toISOString(),
      status: 'Open',
      severity: 'Medium',
      description: '',
      correctiveAction: '',
      targetDate: ''
    };
    
    const existingData = auditData[`${section.id}-${itemId}`] || {};
    const existingNCRs = existingData.ncrs || [];
    
    onUpdateAuditItem(section.id, itemId, {
      ...existingData,
      ncrs: [...existingNCRs, ncrData]
    });
  };

  const updateNCR = (itemId, ncrId, updates) => {
    const existingData = auditData[`${section.id}-${itemId}`] || {};
    const existingNCRs = existingData.ncrs || [];
    
    const updatedNCRs = existingNCRs.map(ncr => 
      ncr.id === ncrId ? { ...ncr, ...updates } : ncr
    );
    
    onUpdateAuditItem(section.id, itemId, {
      ...existingData,
      ncrs: updatedNCRs
    });
  };

  const removeEvidence = (itemId, evidenceIndex) => {
    const existingData = auditData[`${section.id}-${itemId}`] || {};
    const existingEvidence = existingData.evidence || [];
    
    const updatedEvidence = existingEvidence.filter((_, index) => index !== evidenceIndex);
    
    onUpdateAuditItem(section.id, itemId, {
      ...existingData,
      evidence: updatedEvidence
    });
  };

  const downloadEvidence = (evidence) => {
    const link = document.createElement('a');
    link.href = evidence.fileData;
    link.download = evidence.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getScoreColor = (score, maxPoints) => {
    if (score === null || score === undefined) return '#6b7280';
    const percentage = (score / maxPoints) * 100;
    if (percentage >= 80) return '#10b981';
    if (percentage >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const currentIndex = auditSections.findIndex(s => s.id === section.id);
  const previousSection = currentIndex > 0 ? auditSections[currentIndex - 1] : null;
  const nextSection = currentIndex < auditSections.length - 1 ? auditSections[currentIndex + 1] : null;

  return (
    <div className="audit-section">
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="card-title">
                Section {section.id}: {section.title}
              </h1>
              <p className="card-subtitle">
                {section.items.length} items • Maximum {section.maxPoints} points
              </p>
            </div>
            <div className="flex gap-3">
              {previousSection && (
                <Link 
                  to={`/section/${previousSection.id}`}
                  className="btn btn-secondary"
                >
                  <ArrowLeft className="icon" />
                  Previous
                </Link>
              )}
              {nextSection && (
                <Link 
                  to={`/section/${nextSection.id}`}
                  className="btn btn-primary"
                >
                  Next
                  <ArrowRight className="icon" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={(e) => {
          if (e.target.files[0] && selectedItem) {
            handleEvidenceUpload(selectedItem, e.target.files[0]);
            setSelectedItem(null);
          }
        }}
      />

      {section.items.map((item, index) => {
        const itemData = auditData[`${section.id}-${item.id}`] || {};
        const evidence = itemData.evidence || [];
        const ncrs = itemData.ncrs || [];

        return (
          <div key={item.id} className="card mb-4">
            <div className="card-header">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    {item.id}. {item.criteria}
                  </h3>
                  {item.category && (
                    <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full mb-2">
                      {item.category}
                    </span>
                  )}
                  <p className="text-gray-600 mb-2">
                    <strong>Guidelines:</strong> {item.guidelines}
                  </p>
                  <p className="text-gray-600">
                    <strong>Evidence Required:</strong> {item.evidence}
                  </p>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-sm text-gray-500 mb-2">
                    Max Points: {item.maxPoints}
                  </div>
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: getScoreColor(itemData.score, item.maxPoints) }}
                  >
                    {itemData.score !== undefined ? `${itemData.score}/${item.maxPoints}` : '-/-'}
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Scoring Section */}
                <div>
                  <h4 className="font-semibold mb-3">Scoring</h4>
                  <div className="form-group">
                    <label className="form-label">Score (0 - {item.maxPoints})</label>
                    <select
                      className="form-select"
                      value={itemData.score || ''}
                      onChange={(e) => handleScoreChange(item.id, e.target.value)}
                    >
                      <option value="">Select score</option>
                      {Array.from({ length: item.maxPoints + 1 }, (_, i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Remarks</label>
                    <textarea
                      className="form-textarea"
                      value={itemData.remarks || ''}
                      onChange={(e) => handleRemarksChange(item.id, e.target.value)}
                      placeholder="Enter detailed remarks about the findings..."
                      rows="4"
                    />
                  </div>
                </div>

                {/* Evidence Section */}
                <div>
                  <h4 className="font-semibold mb-3">Evidence</h4>
                  
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => handleCameraCapture(item.id)}
                      className="btn btn-primary"
                    >
                      <Camera className="icon" />
                      Take Photo
                    </button>
                    
                    <button
                      onClick={() => {
                        setSelectedItem(item.id);
                        fileInputRef.current?.click();
                      }}
                      className="btn btn-secondary"
                    >
                      <Upload className="icon" />
                      Upload File
                    </button>
                  </div>

                  {/* Evidence List */}
                  {evidence.length > 0 && (
                    <div className="evidence-list">
                      <h5 className="font-medium mb-2">Uploaded Evidence:</h5>
                      {evidence.map((file, fileIndex) => (
                        <div key={fileIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded mb-2">
                          <div className="flex items-center">
                            <FileImage className="icon mr-2 text-blue-500" />
                            <div>
                              <div className="font-medium text-sm">{file.fileName}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(file.uploadDate).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => downloadEvidence(file)}
                              className="btn btn-sm btn-secondary"
                            >
                              <Download className="icon" />
                            </button>
                            <button
                              onClick={() => removeEvidence(item.id, fileIndex)}
                              className="btn btn-sm btn-danger"
                            >
                              <XCircle className="icon" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* NCR Section */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold">Non-Conformance Reports (NCR)</h4>
                  <button
                    onClick={() => handleNCRCreate(item.id)}
                    className="btn btn-warning"
                  >
                    <AlertTriangle className="icon" />
                    Create NCR
                  </button>
                </div>

                {ncrs.length > 0 && (
                  <div className="ncr-list">
                    {ncrs.map((ncr) => (
                      <div key={ncr.id} className="ncr-item p-4 bg-yellow-50 border border-yellow-200 rounded mb-3">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h5 className="font-medium">NCR #{ncr.id}</h5>
                            <p className="text-sm text-gray-600">
                              Created: {new Date(ncr.dateCreated).toLocaleDateString()}
                            </p>
                          </div>
                          <select
                            value={ncr.status}
                            onChange={(e) => updateNCR(item.id, ncr.id, { status: e.target.value })}
                            className="form-select"
                            style={{ width: 'auto' }}
                          >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="form-group">
                            <label className="form-label">Severity</label>
                            <select
                              value={ncr.severity}
                              onChange={(e) => updateNCR(item.id, ncr.id, { severity: e.target.value })}
                              className="form-select"
                            >
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                              <option value="Critical">Critical</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label className="form-label">Target Date</label>
                            <input
                              type="date"
                              value={ncr.targetDate}
                              onChange={(e) => updateNCR(item.id, ncr.id, { targetDate: e.target.value })}
                              className="form-input"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Description</label>
                          <textarea
                            value={ncr.description}
                            onChange={(e) => updateNCR(item.id, ncr.id, { description: e.target.value })}
                            className="form-textarea"
                            placeholder="Describe the non-conformance..."
                            rows="3"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Corrective Action</label>
                          <textarea
                            value={ncr.correctiveAction}
                            onChange={(e) => updateNCR(item.id, ncr.id, { correctiveAction: e.target.value })}
                            className="form-textarea"
                            placeholder="Describe the corrective action taken or planned..."
                            rows="3"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <div>
          {previousSection && (
            <Link 
              to={`/section/${previousSection.id}`}
              className="btn btn-secondary"
            >
              <ArrowLeft className="icon" />
              Previous: {previousSection.title}
            </Link>
          )}
        </div>
        
        <Link to="/" className="btn btn-primary">
          Back to Dashboard
        </Link>
        
        <div>
          {nextSection ? (
            <Link 
              to={`/section/${nextSection.id}`}
              className="btn btn-primary"
            >
              Next: {nextSection.title}
              <ArrowRight className="icon" />
            </Link>
          ) : (
            <Link 
              to="/reports"
              className="btn btn-success"
            >
              View Report
              <ArrowRight className="icon" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditSection;