import { inject } from "@angular/core";
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

export const loginGuard = (): Observable<boolean> => {

  const router= inject(Router);

  if (localStorage.getItem('token')) {
    return of(true);
  } else {
    router.navigate(['auth/login']);
    return of(false);
  }
}
