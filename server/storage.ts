import { users, inquiries, consultationBookings, type User, type InsertUser, type Inquiry, type InsertInquiry, type ConsultationBooking, type InsertConsultationBooking } from "@shared/schema";

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
      isRead: false 
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
      status: "pending"
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
}

export const storage = new MemStorage();
