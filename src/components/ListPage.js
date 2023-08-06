import React from 'react';
import {blue, CustomButton} from './CustomButton';
import {useNavigate} from 'react-router-dom';

const ListPage = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const email = localStorage.getItem('email');
    if(!email) return;
    await fetch(`http://localhost:8080/api/logout`, {
      method: 'POST',
      body: JSON.stringify({
        email
      })
    }).then(res => res.json()).then(() => {
        navigate('/login')
    }).catch((error) => console.error(error));;
  }

  return (
    <div>
      <h1>게시판 리스트</h1>
      <CustomButton style={{ backgroundColor: blue[500] }} onClick={logoutHandler}>로그인</CustomButton>
    </div>
  );
};

export default ListPage;
