import {Pagination, PaginationItem} from '@material-ui/lab';
import useStyles from './styles'
import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {fetchPosts} from "../redux/postsSlice";
import {useDispatch, useSelector} from "react-redux";

const Paginate = ({page}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {numberOfPages} = useSelector((state) => state.posts.posts)

    useEffect( () => {
        if (page) { dispatch(fetchPosts({page}))}
        navigate(`/posts?page=${page}`)
    }, [page])

    return (
        <Pagination
            classes={{ ul: classes.ul}}
            count={numberOfPages}
            page={Number(page) || 1}
            variant={"outlined"}
            color={"primary"}
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}
        />
    );
};

export default Paginate;