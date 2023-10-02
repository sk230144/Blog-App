import React, { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../Editor';
import { response } from 'express';
import ReactQuill from 'react-quill';

export default function CreatePost() {
  const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
       fetch('http://localhost:4000/post/'+id)
       .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
          
        })
       })
    }, []);

  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
      ev.preventDefault();
     const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials:'include',
    });
    if(response.ok){
     setRedirect(true)
    }
 }

 if(redirect){
   return <Navigate to={'/'} />
 }

  return (
    <form onSubmit={createNewPost}>
      <h2>Create Your New Post</h2>
      <input type="title"
      placeholder={'Title'}
      value={title}
      onChange={ev => setTitle(ev.target.value)} />

     <input type="summary"
      placeholder={'Summary'}
      value={summary}
      onChange={ev => setSummary(ev.target.value)} />

      <input type='file' 
       onChange={ev => setFiles(ev.target.files)} />

      <ReactQuill 
       value={content} 
       onChange={newValue => setContent(newValue)}/>

      <button style={{marginTop:'5px'}}>Create Post</button>
    </form>
  )
}
