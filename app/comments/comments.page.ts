import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommentsService } from '../apis/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit{

  comments

  constructor( public proveedor: CommentsService, public navCtrl: NavController) 
  {}

  ngOnInit(){
    this.proveedor.getComments()
    .subscribe(
      (data) => {this.comments = data;},
      (error) => {console.log(error);}
    )
  }

}
