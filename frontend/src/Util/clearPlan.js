import axios from "axios";

const clearPlan = async (jwt) => {
    await axios.delete('http://localhost:3000/users/mealplan', {
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
    })
}


export default clearPlan