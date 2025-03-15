import React from 'react'
import BookSingleCard from './BookSingleCard';

const BooksCards = ({books}) => {
  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {books.map((item) => (
           <BookSingleCard key={item._id} book={item}/>
        ))}
    </div>
  )
}

export default BooksCards