
import React from 'react';
import { FaBook, FaLightbulb } from 'react-icons/fa';

const RulesAndTips = ({ mobileActiveTab, setMobileActiveTab }) => {
  const isMobile = window.innerWidth < 768;
  
  // More compact sizing for mobile
  const tabPadding = isMobile ? '6px 10px' : '10px 15px';
  const tabFontSize = isMobile ? '0.75rem' : '0.9rem';
  const iconSize = isMobile ? '0.7rem' : '0.8rem';
  const tabGap = isMobile ? '4px' : '6px';
  const contentPadding = isMobile ? '5px 6px' : '8px 10px';
  const minHeight = isMobile ? '50px' : '70px';
  const contentFontSize = isMobile ? '0.7rem' : '0.85rem';
  const rulesFontSize = isMobile ? '0.65rem' : '0.75rem';

  return (
    <div style={{
      background: '#f8f9fa',
      borderBottom: '1px solid #e9ecef',
    }}>
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e9ecef',
      }}>
        {[
          { key: 'rules', label: 'Rules', icon: FaBook },
          { key: 'tips', label: 'Tips', icon: FaLightbulb },
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setMobileActiveTab(key)}
            style={{
              flex: 1,
              padding: tabPadding,
              background: mobileActiveTab === key ? '#ffffff' : 'transparent',
              color: mobileActiveTab === key ? '#667eea' : '#6c757d',
              border: 'none',
              borderBottom: mobileActiveTab === key ? '2px solid #667eea' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: tabFontSize,
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: tabGap,
              transition: 'all 0.2s ease',
            }}
          >
            {React.createElement(icon, { style: { fontSize: iconSize } })}
            {label}
          </button>
        ))}
      </div>

      <div style={{
        padding: contentPadding,
        background: '#ffffff',
        minHeight: minHeight,
        fontSize: contentFontSize,
        lineHeight: '1.4',
        color: '#5a6c7d',
      }}>
        {mobileActiveTab === 'rules' ? (
            <div>
              <div style={{ marginBottom: '3px', fontWeight: '600', color: '#2c3e50' }}>
                Rules:
              </div>
              <div style={{ fontSize: rulesFontSize }}>
                • Use BODMAS rule - left to right in rows and top to bottom in columns<br/>
                • Fill the blanks with single digits from 1 to 9 to complete the equations<br/>
                • Each digit can come only once in an equation of a row or column<br/>
                • All digits from 1 to 9 should come at least once in the overall square.<br/>
              </div>
            </div>
        ) : (
          <div>
            <div style={{ marginBottom: '3px', fontWeight: '600', color: '#2c3e50' }}>
              Hints:
            </div>
            <div style={{ fontSize: rulesFontSize }}>
              • Use BODMAS rule to solve equations: LEFT to RIGHT in rows, TOP to BOTTOM in columns<br/>
              • First solve Division (/) or Multiplication (*) (whichever comes first from left), then Addition (+) or Subtraction (-)<br/>
              • Example: 7*5+4/2-1 = 35+4/2-1 = 35+2-1 = 37-1 = 36<br/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RulesAndTips;
