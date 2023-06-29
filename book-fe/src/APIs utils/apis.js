import axios from "axios";


let base = 'http://localhost:8000/';

export let  getBooks = async ()=> {
     let response = await axios.get(base + 'books')
     return response.data
}
export const getBook = async (id) => {
    
      const response = await axios.get(`${base}/books/${id}`);
      return response;
    
  };
  export let addBook = async (book) => {
     let authTokens = JSON.parse(localStorage.getItem('authTokens'));
     let accessToken = authTokens.access;
     console.log(accessToken);
     let config = {
       headers: {
         Authorization: `Bearer ${accessToken}`,
       },
     };
   
     await axios
       .post(`${base}/books/`, book, config)
       .then((response) => {
         console.log(response.data);
       }) 
       .catch((error) => {
          if (error.response.status === 403) {
               alert('Unauthorized. You are not an author!.');
             } else {
               console.log(error);
             }
       });
   };

export let getUser = async () => {
     let authTokens = JSON.parse(localStorage.getItem('authTokens'));
     let accessToken = authTokens.access;
     console.log(accessToken);
     let config = {
       headers: {
         Authorization: `Bearer ${accessToken}`,
       },
     };
   
     await axios
       .get(`${base}/getuser/`, config)
       .then((response) => {
         localStorage.setItem('userInfo', JSON.parse(response.data));
       }) 
       .catch((error) => {
               console.log(error);
             }
       );
   };

   export let getAuthorBooks = async () => {
     let authTokens = JSON.parse(localStorage.getItem('authTokens'));
     let accessToken = authTokens.access;
     console.log(accessToken);
     let config = {
       headers: {
         Authorization: `Bearer ${accessToken}`,
       },
     };
   
     const response = await axios.get(`${base}/getbooks/`, config);
     return response
       
   };

   export let addPage = async (page) => {
     let authTokens = JSON.parse(localStorage.getItem('authTokens'));
     let accessToken = authTokens.access;
     console.log(accessToken);
     let config = {
       headers: {
         Authorization: `Bearer ${accessToken}`,
       },
     };
   
     await axios
       .post(`${base}/pages/`, page, config)
       .then((response) => {
         console.log(response.data);
       }) 
       .catch((error) => {
          if (error.response.status === 403) {
               alert('Unauthorized!.');
             } else {
               console.log(error);
             }
       });
   };

   export let updatePage = async (page) => {
     let authTokens = JSON.parse(localStorage.getItem('authTokens'));
     let accessToken = authTokens.access;
     console.log(accessToken);
     let config = {
       headers: {
         Authorization: `Bearer ${accessToken}`,
       },
     };
   
     await axios
       .put(`${base}/pages/${page.id}/`, page, config)
       .then((response) => {
         console.log(response.data);
       }) 
       .catch((error) => {
          if (error.response.status === 403) {
               alert('Unauthorized!.');
             } else {
               console.log(error);
             }
       });
   };
