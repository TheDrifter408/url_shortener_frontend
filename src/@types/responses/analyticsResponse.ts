export interface Analytics {
  total_clicks: number;
  long_url: string;
  breakdown: {
    browsers: string[];
    devices: string[];
    os: string[];
  }
}