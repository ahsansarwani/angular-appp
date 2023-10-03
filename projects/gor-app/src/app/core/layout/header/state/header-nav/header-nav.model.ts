export interface Meta {
  entity_id: string;
}

export interface OptionAttributes {
  class: string[];
  target: string;
  icon: string;
  field_event_category: string;
  field_event_action: string;
  field_event_label: string;
  field_ui_section: string;
  field_ui_element: string;
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

export interface HeaderNav {
  type: string;
  id: string;
  attributes: Attributes;
  active?: boolean;
}

// eslint-disable-next-line
export function createHeaderNav(params: Partial<HeaderNav>) {
  return {} as HeaderNav;
}
