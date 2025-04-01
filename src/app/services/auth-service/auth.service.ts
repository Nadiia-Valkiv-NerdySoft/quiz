import { inject, Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

import {
  Auth,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import {
  BehaviorSubject,
  catchError,
  defaultIfEmpty,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { FirebaseError } from '@angular/fire/app';

export type UserRole = 'user' | 'admin' | null;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);

  private currentUserRoleSubject = new BehaviorSubject<UserRole>(null);

  login(email: string, password: string): Observable<string> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password),
    ).pipe(
      switchMap((userCredential: UserCredential) => this.getUserRole(userCredential.user.uid)),
      tap(role => this.currentUserRoleSubject.next(role as UserRole)),
      catchError((error) => {
        let errorMessage = 'An unknown error occurred';

        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/user-not-found':
              errorMessage = 'No user found with this email.';
              break;
            case 'auth/wrong-password':
              errorMessage = 'Incorrect password.';
              break;
            case 'auth/invalid-email':
              errorMessage = 'Invalid email format.';
              break;
            case 'auth/user-disabled':
              errorMessage = 'This user has been disabled.';
              break;
            case 'auth/invalid-credential':
              errorMessage = 'Invalid credentials provided.';
              break;
            default:
              errorMessage
                = 'An unknown error occurred with Firebase authentication.';
          }
        }

        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  getCurrentUserRole(): Observable<UserRole> {
    return this.currentUserRoleSubject.asObservable();
  }

  private getUserRole(uid: string): Observable<string> {
    const userDocRef = doc(this.firestore, `users/${uid}`);
    return from(getDoc(userDocRef)).pipe(
      map(docSnap => docSnap.exists() ? (docSnap.data() as any).role : 'user'),
      defaultIfEmpty('user'),
      catchError(() => of('user')),
    );
  }
}
