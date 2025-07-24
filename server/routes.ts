import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertConsultationBookingSchema, insertProjectCommentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse({
        ...req.body,
        type: "contact"
      });
      
      const inquiry = await storage.createInquiry(validatedData);
      
      res.json({ 
        success: true, 
        message: "Thank you for your message! We'll get back to you soon.",
        id: inquiry.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Please fill in all required fields correctly.",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Something went wrong. Please try again later." 
        });
      }
    }
  });

  // Consultation booking
  app.post("/api/consultation", async (req, res) => {
    try {
      const validatedData = insertConsultationBookingSchema.parse(req.body);
      
      const booking = await storage.createConsultationBooking(validatedData);
      
      res.json({ 
        success: true, 
        message: "Your consultation has been booked! We'll contact you to confirm the details.",
        id: booking.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Please fill in all required fields correctly.",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Something went wrong. Please try again later." 
        });
      }
    }
  });

  // Service-specific quote requests
  app.post("/api/quote", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse({
        ...req.body,
        type: "quote"
      });
      
      const inquiry = await storage.createInquiry(validatedData);
      
      res.json({ 
        success: true, 
        message: "Thank you for your interest! We'll prepare a custom quote for you.",
        id: inquiry.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Please fill in all required fields correctly.",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Something went wrong. Please try again later." 
        });
      }
    }
  });

  // Get all inquiries (for admin dashboard if needed)
  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch inquiries" 
      });
    }
  });

  // Get all consultation bookings (for admin dashboard if needed)
  app.get("/api/consultations", async (req, res) => {
    try {
      const bookings = await storage.getConsultationBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch consultation bookings" 
      });
    }
  });

  // Client Portal API routes
  app.get("/api/projects", async (req, res) => {
    try {
      const clientId = req.query.clientId ? parseInt(req.query.clientId as string) : undefined;
      const projects = await storage.getProjects(clientId);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.get("/api/tasks", async (req, res) => {
    try {
      const projectId = req.query.projectId ? parseInt(req.query.projectId as string) : undefined;
      const tasks = await storage.getTasks(projectId);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });

  app.get("/api/time-entries", async (req, res) => {
    try {
      const projectId = req.query.projectId ? parseInt(req.query.projectId as string) : undefined;
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const timeEntries = await storage.getTimeEntries(projectId, userId);
      res.json(timeEntries);
    } catch (error) {
      console.error("Error fetching time entries:", error);
      res.status(500).json({ message: "Failed to fetch time entries" });
    }
  });

  app.get("/api/project-comments/:projectId", async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      const comments = await storage.getProjectComments(projectId);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching project comments:", error);
      res.status(500).json({ message: "Failed to fetch project comments" });
    }
  });

  app.post("/api/project-comments", async (req, res) => {
    try {
      const validatedData = insertProjectCommentSchema.parse(req.body);
      const comment = await storage.createProjectComment(validatedData);
      res.status(201).json(comment);
    } catch (error) {
      console.error("Error creating project comment:", error);
      res.status(500).json({ message: "Failed to create project comment" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
