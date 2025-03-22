export class RequestQueue {
  private static instance: RequestQueue;
  private currentRequest: Promise<any> | null = null;
  private timeout: number = 15000; // Reduced to 15 seconds

  private constructor() {}

  public static getInstance(): RequestQueue {
    if (!this.instance) {
      this.instance = new RequestQueue();
    }
    return this.instance;
  }

  public async executeRequest<T>(request: () => Promise<T>): Promise<T> {
    if (this.currentRequest) {
      throw new Error('Analysis in progress');
    }

    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Analysis timed out')), this.timeout);
      });

      this.currentRequest = Promise.race([request(), timeoutPromise]);
      return await this.currentRequest;
    } finally {
      this.currentRequest = null;
    }
  }

  public isProcessing(): boolean {
    return this.currentRequest !== null;
  }
}
