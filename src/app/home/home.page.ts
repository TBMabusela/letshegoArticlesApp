import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  articleList: any[]= [];
  data = false;
  constructor(private dataService: DataService, private router: Router ) {

    this.getArticles();
  }

  getArticles()
  {
    this.dataService.getMostPopularAricles().subscribe(result => {
      this.articleList = Object.values(result);
     if(this.articleList != null)
     {
       this.data = true;
     }
    });


  }
}
