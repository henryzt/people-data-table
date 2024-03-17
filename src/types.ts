export interface PersonRecord {
  _id: string;
  name: string;
  dob: string;
  address: {
    street: string;
    town: string;
    postode: string;
  };
  telephone: string;
  pets: string[];
  score: number;
  email: string;
  url: string;
  description: string;
  verified: boolean;
  salary: number;
}
