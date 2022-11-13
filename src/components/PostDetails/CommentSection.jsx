import React, {useRef, useState} from 'react';
import useStyles from './styles'
import {Button, TextField, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {commentPost} from "../../redux/postsSlice";

const CommentSection = ({post}) => {
    const classes = useStyles()
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const commentsRef = useRef()

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`
        const id = post._id

        const newComments = await dispatch(commentPost({finalComment, id}))

        setComments(newComments.payload.comments)
        setComment('')

        commentsRef.current.scrollIntoView({ behavior: 'smooth'})
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant={'h6'}>Comments</Typography>
                    {comments.map((comment, index) => (
                        <Typography key={index} gutterBottom variant={'subtitle1'}>
                            <strong>{comment.split(': ')[0]}</strong>
                            {comment.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {
                    user?.result?.name && (
                        <div style={{width: '70%'}}>
                            <Typography gutterBottom variant={'h6'}>Write a comment</Typography>
                            <TextField
                                fullWidth
                                rows={4}
                                variant={'outlined'}
                                label={'Comment'}
                                multiline
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <Button fullWidth disabled={!comment} variant={'contained'} color={'primary'} onClick={handleClick} style={{marginTop: '10px'}}>
                                Comment
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default CommentSection;