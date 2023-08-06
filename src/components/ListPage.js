import React, {useEffect, useState} from 'react';
import {CustomButton} from './CustomButton';
import {useNavigate} from 'react-router-dom';
import {red} from '@mui/material/colors';
import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';

const ListPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: '게시물 제목',
      content: '게시물 내용',
      author: '작성자',
      created_at: '작성일시'
    },
    {
      id: 2,
      title: '게시물 제목',
      content: '게시물 내용',
      author: '작성자',
      created_at: '작성일시'
    }
  ]);

  useEffect(() => {
    async function fetchData() {
      await fetch('http://localhost:8080/api/posts')
      .then(res => res.json()).then(res => setPosts([...res.posts]))
      .catch((err) => console.error(err));
    }

    fetchData();
  }, []);

  const logoutHandler = async () => {
    const email = localStorage.getItem('email');
    if (!email) return;
    await fetch(`http://localhost:8080/api/logout`, {
      method: 'POST',
      body: JSON.stringify({
        email
      })
    }).then(res => res.json()).then(() => {
      navigate('/login');
    }).catch((error) => console.error(error));
    ;
  };

  return (
    <div style={{
      padding: '40px'
    }}>
      <h1>게시판 리스트</h1>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell>게시물내용</TableCell>
            <TableCell>작성자</TableCell>
            <TableCell>작성일시</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map(post => (
            <TableRow
              key={post.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {post.title}
              </TableCell>
              <TableCell>{post.content}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomButton style={{ backgroundColor: red[500] }} onClick={logoutHandler}>로그아웃</CustomButton>
    </div>
  );
};

export default ListPage;
