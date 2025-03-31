function InlineStylingComponent() {
    const containerStyle = {
      backgroundColor: '#f0f0f0',
      padding: '20px',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif',
    };
  
    const headingStyle = {
      color: '#333',
      fontSize: '24px',
      marginBottom: '10px',
    };
  
    const paragraphStyle = {
      color: '#666',
      fontSize: '16px',
      lineHeight: '1.5',
    };
  
    return (
      <div style={containerStyle}>
        <h1 style={headingStyle}>Welcome!</h1>
        <p style={paragraphStyle}>This is an example of inline styling in React.</p>
      </div>
    );
  }

  export default InlineStylingComponent;