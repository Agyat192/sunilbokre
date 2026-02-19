import nodemailer from 'nodemailer';

// Add CORS headers helper
const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Debug environment variables
    console.log('EMAIL_USER present:', !!process.env.EMAIL_USER);
    console.log('EMAIL_PASS present:', !!process.env.EMAIL_PASS);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Missing environment variables');
        return res.status(500).json({ success: false, message: 'Server configuration error: Missing email credentials' });
    }

    // Email transporter configuration
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'snlbokare@gmail.com',
            pass: 'hxan nois oxvc kzdj'
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'snlbokare@gmail.com', // Receiver address
        replyTo: email, // Set visitor's email as reply-to
        subject: `New Contact Form Submission from ${name}`,
        text: `
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `,
        html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: error.message || 'Failed to send email' });
    }
};

export default allowCors(handler);
