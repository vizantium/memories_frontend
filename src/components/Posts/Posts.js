import React from 'react';
import Post from "./Post/Post";
import useStyles from "./styles";
import {useSelector} from "react-redux";
import {CircularProgress, Grid} from "@material-ui/core";


const Posts = ({setCurrentId}) => {
    const classes = useStyles()
    const {items, status } = useSelector((state) => state.posts.posts)

    if (!items.length && status === 'loaded') return 'No posts'

    return (
        status === 'loading' ? <CircularProgress/> : (
           <Grid className={classes.mainContainer} container alignItems={'stretch'} spacing={3}>
               {items.map((post) => (
                   <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                       <Post style={{}} post={post} setCurrentId={setCurrentId} />
                   </Grid>
               ))}
           </Grid>
       )
    );
};

export default Posts;