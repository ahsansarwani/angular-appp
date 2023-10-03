import { Component } from '@angular/core';

@Component({
  selector: 'gor-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  buttonText="Submit";
  feedbackIndex=2;
  feedback=[
    {
      title:"How satisfied are you with Globe Online?",
      id:"star"
    },
    {
      title:"Based on your experience using Globe Online, how likely are you to recommend Globe to others?",
      id:"number"
    },
    {
      title:"Thank for your feedback!",
      subtitle:"Can you tell us more about what is working well and what can improve with our app?",
      id:"text"
    },
  ]
}
