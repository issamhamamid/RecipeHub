
import {useScroll} from "../customHooks/useScroll.js";
import { BsArrowRepeat } from "react-icons/bs";
import {MealPlanPage} from "./MealPlanPage.jsx";
import {useActionState, useEffect, useRef, useState} from "react";
import {ModalTitle} from "./ModalTitle.jsx";

import {Modal} from "./Modal.jsx";
import {useUser} from "../customHooks/useUser.js";
import generate from "../Util/generate.js";
import {useMealPlan} from "../customHooks/useMealPlan.js";
import {Loading} from "./Loading.jsx";
import { TailSpin } from 'react-loading-icons';



export const MealPlanner = () => {

    const dialogRef = useRef(null);
    const {jwt} = useUser()
    const{mealPlan , update , setUpdate , setMealPlan , isLoading } = useMealPlan()
    const isScrolled = useScroll(3)
    const link = 'http://localhost:3000/users/generate_meal_plan';
    const fields = ['calories' , 'protein' , 'mealCount']




    const submit = async (prev , formData)=>{
        await  generate(prev , formData , jwt , link , fields , setUpdate , update , dialogRef , mealPlan)
    }


    const [data , submitAction , isPending] = useActionState(submit, null);







    return (
        isLoading  ? <Loading/> : <>
            <header className={isScrolled ? 'discover-header-scroll' : 'discover-header'}>
                <div className='discover-header-content'>
                    <h2 className='planner-title'>Meal Planner</h2>
                </div>
            </header>
            <div className='discover'>

                { mealPlan.mealplans.length > 0  ? <MealPlanPage  mealPlan={mealPlan.mealplans[0]} ref = {dialogRef}  update={update} setUpdate={setUpdate} /> : <div className='meal-planner-main'>

                    <img className='meal-planner-img'
                         src='https://www.eatthismuch.com/app/_app/immutable/assets/orange-painting.BDLMeH1h.png'
                         alt='orange'/>
                    <h2 className='meal-planner-slogan'>What&#39;s on the menu today?</h2>
                    <div className='meal-planner-btn'>
                        <button onClick={() => {
                            dialogRef.current.showModal()
                        }} className='generate-btn'>

                            <BsArrowRepeat className='generate-icon'/>
                            <p className='gen'>Generate</p>
                        </button>
                        <button className='manually filter'>Plan Manually</button>
                    </div>


                </div>}


            </div>

            <Modal dialogRef={dialogRef} confirmationText='Confirm' showButtons={false} className='modal with-keyframes'>
                <ModalTitle>Set you nutrition preferences</ModalTitle>
                <div className='preferances'>

                    <form action={submitAction} className='meal-planner-form'>
                        <div className='calor-pref'>
                            <div className='div-align'><label htmlFor="calories" className='i-want'> I want to
                                eat</label></div>
                            <input id="calories" name="calories" type='number' className='calories-input'
                                   required={true}></input>
                            <div className='div-grow'><p className='calories-inline'>calories</p></div>
                        </div>

                        <div className='calor-pref'>
                            <div className='div-align'><label htmlFor="protein" className='i-want'> And</label></div>
                            <input id="protein" name="protein" type='number' className='calories-input'
                                   required={true}></input>
                            <div className='div-grow'><p className='calories-inline'>protein</p></div>
                        </div>

                        <div className='calor-pref'>
                            <div className='div-align'><label htmlFor="mealCount" className='i-want'> In</label></div>
                            <select id="mealCount" name="mealCount" className="meals-drop-down" required>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <div className='div-grow'><p className='calories-inline'>meals</p></div>
                        </div>
                        <div className='modal-buttons meal-form-btns'>
                            <button type="button" className='modal-btn default' onClick={() => dialogRef.current?.close()}>Cancel
                            </button>
                            <button type='submit' className={isPending?  'pending-button modal-btn' : 'modal-btn confirm'}>
                                {isPending? <TailSpin className='pending-icon'/> :
                                'Generate'}

                            </button>

                        </div>
                    </form>


                </div>
            </Modal>
        </>
    )
}