require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 8080;

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'AJFS Backend API',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  const {
    name, email, subject, message,
    // Strategy call specific fields
    fullName, company, phone, cloudPlatform, primaryChallenge, type
  } = req.body;

  // Determine form type and validate accordingly
  const isStrategyCall = type === 'strategy-call';
  const contactName = fullName || name;
  const contactEmail = email;

  // Validation
  if (!contactEmail) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  if (!contactName) {
    return res.status(400).json({ error: isStrategyCall ? 'Full Name is required.' : 'Name is required.' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(contactEmail)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  // Sanitize inputs
  const sanitizedName = contactName.trim().substring(0, 100);
  const sanitizedEmail = contactEmail.trim().toLowerCase().substring(0, 100);
  const sanitizedMessage = (message || '').trim().substring(0, 2000);

  let mailSubject = '';
  let htmlContent = '';

  if (isStrategyCall) {
    mailSubject = 'New Cloud Strategy Call Request';
    const sanitizedCompany = (company || '').trim().substring(0, 100);
    const sanitizedPhone = (phone || '').trim().substring(0, 20);
    const sanitizedPlatform = (cloudPlatform || '').trim().substring(0, 100);
    const sanitizedChallenge = (primaryChallenge || '').trim().substring(0, 100);

    htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 5px 5px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #007bff; }
          .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #007bff; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Cloud Strategy Call Request</h2>
            <p>A new strategy call has been requested</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${sanitizedName}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${sanitizedEmail}</div>
            </div>
            ${sanitizedCompany ? `<div class="field">
              <div class="label">Company:</div>
              <div class="value">${sanitizedCompany}</div>
            </div>` : ''}
            ${sanitizedPhone ? `<div class="field">
              <div class="label">Phone:</div>
              <div class="value">${sanitizedPhone}</div>
            </div>` : ''}
            ${sanitizedPlatform ? `<div class="field">
              <div class="label">Primary Cloud Platform:</div>
              <div class="value">${sanitizedPlatform}</div>
            </div>` : ''}
            ${sanitizedChallenge ? `<div class="field">
              <div class="label">Primary Challenge:</div>
              <div class="value">${sanitizedChallenge}</div>
            </div>` : ''}
            ${sanitizedMessage ? `<div class="field">
              <div class="label">Additional Context:</div>
              <div class="value">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
            </div>` : ''}
          </div>
        </div>
      </body>
      </html>
    `;
  } else {
    // Standard contact form
    const sanitizedSubject = (subject || 'General Inquiry').trim().substring(0, 200);
    if (!sanitizedMessage) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    mailSubject = `New Contact Form Inquiry: ${sanitizedSubject}`;
    htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 5px 5px 0 0; }
          .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #007bff; }
          .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #007bff; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
            <p>You have received a new inquiry from your website</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${sanitizedName}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${sanitizedEmail}</div>
            </div>
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${sanitizedSubject}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  try {
    const transporter = createTransporter();

    // Verify transporter configuration
    await transporter.verify();

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: mailSubject,
      html: htmlContent,
      text: `
        ${mailSubject}

        Name: ${sanitizedName}
        Email: ${sanitizedEmail}
        ${(company || '') ? `Company: ${company}\n` : ''}
        ${(phone || '') ? `Phone: ${phone}\n` : ''}
        ${(cloudPlatform || '') ? `Cloud Platform: ${cloudPlatform}\n` : ''}
        ${(primaryChallenge || '') ? `Primary Challenge: ${primaryChallenge}\n` : ''}

        ${sanitizedMessage ? `Message:\n${sanitizedMessage}` : ''}
      `,
      replyTo: sanitizedEmail,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({
      message: 'Message sent successfully!',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);

    // Don't expose internal errors to client
    res.status(500).json({
      error: 'Failed to send message. Please try again later or contact us directly.'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ AJFS Backend server running on port ${PORT}`);
  console.log(`📧 Email configured for: ${process.env.EMAIL_USER}`);
  console.log(`🌍 CORS origin: ${process.env.FRONTEND_URL || '*'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
