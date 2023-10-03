import { Component } from '@angular/core';

@Component({
  selector: 'gor-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {

  buttonText="Submit";
  rating=[false,false,false,false,false]
  onProceed(){
    const index=this.rating.indexOf(false);
    
    if(index===-1)
    {
      console.log("got "+this.rating.length+" rating")
    }else{
      console.log("got "+index+" rating")
    }
  
  }
  onStar(rate:boolean,i:number){
    
    if(this.rating[i+1])
    {
    for(let j=i+1;j<this.rating.length;j++)
    {
      this.rating[j]=false;
    }
    
  }else if(this.rating[i] &&!this.rating[i+1]){
    for(let j=0;j<this.rating.length;j++)
    {
      this.rating[j]=false;
    }
  }
  else{
    for(let j=0;j<=i;j++)
    {
      this.rating[j]=true;
    }
  }
    
  }
}
