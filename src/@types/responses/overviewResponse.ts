export interface TopPerformer {
  slug: string;
  clicks: number;
  url: string;
}

export interface Distribution {
  label: string;
  count: number;
}

export interface Overview {
  total_links: number;
  total_clicks: number;
  top_performer: TopPerformer | null;
  distributions: {
    devices: {
      total: number,
      list: Distribution[]
    };
    browsers: {
      total: number,
      list: Distribution[]
    };
  }
}