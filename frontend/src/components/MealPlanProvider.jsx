import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useUser} from "../customHooks/useUser.js";

const MealPlanContext = createContext(); // Declare but do not export

const MealPlanProvider = ({children}) => {
    const {jwt} = useUser()
    const [mealPlan, setMealPlan] = useState({'mealplans' : []});
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:3000/users/mealplan/today' , {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        }).then(res=>setMealPlan(res.data.data))


    }, [update]);

    return (
        <MealPlanContext.Provider value = {{mealPlan ,setMealPlan  , update , setUpdate}} >
            {children}
        </MealPlanContext.Provider>
    );
}

export{MealPlanProvider , MealPlanContext}