export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Stack {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  isPublic: boolean;
  cardOrder: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Card {
  id: string;
  stackId: string;
  name: string;
  background: {
    type: 'color' | 'image';
    value: string;
  };
  elements: CardElement[];
  scripts: Script[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CardElement {
  id: string;
  type: 'text' | 'button' | 'field' | 'image' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  style: ElementStyle;
  handlers: EventHandler[];
}

export interface ElementStyle {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  opacity?: number;
}

export interface EventHandler {
  event: 'click' | 'mouseEnter' | 'mouseLeave' | 'change' | 'keyPress';
  script: string;
}

export interface Script {
  id: string;
  name: string;
  content: string;
  type: 'card' | 'stack' | 'global';
}