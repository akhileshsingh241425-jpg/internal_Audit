import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="modern-header">
      <div className="header-container">
        <div className="header-brand">
          <div className="brand-icon">🏭</div>
          <div className="brand-text">
            <h1>Gautam Solar</h1>
            <p>Internal Audit System</p>
          </div>
        </div>
        
        <div className="header-actions">
          {user && (
            <>
              <div className="user-profile">
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-info-header">
                  <span className="user-name-header">{user.name}</span>
                  <span className={`user-role-badge ${user.role}`}>
                    {user.role === 'superadmin' && '� Super Admin'}
                    {user.role === 'admin' && '🔧 Admin'}
                    {user.role === 'auditor' && '📋 Auditor'}
                  </span>
                </div>
              </div>
              <button className="logout-button" onClick={onLogout}>
                <span>🚪</span>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;