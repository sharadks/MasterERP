import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { UserService } from './services/user.service';

@Directive({ selector: '[showAuthed]' })
export class ShowAuthedDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) {}

  condition: boolean;

  ngOnInit() {
    console.log("============isAuthenticated ngOnInit=============", this.condition);

    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        console.log("============isAuthenticated isAuthenticated=============", isAuthenticated);

        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    )
  }

  @Input() set showAuthed(condition: boolean) {
    console.log("============isAuthenticated set=============", condition);

    this.condition = condition;
  }

}
