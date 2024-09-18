'use client';

import Pagination from '@/components/pagination/Pagination';
import SpinnerLoading from '@/components/spinner/SpinnerLoading';
import { useBooks } from '@/hooks/useBooks';
import { useState } from 'react';
import ChangeQuantityOfBook from './ChangeQuantityOfBook';

export default function ChangeQuantityOfBooks() {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [bookDelete, setBookDelete] = useState(false);

  const { data, isLoading, error } = useBooks(currentPage, booksPerPage);

  const books = data?.responseData;
  const totalPages = data?.totalPages;
  const totalAmountOfBooks = data?.totalElements;

  const indexOfLastBook: number = currentPage * booksPerPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastItem =
    booksPerPage * currentPage <= totalAmountOfBooks
      ? booksPerPage * currentPage
      : totalAmountOfBooks;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const deleteBook = () => setBookDelete(!bookDelete);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (error) {
    return (
      <div className="container m-5">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {totalAmountOfBooks > 0 ? (
        <>
          <div className="mt-3">
            <h3>Number of results: ({totalAmountOfBooks})</h3>
          </div>
          <p>
            {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items:
          </p>
          {books.map((book: Library.BookModel) => (
            <ChangeQuantityOfBook
              book={book}
              key={book.id}
              deleteBook={deleteBook}
            />
          ))}
        </>
      ) : (
        <h5>Add a book before changing quantity</h5>
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      )}
    </div>
  );
}
