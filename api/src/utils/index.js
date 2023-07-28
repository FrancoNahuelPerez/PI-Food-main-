const cleanArray = (arr) => {


  return arr.map((elem) => {
  

    const diets = elem.diets
      ? elem.diets.map((diet) => {
          if (typeof diet === "string") {
            return diet;
          } else {
            return diet.diet;
          }
        })
      : [];

    return {
      id: elem.id,

      title: elem.title,

      image: elem.image,

      diets: diets,

      healthScore: elem.healthScore,
    };
  });
};


module.exports = cleanArray;
