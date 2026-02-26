export const getAllRecipes = async ()=> {
    try{
        const response = await fetch('http://dummyjson.com/recipes?limit=10');
        const data = await response.json();
        return data.recipes;
    }
    catch(err){
        console.error("Error API: ",err);
        return[];
    }
};