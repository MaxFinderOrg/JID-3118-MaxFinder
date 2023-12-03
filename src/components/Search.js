import React, { useState, useEffect  } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { collection, query, where, getDocs, get } from "firebase/database";
import {getDownloadURL} from "firebase/storage";
import 'firebase/compat/storage';

import SearchBar from '../SearchBar/SearchBar.tsx'
import FilterResults from '../SearchBar/FilterResults.tsx';
import SearchPopup from '../SearchPopup/SearchPopup.tsx';


export default function Search() {

  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchPopupOpen, setSearchPopupOpen] = useState(false);

  useEffect(() => {
    // Fetch posts data
    const fetchData = async () => {
      const db = firebase.firestore();
      const collectionRef = collection(db, 'post');
      const q = query(collectionRef);
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => doc.data());
      setPosts(postsData);
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm, searchField) => {
    console.log('Search Term:', searchTerm);
    console.log('Search Field:', searchField);
    const db = firebase.firestore();
    const collectionRef = collection(db, 'post');
    let q = query(collectionRef);

    // Modify the query based on the selected search field
    if (searchField === 'name') {
      q = query(collectionRef, where('name', '==', searchTerm));
    } else if (searchField === 'breed') {
      q = query(collectionRef, where('breed', '==', searchTerm));
    } else if (searchField === 'color') {
      q = query(collectionRef, where('color', '==', searchTerm));
    }
  /*const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchTerm) => {
    const getFromFirebase = firebase.firestore();
    getFromFirebase.collection("post").get({

    const q = query(collection(db, 'post'), where('keywords', 'array-contains', searchTerm.toLowerCase()));//async () => {
      //const data = await db.collection("post").orderby("date").get();
      //setcontacts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //};
    
      //query(collection(db, 'posts'), where('keywords', 'array-contains', searchTerm.toLowerCase()));
  */
    getDocs(q)
      .then((querySnapshot) => {
        const results = querySnapshot.docs.map(doc => doc.data());
        /*const results = [];
        querySnapshot.forEach((doc) => {
          results.push(doc.data());
        });*/
        console.log('Search Results:', results); 
        setSearchResults(results);
        setSearchPopupOpen(true); // Open the search pop-up when search results are available
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  };

  const handleCloseSearchPopup = () => {
    setSearchPopupOpen(false);
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      
      
    
    </div>
  );

}