export const validate = (form) => {
    const newErrors = {
      title: "",
      image: "",
      summary: "",
      healthScore: "",
      diets: "",
      analyzedInstructions: "",
    };
  
    // Validación del campo "title"
    if (!form.title) {
      newErrors.title = "Title cannot be empty";
    } else if (form.title.length > 40) {
      newErrors.title = "Title cannot exceed 40 characters";
    } else if (/[^\w\s]/.test(form.title)) {
      newErrors.title = "Title contains invalid characters";
    } else if (form.title.length < 2) {
      newErrors.title = "Title must be at least 2 characters long";
    }
  
    // Validación del campo "image"
    if (!form.image) {
      newErrors.image = "Image URL cannot be empty";
    } else if (!/^https?:\/\/\S+$/.test(form.image)) {
      newErrors.image = "Invalid image URL";
    } else if (form.image.length > 300) {
      newErrors.image = "Image URL cannot exceed 300 characters";
    }
  
    // Validación del campo "summary"
    if (!form.summary) {
      newErrors.summary = "Summary cannot be empty";
    } else if (form.summary.length > 500) {
      newErrors.summary = "Summary cannot exceed 500 characters";
    } else if (/<[^>]+>/.test(form.summary)) {
      newErrors.summary = "Summary cannot contain HTML tags";
    } else if (form.summary.length < 10) {
      newErrors.summary = "Summary must be at least 10 characters long";
    }
  
    // Validación del campo "healthScore"
    if (!form.healthScore) {
      newErrors.healthScore = "HealthScore cannot be empty";
    } else if (!/^\d+$/.test(form.healthScore) || form.healthScore < 0 || form.healthScore > 100) {
      newErrors.healthScore = "Invalid health score. Must be an integer between 0 and 100.";
    }
  
    // Validación del campo "diets"
    if (!form.diets || form.diets.length === 0) {
      newErrors.diets = "Please select at least one diet";
    } else if (form.diets.length > 6) {
      newErrors.diets = "Please select a maximum of 6 diets";
    }
  
    // Validación del campo "analyzedInstructions"
    if (
      !form.analyzedInstructions ||
      Object.keys(form.analyzedInstructions).length === 0 ||
      Object.keys(form.analyzedInstructions).some(
        (index) => !form.analyzedInstructions[index].step
      )
    ) {
      newErrors.analyzedInstructions = "Select and fill at least one step with text";
    }
  
    return newErrors;
  };
  