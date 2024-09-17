'use client';

import Pagination from '@/components/pagination/Pagination';
import SpinnerLoading from '@/components/spinner/SpinnerLoading';
import { useAppSelector } from '@/lib/hooks';
import AdminMessageRequest from '@/models/AdminMessageRequest';
import MessageModel from '@/models/MessageModel';
import { useEffect, useState } from 'react';
import AdminMessage from './AdminMessage';

const AdminMessages = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // Normal Loading Pieces
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Messages endpoint State
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [messagesPerPage] = useState(5);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Recall useEffect
  const [btnSubmit, setBtnSubmit] = useState(false);

  useEffect(() => {
    const fetchUserMessages = async () => {
      if (isAuthenticated) {
        const messagesResponse = await fetch(
          `/api/secure/messages-get/${currentPage}`
        );
        if (!messagesResponse.ok) {
          throw new Error('Something went wrong!');
        }
        const messagesResponseJson = await messagesResponse.json();

        setMessages(messagesResponseJson.content);
        setTotalPages(messagesResponseJson.totalPages);
      }
      setIsLoadingMessages(false);
    };
    fetchUserMessages().catch((error: any) => {
      setIsLoadingMessages(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [isAuthenticated, currentPage, btnSubmit, messagesPerPage]);

  if (isLoadingMessages) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function submitResponseToQuestion(id: number, response: string) {
    if (isAuthenticated && id !== null && response !== '') {
      const messageAdminRequestModel: AdminMessageRequest =
        new AdminMessageRequest(id, response);

      const messageAdminRequestModelResponse = await fetch(
        `/api/secure/message-admin`,
        {
          method: 'PUT',
          body: JSON.stringify(messageAdminRequestModel),
        }
      );
      if (!messageAdminRequestModelResponse.ok) {
        throw new Error('Something went wrong!');
      }
      setBtnSubmit(!btnSubmit);
    }
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="mt-3">
      {messages.length > 0 ? (
        <>
          <h5>Pending Q/A: </h5>
          {messages.map((message) => (
            <AdminMessage
              message={message}
              key={message.id}
              submitResponseToQuestion={submitResponseToQuestion}
            />
          ))}
        </>
      ) : (
        <h5>No pending Q/A</h5>
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
};

export default AdminMessages;
