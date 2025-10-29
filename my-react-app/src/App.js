import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ManufacturingAudit from './components/ManufacturingAudit';
import RecordKeepingAudit from './components/RecordKeepingAudit';
import ExcelAudit from './components/ExcelAudit';
import Reports from './components/Reports';
import Login from './components/Login';
import AssignmentManager from './components/AssignmentManager';
import ReportsMerger from './components/ReportsMerger';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [auditMode, setAuditMode] = useState('current'); // 'current' or 'excel'
  const [auditData, setAuditData] = useState({
    manufacturing: {},
    recordKeeping: {},
    excel: {}
  });
  const [auditInfo, setAuditInfo] = useState({
    companyName: 'Gautam Solar pvt. Ltd',
    plantLocation: '',
    auditDate: new Date().toISOString().split('T')[0],
    auditType: '',
    leadAuditor: '',
    auditTeam: '',
    departmentAudited: '',
    auditDuration: ''
  });

  // Check for existing session on app load
  useEffect(() => {
    const savedSession = localStorage.getItem('auditUserSession');
    if (savedSession) {
      const userSession = JSON.parse(savedSession);
      setUser(userSession);
      setIsAuthenticated(true);
    }
  }, []);

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('solarAuditData');
    const savedInfo = localStorage.getItem('solarAuditInfo');
    
    if (savedData) {
      setAuditData(JSON.parse(savedData));
    }
    
    if (savedInfo) {
      setAuditInfo(JSON.parse(savedInfo));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('solarAuditData', JSON.stringify(auditData));
  }, [auditData]);

  useEffect(() => {
    localStorage.setItem('solarAuditInfo', JSON.stringify(auditInfo));
  }, [auditInfo]);

  const updateAuditData = (auditType, sectionId, itemId, data) => {
    setAuditData(prev => ({
      ...prev,
      [auditType]: {
        ...prev[auditType],
        [`${sectionId}-${itemId}`]: {
          ...prev[auditType][`${sectionId}-${itemId}`],
          ...data
        }
      }
    }));
  };

  // Separate update function for Excel audit (uses different key structure)
  const updateExcelAuditData = (key, data) => {
    setAuditData(prev => ({
      ...prev,
      excel: {
        ...prev.excel,
        [key]: data
      }
    }));
  };

  const updateAuditInfo = (info) => {
    setAuditInfo(prev => ({ ...prev, ...info }));
  };

  const handleLogin = (userSession) => {
    setUser(userSession);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auditUserSession');
    setUser(null);
    setIsAuthenticated(false);
    setActiveView('dashboard');
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <Dashboard 
            auditData={auditData}
            auditInfo={auditInfo}
            auditMode={auditMode}
            setAuditMode={setAuditMode}
            setActiveView={setActiveView}
            onUpdateAuditInfo={updateAuditInfo}
            user={user}
          />
        );
      case 'manufacturing-audit':
        return (
          <ManufacturingAudit 
            auditData={auditData.manufacturing} 
            auditInfo={auditInfo}
            updateAuditData={(sectionId, itemId, data) => 
              updateAuditData('manufacturing', sectionId, itemId, data)
            }
          />
        );
      case 'record-keeping-audit':
        return (
          <RecordKeepingAudit 
            auditData={auditData.recordKeeping} 
            auditInfo={auditInfo}
            updateAuditData={(sectionId, itemId, data) => 
              updateAuditData('recordKeeping', sectionId, itemId, data)
            }
          />
        );
      case 'excel-audit':
        return (
          <ExcelAudit 
            auditData={auditData.excel} 
            auditInfo={auditInfo}
            updateAuditData={updateExcelAuditData}
          />
        );
      case 'reports':
        return (
          <Reports 
            auditData={auditData}
            auditInfo={auditInfo}
          />
        );
      case 'assignments':
        return (
          <AssignmentManager 
            user={user}
          />
        );
      case 'merger':
        return (
          <ReportsMerger 
            user={user}
          />
        );
      default:
        return (
          <Dashboard 
            auditData={auditData}
            auditInfo={auditInfo}
            auditMode={auditMode}
            setAuditMode={setAuditMode}
            setActiveView={setActiveView}
            onUpdateAuditInfo={updateAuditInfo}
            user={user}
          />
        );
    }
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <Header 
        user={user}
        onLogout={handleLogout}
      />
      <div className="app-container">
        <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView}
          user={user}
        />
        <main className="main-content">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
