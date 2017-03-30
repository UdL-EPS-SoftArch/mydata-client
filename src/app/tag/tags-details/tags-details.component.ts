import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TagService} from "../tag.service";
import {Tag} from "../tag";

@Component({
  selector: 'app-tag-details',
  templateUrl: './tags-details.component.html',
  styleUrls: ['./tags-details.component.css']
})
export class TagDetailsComponent implements OnInit {
  public tag: Tag = new Tag();
  public errorMessage: string;

  constructor(private route: ActivatedRoute,
              private schemaService: TagService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/tags/${id}`;
        this.schemaService.getTag(uri).subscribe(
          tag => { this.tag = tag; },
          error => this.errorMessage = <any>error.message
        );
      });
  }
}
