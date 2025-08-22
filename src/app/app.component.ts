import {Component, inject, signal} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {Data} from './data';
import {DataService} from './data.service';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-root',
  imports: [
    TableModule,
    ButtonDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  dataService = inject(DataService);

  data = signal<Data[]>([]);

  loadData() {
    this.dataService.getAll().subscribe(data => {
      console.log('data', data);
      this.data.set(data)
    });
  }
}
