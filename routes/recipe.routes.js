import express from "express";
import RecipeModel from "../models/recipe.model.js";

const recipeRoute = express.Router();


// LAB-MONGOOSE-RECIPES - ITERATION 2 - CREATE A RECIPE

recipeRoute.post("/create", async (req, res) => {
  try {
    const newRecipe = await RecipeModel.create(req.body);
    console.log(newRecipe.title);
    return res.status(201).json(newRecipe.title);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo deu errado" });
  }
});


// LAB-MONGOOSE-RECIPES - ITERATION 3 - INSERT MANY

recipeRoute.post("/insert-many", async (req, res) => {
  try {
    const newRecipes = await RecipeModel.insertMany([...req.body]);
    return res.status(201).json(newRecipes);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo deu errado" });
  }
});
 



// LAB-MONGOOSE-RECIPES - ITERATION 4 - UPDATE RECIPE

recipeRoute.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecipe = await RecipeModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );
    console.log("receita alterada com sucesso!");
    return res.status(200).json(updatedRecipe);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Tem algo errado na sua requisição" });
  }
});


// LAB-MONGOOSE-RECIPES - ITERATION 5 - REMOVE RECIPE

recipeRoute.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await RecipeModel.deleteOne(
      { _id: id },
      { new: true, runValidators: true }
    );
    return res.status(200).json(deletedRecipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});


export default recipeRoute;