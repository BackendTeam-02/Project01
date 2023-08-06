import React from 'react';
import {TextField} from '@mui/material';
import {styled} from '@mui/system';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import {red} from '@mui/material/colors';
import {blue, CustomButton, grey} from './CustomButton';

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 320px;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

const DocumentPage = () => {
  return (
    <div style={{
      padding: '40px'
    }}>
      <h1>게시판 상세</h1>
      <h2>글 제목</h2>
      <TextField id="outlined-basic" label="Outlined" variant="outlined"/>
      <h2>작성자</h2>
      <TextField id="outlined-basic" label="Outlined" variant="outlined"/>
      <h2>본문</h2>
      <StyledTextarea
        aria-label="minimum height"
        minRows={3}
        placeholder="Minimum 3 rows"
      />
      <div style={{
        marginTop: '20px'
      }}>
        <CustomButton style={{backgroundColor: blue[500]}}>제출</CustomButton>
        <CustomButton style={{backgroundColor: red[500]}}>취소</CustomButton>
      </div>
    </div>
  );
};

export default DocumentPage;
