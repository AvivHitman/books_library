export type Book = {
    id: string,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    authorName: string
    isActive: boolean
}

export type Author = {
    id: string,
    name: string,
    age: number,
    picture: string,
    country: string,
    isActive: boolean,
    booksList: Book[]
}

export type AuthorTableRow = Omit<Author, 'booksList'> &  {
    booksList: String[]
  };
  
  export type TableColumn = {
    id: string;
    label: string;
  };

  export type Field = {
    name: string,
    label: string;
    type: string;
    options?: string[];
  };

  export enum bookCategory  {
    DRAMA = "Drama",
    COMEDY = "Comedy",
    ROMANCE= "romance",
    FANTASY = "fantasy",
    ACTION = "Action",
    MYSTERY = "Mystery",
    HORROR = "Horror"
  }

  export enum fetchStatus {
    LOADING = "loading",
    SUCCESS = "success",
    FAILED = "failed"
  }