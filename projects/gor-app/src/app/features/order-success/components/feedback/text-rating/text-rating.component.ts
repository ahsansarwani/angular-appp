import { Component } from '@angular/core';

@Component({
  selector: 'gor-text-rating',
  templateUrl: './text-rating.component.html',
  styleUrls: ['./text-rating.component.scss']
})
export class TextRatingComponent {
  buttonText="Send";
  itWasEasy={
    id:"it-was-easy",
    text:"It was easy to choose what plan I want",
    selected:false
  }
  rating=[
    {
      id:"ease-of-use",
      text:"Ease Of Use",
      selected:false
    },
    {
      id:"features",
      text:"Features",
      selected:false
    },
    {
      id:"design",
      text:"Design",
      selected:false
    },
    {
      id:"offers",
      text:"Offers",
      selected:false
    },
    {
      id:"app-performance",
      text:"App Performance",
      selected:false
    },
    {
      id:"others",
      text:"Others",
      selected:false
    },
    
  ]

  othersText="";
  placeHolderText="It was easy to choose what plan I want"
  onProceed(){
    const ratedTexts:any=[]
   this.rating.forEach(elem=>{
    if(elem.selected)
    {
      ratedTexts.push(elem)
    }
   });
   
   console.log(ratedTexts)
   console.log(this.othersText)
  
  }
  onText(rate:any,i:number){
  const item:any=this.rating.find(item=>item.id===rate.id)
  console.log(this.rating,item,rate)
  if(item)
    item.selected=!item.selected;
  }
  onExtraButton(rate:any){
    this.itWasEasy.selected=!this.itWasEasy.selected;
  }

  handleFileInput(event: Event): void {
    // const inputElement:any = event.target as HTMLInputElement;
    // if(inputElement)
    // {
    //   const file = inputElement.files[0];
    // }
    // Perform further operations with the selected file, such as uploading to a server
  }
  onUpload(){
    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   navigator.mediaDevices.getUserMedia({ video: true })
    //     .then((stream) => {
    //       const video = document.createElement('video');
    //       const videoElement = document.body.appendChild(video);
    //       videoElement.srcObject = stream;
    //       videoElement.play();
    //     })
    //     .catch((error) => {
    //       console.error('Error accessing camera:', error);
    //     });
    // } else {
    //   console.error('getUserMedia is not supported in this browser.');
    // }
  }
}
