import React from 'react';

function App() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: '20px',
      backgroundColor: '#f0f8f0'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#2E7D32',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        marginBottom: '30px',
        borderRadius: '10px'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>🌱 Mubwiza Garden 🌱</h1>
        <p style={{ margin: '10px 0 0 0', fontSize: '1.2rem' }}>
          Fresh flowers, vegetables, fruits, tea spices & quality seedlings from Rwanda
        </p>
      </div>

      {/* Image Gallery */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <img
            src="/images/flower 1.jpg"
            alt="Beautiful Flowers"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '15px'
            }}
          />
          <h3 style={{ color: '#2E7D32', margin: 0 }}>🌺 Beautiful Flowers</h3>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <img
            src="/images/vegatebles in the garden.jpeg"
            alt="Fresh Vegetables"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '15px'
            }}
          />
          <h3 style={{ color: '#2E7D32', margin: 0 }}>🥬 Fresh Vegetables</h3>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <img
            src="/images/strowberries.jpeg"
            alt="Sweet Strawberries"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '15px'
            }}
          />
          <h3 style={{ color: '#2E7D32', margin: 0 }}>🍓 Sweet Strawberries</h3>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          textAlign: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <img
            src="/images/mint tea.jpeg"
            alt="Aromatic Tea"
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '15px'
            }}
          />
          <h3 style={{ color: '#2E7D32', margin: 0 }}>🍃 Aromatic Tea</h3>
        </div>
      </div>

      {/* Contact Section */}
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#2E7D32', marginBottom: '20px' }}>📞 Contact Us</h2>
        <p style={{ margin: '10px 0', fontSize: '1.1rem' }}>
          📍 Muhabura Integrated Polytechnic College (MIPC), Musanze District, Rwanda
        </p>
        <p style={{ margin: '10px 0', fontSize: '1.1rem' }}>
          📱 Instagram: @mubwiza_garden
        </p>
        <p style={{ margin: '10px 0', fontSize: '1.1rem' }}>
          ☎️ Phone: 0788759351
        </p>
      </div>
    </div>
  );
}

export default App;
