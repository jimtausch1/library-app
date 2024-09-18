declare namespace Library {

  export interface AddBookRequest {
    title: string;
    author: string;
    description: string;
    copies: number;
    category: string;
    img?: string;
  }

  export interface AdminMessageRequest {
    id: number;
    response: string;
  }

  export interface BookModel {
    id: number;
    title: string;
    author?: string;
    description?: string;
    copies?: number;
    copiesAvailable?: number;
    category?: string;
    img?: string;
  }

  export interface BookById {
    bookbyid: Library.BookModel;
  }

  export interface BooksResponse {
    data: BookModel[];
  }

  export interface HistoryModel {
    id: number;
    userEmail: string;
    checkoutDate: string;
    returnedDate: string;
    title: string;
    author: string;
    description: string;
    img: string;
  }

  export interface MessageModel {
    title: string;
    question: string;
    id?: number;
    userEmail?: string;
    adminEmail?: string;
    response?: string;
    closed?: boolean;
  }

  export interface ReviewModel {
    id: number;
    userEmail: string;
    date: string;
    rating: number;
    book_id: number;
    reviewDescription?: string;
  }

  export interface ReviewRequestModel {
    rating: number;
    bookId: number;
    reviewDescription?: string;
  }

  export interface ShelfCurrentLoans {
    book: BookModel;
    daysLeft: number;
  }
}