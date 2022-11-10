import {Component, OnInit} from '@angular/core';
import {Picture} from "../interfaces/picture";
import {HttpClient} from "@angular/common/http";
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'img-app-frontend';
  pictures:Array<Picture> = [];
  base64textString = "";

  newpic:Picture ={imgByteString: "", imgUrl: "", picId: 0, picName: ""}

constructor(private http: HttpClient) {
}

  ngOnInit(): void {
        this.populateAllPics();
    }

  createPic(){
    this.newpic.imgByteString = this.base64textString;
    this.http.post(environment.javaApiUrl,this.newpic).subscribe(()=>{})
  }

  deletePic(id:number){
    this.http.delete(environment.javaApiUrl+"?id="+id).subscribe(()=>{})
  }

  getAllPics(){
    return this.http.get<Array<Picture>>(environment.javaApiUrl)
  }
  populateAllPics(){
    this.getAllPics().subscribe((pics:Picture[]) => {
      this.pictures = pics;
    })
  }

  handleReaderLoaded(e: any) {
    this.base64textString = btoa(e.target.result);
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

}
