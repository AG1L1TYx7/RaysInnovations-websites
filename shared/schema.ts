import { pgTable, text, serial, timestamp, boolean, integer, decimal, varchar, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  role: text("role").notNull().default("client"), // client, admin, manager
  avatar: text("avatar"),
  phone: text("phone"),
  company: text("company"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull().default("contact"), // contact, consultation, quote
  createdAt: timestamp("created_at").defaultNow(),
  isRead: boolean("is_read").default(false),
});

export const consultationBookings = pgTable("consultation_bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  description: text("description"),
  preferredDate: text("preferred_date"),
  preferredTime: text("preferred_time"),
  createdAt: timestamp("created_at").defaultNow(),
  status: text("status").notNull().default("pending"), // pending, confirmed, completed, cancelled
});

// Client Portal Tables
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  clientId: integer("client_id").notNull().references(() => users.id),
  managerId: integer("manager_id").references(() => users.id),
  status: text("status").notNull().default("planning"), // planning, in_progress, review, completed, on_hold
  priority: text("priority").notNull().default("medium"), // low, medium, high, urgent
  budget: decimal("budget", { precision: 10, scale: 2 }),
  spent: decimal("spent", { precision: 10, scale: 2 }).default("0"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  estimatedHours: integer("estimated_hours"),
  actualHours: integer("actual_hours").default(0),
  progress: integer("progress").default(0), // 0-100
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  title: text("title").notNull(),
  description: text("description"),
  assigneeId: integer("assignee_id").references(() => users.id),
  status: text("status").notNull().default("todo"), // todo, in_progress, review, completed
  priority: text("priority").notNull().default("medium"), // low, medium, high, urgent
  estimatedHours: integer("estimated_hours"),
  actualHours: integer("actual_hours").default(0),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projectFiles = pgTable("project_files", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  name: text("name").notNull(),
  originalName: text("original_name").notNull(),
  size: integer("size").notNull(),
  mimeType: text("mime_type").notNull(),
  path: text("path").notNull(),
  uploadedBy: integer("uploaded_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projectComments = pgTable("project_comments", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  userId: integer("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  isInternal: boolean("is_internal").default(false), // internal comments visible only to team
  createdAt: timestamp("created_at").defaultNow(),
});

export const timeEntries = pgTable("time_entries", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  taskId: integer("task_id").references(() => tasks.id),
  userId: integer("user_id").notNull().references(() => users.id),
  description: text("description").notNull(),
  hours: decimal("hours", { precision: 4, scale: 2 }).notNull(),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  clientId: integer("client_id").notNull().references(() => users.id),
  invoiceNumber: text("invoice_number").notNull().unique(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("draft"), // draft, sent, paid, overdue
  dueDate: timestamp("due_date").notNull(),
  paidDate: timestamp("paid_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projectMilestones = pgTable("project_milestones", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  completedDate: timestamp("completed_date"),
  status: text("status").notNull().default("pending"), // pending, completed, overdue
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
  phone: true,
  company: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  service: true,
  message: true,
  type: true,
});

export const insertConsultationBookingSchema = createInsertSchema(consultationBookings).pick({
  name: true,
  email: true,
  phone: true,
  service: true,
  description: true,
  preferredDate: true,
  preferredTime: true,
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  managedProjects: many(projects),
  tasks: many(tasks),
  timeEntries: many(timeEntries),
  comments: many(projectComments),
  invoices: many(invoices),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  client: one(users, { fields: [projects.clientId], references: [users.id] }),
  manager: one(users, { fields: [projects.managerId], references: [users.id] }),
  tasks: many(tasks),
  files: many(projectFiles),
  comments: many(projectComments),
  timeEntries: many(timeEntries),
  invoices: many(invoices),
  milestones: many(projectMilestones),
}));

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  project: one(projects, { fields: [tasks.projectId], references: [projects.id] }),
  assignee: one(users, { fields: [tasks.assigneeId], references: [users.id] }),
  timeEntries: many(timeEntries),
}));

// Insert Schemas
export const insertProjectSchema = createInsertSchema(projects).pick({
  name: true,
  description: true,
  clientId: true,
  managerId: true,
  status: true,
  priority: true,
  budget: true,
  startDate: true,
  endDate: true,
  estimatedHours: true,
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  projectId: true,
  title: true,
  description: true,
  assigneeId: true,
  status: true,
  priority: true,
  estimatedHours: true,
  dueDate: true,
});

export const insertProjectCommentSchema = createInsertSchema(projectComments).pick({
  projectId: true,
  userId: true,
  content: true,
  isInternal: true,
});

export const insertTimeEntrySchema = createInsertSchema(timeEntries).pick({
  projectId: true,
  taskId: true,
  userId: true,
  description: true,
  hours: true,
  date: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertConsultationBooking = z.infer<typeof insertConsultationBookingSchema>;
export type ConsultationBooking = typeof consultationBookings.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;
export type ProjectFile = typeof projectFiles.$inferSelect;
export type ProjectComment = typeof projectComments.$inferSelect;
export type InsertProjectComment = z.infer<typeof insertProjectCommentSchema>;
export type TimeEntry = typeof timeEntries.$inferSelect;
export type InsertTimeEntry = z.infer<typeof insertTimeEntrySchema>;
export type Invoice = typeof invoices.$inferSelect;
export type ProjectMilestone = typeof projectMilestones.$inferSelect;
