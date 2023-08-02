import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import Pagination from "../Paginated/Paginate";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./CardConteiner.module.css" 

export default function CardConteiner() {
  const recipes = useSelector((state) => state.recipes);
  const error = useSelector((state) => state.error);
  const cardsPerPage = 10;
  const totalPages = Math.ceil(recipes.length / cardsPerPage);

  const [currentPage, setCurrentPage] = useState(0);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setCurrentPage(0);
    setReset(false);
  }, [recipes, reset]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const renderCards = () => {
    const startIndex = currentPage * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentRecipes = Array.isArray(recipes)
      ? recipes.slice(startIndex, endIndex)
      : [];

    if (currentRecipes.length === 0) {
      return (
        <p className={styles.errorMessage}>
          No recipes were found with the specified search term, please check the
          name and try again.
        </p>
      );
    }

    return (
      <>
        <div className={styles.cardContainer}>
          {currentRecipes.slice(0, 5).map((recipe) => (
            <Card
              id={recipe.id}
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              diets={recipe.diets}
              healthScore={recipe.healthScore}
            />
          ))}
        </div>
        <div className={styles.cardContainer}>
          {currentRecipes.slice(5, 10).map((recipe) => (
            <Card
              id={recipe.id}
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              diets={recipe.diets}
              healthScore={recipe.healthScore}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div>
        {/* Renderiza el componente de botones para filtrar (si se implementa) */}
      </div>
      <div>
        {error ? (
          <p className={styles.errorMessage}>{error}</p>
        ) : (
          <>
            {renderCards()}
            <div className={styles.pagination}>
              <div>
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </>
        )}
        <div>{/* Contenido adicional si es necesario */}</div>
      </div>
    </div>
  );
}
