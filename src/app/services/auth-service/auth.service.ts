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
} from 'rxjs';
import { ErrorHandlerService } from '../error-handler-service/error-handler.service';

export type UserRole = 'user' | 'admin' | null;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firebaseAuth = inject(Auth);
  private firestore = inject(Firestore);
  private errorHandlerService = inject(ErrorHandlerService);

  private currentUserRoleSubject = new BehaviorSubject<UserRole>(null);

  login(email: string, password: string): Observable<string> {
    return from(
      signInWithEmailAndPassword(this.firebaseAuth, email, password),
    ).pipe(
      switchMap((userCredential: UserCredential) => this.getUserRole(userCredential.user.uid)),
      tap(role => this.currentUserRoleSubject.next(role as UserRole)),
      catchError(this.errorHandlerService.handleAuthError),
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
