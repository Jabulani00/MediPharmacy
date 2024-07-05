import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceId = 'service_mhabkso'; // Replace with your EmailJS service ID
  private templateId = 'template_9fcs3a9'; // Replace with your EmailJS template ID
  private userId = 'oi79T8OvUu3Swt3l7'; // Replace with your EmailJS user ID

  constructor() { }

  sendEmail(templateParams: { [key: string]: any }): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceId, this.templateId, templateParams, this.userId);
  }
}
