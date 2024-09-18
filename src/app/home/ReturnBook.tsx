'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ReturnBook({
  book = {} as Library.BookModel,
}: Library.ReturnBookProps) {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        {book.img ? (
          <Image src={book.img} width="151" height="233" alt="book" />
        ) : (
          <Image
            src="/images/BookImages/book-luv2code-1000.png"
            width="151"
            height="233"
            alt="book"
          />
        )}
        <h6 className="mt-2">{book.title}</h6>
        <p>{book.author}</p>
        <Link
          className="btn main-color text-white"
          href={`checkout/${book.id}`}
        >
          Reserve
        </Link>
      </div>
    </div>
  );
}
