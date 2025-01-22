import {useActionState} from "react";
import {useUser} from "./useUser.js";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const useForm = (link, jsonObjArray, fields , dataValidator = ()=>{
    return true
})=>{

    const {setJwt } = useUser()
    let Navigate = useNavigate()

    const submit = async (prev , formData)=>{
        const data = {}

        fields.forEach((field)=>{
            data[field] = formData.get(field)
        })
        const jsonObj = {}

        jsonObjArray.forEach((field)=>{
            jsonObj[field]= formData.get(field)
        })



        const isValid = dataValidator(data)
        if (!isValid){
            return data
        }


        try{

            const response = await axios.post(link , jsonObj )
            if(response.status===201 || response.status ===200){
                setJwt(response.headers['authorization'])
                Navigate('/app')
            }

        }
        catch (err){
            data.error = err.response?.data?.message
        }

        return data


    }
    return useActionState(submit, null);

}


export {useForm}