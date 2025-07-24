import { 
  users, 
  inquiries, 
  consultationBookings,
  projects,
  tasks,
  projectComments,
  timeEntries,
  type User, 
  type InsertUser, 
  type Inquiry, 
  type InsertInquiry, 
  type ConsultationBooking, 
  type InsertConsultationBooking,
  type Project,
  type InsertProject,
  type Task,
  type InsertTask,
  type ProjectComment,
  type InsertProjectComment,
  type TimeEntry,
  type InsertTimeEntry
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
  getInquiry(id: number): Promise<Inquiry | undefined>;
  markInquiryAsRead(id: number): Promise<Inquiry | undefined>;
  
  createConsultationBooking(booking: InsertConsultationBooking): Promise<ConsultationBooking>;
  getConsultationBookings(): Promise<ConsultationBooking[]>;
  getConsultationBooking(id: number): Promise<ConsultationBooking | undefined>;
  updateConsultationBookingStatus(id: number, status: string): Promise<ConsultationBooking | undefined>;

  // Client Portal methods
  getProjects(clientId?: number): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined>;
  
  getTasks(projectId?: number): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, updates: Partial<InsertTask>): Promise<Task | undefined>;
  
  getProjectComments(projectId: number): Promise<ProjectComment[]>;
  createProjectComment(comment: InsertProjectComment): Promise<ProjectComment>;
  
  getTimeEntries(projectId?: number, userId?: number): Promise<TimeEntry[]>;
  createTimeEntry(timeEntry: InsertTimeEntry): Promise<TimeEntry>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private inquiries: Map<number, Inquiry>;
  private consultationBookings: Map<number, ConsultationBooking>;
  private currentUserId: number;
  private currentInquiryId: number;
  private currentBookingId: number;

  constructor() {
    this.users = new Map();
    this.inquiries = new Map();
    this.consultationBookings = new Map();
    this.currentUserId = 1;
    this.currentInquiryId = 1;
    this.currentBookingId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id, 
      createdAt: new Date(),
      isRead: false,
      type: insertInquiry.type || 'contact'
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getInquiry(id: number): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }

  async markInquiryAsRead(id: number): Promise<Inquiry | undefined> {
    const inquiry = this.inquiries.get(id);
    if (inquiry) {
      const updatedInquiry = { ...inquiry, isRead: true };
      this.inquiries.set(id, updatedInquiry);
      return updatedInquiry;
    }
    return undefined;
  }

  async createConsultationBooking(insertBooking: InsertConsultationBooking): Promise<ConsultationBooking> {
    const id = this.currentBookingId++;
    const booking: ConsultationBooking = { 
      ...insertBooking, 
      id, 
      createdAt: new Date(),
      status: "pending",
      description: insertBooking.description || null,
      preferredDate: insertBooking.preferredDate || null,
      preferredTime: insertBooking.preferredTime || null
    };
    this.consultationBookings.set(id, booking);
    return booking;
  }

  async getConsultationBookings(): Promise<ConsultationBooking[]> {
    return Array.from(this.consultationBookings.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getConsultationBooking(id: number): Promise<ConsultationBooking | undefined> {
    return this.consultationBookings.get(id);
  }

  async updateConsultationBookingStatus(id: number, status: string): Promise<ConsultationBooking | undefined> {
    const booking = this.consultationBookings.get(id);
    if (booking) {
      const updatedBooking = { ...booking, status };
      this.consultationBookings.set(id, updatedBooking);
      return updatedBooking;
    }
    return undefined;
  }

  // Client Portal methods (mock implementations for MemStorage)
  async getProjects(clientId?: number): Promise<Project[]> {
    return [];
  }

  async getProject(id: number): Promise<Project | undefined> {
    return undefined;
  }

  async createProject(project: InsertProject): Promise<Project> {
    return {
      id: 1,
      name: project.name,
      description: project.description,
      clientId: project.clientId,
      managerId: project.managerId,
      status: project.status || "planning",
      priority: project.priority || "medium",
      budget: project.budget,
      spent: "0",
      startDate: project.startDate,
      endDate: project.endDate,
      estimatedHours: project.estimatedHours,
      actualHours: 0,
      progress: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined> {
    return undefined;
  }

  async getTasks(projectId?: number): Promise<Task[]> {
    return [];
  }

  async getTask(id: number): Promise<Task | undefined> {
    return undefined;
  }

  async createTask(task: InsertTask): Promise<Task> {
    return {
      id: 1,
      projectId: task.projectId,
      title: task.title,
      description: task.description,
      assigneeId: task.assigneeId,
      status: task.status || "todo",
      priority: task.priority || "medium",
      estimatedHours: task.estimatedHours,
      actualHours: 0,
      dueDate: task.dueDate,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  async updateTask(id: number, updates: Partial<InsertTask>): Promise<Task | undefined> {
    return undefined;
  }

  async getProjectComments(projectId: number): Promise<ProjectComment[]> {
    return [];
  }

  async createProjectComment(comment: InsertProjectComment): Promise<ProjectComment> {
    return {
      id: 1,
      projectId: comment.projectId,
      userId: comment.userId,
      content: comment.content,
      isInternal: comment.isInternal || false,
      createdAt: new Date()
    };
  }

  async getTimeEntries(projectId?: number, userId?: number): Promise<TimeEntry[]> {
    return [];
  }

  async createTimeEntry(timeEntry: InsertTimeEntry): Promise<TimeEntry> {
    return {
      id: 1,
      projectId: timeEntry.projectId,
      taskId: timeEntry.taskId,
      userId: timeEntry.userId,
      description: timeEntry.description,
      hours: timeEntry.hours,
      date: timeEntry.date,
      createdAt: new Date()
    };
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const [result] = await db
      .insert(inquiries)
      .values(inquiry)
      .returning();
    return result;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }

  async getInquiry(id: number): Promise<Inquiry | undefined> {
    const [inquiry] = await db.select().from(inquiries).where(eq(inquiries.id, id));
    return inquiry || undefined;
  }

  async markInquiryAsRead(id: number): Promise<Inquiry | undefined> {
    const [inquiry] = await db
      .update(inquiries)
      .set({ isRead: true })
      .where(eq(inquiries.id, id))
      .returning();
    return inquiry || undefined;
  }

  async createConsultationBooking(booking: InsertConsultationBooking): Promise<ConsultationBooking> {
    const [result] = await db
      .insert(consultationBookings)
      .values(booking)
      .returning();
    return result;
  }

  async getConsultationBookings(): Promise<ConsultationBooking[]> {
    return await db.select().from(consultationBookings).orderBy(desc(consultationBookings.createdAt));
  }

  async getConsultationBooking(id: number): Promise<ConsultationBooking | undefined> {
    const [booking] = await db.select().from(consultationBookings).where(eq(consultationBookings.id, id));
    return booking || undefined;
  }

  async updateConsultationBookingStatus(id: number, status: string): Promise<ConsultationBooking | undefined> {
    const [booking] = await db
      .update(consultationBookings)
      .set({ status })
      .where(eq(consultationBookings.id, id))
      .returning();
    return booking || undefined;
  }

  // Client Portal methods
  async getProjects(clientId?: number): Promise<Project[]> {
    if (clientId) {
      return await db.select().from(projects).where(eq(projects.clientId, clientId)).orderBy(desc(projects.createdAt));
    }
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [result] = await db
      .insert(projects)
      .values(project)
      .returning();
    return result;
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const [project] = await db
      .update(projects)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project || undefined;
  }

  async getTasks(projectId?: number): Promise<Task[]> {
    if (projectId) {
      return await db.select().from(tasks).where(eq(tasks.projectId, projectId)).orderBy(desc(tasks.createdAt));
    }
    return await db.select().from(tasks).orderBy(desc(tasks.createdAt));
  }

  async getTask(id: number): Promise<Task | undefined> {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    return task || undefined;
  }

  async createTask(task: InsertTask): Promise<Task> {
    const [result] = await db
      .insert(tasks)
      .values(task)
      .returning();
    return result;
  }

  async updateTask(id: number, updates: Partial<InsertTask>): Promise<Task | undefined> {
    const [task] = await db
      .update(tasks)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(tasks.id, id))
      .returning();
    return task || undefined;
  }

  async getProjectComments(projectId: number): Promise<ProjectComment[]> {
    return await db.select().from(projectComments).where(eq(projectComments.projectId, projectId)).orderBy(desc(projectComments.createdAt));
  }

  async createProjectComment(comment: InsertProjectComment): Promise<ProjectComment> {
    const [result] = await db
      .insert(projectComments)
      .values(comment)
      .returning();
    return result;
  }

  async getTimeEntries(projectId?: number, userId?: number): Promise<TimeEntry[]> {
    let query = db.select().from(timeEntries);
    
    if (projectId && userId) {
      query = query.where(and(eq(timeEntries.projectId, projectId), eq(timeEntries.userId, userId)));
    } else if (projectId) {
      query = query.where(eq(timeEntries.projectId, projectId));
    } else if (userId) {
      query = query.where(eq(timeEntries.userId, userId));
    }
    
    return await query.orderBy(desc(timeEntries.date));
  }

  async createTimeEntry(timeEntry: InsertTimeEntry): Promise<TimeEntry> {
    const [result] = await db
      .insert(timeEntries)
      .values(timeEntry)
      .returning();
    return result;
  }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
