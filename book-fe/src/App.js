
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { PrivateRoute } from './utils/PrivateRoute';
import { Fragment } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Register } from './components/Register';
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BookDetails } from './components/BookDetails';
import { NotFound } from './components/NotFound';
import Navigation from './components/Navigator';
import MyBooks from './components/MyBooks';
import UnauthorizedPage from './components/Unaothrized';
function App() {
  return (
    <div>
      <Router className="App">
        <Fragment>
          <AuthProvider>
          <Navigation />
        <Routes>
            <Route exact path='/' element={<PrivateRoute/>}>
               <Route exact path='/' element={<HomePage/>}/>
               <Route exact path='/my-books' element={<MyBooks/>}/>
               <Route path="/books/:id" element = {<BookDetails />} />
            </Route>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/notfound" element = {<NotFound />} />
          <Route path="*" element = {<NotFound />} />
          <Route path="/unautohrized" element = {<UnauthorizedPage />} />



        </Routes>
        </AuthProvider>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;