import {Link} from "react-router-dom";

export const NotFound = () => {
    return (
        <div className='not-found'>
            <img className='not-found-img' src='https://www.eatthismuch.com/app/_app/immutable/assets/thinking-orange.5TgosL_N.webp' alt = 'not found img'/>
            <div className='not-found-text'>
                <h2 className='four'>404 Not Found</h2>
                <p className='couldnt'>We couldn&#39;t find the page you were looking for</p>
                <Link className='return-home' to='/app'>Return Home</Link>
                
            </div>
        </div>
    )
}