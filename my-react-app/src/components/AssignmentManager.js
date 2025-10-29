import React, { useState, useEffect } from 'react';

const AssignmentManager = ({ user }) => {
  const [assignments, setAssignments] = useState({});
  const [selectedAuditor, setSelectedAuditor] = useState('');
  const [selectedSections, setSelectedSections] = useState([]);
  const [auditType, setAuditType] = useState('manufacturing');
  const [selectedPlant, setSelectedPlant] = useState('');

  const auditors = {
    'Team-A': [
      { id: 'nishant', name: 'Nishant', status: 'available' },
      { id: 'nikhil', name: 'Nikhil', status: 'available' },
      { id: 'himesh', name: 'Himesh', status: 'available' },
      { id: 'dikshant', name: 'Dikshant', status: 'available' }
    ],
    'Team-B': [
      { id: 'saumya', name: 'Saumya', status: 'available' },
      { id: 'sahadat', name: 'Sahadat', status: 'available' },
      { id: 'abhay', name: 'Abhay', status: 'available' },
      { id: 'kanishk', name: 'Kanishk', status: 'available' }
    ]
  };

  // Plant Locations
  const plants = [
    'Gautam Solar - Haridwar Plant',
    'Gautam Solar - Badlyali Plant',
    'Gautam Solar - Meerut Plant',
    'Gautam Solar - Delhi Unit'
  ];



  const manufacturingSections = [
    'Production Line Audit',
    'Quality Control (IPQC/IQC)',
    'Safety & Compliance',
    'Equipment & Maintenance',
    'HR & Training',
    'Environmental Controls',
    'Documentation & Records',
    'Calibration & Testing'
  ];

  const recordKeepingSections = [
    'Quality Management Records',
    'Production Documentation',
    'Compliance & Regulatory Records',
    'Training & Personnel Records'
  ];

  const excelSections = [
    'Production Planning',
    'Material Management',
    'Quality Assurance',
    'Safety Management',
    'HR & Training',
    'Maintenance',
    'Environmental',
    'Documentation',
    'Testing & Calibration'
  ];

  const getSections = () => {
    switch(auditType) {
      case 'manufacturing': return manufacturingSections;
      case 'recordKeeping': return recordKeepingSections;
      case 'excel': return excelSections;
      default: return manufacturingSections;
    }
  };

  useEffect(() => {
    const savedAssignments = localStorage.getItem('auditAssignments');
    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments));
    }
  }, []);

  const saveAssignments = (newAssignments) => {
    setAssignments(newAssignments);
    localStorage.setItem('auditAssignments', JSON.stringify(newAssignments));
  };

  const assignSections = () => {
    if (!selectedAuditor || selectedSections.length === 0 || !selectedPlant) {
      alert('कृपया सभी fields fill करें: Auditor, Plant, और Sections!');
      return;
    }

    const newAssignments = { ...assignments };
    const assignmentKey = `${auditType}_${selectedAuditor}`;
    
    newAssignments[assignmentKey] = {
      auditorId: selectedAuditor,
      auditorName: getAllAuditors().find(a => a.id === selectedAuditor)?.name,
      auditType: auditType,

      plant: selectedPlant,
      sections: selectedSections,
      priority: 'Medium',
      assignedDate: new Date().toISOString().split('T')[0],
      assignedBy: user.name,
      status: 'assigned',
      progress: 0,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 7 days from now
    };

    saveAssignments(newAssignments);
    setSelectedAuditor('');
    setSelectedSections([]);
    setSelectedPlant('');
    alert(`✅ Assignment Successful!\n\nAuditor: ${getAllAuditors().find(a => a.id === selectedAuditor)?.name}\nPlant: ${selectedPlant}\nSections: ${selectedSections.length}\nDeadline: 7 days`);
  };

  const getAllAuditors = () => {
    return [...auditors['Team-A'], ...auditors['Team-B']];
  };

  const getAuditorAssignments = () => {
    return Object.values(assignments).filter(assignment => 
      assignment.auditType === auditType
    );
  };

  const removeAssignment = (assignmentKey) => {
    const newAssignments = { ...assignments };
    delete newAssignments[assignmentKey];
    saveAssignments(newAssignments);
  };

  const updateAssignmentStatus = (assignmentKey, newStatus) => {
    const newAssignments = { ...assignments };
    if (newAssignments[assignmentKey]) {
      newAssignments[assignmentKey].status = newStatus;
      if (newStatus === 'completed') {
        newAssignments[assignmentKey].completedDate = new Date().toISOString().split('T')[0];
        newAssignments[assignmentKey].progress = 100;
      }
      saveAssignments(newAssignments);
    }
  };

  if (user.role !== 'superadmin') {
    return (
      <div className="access-denied">
        <h2>🚫 Access Denied</h2>
        <p>केवल Super Admin assignment कर सकते हैं।</p>
      </div>
    );
  }

  return (
    <div className="assignment-manager">
      <div className="assignment-header">
        <h2>🎯 Audit Assignment Manager</h2>
        <p>Head Internal Auditor - Assignment Control Panel</p>
      </div>

      {/* Audit Type Selection */}
      <div className="audit-type-selector">
        <h3>Select Audit Type</h3>
        <div className="type-buttons">
          <button 
            className={`type-btn ${auditType === 'manufacturing' ? 'active' : ''}`}
            onClick={() => setAuditType('manufacturing')}
          >
            Manufacturing Audit
          </button>
          <button 
            className={`type-btn ${auditType === 'recordKeeping' ? 'active' : ''}`}
            onClick={() => setAuditType('recordKeeping')}
          >
            Record Keeping Audit
          </button>
          <button 
            className={`type-btn ${auditType === 'excel' ? 'active' : ''}`}
            onClick={() => setAuditType('excel')}
          >
            Excel Based Audit
          </button>
        </div>
      </div>

      {/* Assignment Form */}
      <div className="assignment-form">
        <h3>🏭 New Assignment</h3>
        
        {/* Plant Selection */}
        <div className="form-group">
          <label>🏢 Select Plant Location:</label>
          <select 
            value={selectedPlant} 
            onChange={(e) => setSelectedPlant(e.target.value)}
            className="plant-select"
          >
            <option value="">Choose Plant...</option>
            {plants.map(plant => (
              <option key={plant} value={plant}>
                {plant}
              </option>
            ))}
          </select>
        </div>

        {/* Auditor Selection */}
        <div className="form-group">
          <label>Select Auditor:</label>
          <select 
            value={selectedAuditor} 
            onChange={(e) => setSelectedAuditor(e.target.value)}
            className="auditor-select"
          >
            <option value="">Choose Auditor...</option>
            <optgroup label="Team-A">
              {auditors['Team-A'].map(auditor => (
                <option key={auditor.id} value={auditor.id}>
                  {auditor.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Team-B">
              {auditors['Team-B'].map(auditor => (
                <option key={auditor.id} value={auditor.id}>
                  {auditor.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Section Selection */}
        <div className="form-group">
          <label>📋 Select Sections to Assign:</label>
          <div className="sections-grid">
            {getSections().map((section, index) => {
              const isRecommended = false;
              return (
                <div key={index} className={`section-checkbox ${isRecommended ? 'recommended' : ''}`}>
                  <input
                  type="checkbox"
                  id={`section-${index}`}
                  checked={selectedSections.includes(section)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSections([...selectedSections, section]);
                    } else {
                      setSelectedSections(selectedSections.filter(s => s !== section));
                    }
                  }}
                />
                <label htmlFor={`section-${index}`}>
                  {section} {isRecommended && <span className="recommended-badge">⭐ Recommended</span>}
                </label>
              </div>
              );
            })}
          </div>
        </div>

        <button className="assign-btn" onClick={assignSections}>
          🎯 Assign Sections
        </button>
      </div>

      {/* Current Assignments */}
      <div className="current-assignments">
        <h3>Current Assignments - {auditType.charAt(0).toUpperCase() + auditType.slice(1)} Audit</h3>
        
        <div className="assignments-list">
          {getAuditorAssignments().length === 0 ? (
            <div className="no-assignments">
              <p>कोई assignment नहीं मिली इस audit type के लिए।</p>
            </div>
          ) : (
            getAuditorAssignments().map((assignment, index) => {
              const assignmentKey = `${assignment.auditType}_${assignment.auditorId}`;
              return (
                <div key={assignmentKey} className="assignment-card">
                  <div className="assignment-header-card">
                    <div className="assignment-info">
                      <h4>👤 {assignment.auditorName}</h4>
                      <div className="assignment-meta">
                        <span className="plant-info">🏢 {assignment.plant}</span>
                        <span className={`priority-badge priority-${assignment.priority?.toLowerCase()}`}>
                          {assignment.priority} Priority
                        </span>
                      </div>
                    </div>
                    <div className="assignment-actions">
                      <select 
                        value={assignment.status} 
                        onChange={(e) => updateAssignmentStatus(assignmentKey, e.target.value)}
                        className="status-select"
                      >
                        <option value="assigned">Assigned</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="on_hold">On Hold</option>
                      </select>
                      <button 
                        className="remove-btn"
                        onClick={() => removeAssignment(assignmentKey)}
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                  
                  <div className="assignment-details">
                    <p><strong>📅 Assigned Date:</strong> {assignment.assignedDate}</p>
                    <p><strong>⏰ Deadline:</strong> {assignment.deadline}</p>
                    <p><strong>👨‍💼 Assigned By:</strong> {assignment.assignedBy}</p>
                    {assignment.completedDate && (
                      <p><strong>✅ Completed Date:</strong> {assignment.completedDate}</p>
                    )}
                    <p><strong>Status:</strong> 
                      <span className={`status-badge ${assignment.status}`}>
                        {assignment.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </p>
                  </div>
                  
                  <div className="assigned-sections">
                    <h5>Assigned Sections:</h5>
                    <ul>
                      {assignment.sections.map((section, idx) => (
                        <li key={idx}>{section}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Team Overview */}
      <div className="team-overview">
        <h3>Team Overview</h3>
        <div className="teams-grid">
          {Object.entries(auditors).map(([teamName, teamMembers]) => (
            <div key={teamName} className="team-card">
              <h4>{teamName}</h4>
              <div className="team-members">
                {teamMembers.map(member => {
                  const memberAssignments = Object.values(assignments).filter(
                    a => a.auditorId === member.id
                  );
                  return (
                    <div key={member.id} className="member-status">
                      <span className="member-name">{member.name}</span>
                      <span className="assignment-count">
                        ({memberAssignments.length} assignments)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignmentManager;