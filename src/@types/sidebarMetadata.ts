export interface SidebarMetadata {
  title: string;
  links: {
    id: string | number,
    title: string;
    to: string;
    params?: any
  }[];
}