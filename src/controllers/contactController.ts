import { Request, Response } from 'express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';
import { resend } from '../config/resend.js';

// Setup PostgreSQL pool & Prisma adapter for Prisma 7
const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Zod Schema matching your React form fields
const contactSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  service: z.string(),
  budget: z.string(),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

// 1. POST /api/v1/contact - Save submitted form data & Send Email Notification
export const handleContactSubmit = async (req: Request, res: Response) => {
  try {
    const validatedData = contactSchema.parse(req.body);

    // Save to Database
    const newSubmission = await prisma.contactSubmission.create({
      data: validatedData,
    });

    // Send Email Notification via Resend
    try {
      await resend.emails.send({
        from: 'Digitalis Website <onboarding@resend.dev>', // Replace with your domain once verified on Resend
        to: process.env.NOTIFICATION_EMAIL || 'hello@digitalisglobal.com.au',
        subject: `New Inquiry from ${validatedData.fullName} - ${validatedData.service}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b;">
            <h2 style="color: #0284c7; margin-bottom: 16px;">New Website Contact Submission</h2>
            <p><strong>Full Name:</strong> ${validatedData.fullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
            <p><strong>Phone:</strong> ${validatedData.phone || 'N/A'}</p>
            <p><strong>Service Requested:</strong> ${validatedData.service}</p>
            <p><strong>Budget:</strong> ${validatedData.budget}</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p><strong>Project Details / Message:</strong></p>
            <blockquote style="background: #f8fafc; padding: 12px 16px; border-left: 4px solid #0284c7; margin: 0; border-radius: 4px; white-space: pre-wrap;">${validatedData.message}</blockquote>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">Submitted on ${new Date().toLocaleString()}</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send Resend email:', emailError);
      // We don't throw here so the user still gets a success response since the DB write succeeded
    }

    return res.status(201).json({
      success: true,
      message: 'Inquiry received successfully.',
      data: newSubmission,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: error.issues });
    }
    console.error('Submission Error:', error);
    return res.status(500).json({ success: false, message: 'Server error saving submission.' });
  }
};

// 2. GET /api/v1/contact - Fetch all submissions
export const getAllSubmissions = async (req: Request, res: Response) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.error('Fetch Error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching submissions.' });
  }
};