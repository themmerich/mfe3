import {Injectable} from '@angular/core';
import {Data} from './data';
import {of} from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class DataService {
 getAll() {
   return of([
     {
       title: 'The Great and Secret Show',
       description: 'Book of the Art I',
       author: 'Clive Barker',
       price: 10,
       quantity: 1,
       sum: 10
     } as Data,
     {
       title: 'The long Walk',
       description: 'Book about walking...',
       author: 'Richard Bachman',
       price: 15,
       quantity: 2,
       sum: 30
     } as Data,
     {
       title: '11/22/63',
       description: 'How do you save Kennedy?',
       author: 'Stephen King',
       price: 20,
       quantity: 1,
       sum: 20
     } as Data
   ])
 }
}
