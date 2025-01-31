import {useContext} from "react";
import {MealPlanContext} from "../components/MealPlanProvider.jsx";

function useMealPlan() {
    const context = useContext(MealPlanContext);
    if (context === undefined) {
        throw new Error("useMealPlan must be used within a MealPlanProvider");
    }

    return context;
}

export {useMealPlan}