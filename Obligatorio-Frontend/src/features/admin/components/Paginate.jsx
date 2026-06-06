import { useState } from "react"
import ReactPaginateLib from 'react-paginate';
import { useSelector } from "react-redux"
import "../styles/Paginate.css"

const ReactPaginate = ReactPaginateLib.default

const Paginate = ({ fnFetchClases }) => {
  const dataPaginacion = useSelector(state => state.clases.pagination)
  const [currentPage, setCurrentPage] = useState(0)

  const totalPaginas = dataPaginacion.totalPaginas

  const handlePageClick = (event) => {
    setCurrentPage(event.selected)
    const numeroPaginaReal = event.selected + 1
    fnFetchClases(numeroPaginaReal)
  }

  if (totalPaginas <= 1) {
    return null
  }

  return (
    <ReactPaginate
      previousLabel="<<"
      nextLabel=">>"
      pageCount={totalPaginas}
      onPageChange={handlePageClick}
      forcePage={currentPage}
      containerClassName="pagination"
      activeClassName="active"
    />
  )
}

export default Paginate