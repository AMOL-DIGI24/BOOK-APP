import http from "../http";


function getBooksListServices() {
    return http.get('/Books');
  }
  

const booksServices = {
    getBooksListServices
}






export default booksServices;