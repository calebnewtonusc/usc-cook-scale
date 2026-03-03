/// <reference types="vite/client" />

declare module 'aos' {
  interface AosOptions {
    duration?: number;
    once?: boolean;
    offset?: number;
    delay?: number;
    easing?: string;
    [key: string]: unknown;
  }
  const AOS: {
    init(options?: AosOptions): void;
    refresh(): void;
    refreshHard(): void;
  };
  export default AOS;
}

declare module 'typed.js' {
  interface TypedOptions {
    strings?: string[];
    typeSpeed?: number;
    backSpeed?: number;
    backDelay?: number;
    loop?: boolean;
    showCursor?: boolean;
    cursorChar?: string;
    [key: string]: unknown;
  }
  export default class Typed {
    constructor(element: string | Element, options: TypedOptions);
    destroy(): void;
  }
}

declare module 'progressbar.js' {
  interface ProgressBarOptions {
    color?: string;
    duration?: number;
    easing?: string;
    strokeWidth?: number;
    trailColor?: string;
    trailWidth?: number;
    svgStyle?: Record<string, string | number>;
    text?: {
      value?: string;
      className?: string;
      style?: Record<string, string | number>;
    };
    step?: (state: unknown, bar: ProgressBarShape) => void;
    [key: string]: unknown;
  }

  interface ProgressBarShape {
    animate(progress: number, options?: Partial<ProgressBarOptions>, callback?: () => void): void;
    set(progress: number): void;
    stop(): void;
    destroy(): void;
    getValue(): number;
    getPath(): SVGPathElement;
    setText(text: string): void;
  }

  export class Circle extends Object implements ProgressBarShape {
    constructor(container: string | HTMLElement, options?: ProgressBarOptions);
    animate(progress: number, options?: Partial<ProgressBarOptions>, callback?: () => void): void;
    set(progress: number): void;
    stop(): void;
    destroy(): void;
    getValue(): number;
    getPath(): SVGPathElement;
    setText(text: string): void;
  }

  export class Line extends Object implements ProgressBarShape {
    constructor(container: string | HTMLElement, options?: ProgressBarOptions);
    animate(progress: number, options?: Partial<ProgressBarOptions>, callback?: () => void): void;
    set(progress: number): void;
    stop(): void;
    destroy(): void;
    getValue(): number;
    getPath(): SVGPathElement;
    setText(text: string): void;
  }

  export class SemiCircle extends Object implements ProgressBarShape {
    constructor(container: string | HTMLElement, options?: ProgressBarOptions);
    animate(progress: number, options?: Partial<ProgressBarOptions>, callback?: () => void): void;
    set(progress: number): void;
    stop(): void;
    destroy(): void;
    getValue(): number;
    getPath(): SVGPathElement;
    setText(text: string): void;
  }
}
