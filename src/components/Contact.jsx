import React, { useState } from 'react';
import { FaEnvelope, FaPaperPlane, FaUser, FaComment } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare email data
    const emailData = {
      to: 'magicsquarelive@gmail.com',
      from: formData.email,
      subject: `Magic Square Contact: ${formData.subject}`,
      text: `
        Name: ${formData.name}
        Email: ${formData.email}
        Subject: ${formData.subject}
        
        Message:
        ${formData.message}
      `
    };
    
    // In a real application, you would send this to a backend service
    // For now, we'll simulate and show instructions for email
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      
      // Show email client with pre-filled data
      const mailtoLink = `mailto:magicsquarelive@gmail.com?subject=${encodeURIComponent(`Magic Square Contact: ${formData.subject}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoLink;
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000);
    }, 1000);
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      background: '#f8f9fa',
      minHeight: '100vh',
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '40px',
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '700',
          color: '#495057',
          margin: '0 0 15px 0',
          letterSpacing: '0.5px',
        }}>
          Get in Touch
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#6c757d',
          margin: '0',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.6',
        }}>
          Have questions, suggestions, or feedback? We'd love to hear from you! 
          Reach out to us using the form below.
        </p>
      </div>

      {/* Contact Form */}
      <div style={{
        background: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid #dee2e6',
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#495057',
          marginBottom: '25px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          justifyContent: 'center',
        }}>
          <FaPaperPlane style={{ color: '#6c757d' }} />
          Send us a Message
        </h2>

        {submitMessage && (
          <div style={{
            background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            fontWeight: '500',
            textAlign: 'center',
          }}>
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 480 ? '1fr' : '1fr 1fr',
            gap: '15px',
            marginBottom: '15px',
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: '#495057',
                marginBottom: '5px',
              }}>
                Name *
              </label>
              <div style={{ position: 'relative' }}>
                <FaUser style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6c757d',
                  fontSize: '0.9rem',
                }} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    border: '2px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    transition: 'border-color 0.2s ease',
                    outline: 'none',
                    boxSizing: 'border-box',
                    background: '#ffffff',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#6c757d'}
                  onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: '#495057',
                marginBottom: '5px',
              }}>
                Email *
              </label>
              <div style={{ position: 'relative' }}>
                <FaEnvelope style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6c757d',
                  fontSize: '0.9rem',
                }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    border: '2px solid #dee2e6',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    transition: 'border-color 0.2s ease',
                    outline: 'none',
                    boxSizing: 'border-box',
                    background: '#ffffff',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#6c757d'}
                  onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '500',
              color: '#495057',
              marginBottom: '5px',
            }}>
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                fontSize: '0.95rem',
                transition: 'border-color 0.2s ease',
                outline: 'none',
                boxSizing: 'border-box',
                background: '#ffffff',
              }}
              onFocus={(e) => e.target.style.borderColor = '#6c757d'}
              onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
              placeholder="What's this about?"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: '500',
              color: '#495057',
              marginBottom: '5px',
            }}>
              Message *
            </label>
            <div style={{ position: 'relative' }}>
              <FaComment style={{
                position: 'absolute',
                left: '12px',
                top: '12px',
                color: '#6c757d',
                fontSize: '0.9rem',
              }} />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="5"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  border: '2px solid #dee2e6',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  transition: 'border-color 0.2s ease',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  background: '#ffffff',
                }}
                onFocus={(e) => e.target.style.borderColor = '#6c757d'}
                onBlur={(e) => e.target.style.borderColor = '#dee2e6'}
                placeholder="Tell us more about your inquiry..."
              />
            </div>
          </div>

          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '20px',
            fontSize: '0.9rem',
            color: '#856404',
          }}>
            <strong>Note:</strong> Clicking "Send Message" will open your email client to send the message to magicsquarelive@gmail.com
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '14px',
              background: isSubmitting ? '#adb5bd' : 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(108, 117, 125, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <FaPaperPlane style={{ fontSize: '0.9rem' }} />
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* FAQ Section */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
        }}>
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#495057',
            marginBottom: '15px',
            textAlign: 'center',
          }}>
            Quick Questions?
          </h3>
          <div style={{
            fontSize: '0.9rem',
            color: '#6c757d',
            lineHeight: '1.6',
            textAlign: 'center',
          }}>
            <p style={{ marginBottom: '10px' }}>
              <strong>Response Time:</strong> We typically respond within few business days.
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Bug Reports:</strong> Please include your device type and browser version.
            </p>
            <p style={{ margin: '0' }}>
              <strong>Feature Requests:</strong> We love hearing your ideas for improving the game!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
