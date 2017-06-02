import { Component, OnInit } from '@angular/core';
import { TagService } from '../tag.service';
import { Tag } from '../tag';
import { DatasetService } from '../../dataset/dataset.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent implements OnInit {
  public tags: Tag[] = [];
  public errorMessage: string;

  constructor(private tagService: TagService,
              private datasetService: DatasetService) { }

  onSearch(tags) {
    this.tags = tags;
  }

  ngOnInit() {
    this.tagService.getAllTags().subscribe(
      tags => {
        this.tags = tags;
        this.tags.forEach(tag => {
          this.datasetService.getDatasetsByTag(tag.name).subscribe(
            datasets => {
              tag.datasets = datasets;
            }
          );
        });
      },
      error => this.errorMessage = <any>error.message
    );
  }
}
