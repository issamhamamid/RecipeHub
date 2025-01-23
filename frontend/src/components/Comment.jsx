export const Comment = ({content , username , relativeTime}) => {
    return (

        <div className='comment'>
            <div className='user-avatar'>
                <p>{username[0].toUpperCase()}</p>
            </div>

            <div className='comment-info'>
                <div className='comment-content'>
                    <p className='comment-owner'>{username}</p>
                    <p className='comment-text'>{content}</p>
                </div>
                <p className='post-time'>{relativeTime}</p>

            </div>
        </div>
    )
}