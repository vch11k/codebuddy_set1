import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('https://codebuddy.review/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data?.data?.posts);
      });
  }, []);
  console.log(posts);
  return (
    <Container>
      <Row>
        {posts?.map(post => {
          return (
            <Col key={post.id} className="my-2" xs={12} md={6} lg={4}>
              <Card className='card_head'>
                <Card.Img variant="top" src={post.image} />
                <Card.Body>
                  <Card.Title>
                    <span></span>{post?.firstName}_
                    {post?.lastName}
                  </Card.Title>
                  <Card.Text><h5>Writeup:</h5>{post?.writeup}</Card.Text>
                </Card.Body>
              </Card>{' '}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Posts;
