import React, { useState, useEffect } from "react";
import style from "./Paginated.module.css"  
// Cantidad de páginas visibles en la paginación
const VISIBLE_PAGE_COUNT = 3;

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // Estado para almacenar las páginas visibles
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    // Función para calcular las páginas visibles
    const calculateVisiblePages = () => {
      // Calcula el rango de paginas visibles
      const firstVisiblePage = Math.max(
        0,
        currentPage - Math.floor(VISIBLE_PAGE_COUNT / 2)
      );
      const lastVisiblePage = Math.min(
        totalPages - 1,
        firstVisiblePage + VISIBLE_PAGE_COUNT - 1
      );
        
      // Crea un array con las paginas visibles
      return Array.from(
        { length: lastVisiblePage - firstVisiblePage + 1 },
        (_, index) => firstVisiblePage + index
      );
    };

    // Actualiza el estado de las paginas visibles cuando cambian las propiedades currentPage o totalPages
    setVisiblePages(calculateVisiblePages());
  }, [currentPage, totalPages]);

  // Manejador de evento para la pagina anterior
  const handlePrevPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1); // Llama a la función onPageChange con el índice de la página anterior como parámetro
    }
  };

  // Manejador de evento para la pagina siguiente
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1); // Llama a la funcion onPageChange con el índice de la página siguiente como parámetro
    }
  };
  // Manejador para ir a la primera pagina
  const handleFirstPage = () => {
    onPageChange(0);
  };
  // Manejador para ir a la ultima pagina
  const handleLastPage = () => {
    onPageChange(totalPages - 1);
  };

  // Función para renderizar los indicadores de pagina
  const renderPageIndicators = () => {
    return visiblePages.map((page) => (
      <span
        key={page}
        onClick={() => onPageChange(page)} // Llama a la función onPageChange con el índice de la página seleccionada como parámetro
>
        {page + 1}
      </span>
    ));
  };

  return (
    <div className={style.Pagination}>
      <button onClick={handleFirstPage} disabled={currentPage === 0}>
        First
      </button>
      <button onClick={handlePrevPage} disabled={currentPage === 0}>
        Prev
      </button>
      <div>{renderPageIndicators()}</div>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1}>
        Next
      </button>
      <button
        onClick={handleLastPage}
        disabled={currentPage === totalPages - 1}>
        Last
      </button>
    </div>
  );
};

export default Pagination;
