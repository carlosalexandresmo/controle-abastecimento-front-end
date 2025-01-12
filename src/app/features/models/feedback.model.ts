export class FeedbackData {
    message: string;
    type: 'error' | 'warning' | 'success' | 'neutral';
  
    constructor(message: any, type: 'error' | 'warning' | 'success' | 'neutral') {
      this.message = message;
      this.type = type;
    }
  }  