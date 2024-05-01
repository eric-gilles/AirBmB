export interface Comment {
  idComment: number;
  comment: string;
  note: number;
  user: {
    firstname: string;
    lastname: string;
  };
  idProperty: number;
  createdAt?: Date;
}
