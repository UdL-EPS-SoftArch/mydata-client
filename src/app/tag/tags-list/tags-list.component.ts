import { Component, OnInit } from '@angular/core';
import { TagService } from '../tag.service';
import { Tag } from '../tag';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent implements OnInit {
  public tags: Tag[] = [];
  public errorMessage: string;

  constructor(private tagService: TagService) { }

  onSearch(tags) {
    this.tags = tags;
  }

  ngOnInit() {
    this.tagService.getAllTags().subscribe(
      tags => { this.tags = tags; },
      error => this.errorMessage = <any>error.message
    );
  }
}
