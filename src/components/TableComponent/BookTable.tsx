import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  TableSortLabel,
  Toolbar,
  Typography,
} from '@mui/material';

interface Book {
  id: string;
  title: string;
  description: string;
  pageCount: number;
  excerpt: string;
  publishDate: string;
}


function descendingComparator(a: Book, b: Book, orderBy: keyof Book) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: 'asc' | 'desc', orderBy: keyof Book) {
  return order === 'desc'
    ? (a: Book, b: Book) => descendingComparator(a, b, orderBy)
    : (a: Book, b: Book) => -descendingComparator(a, b, orderBy);
}

const headCells: { id: keyof Book; label: string }[] = [
  { id: 'title', label: 'Title' },
  { id: 'description', label: 'Description' },
  { id: 'pageCount', label: 'Page Count' },
  { id: 'excerpt', label: 'Excerpt' },
  { id: 'publishDate', label: 'Publish Date' },
];


const actionArray = {
  id: 'id' as keyof Book,
  label: 'Actions',
}

headCells.push(actionArray)


interface EnhancedTableHeadProps {
  order: 'asc' | 'desc';
  orderBy: keyof Book;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Book) => void;
}

function EnhancedTableHead({ order, orderBy, onRequestSort }: EnhancedTableHeadProps) {
  const createSortHandler = (property: keyof Book) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };


  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox color="primary" />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}



interface BooksTableProps {
  booksDataList: Book[];
}

export default function BooksTable(props: BooksTableProps) {
  //Props
  const { booksDataList } = props

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Book>('pageCount');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const handleRequestSort = (_: React.MouseEvent<unknown>, property: keyof Book) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  //Sorting Function
 const sortedBooks = booksDataList.slice().sort(getComparator(order, orderBy));
  const visibleBooks = sortedBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar>
          <Typography variant="h6" id="tableTitle">
            Books
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table>
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {visibleBooks.map((book: Book) => (
                <TableRow key={book.id}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.description}</TableCell>
                  <TableCell>{book.pageCount}</TableCell>
                  <TableCell>{book.excerpt}</TableCell>
                  <TableCell>{new Date(book.publishDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={booksDataList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
