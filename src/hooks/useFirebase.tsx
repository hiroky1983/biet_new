import React from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { selectUser } from '../lib/auth';

export const useFirebase = () => {
  const user = useSelector(selectUser)
  
  const docId = user.uid;
  const photoUrl = user.photoUrl;
  const userName = user.displayName;

  return {
    docId,
    photoUrl,
    userName,
  }
}