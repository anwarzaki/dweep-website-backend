import { sendEmail } from '../utils/sendEmail.js';

export const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'All fields are required',
        error: 'Missing required fields' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Invalid email format',
        error: 'Please provide a valid email address' 
      });
    }
    
    const emailSubject = 'New Contact Form Submission';
    const emailText = `
      New Contact Form Submission:
      
      Name: ${name}
      Email: ${email}
      Message: ${message}
      
      Submitted at: ${new Date().toLocaleString()}
    `;
    
    await sendEmail(process.env.EMAIL, emailSubject, emailText);
    
    res.status(200).json({ 
      message: 'Message sent successfully',
      success: true 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'Failed to send message', 
      error: error.message 
    });
  }
};
