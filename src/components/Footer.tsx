export const Footer = () => {
  return (
    <footer style={{ 
      marginTop: '4rem', 
      padding: '2rem', 
      textAlign: 'center', 
      color: 'var(--color-text-400)',
      fontSize: '0.85rem'
    }}>
      <p>Data is simulated for demonstration purposes.</p>
      <p style={{ marginTop: '0.5rem' }}>&copy; {new Date().getFullYear()} Gold Monitor</p>
    </footer>
  );
};
