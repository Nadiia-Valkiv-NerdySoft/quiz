import { UserStatisticsAdmin } from './user-statistics-admin.model';

export interface User {
  id: number;
  dob: string;
  email: string;
  interests: string;
  last_name: string;
  first_name: string;
  statistics: UserStatisticsAdmin[];
}
