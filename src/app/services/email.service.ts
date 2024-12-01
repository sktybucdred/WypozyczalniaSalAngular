import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class emailService {
  private userID = 'mHszeppYW--FTM5dD';

  constructor() {
    emailjs.init(this.userID);
  }

  sendEmail(templateParams: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(
      'service_04t81if',
      'template_d3tyswr',
      templateParams
    );
  }
}
