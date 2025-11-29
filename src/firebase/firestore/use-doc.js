'use client';
import { useState, useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * A real-time hook for listening to a Firestore document.
 * @param {DocumentReference | null} ref The Firestore document reference to listen to.
 * @returns {UseDocResult} An object containing the data, loading state, and error.
 */
export function useDoc(ref) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMemoized = ref && ref.__memo;

  useEffect(() => {
    if (ref === null) {
      setData(null);
      setIsLoading(false);
      return;
    }

    if (isMemoized === false) {
      console.warn(
        `[useDoc] ref is not memoized. This may cause performance issues.
        Path: ${ref.path}`
      );
    }

    setIsLoading(true);

    const unsubscribe = onSnapshot(
      ref,
      (docSnap) => {
        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() });
        } else {
          setData(null); // Document does not exist
        }
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        console.error(`[useDoc] Error for path: ${ref.path}`, err);
        const permissionError = new FirestorePermissionError({
          path: ref.path,
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(permissionError);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [ref, isMemoized]);

  return { data, isLoading, error };
}