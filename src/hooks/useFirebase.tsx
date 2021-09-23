import React from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { selectUser } from '../lib/auth';

export const useFirebase = async () => {
  const user = useSelector(selectUser)
  const docId = user.uid;
  const photoUrl = user.photoUrl;
  const userName = user.displayName;
  const docRef =  await db.collection("users").doc(docId).get();
  const docData = async() =>  docRef.data();
  const userData = {
    userName: docData().userName,

  }

  return {
    docId,
    photoUrl,
    userName,
    docData,
    // lang,
    // userStatus,
    // gender,
    // avatarImage,
    
  }
}