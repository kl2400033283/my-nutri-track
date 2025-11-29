'use client';

import { useState, useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * A real-time hook for listening to a Firestore collection.
 * @param {Query | null} query The Firestore query to listen to.
 * @returns {UseCollectionResult} An object containing the data, loading state, and error.
 */
export function useCollection(query) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMemoized = query && query.__memo;

  useEffect(() => {
    if (query === null) {
      setData(null);
      setIsLoading(false);
      return;
    }
    
    if (isMemoized === false) {
      console.warn(
        `[useCollection] query is not memoized. This may cause performance issues.
        Path: ${query.path}`
      );
    }

    setIsLoading(true);

    const unsubscribe = onSnapshot(
      query,
      (querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(docs);
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        console.error(`[useCollection] Error for path: ${query.path}`, err);
        const permissionError = new FirestorePermissionError({
          path: query.path,
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(permissionError);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [query, isMemoized]);

  return { data, isLoading, error };
}