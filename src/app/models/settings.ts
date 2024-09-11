export class Settings {
  title?: string
  theme?: string
  foo?: {
    bar: number
  }
  layout?: {
    one: {
      two: {
        three: {
          four?: string[]
        },
        threeOne: string
      }
    }
  }

  constructor() {}

  private deepAssign(target: any, source: any): any {
    for (const key of Object.keys(source)) {
      if (key in target) {
        if (this.isObject(target[key]) && this.isObject(source[key])) {
          // Recursively assign nested objects
          this.deepAssign(target[key], source[key]);
        } else if (Array.isArray(target[key]) && Array.isArray(source[key])) {
          // Deep copy arrays
          target[key] = [...source[key]];
        } else {
          // Assign primitive values
          target[key] = source[key];
        }
      }
    }
    return target;
  }

  private isObject(obj: any): boolean {
    return obj && typeof obj === 'object' && !Array.isArray(obj);
  }
}

class foo {
  bar?: number
}
