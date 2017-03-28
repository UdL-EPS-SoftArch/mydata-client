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

  ngOnInit() {
    this.tagService.getAllTags().subscribe(
      tags => { this.tags = <any> tags; }, //TODO: Mirar per què obliga a ficar <any> i no accepta de forma normal
      error => this.errorMessage = <any>error.message
    );
  }
}
