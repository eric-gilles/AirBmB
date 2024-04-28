import { HttpRequest, HttpHandler } from '@angular/common/http'; // Import the necessary classes
import { UserService } from '../services/user.service'; // Import the UserService
import { HttpInterceptor, HttpEvent } from '@angular/common/http'; // Import the necessary classes
import { Observable } from 'rxjs';
export const authInterceptor: HttpInterceptor = {
  intercept: (
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> => {
    const userToken = UserService.getToken(); // Obtention du token à partir du service
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
    });

    return next.handle(modifiedReq); // Use next.handle instead of next
  },
};
