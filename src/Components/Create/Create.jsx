import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css';
import Header from '../Header/Header';
//import { FirebaseContext, AuthContext } from '../../Store/FirebaseContext';
import { AuthContext,FirebaseContext } from '../../store/FirebaseContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';


const Create = () => {
  const { app ,db} = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)

  const date = new Date()
  const handleSubmit = () => {
    if (image == null) {
      return;
    }
    const storage = getStorage(app)
    const storageRef = ref(storage, `images/${image.name}`)
    uploadBytes(storageRef, image)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref)
      })
      .then((url) => {
        console.log(url, 'url in create jsx file');
        const docRef = addDoc(collection(db,'products'),{
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        navigate('/')
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      })
  }
  return (
    <Fragment>
      <Header />

      <div className="centerDiv">
        <label htmlFor="fname">Name</label>
        <br />
        <input className="input" onChange={(e) => setName(e.target.value)} type="text" id="fname" name="Name" />
        <br />
        <label htmlFor="fname">Category</label>
        <br />
        <input className="input" onChange={(e) => setCategory(e.target.value)} type="text" id="fname" name="category" />
        <br />
        <label htmlFor="fname">Price</label>
        <br />
        <input className="input" onChange={(e) => setPrice(e.target.value)} type="number" id="fname" name="Price" />
        <br />
        <br />
        <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
        <br />
        <input onChange={(e) => setImage(e.target.files[0])} type="file" />
        <br />
        <button style={{cursor:'pointer'}} onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
      </div>
    </Fragment>
  );
};

export default Create;