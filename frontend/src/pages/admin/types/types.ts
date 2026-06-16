export interface ICourseItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  instructor: string;
  price: number;
  status: 'Published' | 'Draft' | 'Archived';
  enrollments: number;
  modules: ICourseModule[];
  createdAt: string;
  thumbnailUrl?: string;
}

export interface ICourseModule {
  id: string;
  title: string;
  lessons: string[];
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Instructor' | 'Student' | 'Partner';
  status: 'Active' | 'Suspended';
  joinedAt: string;
}

export interface IActivityEntry {
  id: string;
  action: string;
  detail: string;
  time: string;
  type: 'course' | 'user' | 'payment';
}

export interface IAdminUser {
  email: string;
  name: string;
  role: 'super_admin' | 'admin';
}

export interface ISettings {
  siteName: string;
  supportEmail: string;
  allowRegistrations: boolean;
  requireEmailVerification: boolean;
  maintenanceMode: boolean;
  enableStripe: boolean;
  notifyOnNewUser: boolean;
}
