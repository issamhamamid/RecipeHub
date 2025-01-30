import {useScroll} from "../customHooks/useScroll.js";
import { FaRegStar } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { PieChart } from 'react-minimal-pie-chart';
import {Link, useLocation, useParams} from "react-router-dom";
import { useEffect, useRef, useState} from "react";
import axios from "axios";
import {IngredientRow} from "./IngredientRow.jsx";
import { IoArrowBackOutline } from "react-icons/io5";
import {Comment} from "./Comment.jsx";
import { FaRegCommentDots } from "react-icons/fa";
import {Modal} from "./Modal.jsx";
import {ModalTitleWithIcon} from "./ModalTitleWithIcon.jsx";
import { IoSend } from "react-icons/io5";
import {useUser} from "../customHooks/useUser.js";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'



export const RecipePage = () => {

    const {jwt} = useUser()
    const decoded = jwtDecode(jwt);
    const isScrolled = useScroll(3)
    const params = useParams()
    const [recipe, setRecipe] = useState({
        fat: 0,
        protein: 0,
        carbs: 0,
        calories: 0,
        name: '',
        image_url: '',
        prep_time: 0,
        cook_time: 0,
        instructions: '',
    });
    const [ingredients, setIngredients] = useState([])
    const location = useLocation()
    const dialogRef = useRef(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('')
    dayjs.extend(relativeTime);


    useEffect(() => {
        const recipeLink = `http://localhost:3000/recipes/food/${params.id}`
        const ingredientsLink = `http://localhost:3000/recipes/food/${params.id}/ingredients`
        const commentsLink = `http://localhost:3000/recipes/food/${params.id}/comments`
        axios.get(recipeLink).then(response =>{
            setRecipe(response.data.data.recipe)
        })

        axios.get(ingredientsLink).then(response =>{
            setIngredients(response.data.data)
        })

        axios.get(commentsLink).then(response =>{
            setComments(response.data.data.map((comment)=>{
                return {...comment , relativeTime : dayjs(comment.created_at).fromNow() }
            }))
        })

    }, []);

    const ingredientsUI = ingredients.map((ingredient)=>{
        return <IngredientRow key = {ingredient.id} {...ingredient} quantity={ingredient.RecipeIngredient.quantity}/>
    })

    const close = ()=>{
        dialogRef.current.close()
    }


    const postComment = async ()=>{
        const commentObj = {
            "content" : comment,
            "recipe_id" : recipe.id,
            "user_id" : decoded.id
        }

       const response =  await axios.post('http://localhost:3000/comments' ,  commentObj , {
           headers: {
               'Authorization': `Bearer ${jwt}`,
               'Content-Type': 'application/json'
           }
       })
       setComments([... comments , {id : 0 , content: comment ,created_at: new Date().toISOString() , relativeTime : dayjs(comment.created_at).fromNow() , User : {username : decoded.username}}])
       setComment('')

    }

   async  function handleEnter(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Prevent the default behavior (new line)
            await postComment()

        }
    }

    const handleChange = (e)=>{
        const comment = e.target.value
        setComment(comment)
    }

    useEffect(() => {
        // Set up the interval
        const interval = setInterval(() => {
            // Code to execute every 1 minute
            setComments(prevComments => prevComments.map((comment) => {
                return { ...comment, relativeTime: dayjs(comment.created_at).fromNow() }
            }));

        }, 60000); // 60000 milliseconds = 1 minute

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);// Empty dependency array means this runs once on mount and cleans up on unmount



    return (
        <>
        <header className={isScrolled ? 'discover-header-scroll' : 'discover-header'}>
            <div className='discover-header-content'>
                <Link className={location.state?.from  ?  'back-link' : 'back-link invisible '} to={ location.state?.params === '' || !location.state?.params
                     ? `http://localhost:5173/${location.state?.from}` :  `http://localhost:5173/${location.state?.from}?${location.state?.params}` } >

                    <IoArrowBackOutline className='back-icon'/>
                </Link>
                <h2 className='recipe-name'>{recipe.name}</h2>
            </div>
        </header>
    <div className='recipe-page discover'>

        <div className='recipe-details'>
            <div className='recipe-view'>
                <img className='recipe-img'
                     src={recipe.image_url}
                     alt='recipe image'/>
                <div className='recipe-interactions'>

                    <div className='interaction-btn'>
                        <FaRegStar/>
                    </div>

                    <div onClick={() => dialogRef.current?.showModal()} className='interaction-btn'>
                        <FaRegCommentDots/>
                    </div>
                </div>
                <div className='nutritions-infos'>
                    <div className='pie-chart'>
                    <PieChart
                            data={[
                                {title: 'Fat', value: recipe.fat, color: '#11bdcd'},
                                {title: 'Protein', value: recipe.protein, color: '#a375ff'},
                                {title: 'Carbs', value: recipe.carbs, color: '#f1b604'},
                            ]}
                            animate={true}
                            label={({dataEntry}) => {

                                return dataEntry.percentage > 30 ? (`${dataEntry.title}: ${dataEntry.percentage.toFixed(1)}%`) : null


                            }}
                            labelStyle={{
                                fill: 'white',
                                fontSize: '6px',
                                textAnchor: 'middle',
                                fontWeight: '600'
                            }}
                        />
                    </div>
                    <p className='one-serving'>For 1 serving</p>
                    <div className='info-row'>
                        <p>Calories</p>
                        <p>{recipe.calories}</p>
                    </div>
                    <div className='info-row'>
                        <p><span className="dot yellow"></span> Carbs</p>
                        <p> {recipe.carbs} g</p>
                    </div>
                    <div className='info-row'>
                        <p><span className="dot blue"></span> Fats</p>
                        <p>{recipe.fat} g</p>
                    </div>
                    <div className='info-row'>
                        <p><span className="dot purple"></span> Protein</p>
                        <p>{recipe.protein} g</p>
                    </div>


                </div>
            </div>

            <div className='recipe-cooking-details'>
                <p className='cook-prep'><strong className='strong'>Prep Time</strong> &nbsp; &nbsp; {recipe.prep_time} minutes</p>
                <p className='cook-prep second'><strong className='strong'>Cook time</strong> &nbsp; &nbsp; {recipe.cook_time} minutes
                </p>
                <h2 className='recipe-page-title'>Ingredients</h2>
                {ingredientsUI}

                <h2 className='recipe-page-title'>Directions</h2>
                {recipe.instructions}

            </div>


        </div>

    </div>
            <Modal className='with-keyframes comments-modal' onConfirm={()=>{console.log('comments')}} dialogRef={dialogRef} confirmationText='Log out' showButtons={false}>
                <ModalTitleWithIcon close={close}>Comments</ModalTitleWithIcon>
                <div className='comments'>
                    {comments.map((comment)=>{
                        return <Comment key = {comment.id} username={comment.User.username} content={comment.content} relativeTime={comment.relativeTime}/>
                    })}

                </div>
                <div className='post-comment'>
                    <form method="post">
                        <label htmlFor="comment">Post a Comment</label>
                        <div className='input-wrapper'>
                            <textarea value={comment} onChange={handleChange} onKeyDown={handleEnter} autoComplete="off" className='comment-input'  id="comment" name="comment"
                                   placeholder="Enter your comment here"/>
                            <div onClick={postComment} className='send-comment'>
                                <IoSend className='send-btn'/>
                            </div>

                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}