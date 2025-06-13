export interface ToolBox {
  data: ToolsListItem;
  link: string;
}

export interface ToolsListItem {
  name: string;
  description: string;
  image: string;
  url: string;
}
