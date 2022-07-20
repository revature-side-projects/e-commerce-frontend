export type UserLoggedIn = {
    userId: number | undefined;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: number;
    isLoggedIn: boolean;
  }