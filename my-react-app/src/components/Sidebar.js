import React from 'react';

const Sidebar = ({ activeView, setActiveView, user }) => {
  const menuItems = [
    { 
      id: 'dashboard', 
      icon: '📊', 
      text: 'Dashboard',
      description: 'Overview & Summary',
      roles: ['superadmin', 'admin', 'auditor']
    },
    { 
      id: 'assignments', 
      icon: '🎯', 
      text: 'Assignment Manager',
      description: 'Assign Auditors to Sections',
      roles: ['superadmin']
    },
    { 
      id: 'merger', 
      icon: '📋', 
      text: 'Reports Merger',
      description: 'Consolidate Final Reports',
      roles: ['superadmin']
    },
    { 
      id: 'manufacturing-audit', 
      icon: '🏭', 
      text: 'Manufacturing Audit',
      description: 'Production Operations',
      roles: ['superadmin', 'admin', 'auditor']
    },
    { 
      id: 'record-keeping-audit', 
      icon: '📄', 
      text: 'Record Keeping Audit',
      description: 'Documentation Check',
      roles: ['superadmin', 'admin', 'auditor']
    },
    { 
      id: 'excel-audit', 
      icon: '📊', 
      text: 'Excel-Based Audit',
      description: '9-Section Traditional',
      roles: ['superadmin', 'admin', 'auditor']
    },
    { 
      id: 'reports', 
      icon: '📈', 
      text: 'Reports',
      description: 'Analysis & Export',
      roles: ['superadmin', 'admin']
    }
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>🔍 Solar Audit</h3>
        <p>Internal Assessment System</p>
        {user && (
          <div className="user-badge">
            <span className={`role-badge ${user.role}`}>
              {user.role === 'superadmin' ? '🔱 Super Admin' : user.role === 'admin' ? '👔 Admin' : '📋 Auditor'}
            </span>
            <span className="user-name-small">{user.name}</span>
          </div>
        )}
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {filteredMenuItems.map(item => (
            <li key={item.id}>
              <button
                className={`nav-link ${activeView === item.id ? 'active' : ''}`}
                onClick={() => setActiveView(item.id)}
              >
                <div className="nav-content">
                  <span className="nav-icon">{item.icon}</span>
                  <div className="nav-text">
                    <span className="nav-title">{item.text}</span>
                    <span className="nav-description">{item.description}</span>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        {user && (
          <div className="sidebar-user-profile">
            <div className="sidebar-user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user.name}</div>
              <div className="sidebar-user-email">
                {user.username}@gautamsolar.com
              </div>
            </div>
            <button className="sidebar-user-menu">⋯</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;