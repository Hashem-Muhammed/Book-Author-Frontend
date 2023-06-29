import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook, getBooks} from '../APIs utils/apis';
import AuthContext from '../context/AuthContext';
import { Card, Button, Form } from 'react-bootstrap';
import '../css/Home.css';
export default function HomePage() {
  const navigator = useNavigate();
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  let { contextData } = useContext(AuthContext);
  let { authTokens } = contextData;
  let { getUser } = contextData;
  const [userInfo, setUserInfo] = useState(
    {}
  );  


  const getAllBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  const handleAddBookClick = () => {
    setShowForm(true);
  };

  const handleTitleChange = (e) => {
    setBookTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBook({ title: bookTitle });
    setShowForm(false);
    setBookTitle('');
    getAllBooks();
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
      getAllBooks();
    };
    fetchData();
  }, []);

  const goToBook = (id) => {
    navigator(`/books/${id}`);
  };

  return (
    <div className="container  text-center bg-dark  p-5">

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {books.map((book) => (
          <div className="col" key={book.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {book.author.user.first_name}
                </Card.Subtitle>
                <Button
                  variant="warning"
                  className="mt-3"
                  onClick={() => {
                    goToBook(book.id);
                  }}
                >
                  View Book
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      { userInfo.user_type === 'author' && (
        <Button className='m-5' onClick={handleAddBookClick}>Add Book</Button>
      )}
      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={bookTitle}
              onChange={handleTitleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}