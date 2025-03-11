import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store/store";
import { booksProjectActions } from "../../redux/books/books.action";
import BooksTable from "../../components/TableComponent/BookTable";
import Snackbar from "../../components/Snackbar/Snackbar";
interface Book {
  id: string;
  title: string;
  description: string;
  pageCount: number;
  excerpt: string;
  publishDate: string;
}

export default function Books() {

  //States
  const [booksDataList, setDataList] = useState<Book[]>([]);

  console.log("booksDataList",booksDataList)
  //hooks
  const [bookRes, setBookRes] = useState<any>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const dispatch = useAppDispatch();
  
  //useEffect hook to fetch the books list on component mount
  useEffect(() => {
    fetchBookList();
  }, []);

  const fetchBookList = () =>{
    //api call for the get Books List
    dispatch(booksProjectActions.getBooksListAction())
      //.unwrap()
     .then((res) => {
      console.log("res",res)
        setDataList(res.payload as Book[]);
        setBookRes(res);
        setOpenSnackbar(true)
      })
     .catch((err) => {
        console.error('Failed to fetch books list', err);
      });
  }



  //render the books table
  return (
    <>
      <BooksTable booksDataList={booksDataList} />
      {bookRes && (
        <Snackbar
          result={bookRes}
          open={openSnackbar}
          setOpen={setOpenSnackbar} // Control Snackbar visibility
        />
      )}
    </>
  )
}