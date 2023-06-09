import {useState} from 'react'
import { 
    getPopularRecipes, 
    filterRecipes,
    getRecipeSearch,
    getRandomRecipes, 
} from '../../../utils'
import Search from '../../components/Searchbar/Search'
import RecipeRepresentation from '../../components/RecipeRepresentation/RecipeRepresentation'
import { useSearchStringStore } from '../../hooks/useSearchStringStore'
import { useClickStore } from '../../hooks/useClickStore'
import { useLoaderData } from 'react-router-dom'

//Laddar populära recept innan rendering
export async function loader() {
  const popularRecipes = await getPopularRecipes()
  return {popularRecipes}
}

export default function Home() {
  const [recipes, setRecipes] = useState([])
  const searchString = useSearchStringStore((state) => state.searchString)
  const {popularRecipes} = useLoaderData()
  const [isClicked, setIsClicked] = useClickStore(
    (state) => [state.isClicked, state.setIsClicked])
  const [prevClick, setPrevClick] = useState(0)
  const [title, setTitle] = useState("Popular Recipes")

  //När man trycker på ""search" kollar den vilken tab man gör det i och hämtar recept utifrån det.
  if(isClicked > prevClick) {
    switch (searchString.call) {
      case "getIngredient":
        const fetchIngredient = async() => {
          const response = await filterRecipes(searchString.ingredients, searchString.type, searchString.intolerances, searchString.diet)
          setRecipes(response)
          setTitle(`Recipes with ${searchString.ingredients}`)
        }
        fetchIngredient()
        break
      case "getRecipeSearch":
        const fetchFreeSearch = async() => {
          const response = await getRecipeSearch(searchString.ingredients)
          setRecipes(response)
          setTitle(`Recipes with ${searchString.ingredients}`)
        }
        fetchFreeSearch()
        break
      case "getRandom":
        const fetchRandom = async() => {
          const response = await getRandomRecipes(searchString.ingredients)
          setRecipes(response)
          setTitle("Random Recipes")
        }
        fetchRandom()
        break
    }
    setPrevClick(prevClick + 1)
  }

  if(recipes.length === 0) {
    setRecipes(popularRecipes)
  }

  return(
  <>
  <Search />
  {recipes.length > 0 && 
  <RecipeRepresentation recipes={recipes} title={title} />}
  </>
  )
}