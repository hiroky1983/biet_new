import React from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { selectUser } from '../lib/auth';

export const useFirebase = () => {
  const user = useSelector(selectUser)
  
  const docId = user.uid;
  const photoUrl = user.photoUrl;
  const userName = user.displayName;
  // const checkValue = db.collection('users').doc(docId).get();
  // const lang = user.language;

  //  const userData = db.collection("users").doc(docId).set({
  //   username: userName,
  //   checkValue: checkValue,
  //   lang: lang,
  //   userstatus: userStatus,
  // });

  return {
    docId,
    photoUrl,
    userName,
  }
}