export interface Meta {
  entity_id: string;
}

export interface OptionAttributes {
  class: string[];
  target: string;
}

export interface Options {
  attributes: OptionAttributes;
}

export interface Route {
  name: string;
  parameters: any[];
}

export interface Attributes {
  description?: any;
  enabled: boolean;
  expanded: boolean;
  menu_name: string;
  meta: Meta;
  options: Options;
  parent: string;
  provider: string;
  route: Route;
  title: string;
  url: string;
  weight: string;
}

export interface FooterNav {
  type: string;
  id: string;
  attributes: Attributes;
  active?: boolean;
}

// eslint-disable-next-line
export function createFooterNav(params: Partial<FooterNav>) {
  return {} as FooterNav;
}
