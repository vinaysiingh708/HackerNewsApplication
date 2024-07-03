import { Component, OnInit, ViewChild } from '@angular/core';
import { HackerNewsService,NewsStory } from '../hacker-news.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  displayedColumns: string[] = ['Title', 'Url'];
  dataSource = new MatTableDataSource<NewsStory>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  

  constructor(private hackerNewsService: HackerNewsService) {}

  ngOnInit() {
    this.hackerNewsService.getNewStories().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;      
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
