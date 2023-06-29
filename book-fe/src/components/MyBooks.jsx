import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook, getAuthorBooks} from '../APIs utils/apis';
import AuthContext from '../context/AuthContext';
import { Card, Button, Form } from 'react-bootstrap';


export default function MyBooks() {
  const navigator = useNavigate();
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const { contextData } = useContext(AuthContext);
  const { userInfo } = contextData;

  const getAllBooks = async () => {
    try{
    const response = await getAuthorBooks();
    if (response.status == 200) {
    setBooks(response.data);
    }
    else if (response.status == 403){
      navigator('/unautohrized/');
    }
  }
  catch(err){
    navigator('/unautohrized/');
  }
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
      getAllBooks();
    };
    fetchData();
  }, []);

  const goToBook = (id) => {
    navigator(`/books/${id}` );
  };

  return (
    <div className="container bg-dark text-center p-5">

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