'use client';

import BookModel from '@/models/BookModel';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ChangeQuantityOfBookProps {
  book: BookModel;
  deleteBook: Function;
}

const ChangeQuantityOfBook: React.FC<ChangeQuantityOfBookProps> = ({
  book,
  deleteBook,
}) => {
  const { user } = useUser();
  const [quantity, setQuantity] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);

  useEffect(() => {
    const fetchBookInState = () => {
      book.copies ? setQuantity(book.copies) : setQuantity(0);
      book.copiesAvailable
        ? setRemaining(book.copiesAvailable)
        : setRemaining(0);
    };
    fetchBookInState();
  }, [book.copies, book.copiesAvailable]);

  async function increaseQuantity() {
    const quantityUpdateResponse = await fetch(
      `/api/secure/increase-qty/${book?.id}`,
      {
        method: 'PUT',
      }
    );
    if (!quantityUpdateResponse.ok) {
      throw new Error('Something went wrong!');
    }
    setQuantity(quantity + 1);
    setRemaining(remaining + 1);
  }

  async function decreaseQuantity() {
    const quantityUpdateResponse = await fetch(
      `/api/secure/decrease-qty/${book?.id}`,
      {
        method: 'PUT',
      }
    );
    if (!quantityUpdateResponse.ok) {
      throw new Error('Something went wrong!');
    }
    setQuantity(quantity - 1);
    setRemaining(remaining - 1);
  }

  async function deleteBookById() {
    const url = `admin/secure/delete/book/?bookId=${book?.id}`;
    const updateResponse = await fetch(`/api/secure/${url}`, {
      method: 'PUT',
    });
    if (!updateResponse.ok) {
      throw new Error('Something went wrong!');
    }
    deleteBook();
  }

  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            {book.img ? (
              <Image src={book.img} width="123" height="196" alt="Book" />
            ) : (
              <Image
                src="images/BookImages/book-luv2code-1000.png"
                width="123"
                height="196"
                alt="Book"
              />
            )}
          </div>
          <div className="d-lg-none d-flex justify-content-center align-items-center">
            {book.img ? (
              <Image src={book.img} width="123" height="196" alt="Book" />
            ) : (
              <Image
                src="images/BookImages/book-luv2code-1000.png"
                width="123"
                height="196"
                alt="Book"
              />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{book.author}</h5>
            <h4>{book.title}</h4>
            <p className="card-text"> {book.description} </p>
          </div>
        </div>
        <div className="mt-3 col-md-4">
          <div className="d-flex justify-content-center algin-items-center">
            <p>
              Total Quantity: <b>{quantity}</b>
            </p>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <p>
              Books Remaining: <b>{remaining}</b>
            </p>
          </div>
        </div>
        <div className="mt-3 col-md-1">
          <div className="d-flex justify-content-start">
            <button
              className="m-1 btn btn-md btn-danger"
              onClick={deleteBookById}
            >
              Delete
            </button>
          </div>
        </div>
        <button
          className="m1 btn btn-md main-color text-white"
          onClick={increaseQuantity}
        >
          Add Quantity
        </button>
        <button
          className="m1 btn btn-md btn-warning"
          onClick={decreaseQuantity}
        >
          Decrease Quantity
        </button>
      </div>
    </div>
  );
};

export default ChangeQuantityOfBook;
