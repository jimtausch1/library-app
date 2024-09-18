declare namespace Library {

  export interface AddBookRequest {
    title: string;
    author: string;
    description: string;
    copies: number;
    category: string;
    img?: string;
  }

  export interface AdminMessageProps {
    message: MessageModel;
    submitResponseToQuestion: any;
  }

  export interface AdminMessageRequest {
    id: number;
    response: string;
  }

  export interface AuthState {
    data: any; // data stored from API
    isAuthenticated: boolean;
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

  export interface BooksState {
    data: any; // data stored from API
    books: Library.BookModel[];
  }

  export interface ChangeQuantityOfBookProps {
    book: BookModel;
    deleteBook: Function;
  }

  export interface CheckedOutState {
    ischeckedout: boolean;
  }

  export interface CheckoutAndReviewBoxProps {
    mobile: boolean;
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

  export interface LatestReviewsProps {
    mobile: boolean;
  }

  export interface LeaveAReviewProps {
    submitReview: Function;
  }

  export interface LoansModalProps {
    shelfCurrentLoan: Library.ShelfCurrentLoans;
    mobile: boolean;
    returnBook: Function;
    renewLoan: Function;
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

  export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    paginate: any;
  }

  export interface ReturnBookProps {
    book: BookModel;
  }

  export interface ReviewLeftState {
    isreviewleft: boolean;
  }

  export interface ReviewModel {
    id: number;
    userEmail: string;
    date: string;
    rating: number;
    book_id: number;
    reviewDescription?: string;
  }

  export interface ReviewProps {
    review: ReviewModel;
  }

  export interface ReviewRequestModel {
    rating: number;
    bookId: number;
    reviewDescription?: string;
  }

  export interface ReviewsState {
    data: any; // data stored from API
    reviews: Library.ReviewModel[];
  }

  export interface SearchBookProps {
    book: Library.BookModel;
  }

  export interface ShelfCurrentLoans {
    book: BookModel;
    daysLeft: number;
  }

  export interface StarsReviewProps {
    stars: number;
    size: number;
  }

  export interface TotalStarsState {
    data: any; // data stored from API
    totalstars: number;
  }
}