import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthorBooks, getBook, addPage, updatePage } from '../APIs utils/apis';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/BookDetails.css';
import { NotFound } from './NotFound';
import '../css/PageForms.css'
import { Card, Button, Form } from 'react-bootstrap';

export function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [error, setError] = useState(false);
  const [myBooks, setMyBooks] = useState([]);
  const [isMine, setIsmine] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageContent, setNewPageContent] = useState('');
  const [selectedPage, setSelectedPage] = useState(null);

  const getAllBooks = async () => { 
    try{
    const response = await getAuthorBooks();
    setMyBooks(response.data);
    }
    catch(error)
    {
}  };
  let fetchBook = async() =>  {
    try {
      const response = await getBook(id);
      setBook(response.data);
      getAllBooks();
    } catch (error) {
      setError(true);
    }
  }
  useEffect(() => {
   

    fetchBook();
  }, [id]);

  useEffect(() => {
    isMyBook();
  }, [myBooks]);

  const isMyBook = () => {
    const book = myBooks.find((book) => book.id == id);
    if (book) {
      setIsmine(true);
    } else {
      setIsmine(false);
    }
  };

  const addPageToBook = async (bookId, title, content) => {
    let page = {
      book_id: bookId,
      title: title,
      content: content
    };
    await addPage(page);
    setShowForm(false);
    setNewPageTitle('');
    setNewPageContent('');
    fetchBook();
  };

  const updatePageInBook = async (pageId, title, content) => {
    let page = {
      book_id:id,
      id: pageId,
      title: title,
      content: content
    };
    await updatePage(page);
    setSelectedPage(null);
    fetchBook();
  };

  const handleAddPage = () => {
    setShowForm(true);
  };

  const handleTitleChange = (event) => {
    setNewPageTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setNewPageContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPageToBook(book.id, newPageTitle, newPageContent);
  };

  const handleEditPage = (page) => {
    setSelectedPage(page);
  };

  if (error) {
    return <NotFound />;
  }

  return (
    <div className="bg-dark text-light text-center w-100 p-3">
      <h2>Title: {book.title}</h2>
      <h4>Author: {book.author?.user?.first_name}</h4>
      <div className="slider-container">
        <Slider className='slider'
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {book.pages?.map((page) => {
            return (
              <div key={page.id} className="page-container">
                <h3>{page.title}</h3>
                <p>{page.content}</p>
                {isMine && (
                  <button class='btn btn-secondary' onClick={() => handleEditPage(page)}>Edit Page</button>
                )}
              </div>
            );
          })}
        </Slider>
        {isMine && (
          <>
            {!showForm ? (
  <button className="m-5" onClick={handleAddPage}>
    Add Page
  </button>
) : (
  <form className="page-form" onSubmit={handleSubmit}>
    <div>
      <label htmlFor="title">Title</label>
      <input required
        type="text"
        id="title"
        value={newPageTitle}
        onChange={handleTitleChange}
      />
    </div>
    <div>
      <textarea required
        id="content"
        value={newPageContent}
        onChange={handleContentChange}
        placeholder="Page content"
      />
    </div>
    <button class='btn btn-success' type="submit">Add Page</button>
  </form>
)}

{selectedPage && (
  <div className="page-details">
    <form className="page-form" onSubmit={() => updatePageInBook(selectedPage.id, selectedPage.title, selectedPage.content)}>
      <div>
        <label htmlFor="title">Title</label>
        <input required
          type="text"
          id="title"
          value={selectedPage.title}
          onChange={(e) =>
            setSelectedPage({
              ...selectedPage,
              title: e.target.value
            })
          }
        />
      </div>
      <div>
        <textarea required
        placeholder="Page content"

          id="content"
          value={selectedPage.content}
          onChange={(e) =>
            setSelectedPage({
              ...selectedPage,
              content: e.target.value
            })
            
          }
        />
      </div>
      <div class ='buttons'>
      <Button className='btn btn-success' type="submit">Save Changes</Button>
      <Button className='btn btn-danger'  onClick={() => setSelectedPage(null)}>Cancel</Button>
      </div>
    </form>
  </div>
)}
          </>
        )}
      </div>
    </div>
  );
}