import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { app } from '../../firebaseInit'
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore'

const PostRead = ({ match, history }) => {
    const id = match.params.id;
    const db = getFirestore(app);
    const [post, setPost] = useState('');
    const [loading, setLoading] = useState(false);

    const getPost = async () => {
        setLoading(true);
        const result = await getDoc(doc(db, `posts/${id}`));
        //console.log(result.data());
        setPost(result.data());
        setLoading(false);
    }
    const onDelete = async() => {
        if(window.confirm(`${id}번 게시글을 삭제하시겠습니까?`)){
            //게시글 삭제
            await deleteDoc(doc(db, `posts/${id}`));
            history.push('/posts');
        }
    }

    useEffect(() => {
        getPost();
    }, []);

    if(loading) return <h1 className='text-center my-5'>로딩중입니다.</h1>

    return (
        <Row>
            <Col>
                <h1 className='text-center my-5'>게시글정보</h1>
                {sessionStorage.getItem('email')===post.email &&
                    <div className='text-end ms-5'>
                        <Button variant='danger' onClick={onDelete}>삭제</Button>
                    </div>
                }
                <Card>
                    <Card.Header>{post.title}</Card.Header>
                    <Card.Body>{post.body}</Card.Body>
                    <Card.Footer>
                        Posted on {post.date} by {post.email}
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
    )
}

export default PostRead