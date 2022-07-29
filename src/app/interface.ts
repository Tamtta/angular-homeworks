export interface USER {
  id: string;
  email: string;
  password: string;
  confirm: string;
  nickname: string;
  phoneNumber: string;
  website: string;
  agreement?: boolean;
}
