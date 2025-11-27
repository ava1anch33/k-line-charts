/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export function merge(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): void {
  if (!isObject(target) && !isObject(source)) {
    return;
  }

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const targetProp = target[key];
      const sourceProp = source[key];

      if (isObject(sourceProp) && isObject(targetProp)) {
        merge(
          targetProp as Record<string, unknown>,
          sourceProp as Record<string, unknown>
        );
      } else {
        target[key] = clone(sourceProp);
      }
    }
  }
}


export function clone<T>(target: T): T {
    if (!isObject(target)) {
        return target
    }
    
    let copy: Record<string, unknown> | unknown[]
    if (isArray(target)) {
        copy = []
        const targetArray = target as unknown[]
        for (let i = 0; i < targetArray.length; i++) {
        const v = targetArray[i];
        if (isObject(v)) {
            (copy as unknown[])[i] = clone(v)
        } else {
            (copy as unknown[])[i] = v
        }
        }
    } else {
        copy = {};
        const targetObj = target as Record<string, unknown>;
        for (const key in targetObj) {
        if (Object.prototype.hasOwnProperty.call(targetObj, key)) {
            const v = targetObj[key]
            if (isObject(v)) {
            (copy as Record<string, unknown>)[key] = clone(v)
            } else {
            (copy as Record<string, unknown>)[key] = v
            }
        }
        }
    }
    
    return copy as T
}

export function isArray<T = unknown>(value: unknown): value is T[] {
    return Object.prototype.toString.call(value) === '[object Array]'
}

export function isFunction<T = (...args: unknown[]) => unknown> (value: unknown): value is T {
  return typeof value === 'function'
}

export function isObject (value: unknown): value is object {
  return (typeof value === 'object') && isValid(value)
}

export function isNumber (value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

export function isValid<T> (value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

export function isBoolean (value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function isString (value: unknown): value is string {
  return typeof value === 'string'
}