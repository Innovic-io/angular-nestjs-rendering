import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  responseFromApi$: Observable<any>;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

    this.responseFromApi$ = this.httpClient.get<any>('/api/hello');
  }

}
