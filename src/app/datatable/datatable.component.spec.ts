import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DatatableComponent } from './datatable.component';
import { HackerNewsService } from '../hacker-news.service';

class MockHackerNewsService {
  getNewStories() {
    return of([
      { Id: 1, Title: 'Story 1', Url: 'https://example.com/1' },
      { Id: 2, Title: 'Story 2', Url: 'https://example.com/2' }
    ]);
  }
}

describe('DatatableComponent', () => {
  let component: DatatableComponent;
  let fixture: ComponentFixture<DatatableComponent>;
  let hackerNewsService: HackerNewsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatatableComponent],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        NoopAnimationsModule

      ],
      providers: [
        { provide: HackerNewsService, useClass: MockHackerNewsService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableComponent);
    component = fixture.componentInstance;
    hackerNewsService = TestBed.inject(HackerNewsService);

    fixture.detectChanges();
    component.paginator = TestBed.createComponent(MatPaginator).componentInstance; // Manually create paginator
    component.dataSource.paginator = component.paginator; // Set paginator to data source
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a mat-form-field with an input', () => {
    const matFormField = fixture.debugElement.query(By.css('mat-form-field'));
    expect(matFormField).not.toBeNull();

    const input = matFormField.query(By.css('input'));
    expect(input).not.toBeNull();
  });

  it('should display the data table', () => {
    const table = fixture.debugElement.query(By.css('mat-table'));
    expect(table).not.toBeNull();
  });

  it('should fetch and display news stories', () => {
    expect(component.dataSource.data.length).toBe(2);
    expect(component.dataSource.data[0].Title).toBe('Story 1');

  });



  it('should filter the news stories', () => {
    const inputEvent = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(inputEvent, 'target', { writable: false, value: { value: 'Story 1' } });

    component.applyFilter(inputEvent);
    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].Title).toBe('Story 1');
  });

  it('should reset to the first page when filter is applied', () => {
    const paginatorSpy = spyOn(component.paginator, 'firstPage');

    const inputEvent = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(inputEvent, 'target', { writable: false, value: { value: 'Story' } });

    component.applyFilter(inputEvent);
    expect(paginatorSpy).toHaveBeenCalled();
  });

});
