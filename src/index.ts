export const ARRAY_FILTER_USE_KEY = 1;
export const ARRAY_FILTER_USE_BOTH = 2;
export const COUNT_NORMAL = 0;
export const COUNT_RECURSIVE = 1;
export const FILTER_VALIDATE_INT = 257;
export const FILTER_VALIDATE_BOOLEAN = 258;
export const FILTER_VALIDATE_FLOAT = 259;
export const FILTER_VALIDATE_URL = 273;
export const FILTER_VALIDATE_EMAIL = 274;
export const FILTER_SANITIZE_STRING = 513;
export const FILTER_DEFAULT = 516;
export const FILTER_UNSAFE_RAW = 516;
export const FILTER_SANITIZE_EMAIL = 517;
export const FILTER_SANITIZE_URL = 518;
export const MB_CASE_UPPER = 0;
export const MB_CASE_LOWER = 1;
export const MB_CASE_TITLE = 2;
export const PHP_QUERY_RFC1738 = 1;
export const PHP_QUERY_RFC3986 = 2;
export const PREG_SET_ORDER = 2;
export const PREG_OFFSET_CAPTURE = 4;
export const PREG_SPLIT_NO_EMPTY = 1;
export const PREG_SPLIT_DELIM_CAPTURE = 2;
export const PREG_SPLIT_OFFSET_CAPTURE = 4;
export const SORT_REGULAR = 0;
export const SORT_NUMERIC = 1;
export const SORT_STRING = 2;
export const SORT_NATURAL = 6;
export const SORT_FLAG_CASE = 8;
export const STR_PAD_LEFT = 0;
export const STR_PAD_RIGHT = 1;
export const STR_PAD_BOTH = 2;

/**
 * @link https://www.php.net/manual/en/function.array-all.php
 */
export function array_all(
    array: any[] | Record<string, any>,
    callback: (value: any, key: string | number) => boolean,
): boolean {
    for (const [key, value] of Object.entries(array)) {
        if (!callback(value, Array.isArray(array) ? Number(key) : key)) {
            return false;
        }
    }

    return true;
}

/**
 * @link https://www.php.net/manual/en/function.array-any.php
 */
export function array_any(
    array: any[] | Record<string, any>,
    callback: (value: any, key: string | number) => boolean,
): boolean {
    for (const [key, value] of Object.entries(array)) {
        if (callback(value, key)) {
            return true;
        }
    }

    return false;
}

/**
 * @link https://www.php.net/manual/en/function.array-combine.php
 * @throws If both parameters don't have equal number of elements.
 */
export function array_combine(
    keys: (number | string)[] | Record<string, number | string>,
    values: any[] | Record<string, any>,
): Record<string, any> {
    keys = Object.values(keys);
    values = Object.values(values);

    if (keys.length !== values.length) {
        throw new TypeError(
            `array_combine(): Both parameters should have an equal number of elements (keys=${Object.values(keys).length}, values=${Object.values(values).length})`,
        );
    }

    const result: Record<string, any> = {};

    for (let i = 0; i < keys.length; i++) {
        result[keys[i]] = (values as any)[i];
    }

    return result;
}

/**
 * @link https://www.php.net/manual/en/function.array-diff.php
 */
export function array_diff(
    array: any[] | Record<string, any>,
    ...arrays: (any[] | Record<string, any>)[]
): any[] | Record<string, any> {
    const isArray = Array.isArray(array);
    const result: any[] | Record<string, any> = isArray ? [] : {};

    // Flatten all comparison arrays into one set of values (non-strict).
    const compareValues: any[] = [];

    for (const arr of arrays) {
        for (const value of Object.values(arr)) {
            compareValues.push(value);
        }
    }

    for (const [key, value] of Object.entries(array)) {
        const exists = compareValues.some((v) => v === value);

        if (!exists) {
            if (isArray) {
                result.push(value);
            } else {
                (result as Record<string, any>)[key] = value;
            }
        }
    }

    return result;
}

/**
 * @link https://www.php.net/manual/en/function.array-diff-assoc.php
 */
export function array_diff_assoc(
    array: any[] | Record<string, any>,
    ...arrays: (any[] | Record<string, any>)[]
): any[] | Record<string, any> {
    const isArray = Array.isArray(array);
    const result: any[] | Record<string, any> = isArray ? [] : {};

    for (const [key, value] of Object.entries(array)) {
        let found = false;

        for (const arr of arrays) {
            // Ensure we’re comparing both key and value.
            if (Object.hasOwn(arr, key)) {
                const otherValue = (arr as any)[key];

                if (otherValue === value) {
                    found = true;
                    break;
                }
            }
        }

        if (!found) {
            if (isArray) {
                result.push(value);
            } else {
                (result as Record<string, any>)[key] = value;
            }
        }
    }

    return result;
}

/**
 * @link https://www.php.net/manual/en/function.array-diff-key.php
 */
export function array_diff_key(
    array: any[] | Record<string, any>,
    ...arrays: (any[] | Record<string, any>)[]
): any[] | Record<string, any> {
    const isArray = Array.isArray(array);
    const result: any[] | Record<string, any> = isArray ? [] : {};

    for (const [key, value] of Object.entries(array)) {
        let found = false;

        for (const arr of arrays) {
            if (Object.hasOwn(arr, key)) {
                found = true;
                break;
            }
        }

        if (!found) {
            if (isArray) {
                result.push(value);
            } else {
                (result as Record<string, any>)[key] = value;
            }
        }
    }

    return result;
}

/**
 * @link https://www.php.net/manual/en/function.array-diff-uassoc.php
 */
export function array_diff_uassoc(
    array: any[] | Record<string, any>,
    ...args: [...(any[] | Record<string, any>)[], (a: string, b: string) => number]
): any[] | Record<string, any> {
    const keyCompare = args.pop() as (a: string, b: string) => number;
    const arrays = args as (any[] | Record<string, any>)[];
    const isArray = Array.isArray(array);
    const result: any[] | Record<string, any> = isArray ? [] : {};

    outer: for (const [key, value] of Object.entries(array)) {
        for (const other of arrays) {
            for (const [otherKey, otherValue] of Object.entries(other)) {
                if (keyCompare(key, otherKey) === 0 && value === otherValue) {
                    continue outer;
                }
            }
        }

        if (isArray) {
            result.push(value);
        } else {
            (result as Record<string, any>)[key] = value;
        }
    }

    return result;
}

/**
 * @link https://www.php.net/manual/en/function.array-diff-ukey.php
 */
export function array_diff_ukey(
    array: any[] | Record<string, any>,
    ...args: [...(any[] | Record<string, any>)[], (a: string, b: string) => number]
): any[] | Record<string, any> {
    const compareFn = args.pop() as (a: string, b: string) => number;
    const arrays = args as (any[] | Record<string, any>)[];
    const isArray = Array.isArray(array);
    const result: any[] | Record<string, any> = isArray ? [] : {};

    outer: for (const [key, value] of Object.entries(array)) {
        for (const arr of arrays) {
            for (const otherKey of Object.keys(arr)) {
                if (compareFn(key, otherKey) === 0) {
                    continue outer;
                }
            }
        }

        if (isArray) {
            result.push(value);
        } else {
            (result as Record<string, any>)[key] = value;
        }
    }

    return result;
}

/**
 * @link https://php.net/manual/en/function.array-filter.php
 */
export function array_filter(
    array: any[] | Record<string, any>,
    callback?: (value: any, key?: string | number) => boolean,
    mode: typeof ARRAY_FILTER_USE_KEY | typeof ARRAY_FILTER_USE_BOTH | 0 = 0,
): any[] | Record<string, any> {
    if (Array.isArray(array)) {
        return array.filter((value, index) => {
            if (!callback) {
                return !!value;
            }

            switch (mode) {
                case ARRAY_FILTER_USE_KEY:
                    return callback(index);
                case ARRAY_FILTER_USE_BOTH:
                    return callback(value, index);
                default:
                    return callback(value);
            }
        });
    }

    const obj: Record<string, any> = {};

    for (const property in array) {
        if (!Object.hasOwn(array, property)) {
            continue;
        }

        const value = array[property];
        const keep = callback
            ? mode === ARRAY_FILTER_USE_KEY
                ? callback(property)
                : mode === ARRAY_FILTER_USE_BOTH
                  ? callback(value, property)
                  : callback(value)
            : !!value;

        if (keep) {
            obj[property] = value;
        }
    }

    return obj;
}

/**
 * @link https://www.php.net/manual/en/function.array-find-key.php
 */
export function array_find_key(
    array: any[] | Record<string, any>,
    callback: (value: any, key: string | number) => boolean,
): number | string | null {
    for (const [key, value] of Object.entries(array)) {
        if (callback(value, key)) {
            return Array.isArray(array) ? Number(key) : key;
        }
    }

    return null;
}

/**
 * @link https://www.php.net/manual/en/function.array-flip.php
 * @throws If parameter contains values other than strings and numbers.
 */
export function array_flip(array: any[] | Record<string, any>): Record<string, string | number> {
    const result: Record<string, string | number> = {};

    for (const [key, value] of Object.entries(array)) {
        if (typeof value !== 'string' && typeof value !== 'number') {
            throw new TypeError(`array_flip(): Can only flip STRING and INTEGER values, found ${typeof value}`);
        }

        result[String(value)] = isNaN(Number(key)) ? key : Number(key);
    }

    return result;
}

/**
 * @link https://www.php.net/manual/en/function.array-intersect.php
 */
export function array_intersect(
    array: any[] | Record<string, any>,
    ...arrays: (any[] | Record<string, any>)[]
): any[] | Record<string, any> {
    const isArray = Array.isArray(array);
    const result: any[] | Record<string, any> = isArray ? [] : {};

    outer: for (const [key, value] of Object.entries(array)) {
        for (const other of arrays) {
            // Convert both objects and arrays to plain value arrays for comparison.
            const otherValues = Object.values(other);

            if (!otherValues.some((v) => v === value)) {
                // Value not found in one of the arrays.
                continue outer;
            }
        }

        if (isArray) {
            result.push(value);
        } else {
            (result as Record<string, any>)[key] = value;
        }
    }

    return result;
}

/**
 * @link https://www.php.net/manual/en/function.array-intersect-assoc.php
 */
export function array_intersect_assoc(
    array: any[] | Record<string, any>,
    ...arrays: (any[] | Record<string, any>)[]
): any[] | Record<string, any> {
    const isArray = Array.isArray(array);
    const result: any[] | Record<string, any> = isArray ? [] : {};

    outer: for (const [key, value] of Object.entries(array)) {
        for (const other of arrays) {
            if ((other as any)[key] !== value) {
                continue outer;
            }
        }

        if (isArray) {
            result.push(value);
        } else {
            (result as Record<string, any>)[key] = value;
        }
    }

    return result;
}

/**
 * @link https://www.php.net/manual/en/function.array-intersect-key.php
 * @throws If less than two parameters are given.
 */
export function array_intersect_key(
    array: any[] | Record<string, any>,
    ...arrays: (any[] | Record<string, any>)[]
): any[] | Record<string, any> {
    if (arrays.length === 0) {
        throw new TypeError('array_intersect_key(): At least 2 arrays are required');
    }

    const result: Record<string, any> = {};

    outer: for (const [key, value] of Object.entries(array)) {
        for (const arr of arrays) {
            if (!(key in arr)) {
                continue outer;
            }
        }

        result[key] = value;
    }

    return Array.isArray(array) ? Object.values(result) : result;
}

/**
 * @link https://www.php.net/manual/en/function.array-intersect-uassoc.php
 */
export function array_intersect_uassoc(
    array: any[] | Record<string, any>,
    ...args: [...(any[] | Record<string, any>)[], (a: string, b: string) => number]
): any[] | Record<string, any> {
    const keyCompareFunc = args.pop() as (a: string, b: string) => number;
    const arrays = args as (any[] | Record<string, any>)[];
    const isArray = Array.isArray(array);
    const result: any[] | Record<string, any> = isArray ? [] : {};

    outer: for (const [key, value] of Object.entries(array)) {
        for (const other of arrays) {
            let matched = false;

            for (const [otherKey, otherValue] of Object.entries(other)) {
                if (value === otherValue && keyCompareFunc(key, otherKey) === 0) {
                    matched = true;
                    break;
                }
            }

            if (!matched) {
                continue outer;
            }
        }

        if (isArray) {
            result.push(value);
        } else {
            (result as Record<string, any>)[key] = value;
        }
    }

    return result;
}

/**
 * @link https://www.php.net/manual/en/function.array-is-list.php
 */
export function array_is_list(array: any[] | Record<string, any>): boolean {
    const keys = Object.keys(array);

    for (let i = 0; i < keys.length; i++) {
        if (Number(keys[i]) !== i) {
            return false;
        }
    }

    return true;
}

/**
 * @link https://www.php.net/manual/en/function.array-key-first.php
 */
export function array_key_first(array: any[] | Record<string, any>): number | string | null {
    const keys = Object.keys(array);

    if (keys.length === 0) {
        return null;
    }

    const firstKey = keys[0];

    return Array.isArray(array) ? Number(firstKey) : firstKey;
}

/**
 * @link https://www.php.net/manual/en/function.array-key-last.php
 */
export function array_key_last(array: any[] | Record<string, any>): number | string | null {
    const keys = Object.keys(array);

    if (keys.length === 0) {
        return null;
    }

    const lastKey = keys[keys.length - 1];

    return Array.isArray(array) ? Number(lastKey) : lastKey;
}

/**
 * @link https://www.php.net/manual/en/function.array-keys.php
 */
export function array_keys(
    array: any[] | Record<string, any>,
    searchValue?: any,
    strict: boolean = false,
): (number | string)[] {
    const entries = Object.entries(array);

    if (searchValue === undefined) {
        return entries.map(([k]) => (Array.isArray(array) ? Number(k) : k));
    }

    const result: (string | number)[] = [];

    for (const [key, value] of entries) {
        const match = strict ? value === searchValue : value == searchValue;

        if (match) {
            result.push(Array.isArray(array) ? Number(key) : key);
        }
    }

    return result;
}

/**
 * @link https://php.net/manual/en/function.array-map.php
 */
export function array_map(
    callback?: (...items: any[]) => any,
    ...arrays: (any[] | Record<string, any>)[]
): any[] | Record<string, any> {
    if (arrays.length === 0) {
        throw new TypeError('array_map(): Expected at least one array');
    }

    const first = arrays[0];
    const keys = Object.keys(first);
    const result: any[] | Record<string, any> = Array.isArray(first) ? [] : {};

    for (let i = 0; i < keys.length; i++) {
        const args = arrays.map((arr) => {
            if (Array.isArray(arr)) {
                // Match by position (PHP behavior)
                return arr[i];
            }

            // Match by key for first array
            const objKeys = Object.keys(arr);

            return (arr as any)[objKeys[i]];
        });

        (result as any)[keys[i]] = callback ? callback(...args) : args;
    }

    return result;
}

/**
 * @link https://www.php.net/manual/en/function.array-merge.php
 */
export function array_merge(...arrays: (any[] | Record<string, any>)[]): any[] | Record<string, any> {
    const result: Record<string, any> = {};
    let numericIndex = 0;

    for (const arr of arrays) {
        for (const [key, value] of Object.entries(arr)) {
            // String keys always preserved; numeric keys reindexed.
            if (isNaN(Number(key))) {
                result[key] = value;
            } else {
                result[numericIndex++] = value;
            }
        }
    }

    return Array.isArray(arrays[0]) ? Object.values(result) : result;
}

/**
 * @link https://www.php.net/manual/en/function.array-merge-recursive.php
 */
export function array_merge_recursive(...arrays: (any[] | Record<string, any>)[]): any[] | Record<string, any> {
    if (arrays.length === 0) {
        return [];
    }

    const result: Record<string, any> = {};
    let numericIndex = 0;

    for (const array of arrays) {
        if (Array.isArray(array)) {
            // Append values for numeric keys.
            for (const value of array) {
                result[numericIndex] = value;
                numericIndex++;
            }
        } else {
            // Merge associative (object) keys.
            for (const [key, value] of Object.entries(array)) {
                if (key in result) {
                    const existing = (result as Record<string, any>)[key];

                    if (isPlainObject(existing) && isPlainObject(value)) {
                        // Recursively merge objects.
                        (result as Record<string, any>)[key] = array_merge_recursive(existing, value);
                    } else if (Array.isArray(existing) && Array.isArray(value)) {
                        // Merge arrays.
                        (result as Record<string, any>)[key] = [...existing, ...value];
                    } else if (isPlainObject(existing) || isPlainObject(value)) {
                        // Create new object and merge.
                        if (isPlainObject(existing)) {
                            const wrapped: any[] = Array.isArray(value) ? value : [value];
                            (result as Record<string, any>)[key] = { ...existing, ...wrapped };
                        } else {
                            const wrapped: any[] = Array.isArray(existing) ? existing : [existing];
                            (result as Record<string, any>)[key] = { ...[existing], ...wrapped };
                        }
                    } else {
                        // Convert both to arrays and merge.
                        (result as Record<string, any>)[key] = [].concat(existing, value);
                    }
                } else {
                    // New key.
                    (result as Record<string, any>)[key] = value;
                }
            }
        }
    }

    return Array.isArray(arrays[0]) ? Object.values(result) : result;
}

/**
 * @link https://www.php.net/manual/en/function.array-pop.php
 */
export function array_pop(array: any[] | Record<string, any>): any {
    if (Array.isArray(array)) {
        return array.pop() ?? null;
    }

    const last = Object.entries(array).pop();

    if (last === undefined) {
        return null;
    }

    delete array[last[0]];

    return last[1];
}

/**
 * @link https://www.php.net/manual/en/function.array-push.php
 */
export function array_push(array: any[] | Record<string, any>, ...values: any[]): number {
    if (values.length === 0) {
        return Object.keys(array).length;
    }

    if (Array.isArray(array)) {
        array.push(...values);

        return array.length;
    }

    let lastNumericKey =
        Object.keys(array)
            .filter((key) => !isNaN(Number(key)))
            .map((key) => Number(key))
            .sort((a, b) => a - b)
            .pop() ?? 0;

    values.forEach((value) => {
        array[lastNumericKey + 1] = value;
        lastNumericKey++;
    });

    return Object.keys(array).length;
}

/**
 * @link https://php.net/manual/en/function.array-reduce.php
 */
export function array_reduce(
    array: any[] | Record<string, any>,
    callback: (carry: any, item: any) => any,
    initial?: any,
): any {
    let carry: any;
    let started = false;

    if (initial !== undefined) {
        carry = initial;
        started = true;
    }

    for (const value of Object.values(array)) {
        if (!started) {
            carry = value;
            started = true;

            continue;
        }

        carry = callback(carry!, value);
    }

    return started ? carry! : null;
}

/**
 * @link https://www.php.net/manual/en/function.array-replace.php
 */
export function array_replace(
    array: any[] | Record<string, any>,
    ...replacements: (any[] | Record<string, any>)[]
): any[] | Record<string, any> {
    const result: any = Array.isArray(array) ? [...array] : { ...array };

    for (const replacement of replacements) {
        for (const [key, value] of Object.entries(replacement)) {
            result[key] = value;
        }
    }

    return result;
}

/**
 * @link https://www.php.net/manual/en/function.array-replace-recursive.php
 */
export function array_replace_recursive(...arrays: (any[] | Record<string, any>)[]): any[] | Record<string, any> {
    if (arrays.length === 0) {
        return [];
    }

    let result: any[] | Record<string, any> = Array.isArray(arrays[0]) ? [...arrays[0]] : { ...arrays[0] };

    for (let i = 1; i < arrays.length; i++) {
        const current = arrays[i];

        if (!isPlainObject(current) && !Array.isArray(current)) {
            // Replace scalar values entirely.
            result = current;
            continue;
        }

        if (isPlainObject(current) && !isPlainObject(result)) {
            // Convert arrays or scalar into objects before merge.
            result = Array.isArray(result) ? Object.assign({}, result) : { 0: result };
        } else if (Array.isArray(current) && !Array.isArray(result)) {
            // Convert object or scalar into object before merge
            result = isPlainObject(result) ? { ...result } : { 0: result };
        }

        for (const [key, value] of Object.entries(current)) {
            if (
                key in result &&
                (Array.isArray((result as any)[key]) || isPlainObject((result as any)[key])) &&
                (Array.isArray(value) || isPlainObject(value))
            ) {
                (result as any)[key] = array_replace_recursive((result as any)[key], value);
            } else {
                (result as any)[key] = value;
            }
        }
    }

    return result;
}

/**
 * @link https://php.net/manual/en/function.array-reverse.php
 */
export function array_reverse(
    array: any[] | Record<string, any>,
    preserveKeys: boolean = false,
): any[] | Record<string, any> {
    if (Array.isArray(array)) {
        return array.slice().reverse();
    }

    const result: Record<string, any> = {};

    Object.entries(array)
        .reverse()
        .forEach(([key, value], i) => {
            // String keys always preserved; numeric keys may be reindexed
            if (preserveKeys || isNaN(Number(key))) {
                result[key] = value;
            } else {
                result[i] = value;
            }
        });

    return result;
}

/**
 * @link https://www.php.net/manual/en/function.array-search.php
 */
export function array_search(
    needle: any,
    haystack: any[] | Record<string, any>,
    strict: boolean = false,
): number | string | false {
    if (Array.isArray(haystack)) {
        for (let i = 0; i < haystack.length; i++) {
            if (strict ? haystack[i] === needle : haystack[i] == needle) {
                return i;
            }
        }
    } else if (typeof haystack === 'object' && haystack !== null) {
        for (const [key, value] of Object.entries(haystack)) {
            if (strict ? value === needle : value == needle) {
                return key;
            }
        }
    }

    return false;
}

/**
 * @link https://php.net/manual/en/function.array-shift.php
 */
export function array_shift(array: any[] | Record<string, any>): any {
    if (Array.isArray(array)) {
        return array.shift() ?? null;
    }

    const first = Object.entries(array).shift();

    if (first === undefined) {
        return null;
    }

    delete array[first[0]];

    return first[1];
}

/**
 * @link https://www.php.net/manual/en/function.array-slice.php
 */
export function array_slice(
    array: any[] | Record<string, any>,
    offset: number,
    length?: number,
    preserveKeys: boolean = false,
): any[] | Record<string, any> {
    const entries = Object.entries(array);
    const arrLength = entries.length;

    if (offset < 0) {
        offset = arrLength + offset;
    }

    if (offset < 0) {
        offset = 0;
    }

    if (length === undefined) {
        length = arrLength - offset;
    } else if (length < 0) {
        length = arrLength - offset + length;

        if (length < 0) {
            length = 0;
        }
    }

    const sliced = entries.slice(offset, offset + length);

    if (Array.isArray(array)) {
        return sliced.map(([_, value]) => value);
    }

    const result: Record<string | number, any> = {};
    let numericIndex = 0;

    for (const [key, value] of sliced) {
        // String keys always preserved; numeric keys may be reindexed
        if (preserveKeys || isNaN(Number(key))) {
            result[key] = value;
        } else {
            result[numericIndex++] = value;
        }
    }

    return result;
}

/**
 * @link https://www.php.net/manual/en/function.array-udiff.php
 */
export function array_udiff(
    array: any[] | Record<string, any>,
    ...args: [...(any[] | Record<string, any>)[], (a: any, b: any) => number]
): any[] | Record<string, any> {
    const compareFn = args.pop() as (a: any, b: any) => number;
    const arrays = args as (any[] | Record<string, any>)[];
    const isArray = Array.isArray(array);
    const result: any[] | Record<string, any> = isArray ? [] : {};

    outer: for (const [key, value] of Object.entries(array)) {
        for (const arr of arrays) {
            for (const otherValue of Object.values(arr)) {
                if (compareFn(value, otherValue) === 0) {
                    continue outer;
                }
            }
        }

        if (isArray) {
            result.push(value);
        } else {
            (result as Record<string, any>)[key] = value;
        }
    }

    return result;
}

/**
 * @link https://www.php.net/manual/en/function.array-uintersect.php
 */
export function array_uintersect(
    array: any[] | Record<string, any>,
    ...args: [...(any[] | Record<string, any>)[], (a: any, b: any) => number]
): any[] | Record<string, any> {
    const valueCompareFunc = args.pop() as (a: any, b: any) => number;
    const arrays = args as (any[] | Record<string, any>)[];
    const isArray = Array.isArray(array);
    const result: any[] | Record<string, any> = isArray ? [] : {};

    outer: for (const [key, value] of Object.entries(array)) {
        for (const other of arrays) {
            let matched = false;

            for (const otherValue of Object.values(other)) {
                if (valueCompareFunc(value, otherValue) === 0) {
                    matched = true;
                    break;
                }
            }

            if (!matched) {
                continue outer;
            }
        }

        if (isArray) {
            result.push(value);
        } else {
            (result as Record<string, any>)[key] = value;
        }
    }

    return result;
}

/**
 * @link https://www.php.net/manual/en/function.array-unique.php
 */
export function array_unique(
    array: any[] | Record<string, any>,
    sortFlags: typeof SORT_REGULAR | typeof SORT_NUMERIC | typeof SORT_STRING = SORT_STRING,
): any[] | Record<string, any> {
    const seen = new Set<string>();
    const result: any = Array.isArray(array) ? [] : {};

    const normalize = (value: any): any => {
        switch (sortFlags) {
            case SORT_NUMERIC:
                return String(Number(value));
            case SORT_STRING:
                return String(value);
            case SORT_REGULAR:
            default:
                // JSON.stringify provides stable comparison for arrays/objects.
                return typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value);
        }
    };

    for (const [key, value] of Object.entries(array)) {
        const normalized = normalize(value);

        if (!seen.has(normalized)) {
            seen.add(normalized);

            if (Array.isArray(array)) {
                result.push(value);
            } else {
                result[key] = value;
            }
        }
    }

    return result;
}

/**
 * @link https://www.php.net/manual/en/function.array-unshift.php
 */
export function array_unshift(array: any[] | Record<string, any>, ...values: any[]): number {
    if (Array.isArray(array)) {
        return array.unshift(...values);
    }

    const allValues = [...values];

    for (const key in array) {
        if (!isNaN(Number(key)) && Object.hasOwn(array, key)) {
            allValues.push(array[key]);
            delete array[key];
        }
    }

    for (let i = 0; i < allValues.length; i++) {
        array[i] = allValues[i];
    }

    return Object.values(array).length;
}

/**
 * @link https://php.net/manual/en/function.asort.php
 */
export function asort(
    array: any[] | Record<string, any>,
    sortFlags: typeof SORT_REGULAR | typeof SORT_NUMERIC | typeof SORT_STRING | typeof SORT_FLAG_CASE = SORT_REGULAR,
): true {
    const sortedEntries = Object.entries(array).sort((a: [string, any], b: [string, any]): number => {
        let [_, valA] = a;
        let [__, valB] = b;

        switch (sortFlags) {
            case SORT_NUMERIC:
                valA = Number(valA);
                valB = Number(valB);
                break;
            case SORT_STRING:
                valA = String(valA);
                valB = String(valB);
                break;
            case SORT_FLAG_CASE:
                valA = String(valA).toLowerCase();
                valB = String(valB).toLowerCase();
                break;
            case SORT_REGULAR:
            default:
                break;
        }

        if (valA < valB) {
            return -1;
        }

        if (valA > valB) {
            return 1;
        }

        return 0;
    });

    const result: any[] | Record<string, any> = Array.isArray(array) ? [] : {};

    for (const [key, value] of sortedEntries) {
        if (Array.isArray(result)) {
            result.push(value);
        } else {
            (result as Record<string, any>)[key] = value;
        }
    }

    // Mutate the original array (PHP-style).
    Object.keys(array).forEach((k) => delete (array as any)[k]);
    Object.assign(array, result);

    return true;
}

/**
 * @link https://php.net/manual/en/function.base64-decode.php
 */
export function base64_decode(string: string, strict: boolean = false): string | false {
    if (string === '') {
        return '';
    }

    // Strict mode: validate characters and padding.
    if (strict) {
        // Must only contain valid Base64 chars + '=' padding, and length mod 4 == 0.
        if (!/^[A-Za-z0-9+/]*={0,2}$/.test(string) || string.length % 4 !== 0) {
            return false;
        }

        return fromBinaryString(atob(string));
    }

    // Non-strict mode: ignore invalid chars.
    const cleaned = string.replace(/[^A-Za-z0-9+/=]/g, '');

    return fromBinaryString(atob(cleaned));
}

/**
 * @link https://php.net/manual/en/function.base64-encode.php
 */
export function base64_encode(string: string): string {
    if (string.length === 0) {
        return '';
    }

    // Convert string to bytes (binary, Latin-1 semantics like PHP).
    const bytes = new Uint8Array(string.length);

    for (let i = 0; i < string.length; i++) {
        bytes[i] = string.charCodeAt(i) & 0xff;
    }

    // Encode using standard Base64 alphabet.
    let binary = '';

    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
}

/**
 * @link https://php.net/manual/en/function.basename.php
 */
export function basename(path: string, suffix: string = ''): string {
    if (path === '') {
        return '';
    }

    // Replace backslashes with forward slashes (Windows support).
    let norm = path.replace(/\\+/g, '/');

    // Remove trailing slashes (but not if entire string is just slashes).
    norm = norm.replace(/\/+$/g, '');

    if (norm === '') {
        return '';
    }

    // Extract last path component.
    const parts = norm.split('/');
    let base = parts[parts.length - 1];

    // Remove suffix if present.
    if (suffix !== '' && base.endsWith(suffix)) {
        base = base.slice(0, -suffix.length);
    }

    return base;
}

/**
 * @link https://php.net/manual/en/function.count.php
 */
export function count(
    value: any[] | Record<string, any>,
    mode: typeof COUNT_NORMAL | typeof COUNT_RECURSIVE = COUNT_NORMAL,
): number {
    if (mode === COUNT_RECURSIVE) {
        return Object.values(value).reduce((total, item) => {
            total += 1;

            const isIterable = Array.isArray(item) || (typeof item === 'object' && typeof item !== null);

            return isIterable ? total + count(item, COUNT_RECURSIVE) : total;
        }, 0);
    }

    return Object.values(value).length;
}

/**
 * @link https://php.net/manual/en/function.ctype-lower.php
 */
export function ctype_lower(text: string): boolean {
    if (text.length === 0) {
        return false;
    }

    // Check every character is a-z (ASCII only).
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);

        if (code < 97 || code > 122) {
            return false;
        }
    }

    return true;
}

/**
 * @link https://php.net/manual/en/function.dirname.php
 */
export function dirname(path: string, levels: number = 1): string {
    if (path === '') {
        return '.';
    }

    // Normalize Windows paths → keep drive letter, replace '\' with '/'.
    const hasDrive = /^[A-Za-z]:[\\/]/.test(path);
    path = path.replace(/\\+/g, '/');

    // Remove trailing slashes (but not if path is just slashes).
    path = path.replace(/\/+$/g, '');

    if (path === '') {
        return '/';
    }

    for (let i = 0; i < levels; i++) {
        const idx = path.lastIndexOf('/');

        // No slash found.
        if (idx === -1) {
            return hasDrive ? (path.match(/^[A-Za-z]:$/) ? path + '\\' : 'C:\\') : '.';
        }

        // If root path.
        if (idx === 0) {
            path = '/';

            continue;
        }

        path = path.slice(0, idx);
    }

    // Restore Windows drive slash style if needed.
    if (hasDrive) {
        path = path.replace(/\//g, '\\');
    }

    return path === '' ? '.' : path;
}

/**
 * @link https://www.php.net/manual/en/function.empty.php
 */
export function empty(value: any): boolean {
    if (value === null || value === undefined) {
        return true;
    }

    if (typeof value === 'boolean') {
        return value === false;
    }

    if (typeof value === 'number') {
        return value === 0;
    }

    if (typeof value === 'string') {
        return value === '' || value === '0';
    }

    if (Array.isArray(value)) {
        return value.length === 0;
    }

    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }

    return false;
}

/**
 * @link https://php.net/manual/en/function.explode.php
 * @throws If separator is an empty string.
 */
export function explode(separator: string, string: string, limit: number = Number.MAX_SAFE_INTEGER): string[] {
    if (separator === '') {
        throw new Error('explode(): Empty separator');
    }

    const parts = string.split(separator);
    limit = limit === 0 ? 1 : limit;

    if (limit > 0) {
        if (parts.length > limit) {
            const result = parts.slice(0, limit - 1);
            result.push(parts.slice(limit - 1).join(separator));

            return result;
        }

        return parts;
    }

    return parts.slice(0, limit);
}

/**
 * @link https://php.net/manual/en/function.filter-var.php
 */
export function filter_var(
    value: any,
    filter:
        | typeof FILTER_VALIDATE_INT
        | typeof FILTER_VALIDATE_BOOLEAN
        | typeof FILTER_VALIDATE_FLOAT
        | typeof FILTER_VALIDATE_URL
        | typeof FILTER_VALIDATE_EMAIL
        | typeof FILTER_SANITIZE_STRING
        | typeof FILTER_DEFAULT
        | typeof FILTER_UNSAFE_RAW
        | typeof FILTER_SANITIZE_EMAIL
        | typeof FILTER_SANITIZE_URL = FILTER_DEFAULT,
    options: { options?: { min_range?: number; max_range?: number } } | 0 = 0,
): any {
    const v = phpParseString(value);

    switch (filter) {
        case FILTER_DEFAULT:
        case FILTER_UNSAFE_RAW:
            return v;
        // Validation filters.
        case FILTER_VALIDATE_INT:
            const opts = options === 0 ? {} : (options?.options ?? {});
            const intVal = parseInt(v, 10);

            if (isNaN(intVal) || !/^[+-]?\d+$/.test(v.trim())) {
                return false;
            }

            if (opts.min_range !== undefined && intVal < opts.min_range) {
                return false;
            }

            if (opts.max_range !== undefined && intVal > opts.max_range) {
                return false;
            }

            return intVal;
        case FILTER_VALIDATE_FLOAT:
            const floatVal = parseFloat(v);

            if (isNaN(floatVal)) {
                return false;
            }

            return floatVal;
        case FILTER_VALIDATE_BOOLEAN:
            const normalized = v.trim().toLowerCase();

            if (['1', 'true', 'on', 'yes'].includes(normalized)) {
                return true;
            }

            if (['0', 'false', 'off', 'no', ''].includes(normalized)) {
                return false;
            }

            return false;
        case FILTER_VALIDATE_EMAIL:
            const regex = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/u;

            return regex.test(v) ? v : false;
        case FILTER_VALIDATE_URL:
            try {
                new URL(v);

                return v;
            } catch {
                return false;
            }
        // Sanitization filters.
        case FILTER_SANITIZE_STRING:
            return v.replace(/<[^>]*>?/gm, '');
        case FILTER_SANITIZE_EMAIL:
            return v.replace(/[^A-Za-z0-9._%+\-@]/g, '');
        case FILTER_SANITIZE_URL:
            return v.replace(/[^A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=%]/g, '');
        default:
            // Unknown filter.
            return false;
    }
}

/**
 * @link https://php.net/manual/en/function.hash.php
 */
export async function hash(
    algo: 'SHA-1' | 'SHA-256' | 'SHA-512',
    data: string,
    binary: boolean = false,
): Promise<string> {
    // Compute hash.
    let digest: Buffer | ArrayBuffer;

    if (typeof crypto !== 'undefined' && crypto.subtle) {
        // Web Crypto.
        const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(data));
        digest = buf;
    } else {
        // Node.js.
        const cryptoNode = require('crypto');
        const h = cryptoNode.createHash(algo);
        h.update(Buffer.from(data, 'binary'));
        digest = h.digest();
    }

    // Convert to output form.
    if (binary) {
        // Return raw bytes as string — each byte → a character with that code.
        const buf = digest instanceof ArrayBuffer ? new Uint8Array(digest) : digest;
        let out = '';

        for (let i = 0; i < buf.length; i++) {
            out += String.fromCharCode(buf[i]);
        }

        return out;
    }

    // Hex lowercase.
    if (digest instanceof ArrayBuffer) {
        return Array.from(new Uint8Array(digest))
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');
    }

    return digest.toString('hex');
}

/**
 * @link https://www.php.net/manual/en/function.http-build-query.php
 */
export function http_build_query(
    data: any[] | Record<string, any>,
    numericPrefix: string = '',
    argSeparator: string = '&',
    encodingType: number = PHP_QUERY_RFC1738,
): string {
    const encode = (str: string): string =>
        encodingType === PHP_QUERY_RFC3986 ? encodeURIComponent(str) : encodeURIComponent(str).replace(/%20/g, '+');

    const build = (data: any, prefix?: string): string[] => {
        if (data === null || data === undefined) {
            return [];
        }

        if (typeof data === 'object') {
            const pairs: string[] = [];

            for (const key in data) {
                if (!Object.prototype.hasOwnProperty.call(data, key)) {
                    continue;
                }

                const k = Array.isArray(data)
                    ? `${prefix ? prefix + '[' + key + ']' : numericPrefix + key}`
                    : prefix
                      ? `${prefix}[${key}]`
                      : key;

                pairs.push(...build(data[key], k));
            }

            return pairs;
        }

        // Primitive value
        if (prefix === undefined) {
            return [];
        }

        let value: string;

        if (data === true) {
            value = '1';
        } else if (data === false) {
            value = '0';
        } else {
            value = String(data);
        }

        return [`${encode(prefix)}=${encode(value)}`];
    };

    return build(data).join(argSeparator);
}

/**
 * @link https://php.net/manual/en/function.in-array.php
 */
export function in_array(needle: any, haystack: any[] | Record<string, any>, strict: boolean = false): boolean {
    for (let value of Object.values(haystack)) {
        if (strict) {
            if (needle === value) {
                return true;
            }
        } else {
            // Convert arrays and objects to strings in order to compare structure since JS compares objects based on reference.
            needle = typeof needle === 'object' && needle !== null ? JSON.stringify(needle) : needle;
            value = typeof value === 'object' && value !== null ? JSON.stringify(value) : value;

            if (needle == value) {
                return true;
            }
        }
    }

    return false;
}

/**
 * @link https://www.php.net/manual/en/function.isset.php
 */
export function isset(...vars: any[]): boolean {
    for (const arg of vars) {
        if (arg === undefined || arg === null) {
            return false;
        }
    }

    return true;
}

/**
 * @link https://www.php.net/manual/en/function.krsort.php
 */
export function krsort(
    array: any[] | Record<string, any>,
    flags: typeof SORT_REGULAR | typeof SORT_NUMERIC | typeof SORT_STRING = SORT_REGULAR,
): true {
    const sortedEntries = Object.entries(array).sort(([a], [b]) => -compareKeys(a, b, flags));

    if (Array.isArray(array)) {
        // Mutate the array in place
        array.length = 0;

        for (const [, value] of sortedEntries) {
            array.push(value);
        }

        return true;
    }

    // Clear and rebuild in reverse-sorted order
    for (const key of Object.keys(array)) {
        delete array[key];
    }

    for (const [key, value] of sortedEntries) {
        array[key] = value;
    }

    return true;
}

/**
 * @link https://www.php.net/manual/en/function.ksort.php
 */
export function ksort(
    array: any[] | Record<string, any>,
    flags: typeof SORT_REGULAR | typeof SORT_NUMERIC | typeof SORT_STRING = SORT_REGULAR,
): true {
    const sortedEntries = Object.entries(array).sort(([a], [b]) => compareKeys(a, b, flags));

    if (Array.isArray(array)) {
        // Clear and reassign values in place
        array.length = 0;

        for (const [, value] of sortedEntries) {
            array.push(value);
        }

        return true;
    }

    // Delete all keys, then reassign in sorted order
    for (const key of Object.keys(array)) {
        delete array[key];
    }

    for (const [key, value] of sortedEntries) {
        array[key] = value;
    }

    return true;
}

/**
 * @link https://php.net/manual/en/function.lcfirst.php
 */
export function lcfirst(string: string): string {
    if (string.length === 0) {
        return '';
    }

    const chars = Array.from(string);
    chars[0] = chars[0].toLowerCase();

    return chars.join('');
}

/**
 * @link https://php.net/manual/en/function.ltrim.php
 */
export function ltrim(string: string, characters?: string): string {
    // Default: PHP trims " \n\r\t\v\0"
    // JS: \x0B is vertical tab, \x00 is null byte.
    if (characters === undefined) {
        return string.replace(/^[\s\x00\x0B]+/, '');
    }

    // Escape regex special characters in character class.
    const escaped = characters.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const pattern = new RegExp(`^[${escaped}]+`, 'u');

    return string.replace(pattern, '');
}

/**
 * @link https://php.net/manual/en/function.max.php
 */
export function max(...values: any[]): any {
    // If single array argument, unpack it.
    if (values.length === 1 && Array.isArray(values[0])) {
        values = values[0];
    }

    // Use PHP-style loose comparison rules.
    return values.reduce((maxValue, current) => (current > maxValue ? current : maxValue));
}

/**
 * @link https://php.net/manual/en/function.mb-convert-case.php
 */
export function mb_convert_case(
    string: string,
    mode: typeof MB_CASE_UPPER | typeof MB_CASE_LOWER | typeof MB_CASE_TITLE,
): string {
    switch (mode) {
        case MB_CASE_UPPER:
            return string.toLocaleUpperCase('und');
        case MB_CASE_LOWER:
            return string.toLocaleLowerCase('und');
        case MB_CASE_TITLE:
            // Uppercase every letter that follows a non-letter or the start of the string. Uses Unicode properties:
            // \p{L} = any kind of letter, \P{L} = not a letter.
            return string
                .toLocaleLowerCase('und')
                .replace(/(^|\P{L})(\p{L})/gu, (_m, before, ch) => before + ch.toLocaleUpperCase('und'));
    }
}

/**
 * @link https://php.net/manual/en/function.mb-split.php
 */
export function mb_split(pattern: string, string: string, limit: number = -1): string[] | false {
    // Validate regex pattern. mb_split() patterns do NOT include delimiters (unlike preg_split). PHP treats invalid
    // regex as false with a warning.
    let regex: RegExp;

    try {
        // "u" = Unicode (multibyte-safe).
        regex = new RegExp(pattern, 'gu');
    } catch (e) {
        return false;
    }

    // Split behavior.
    const parts: string[] = [];
    let lastIndex = 0;

    // Use manual regex iteration to control limit.
    for (const match of string.matchAll(regex)) {
        const index = match.index ?? 0;
        parts.push(string.slice(lastIndex, index));
        lastIndex = index + match[0].length;

        if (limit > 0 && parts.length >= limit - 1) {
            break;
        }
    }

    parts.push(string.slice(lastIndex));

    // Apply limit behavior.
    if (limit > 0 && parts.length > limit) {
        // Merge extra parts into the last element.
        const head = parts.slice(0, limit - 1);
        const tail = parts.slice(limit - 1).join('');

        return [...head, tail];
    }

    return parts;
}

/**
 * @link https://www.php.net/manual/en/function.mb-str-pad.php
 */
export function mb_str_pad(
    string: string,
    length: number,
    padString: string = ' ',
    padType: typeof STR_PAD_LEFT | typeof STR_PAD_RIGHT | typeof STR_PAD_BOTH = STR_PAD_RIGHT,
): string {
    const inputLength = mb_strlen(string);
    const padStrLen = mb_strlen(padString);

    if (length <= inputLength || padStrLen === 0) {
        return string;
    }

    const totalPad = length - inputLength;
    let leftPad = 0;
    let rightPad = 0;

    switch (padType) {
        case STR_PAD_RIGHT:
            leftPad = 0;
            rightPad = totalPad;

            break;
        case STR_PAD_LEFT:
            leftPad = totalPad;
            rightPad = 0;

            break;
        case STR_PAD_BOTH:
            leftPad = Math.floor(totalPad / 2);
            rightPad = totalPad - leftPad;

            break;
    }

    const repeatPad = (length: number): string => {
        const times = Math.ceil(length / padStrLen);
        const padded = padString.repeat(times);

        return mb_substr(padded, 0, length);
    };

    return repeatPad(leftPad) + string + repeatPad(rightPad);
}

/**
 * @link https://www.php.net/manual/en/function.mb-str-split.php
 */
export function mb_str_split(string: string, length: number = 1): string[] {
    if (length < 1) {
        length = 1;
    }

    // Split into Unicode characters. Using Array.from() splits properly into code points (UTF-8 safe).
    const chars = Array.from(string);

    // Chunk into groups of length.
    const result: string[] = [];

    for (let i = 0; i < chars.length; i += length) {
        result.push(chars.slice(i, i + length).join(''));
    }

    return result;
}

/**
 * @link https://php.net/manual/en/function.mb-strimwidth.php
 */
export function mb_strimwidth(string: string, start: number, width: number, trimMarker: string = ''): string {
    if (width <= 0) {
        return '';
    }

    const chars = Array.from(string);
    const len = chars.length;

    if (start >= len) {
        return '';
    }

    const slice = chars.slice(start);

    // Determine display width per char (CJK wide chars count as 2).
    const charWidth = (ch: string): number => {
        const code = ch.codePointAt(0)!;

        // East Asian full-width / wide ranges.
        if (
            // Hangul Jamo.
            (code >= 0x1100 && code <= 0x115f) ||
            // CJK Radicals + Kangxi.
            (code >= 0x2e80 && code <= 0xa4cf) ||
            // Hangul Syllables.
            (code >= 0xac00 && code <= 0xd7a3) ||
            // CJK Compatibility Ideographs.
            (code >= 0xf900 && code <= 0xfaff) ||
            // Vertical forms.
            (code >= 0xfe10 && code <= 0xfe19) ||
            // CJK Compatibility forms.
            (code >= 0xfe30 && code <= 0xfe6f) ||
            // Full-width ASCII variants.
            (code >= 0xff00 && code <= 0xff60) ||
            // Full-width symbols.
            (code >= 0xffe0 && code <= 0xffe6)
        ) {
            return 2;
        }

        return 1;
    };

    const markerArr = Array.from(trimMarker);
    const markerWidth = markerArr.reduce((sum, ch) => sum + charWidth(ch), 0);

    let result: string[] = [];
    let usedWidth = 0;

    for (let i = 0; i < slice.length; i++) {
        const ch = slice[i];
        const w = charWidth(ch);

        // If adding this char + marker would exceed width → stop.
        if (usedWidth + w + (i < slice.length - 1 ? markerWidth : 0) > width) {
            return result.join('') + trimMarker;
        }

        result.push(ch);
        usedWidth += w;
    }

    return result.join('');
}

/**
 * @link https://php.net/manual/en/function.mb-strlen.php
 */
export function mb_strlen(string: string): number {
    // Count Unicode code points (not bytes).
    let count = 0;

    for (const _ch of string) {
        count++;
    }

    return count;
}

/**
 * @link https://php.net/manual/en/function.mb-strpos.php
 */
export function mb_strpos(haystack: string, needle: string, offset: number = 0): number | false {
    if (needle === '') {
        return false;
    }

    // Convert to array of Unicode code points to emulate multibyte behavior.
    const haystackChars = Array.from(haystack);
    const needleChars = Array.from(needle);

    // Handle offset like PHP (can be positive or negative).
    let start = offset;

    if (offset < 0) {
        start = haystackChars.length + offset;

        if (start < 0) {
            start = 0;
        }
    }

    // Search.
    for (let i = start; i <= haystackChars.length - needleChars.length; i++) {
        let found = true;

        for (let j = 0; j < needleChars.length; j++) {
            if (haystackChars[i + j] !== needleChars[j]) {
                found = false;

                break;
            }
        }

        // 0-based index.
        if (found) {
            return i;
        }
    }

    return false;
}

/**
 * @link https://php.net/manual/en/function.mb-strrpos.php
 */
export function mb_strrpos(haystack: string, needle: string, offset: number = 0): number | false {
    if (needle === '') {
        return false;
    }

    const haystackChars = Array.from(haystack);
    const haystackLen = haystackChars.length;

    // Handle offset.
    let searchStart = 0;

    if (offset < 0) {
        searchStart = haystackLen + offset;

        if (searchStart < 0) {
            return false;
        }
    } else {
        searchStart = offset;

        if (searchStart > haystackLen) {
            return false;
        }
    }

    // Slice haystack from start to where we should search up to.
    const searchArea = haystackChars.slice(searchStart).join('');
    const index = searchArea.lastIndexOf(needle);

    if (index === -1) {
        return false;
    }

    // Return character index relative to original haystack.
    return Array.from(haystack.substring(0, searchStart)).length + Array.from(searchArea.substring(0, index)).length;
}

/**
 * @link https://php.net/manual/en/function.mb-strwidth.php
 */
export function mb_strwidth(string: string): number {
    let width = 0;

    for (const char of [...string]) {
        const codePoint = char.codePointAt(0);

        if (codePoint === undefined) {
            continue;
        }

        // CJK Unified Ideographs, Hangul, Hiragana, Katakana, full-width forms. Emojis and some symbols are also
        // considered double-width.
        if (
            // CJK.
            (codePoint >= 0x1100 && codePoint <= 0x115f) ||
            (codePoint >= 0x2329 && codePoint <= 0x232a) ||
            (codePoint >= 0x2e80 && codePoint <= 0xa4cf) ||
            (codePoint >= 0xac00 && codePoint <= 0xd7a3) ||
            (codePoint >= 0xf900 && codePoint <= 0xfaff) ||
            (codePoint >= 0xfe10 && codePoint <= 0xfe19) ||
            (codePoint >= 0xfe30 && codePoint <= 0xfe6f) ||
            (codePoint >= 0xff00 && codePoint <= 0xff60) ||
            (codePoint >= 0xffe0 && codePoint <= 0xffe6) ||
            // emoji/symbols.
            (codePoint >= 0x1f300 && codePoint <= 0x1faff) ||
            (codePoint >= 0x20000 && codePoint <= 0x2fffd) ||
            (codePoint >= 0x30000 && codePoint <= 0x3fffd)
        ) {
            width += 2;
        } else {
            width += 1;
        }
    }

    return width;
}

/**
 * @link https://php.net/manual/en/function.mb-substr.php
 */
export function mb_substr(string: string, start: number, length?: number): string {
    // Convert to array of code points (multibyte safe).
    const chars = Array.from(string);
    const len = chars.length;

    // Handle negative start.
    let startIndex = start < 0 ? Math.max(len + start, 0) : start;

    if (startIndex >= len) {
        return '';
    }

    // Handle length.
    let endIndex: number;

    if (length == undefined) {
        endIndex = len;
    } else if (length < 0) {
        endIndex = Math.max(len + length, 0);
    } else {
        endIndex = startIndex + length;
    }

    return chars.slice(startIndex, endIndex).join('');
}

/**
 * PHP returns 1 if the pattern matches given subject, 0 if it does not, or false if an
 * error occurred. We are just returning a boolean instead.
 * @link https://php.net/manual/en/function.preg-match.php
 */
export function preg_match(pattern: string, subject: string, matches?: string[]): boolean {
    try {
        // Parse PHP-style pattern: e.g. '/abc/i'.
        const match = pattern.match(/^(.)(.*)\1([a-z]*)$/i);

        if (!match) {
            return false;
        }

        const [, , body, modifiers] = match;
        // Ignore deprecated 'e'.
        const flags = modifiers.replace('e', '');
        const regex = new RegExp(body, flags);
        const result = subject.match(regex);

        if (!result) {
            if (matches) {
                matches.length = 0;
            }

            return false;
        }

        if (matches) {
            matches.length = 0;

            for (let i = 0; i < result.length; i++) {
                matches[i] = result[i];
            }
        }

        return true;
    } catch {
        // Invalid pattern.
        return false;
    }
}

/**
 * @link https://php.net/manual/en/function.preg-match-all.php
 */
export function preg_match_all(
    pattern: string,
    subject: string,
    matches?: string[][],
    flags: typeof PREG_SET_ORDER | typeof PREG_OFFSET_CAPTURE | 0 = 0,
    offset: number = 0,
): number | false {
    matches = matches ?? [];

    // Validate the pattern (assumes PHP-style delimiters).
    const match = pattern.match(/^(.)([\s\S]+)\1([a-z]*)$/i);

    if (!match) {
        return false;
    }

    const [, , body, modifiers] = match;

    // JS doesn't support offset start in RegExp, simulate it.
    if (offset > 0) {
        subject = subject.slice(offset);
    }

    // Ensure global flag is present.
    let jsFlags = modifiers.replace(/e/g, '');

    if (!jsFlags.includes('g')) {
        jsFlags += 'g';
    }

    const regex = new RegExp(body, jsFlags);
    const results: RegExpExecArray[] = [];
    let result: RegExpExecArray | null;

    // Exec returns an array and resets index if match is found, allowing us to continue to loop while matches are
    // found.
    while ((result = regex.exec(subject)) !== null) {
        results.push(result);

        if (regex.lastIndex === result.index) {
            // Prevent infinite loop.
            regex.lastIndex++;
        }
    }

    if (results.length === 0) {
        matches.length = 0;

        return 0;
    }

    const useSetOrder = flags === PREG_SET_ORDER;
    const useOffsetCapture = flags === PREG_OFFSET_CAPTURE;

    if (useSetOrder) {
        matches.length = 0;

        for (const result of results) {
            const entry: any[] = [];

            for (let i = 0; i < result.length; i++) {
                if (useOffsetCapture) {
                    entry.push([result[i], result.index + result[0].indexOf(result[i])]);
                } else {
                    entry.push(result[i]);
                }
            }

            matches.push(entry);
        }
    } else {
        const groupCount = results[0].length;

        matches.length = 0;

        for (let groupIndex = 0; groupIndex < groupCount; groupIndex++) {
            const group: any[] = [];

            for (const result of results) {
                const matchStr = result[groupIndex];

                if (useOffsetCapture) {
                    const index = result.index + result[0].indexOf(matchStr);
                    group.push([matchStr, index]);
                } else {
                    group.push(matchStr);
                }
            }

            matches.push(group);
        }
    }

    return results.length;
}

/**
 * @link https://php.net/manual/en/function.preg-quote.php
 */
export function preg_quote(str: string, delimiter?: string): string {
    // Characters PHP escapes in preg_quote: . \ + * ? [ ^ ] $ ( ) { } = ! < > | : -
    // We'll use a regex to escape them.
    let escaped = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    if (delimiter) {
        // Escape the delimiter too, if present.
        const escapedDelimiter = delimiter.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
        const re = new RegExp(escapedDelimiter, 'g');
        escaped = escaped.replace(re, '\\' + delimiter);
    }

    return escaped;
}

/**
 * @link https://php.net/manual/en/function.preg-replace.php
 */
export function preg_replace(
    pattern: string | string[],
    replacement: string | string[],
    subject: string | string[],
    limit: number = -1,
    count?: { value: number },
): string | string[] | null {
    const patterns = Array.isArray(pattern) ? pattern : [pattern];
    const replacements = Array.isArray(replacement) ? replacement : [replacement];
    const subjects = Array.isArray(subject) ? subject : [subject];
    let totalCount = 0;

    // Helper: process a single string subject.
    const processOne = (text: string): string | null => {
        let result = text;

        for (let i = 0; i < patterns.length; i++) {
            const pat = patterns[i];
            let rep = replacements[i] ?? replacements[replacements.length - 1];
            const regex = patternToRegExp(pat);

            // Invalid regex => null.
            if (!regex) {
                return null;
            }

            let localCount = 0;
            result = result.replace(regex, (...args) => {
                const match = args[0];
                // All capturing groups.
                const groups = args.slice(1, -2);

                if (limit >= 0 && localCount >= limit) {
                    return match;
                }

                localCount++;
                totalCount++;

                // Expand PHP-style n references in the replacement.
                return rep.replace(/\\(.)|\$([0-9]+)/g, (m, esc, num) => {
                    // Handle escaped sequences: \$ → $, \\ → \
                    if (esc) {
                        return esc;
                    }

                    if (num !== undefined) {
                        const index = parseInt(num, 10);

                        return index === 0 ? match : (groups[index - 1] ?? '');
                    }

                    return m;
                });
            });
        }

        return result;
    };

    // Process array or string subjects.
    let result: string[] | string;

    if (Array.isArray(subject)) {
        result = [];

        for (const s of subjects) {
            const replaced = processOne(s);

            if (replaced === null) {
                return null;
            }

            result.push(replaced);
        }
    } else {
        const replaced = processOne(subject);

        if (replaced === null) {
            return null;
        }

        result = replaced;
    }

    if (count) {
        count.value = totalCount;
    }

    return result;
}

/**
 * @link https://php.net/manual/en/function.preg-replace-callback.php
 */
export function preg_replace_callback(
    pattern: string | string[],
    callback: (matches: string[]) => string,
    subject: string | string[],
    limit: number = -1,
    count?: { value: number },
): string | string[] | null {
    // Normalize parameters.
    const patterns = Array.isArray(pattern) ? pattern : [pattern];
    const subjects = Array.isArray(subject) ? subject : [subject];
    let totalCount = 0;

    // Helper to process a single string.
    const processOne = (text: string): string | null => {
        let replaced = text;

        for (const pat of patterns) {
            const regex = patternToRegExp(pat);

            // Invalid regex => null.
            if (!regex) {
                return null;
            }

            let localCount = 0;
            replaced = replaced.replace(regex, (...args) => {
                const match = args.slice(0, -2);

                if (limit >= 0 && localCount >= limit) {
                    return match[0];
                }

                localCount++;
                totalCount++;

                return callback(match);
            });
        }

        return replaced;
    };

    // Process array or string subjects.
    let result: string[] | string;

    if (Array.isArray(subject)) {
        result = [];

        for (const s of subjects) {
            const r = processOne(s);

            // Invalid regex => null.
            if (r === null) {
                return null;
            }

            result.push(r);
        }
    } else {
        const r = processOne(subject);

        if (r === null) {
            return null;
        }

        result = r;
    }

    if (count) {
        count.value = totalCount;
    }

    return result;
}

/**
 * @link https://php.net/manual/en/function.preg-split.php
 */
export function preg_split(
    pattern: string,
    subject: string,
    limit: number = -1,
    flags: (typeof PREG_SPLIT_NO_EMPTY | typeof PREG_SPLIT_DELIM_CAPTURE | typeof PREG_SPLIT_OFFSET_CAPTURE | 0)[] = [
        0,
    ],
): (string | number)[][] | string[] {
    const parsed = patternToRegExp(pattern);

    if (!parsed) {
        return [subject];
    }

    const result: (string | (string | number)[])[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = parsed.exec(subject)) !== null) {
        const start = match.index;
        const end = start + match[0].length;

        // Piece BEFORE the match (from lastIndex up to start).
        const piece = subject.slice(lastIndex, start);

        if (!in_array(PREG_SPLIT_NO_EMPTY, flags) || piece.length > 0) {
            result.push(in_array(PREG_SPLIT_OFFSET_CAPTURE, flags) ? [piece, lastIndex] : piece);
        }

        // Include capture groups if requested.
        if (in_array(PREG_SPLIT_DELIM_CAPTURE, flags) && match.length > 1) {
            const groups: { offset?: number; value: string }[] = [];

            if (match.groups) {
                // named groups first (preserve order of Object.keys).
                for (const name of Object.keys(match.groups)) {
                    groups.push({ value: match.groups[name] });
                }
            }

            // numeric captures.
            for (let i = 1; i < match.length; i++) {
                groups.push({ value: match[i] });
            }

            for (const { offset, value } of groups) {
                if (value !== undefined && value !== null) {
                    result.push(in_array(PREG_SPLIT_OFFSET_CAPTURE, flags) ? [value, offset ?? start] : value);
                }
            }
        }

        // Handle zero-width matches (lookahead/lookbehind).
        if (end === start) {
            // Advance regex cursor by one Unicode code point to avoid infinite loop, BUT keep lastIndex at the match
            // position so slices remain correct.
            let advanceIndex: number;

            if (parsed.lastIndex >= subject.length) {
                advanceIndex = parsed.lastIndex + 1;
            } else {
                const cp = subject.codePointAt(parsed.lastIndex)!;
                advanceIndex = parsed.lastIndex + (cp > 0xffff ? 2 : 1);
            }

            parsed.lastIndex = advanceIndex;
            // Keep lastIndex = start (so next piece will include the char(s) starting at start).
            lastIndex = start;

            // If we've advanced beyond the string, stop.
            if (parsed.lastIndex > subject.length) {
                break;
            }

            continue;
        } else {
            // Normal match: advance cursor to end of match and set lastIndex to end.
            parsed.lastIndex = end;
            lastIndex = end;
        }

        if (limit > 0 && result.length >= limit - 1) {
            break;
        }
    }

    // Add remaining tail.
    const tail = subject.slice(lastIndex);

    if (!in_array(PREG_SPLIT_NO_EMPTY, flags) || tail.length > 0) {
        result.push(in_array(PREG_SPLIT_OFFSET_CAPTURE, flags) ? [tail, lastIndex] : tail);
    }

    return result as any;
}

/**
 * @link https://php.net/manual/en/function.random-bytes.php
 * @throws If length is not finite or is less than 1.
 */
export function random_bytes(length: number): string {
    // Step 1: Validate length (must be integer >= 1).
    if (!Number.isFinite(length) || length < 1) {
        throw new Error('random_bytes(): Argument #1 (length) must be finite and greater than 0');
    }

    // Step 2: Generate secure random bytes.
    let buffer: Uint8Array;

    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
        buffer = new Uint8Array(length);
        crypto.getRandomValues(buffer);
    } else {
        // Node.js fallback.
        const { randomBytes } = require('crypto');

        buffer = randomBytes(length);
    }

    // Step 3: Convert bytes to binary string (like PHP).
    let binary = '';

    for (let i = 0; i < buffer.length; i++) {
        binary += String.fromCharCode(buffer[i]);
    }

    return binary;
}

/**
 * @link https://php.net/manual/en/function.random-int.php
 * @throws If parameters are not integers or if min is greater than max.
 */
export function random_int(min: number, max: number): number {
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
        throw new TypeError('random_int(): integers expected');
    }

    if (min > max) {
        throw new RangeError('random_int(): min must be less than or equal to max');
    }

    const range = max - min;

    if (range === 0) {
        return min;
    }

    let randUint32: () => number;

    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
        randUint32 = () => {
            const array = new Uint32Array(1);
            crypto.getRandomValues(array);

            return array[0];
        };
    } else {
        // Node.js fallback.
        const { randomBytes } = require('crypto');

        randUint32 = () => {
            const array = new Uint32Array(1);
            randomBytes(array);

            return array[0];
        };
    }

    const maxUint32 = 0xffffffff;
    const limit = maxUint32 - (maxUint32 % (range + 1));
    let rand: number;

    do {
        rand = randUint32();
    } while (rand >= limit);

    return min + (rand % (range + 1));
}

/**
 * @link https://www.php.net/manual/en/function.range.php
 */
export function range(start: number | string, end: number | string, step: number = 1): (number | string)[] {
    if (step === 0) {
        throw new Error('range(): Step cannot be 0');
    }

    const result: (number | string)[] = [];

    // Handle numeric range.
    if (typeof start === 'number' && typeof end === 'number') {
        if (start < end && step < 0) {
            throw new Error('range(): Step must be greater than 0 for increasing ranges');
        }

        if (start <= end) {
            for (let i = start; i <= end; i += step) {
                result.push(i);
            }
        } else {
            step = step < 0 ? -step : step;

            for (let i = start; i >= end; i -= step) {
                result.push(i);
            }
        }

        return result;
    }

    // Handle alphabetic range.
    if (typeof start === 'string' && typeof end === 'string') {
        // PHP supports single-character ranges only.
        if (start.length !== 1 || end.length !== 1) {
            console.warn('Start and end must be a single byte, subsequent bytes are ignored');
        }

        const startCode = start.charCodeAt(0);
        const endCode = end.charCodeAt(0);

        if (startCode < endCode && step < 0) {
            throw new Error('range(): Step must be greater than 0 for increasing ranges');
        }

        if (startCode <= endCode) {
            for (let i = startCode; i <= endCode; i += step) {
                result.push(String.fromCharCode(i));
            }
        } else {
            step = step < 0 ? -step : step;

            for (let i = startCode; i >= endCode; i -= step) {
                result.push(String.fromCharCode(i));
            }
        }

        return result;
    }

    throw new TypeError('range(): Both start and end parameters must be of the same type');
}

/**
 * @link https://www.php.net/manual/en/function.rsort.php
 */
export function rsort(
    array: any[] | Record<string, any>,
    flags: (
        | typeof SORT_REGULAR
        | typeof SORT_NUMERIC
        | typeof SORT_STRING
        | typeof SORT_NATURAL
        | typeof SORT_FLAG_CASE
    )[] = [SORT_STRING],
): true {
    const flagCase = in_array(SORT_FLAG_CASE, flags);
    const numeric = in_array(SORT_NUMERIC, flags);
    const string = in_array(SORT_STRING, flags);
    const natural = in_array(SORT_NATURAL, flags);

    const collator = new Intl.Collator(undefined, { numeric: natural, sensitivity: flagCase ? 'base' : 'variant' });
    const sort = (a: any, b: any) => {
        if (a == null) {
            a = '';
        }

        if (b == null) {
            b = '';
        }

        let cmp: number;
        if (numeric) {
            cmp = parseFloat(a) - parseFloat(b);
        } else if (string || natural) {
            cmp = collator.compare(String(a), String(b));
        } else {
            cmp = a == b ? 0 : a > b ? 1 : -1;
        }

        return -cmp; // Reverse order for rsort
    };

    if (Array.isArray(array)) {
        array.sort(sort);
    } else {
        const sorted = Object.values(array).sort(sort);

        // Reindex keys numerically
        for (let i = 0; i < sorted.length; i++) {
            array[i] = sorted[i];
        }
    }

    return true;
}

/**
 * @link https://php.net/manual/en/function.rtrim.php
 */
export function rtrim(string: string, characters?: string): string {
    // Default whitespace (PHP: " \n\r\t\v\0").
    // JS: \s covers most whitespace; \x00 is null, \x0B is vertical tab.
    if (characters === undefined) {
        return string.replace(/[\s\x00\x0B]+$/, '');
    }

    // Escape regex special characters for use in character class.
    const escaped = characters.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const pattern = new RegExp(`[${escaped}]+$`, 'u');

    return string.replace(pattern, '');
}

/**
 * @link https://www.php.net/manual/en/function.sort.php
 */
export function sort(
    array: any[] | Record<string, any>,
    flags: (
        | typeof SORT_REGULAR
        | typeof SORT_NUMERIC
        | typeof SORT_STRING
        | typeof SORT_NATURAL
        | typeof SORT_FLAG_CASE
    )[] = [SORT_REGULAR],
): true {
    const flagCase = in_array(SORT_FLAG_CASE, flags);
    const numeric = in_array(SORT_NUMERIC, flags);
    const string = in_array(SORT_STRING, flags);
    const natural = in_array(SORT_NATURAL, flags);

    const collator = new Intl.Collator(undefined, { numeric: natural, sensitivity: flagCase ? 'base' : 'variant' });
    const sort = (a: any, b: any) => {
        // Handle undefined/null same as PHP (treat as empty string).
        if (a == null) {
            a = '';
        }

        if (b == null) {
            b = '';
        }

        if (numeric) {
            const na = parseFloat(a);
            const nb = parseFloat(b);

            return na - nb;
        }

        if (string || natural) {
            const sa = String(a);
            const sb = String(b);

            return collator.compare(sa, sb);
        }

        // Default PHP regular comparison.
        if (a == b) {
            return 0;
        }

        return a > b ? 1 : -1;
    };

    if (Array.isArray(array)) {
        array.sort(sort);
    } else {
        const sorted = Object.values(array).sort(sort);

        // PHP resets array keys to 0-based numeric
        for (let i = 0; i < sorted.length; i++) {
            array[i] = sorted[i];
        }
    }

    return true;
}

/**
 * @link https://php.net/manual/en/function.sscanf.php
 */
export function sscanf(string: string, format: string): any[] | null {
    const converters: ((v: string) => string | number)[] = [];
    let regexStr = '';
    let i = 0;

    while (i < format.length) {
        if (format[i] === '%') {
            i++;

            if (format[i] === '[') {
                // %[charlist]
                i++;
                let negate = false;

                if (format[i] === '^') {
                    negate = true;
                    i++;
                }

                let charlist = '';

                while (i < format.length && format[i] !== ']') {
                    charlist += format[i++];
                }

                // Skip ']'
                i++;
                regexStr += `([${negate ? '^' : ''}${charlist}]+)`;
                converters.push((v) => v);
            } else {
                const type = format[i++];

                switch (type) {
                    case 'd':
                        regexStr += '\\s*([+-]?\\d+)';
                        converters.push((v) => parseInt(v, 10));

                        break;
                    case 'f':
                        regexStr += '\\s*([+-]?(?:\\d*\\.\\d+|\\d+))';
                        converters.push((v) => parseFloat(v));

                        break;
                    case 's':
                        // Allow leading space.
                        regexStr += '\\s*(\\S+)';
                        converters.push((v) => v);

                        break;
                    case 'c':
                        regexStr += '\\s*(.)';
                        converters.push((v) => v);

                        break;
                    default:
                        regexStr += escapeForRegex('%' + type);

                        break;
                }
            }
        } else if (/\s/.test(format[i])) {
            regexStr += '\\s*';
            i++;
        } else {
            regexStr += escapeForRegex(format[i++]);
        }
    }

    const regex = new RegExp('^' + regexStr + '$', 'u');
    const match = string.match(regex);

    if (!match) {
        return null;
    }

    return match.slice(1).map((v, idx) => converters[idx](v));
}

/**
 * @link https://php.net/manual/en/function.str-ireplace.php
 */
export function str_ireplace(
    search: string | string[],
    replace: string | string[],
    subject: string | string[],
    count?: { value: number },
): string | string[] {
    let totalCount = 0;

    // Convert to arrays for uniform handling.
    const searchArr = Array.isArray(search) ? search : [search];
    const replaceArr = Array.isArray(replace) ? replace : [replace];

    // Helper to replace within a single string (case-insensitive).
    const replaceInString = (text: string): string => {
        let replaced = text;

        for (let i = 0; i < searchArr.length; i++) {
            const s = searchArr[i] ?? '';
            const r = replaceArr[i] ?? replaceArr[replaceArr.length - 1] ?? '';

            if (s === '') {
                continue;
            }

            // Use case-insensitive regex with global flag.
            const pattern = new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            const matches = replaced.match(pattern);

            if (matches) {
                totalCount += matches.length;
            }

            replaced = replaced.replace(pattern, r);
        }

        return replaced;
    };

    // Assign count (if provided).
    if (count) {
        count.value = totalCount;
    }

    // If subject is an array return array of replaced elements.
    return Array.isArray(subject) ? subject.map((subj) => replaceInString(subj)) : replaceInString(subject);
}

/**
 * @link https://php.net/manual/en/function.str-replace.php
 */
export function str_replace(
    search: string | string[],
    replace: string | string[],
    subject: string | string[],
    count?: { value: number },
): string | string[] {
    let replaced = 0;

    // Recursive array handling (subject).
    if (Array.isArray(subject)) {
        const result = subject.map((s) => str_replace(search, replace, s, count));

        if (count) {
            count.value = (count.value || 0) + replaced;
        }

        return result as any;
    }

    // Normalize search/replace to arrays.
    const searchArr = Array.isArray(search) ? search : [search];
    const replaceArr = Array.isArray(replace) ? replace : [replace];
    let result = subject;

    for (let i = 0; i < searchArr.length; i++) {
        const s = searchArr[i];
        const r = i <= replaceArr.length ? (replaceArr[i] ?? replaceArr[i - 1]) : '';

        // PHP ignores empty search string.
        if (s === '') {
            continue;
        }

        const parts = result.split(s);
        const replacements = parts.length - 1;
        result = parts.join(r);
        replaced += replacements;
    }

    if (count) {
        count.value = (count.value || 0) + replaced;
    }

    return result;
}

/**
 * format can be one of the following:
 * 0 - returns the number of words found
 * 1 - returns an array containing all the words found inside the string
 * 2 - returns an object, where the key is the numeric position of the word inside the string and the value is the
 * actual word itself
 * @link https://php.net/manual/en/function.str-word-count.php
 */
export function str_word_count(
    string: string,
    format?: 0 | 1 | 2,
    characters?: string,
): number | string[] | Record<string, string> {
    const actualFormat = format === undefined ? 0 : format;

    // Default PHP pattern: ASCII letters only.
    let chars = 'A-Za-z';

    // If characters provided, include literally those extra characters.
    if (characters) {
        chars += escapeForRegex(characters);
    }

    // Note: PHP's regex is ASCII-based, no Unicode.
    const pattern = new RegExp(`[${chars}]+`, 'g');
    const words: { index: number; word: string }[] = [];
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(string)) !== null) {
        words.push({ index: match.index, word: match[0] });
    }

    if (actualFormat === 0) {
        return words.length;
    }

    if (actualFormat === 1) {
        return words.map((w) => w.word);
    }

    const out: Record<string, string> = {};

    for (const w of words) {
        out[w.index] = w.word;
    }

    return out;
}

/**
 * @link https://php.net/manual/en/function.strip-tags.php
 */
export function strip_tags(string: string, allowedTags: string | string[] = ''): string {
    let allowed = new Set<string>();

    // Normalize allowed tags.
    if (typeof allowedTags === 'string') {
        // Accepts format like '<b><i>'.
        const matches = allowedTags.match(/<(\w+)>/g);

        if (matches) {
            for (const tag of matches) {
                allowed.add(tag.slice(1, -1).toLowerCase());
            }
        }
    } else {
        for (const tag of allowedTags) {
            allowed.add(tag.toLowerCase());
        }
    }

    // Remove PHP code blocks.
    string = string.replace(/<\?(?:php)?[\s\S]*?\?>/gi, '');

    // Remove HTML comments.
    string = string.replace(/<!--[\s\S]*?-->/g, '');

    // Remove unwanted tags.
    return string.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, (match, tagName) =>
        allowed.has(tagName.toLowerCase()) ? match : '',
    );
}

/**
 * @link https://php.net/manual/en/function.strlen.php
 */
export function strlen(string: string): number {
    return new TextEncoder().encode(string).length;
}

/**
 * @link https://php.net/manual/en/function.strpos.php
 */
export function strpos(haystack: string, needle: string, offset: number = 0): number | false {
    if (needle === '') {
        return false;
    }

    let start = offset;

    if (offset < 0) {
        start = haystack.length + offset;

        if (start < 0) {
            start = 0;
        }
    }

    if (start >= haystack.length) {
        return false;
    }

    // Perform the search (binary-safe).
    const pos = haystack.indexOf(needle, start);

    return pos !== -1 ? pos : false;
}

/**
 * @link https://php.net/manual/en/function.strrpos.php
 */
export function strrpos(haystack: string, needle: string, offset: number = 0): number | false {
    if (needle === '') {
        return false;
    }

    const haystackBytes = new TextEncoder().encode(haystack);
    const needleBytes = new TextEncoder().encode(needle);

    // If offset > 0, slice haystackBytes accordingly.
    const startOffset = offset > 0 ? offset : 0;

    // Search for last occurrence of needleBytes in haystackBytes (like PHP). We need to find the last index of
    // needleBytes in haystackBytes.

    for (let i = haystackBytes.length - needleBytes.length; i >= startOffset; i--) {
        let match = true;

        for (let j = 0; j < needleBytes.length; j++) {
            if (haystackBytes[i + j] !== needleBytes[j]) {
                match = false;

                break;
            }
        }

        if (match) {
            // Return byte offset.
            return i;
        }
    }

    return false;
}

/**
 * @link https://php.net/manual/en/function.strstr.php
 */
export function strstr(haystack: string, needle: string, beforeNeedle: boolean = false): string | false {
    if (needle === '') {
        return false;
    }

    const index = haystack.indexOf(needle);

    if (index === -1) {
        return false;
    }

    return beforeNeedle ? haystack.substring(0, index) : haystack.substring(index);
}

/**
 * @link https://php.net/manual/en/function.strtr.php
 * @throws If from is a string and to is undefined.
 */
export function strtr(string: string, from: string | Record<string, string>, to?: string): string {
    // 2-argument mode: object mapping.
    if (typeof from === 'object') {
        const map = from;
        // Longest keys first.
        const keys = Object.keys(map).sort((a, b) => b.length - a.length);
        let result = string;

        for (const key of keys) {
            if (key === '') {
                continue;
            }

            // Replace all occurrences (non-overlapping).
            const haystack = result;
            result = '';
            let pos = 0;

            while (true) {
                const idx = haystack.indexOf(key, pos);

                if (idx === -1) {
                    result += haystack.slice(pos);

                    break;
                }

                result += haystack.slice(pos, idx) + map[key];
                pos = idx + key.length;
            }
        }

        return result;
    }

    if (to === undefined) {
        throw new Error('to is required');
    }

    // 3-argument mode: character translation.
    let out = '';

    for (let i = 0; i < string.length; i++) {
        const ch = string[i];
        const idx = from.indexOf(ch);

        if (idx !== -1) {
            out += idx < to.length ? to[idx] : '';
        } else {
            out += ch;
        }
    }

    return out;
}

/**
 * @link https://php.net/manual/en/function.substr.php
 */
export function substr(string: string, offset: number, length?: number): string {
    // Uint8Array of bytes.
    const utf8 = new TextEncoder().encode(string);
    const len = utf8.length;

    // Normalize offset like PHP: negative means from end.
    if (offset < 0) {
        offset = len + offset;

        if (offset < 0) {
            offset = 0;
        }
    }

    if (offset > len) {
        return '';
    }

    let end: number;

    if (length === undefined) {
        end = len;
    } else if (length < 0) {
        end = len + length;

        if (end < offset) {
            return '';
        }
    } else {
        end = offset + length;

        if (end > len) {
            end = len;
        }
    }

    const sliced = utf8.slice(offset, end);

    // Decode sliced bytes back to string (may cut mid-character like PHP). To perfectly mimic PHP's substr which
    // returns possibly broken UTF-8 strings, we must decode with 'utf-8' but ignore errors — TextDecoder has 'fatal'
    // option. Unfortunately TextDecoder throws on invalid sequences by default. So to mimic PHP, decode normally (it
    // may replace invalid sequences with �).
    return new TextDecoder('utf-8', { fatal: false }).decode(sliced);
}

/**
 * @link https://php.net/manual/en/function.substr-count.php
 */
export function substr_count(haystack: string, needle: string, offset: number = 0, length?: number): number {
    // PHP warning: empty needle.
    if (needle === '') {
        return 0;
    }

    const strLen = haystack.length;

    if (offset < 0) {
        offset = Math.max(0, strLen + offset);
    }

    if (offset >= strLen) {
        return 0;
    }

    // Apply length if provided.
    let end = strLen;

    if (length != undefined) {
        if (length < 0) {
            length = Math.max(0, strLen - offset + length);
        }

        end = Math.min(strLen, offset + length);
    }

    const segment = haystack.substring(offset, end);

    if (segment.length === 0) {
        return 0;
    }

    // Count occurrences (non-overlapping).
    let count = 0;
    let pos = 0;

    while (true) {
        const found = segment.indexOf(needle, pos);

        if (found === -1) {
            break;
        }

        count++;
        // Non-overlapping like PHP.
        pos = found + needle.length;
    }

    return count;
}

/**
 * @link https://php.net/manual/en/function.substr-replace.php
 */
export function substr_replace(
    string: string | string[],
    replace: string | string[],
    offset: number | number[],
    length?: number | number[],
): string | string[] {
    // Array mode: if string is array → apply element-wise
    if (Array.isArray(string)) {
        const reps = Array.isArray(replace) ? replace : [replace];
        const offs = Array.isArray(offset) ? offset : [offset];
        const lens = Array.isArray(length) ? length : [length];

        const maxLen = Math.max(string.length, reps.length, offs.length, lens.length);
        const result: string[] = [];

        for (let i = 0; i < maxLen; i++) {
            const s = string[i] ?? '';
            const r = reps[i] ?? reps[reps.length - 1] ?? '';
            const o = offs[i] ?? offs[offs.length - 1] ?? 0;
            const l = lens[i] ?? lens[lens.length - 1] ?? undefined;

            result.push(substrReplaceSingle(s, r, o, l));
        }

        return result;
    }

    // Single string case.
    return substrReplaceSingle(string, String(replace), Number(offset), Number(length));
}

/**
 * @link https://php.net/manual/en/function.trim.php
 */
export function trim(string: string, characters: string = ' \n\r\t\v\0'): string {
    // Default: use JS's native trim (covers PHP's default set well enough).
    if (characters === ' \n\r\t\v\0') {
        return string.trim();
    }

    // Escape special regex characters in characters.
    const escaped = characters.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
    const pattern = new RegExp(`^[${escaped}]+|[${escaped}]+$`, 'gu');

    return string.replace(pattern, '');
}

/**
 * @link https://php.net/manual/en/function.uasort.php
 */
export function uasort(array: any[] | Record<string, any>, callback: (a: any, b: any) => number): true {
    const sortedEntries = Object.entries(array).sort(([_aKey, aVal], [_bKey, bVal]) => callback(aVal, bVal));
    const result: any[] | Record<string, any> = Array.isArray(array) ? [] : {};

    for (const [key, value] of sortedEntries) {
        if (Array.isArray(result)) {
            result.push(value);
        } else {
            (result as Record<string, any>)[key] = value;
        }
    }

    // Mutate the original array (PHP-style).
    Object.keys(array).forEach((k) => delete (array as any)[k]);
    Object.assign(array, result);

    return true;
}

/**
 * @link https://php.net/manual/en/function.ucwords.php
 */
export function ucwords(string: string, separators: string = ' \t\r\n\f\v'): string {
    if (string.length === 0) {
        return '';
    }

    // Escape the separator characters for safe inclusion INSIDE a character class.
    const escapedSeparators = escapeForRegex(separators);

    // Build regex using a single character class (no double-wrapping).
    // (^|[sep]) -> start-of-string or a separator.
    // ([^sep]) -> a single character that is NOT a separator (the one to uppercase).
    const re = new RegExp(`(^|[${escapedSeparators}])([^${escapedSeparators}])`, 'g');

    return string.replace(re, (_match, before, ch) => before + ch.toUpperCase());
}

/**
 * @link https://www.php.net/manual/en/function.unset.php
 *
 * Variables cannot be unset in JS, so we will only accept an array / object and key.
 */
export function unset(array: any[] | Record<string, any>, key: number | string): void {
    delete (array as any)[key];
}

/**
 * @link https://php.net/manual/en/function.wordwrap.php
 */
export function wordwrap(
    string: string,
    width: number = 75,
    breakStr: string = '\n',
    cutLongWords: boolean = false,
): string {
    if (string.length === 0) {
        return '';
    }

    // Keep spaces as tokens.
    const words = string.split(/(\s+)/);
    const lines: string[] = [];
    let line = '';

    for (const token of words) {
        if (/^\s+$/.test(token)) {
            // Whitespace — just append.
            line += token;

            continue;
        }

        const w = Math.max(1, Math.floor(width));

        // If adding this word keeps line <= width.
        if ((line + token).length <= w) {
            line += token;

            continue;
        }

        // If word itself longer than width.
        if (token.length > w) {
            if (line.trim().length > 0) {
                lines.push(line.trimEnd());
                line = '';
            }

            if (cutLongWords) {
                // Split long word.
                for (let i = 0; i < token.length; i += w) {
                    lines.push(token.slice(i, i + w));
                }
            } else {
                // Keep long word whole on new line.
                lines.push(token);
            }

            continue;
        }

        // Normal wrapping.
        lines.push(line.trimEnd());
        line = token;
    }

    if (line.trim().length > 0) {
        lines.push(line.trimEnd());
    }

    return lines.join(breakStr);
}

/**
 * Compare two keys according to PHP's sort flag logic.
 */
function compareKeys(
    a: string,
    b: string,
    flags: typeof SORT_REGULAR | typeof SORT_NUMERIC | typeof SORT_STRING,
): number {
    switch (flags) {
        case SORT_NUMERIC:
            return Number(a) - Number(b);
        case SORT_STRING:
            return a.localeCompare(b);
        default:
            // PHP's default comparison: numeric if both numeric strings, else string
            const aNum = parseFloat(a);
            const bNum = parseFloat(b);
            const bothNumeric = !isNaN(aNum) && !isNaN(bNum);

            return bothNumeric ? aNum - bNum : a.localeCompare(b);
    }
}

/**
 * Escape characters that are special inside a character class or regex literal.
 */
function escapeForRegex(str: string): string {
    return str.replace(/[-\\\]\/^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * Converts a binary string (from atob) into a PHP-style string (byte-for-byte).
 */
function fromBinaryString(binary: string): string {
    let result = '';

    for (let i = 0; i < binary.length; i++) {
        result += String.fromCharCode(binary.charCodeAt(i) & 0xff);
    }

    return result;
}

/**
 * Helper to detect plain objects
 */
function isPlainObject(value: any): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Converts PHP-style regex delimiters (like "/pattern/i") to JS RegExp. Returns null if invalid.
 */
function patternToRegExp(pattern: string): RegExp | null {
    if (pattern.length === 0) {
        return null;
    }

    // PHP regexes are typically delimited (e.g., /foo/i, #bar#u, etc.).
    const delim = pattern[0];
    const end = pattern.lastIndexOf(delim);

    if (end <= 0) {
        return null;
    }

    const body = pattern.slice(1, end);
    const modifiers = pattern.slice(end + 1);

    let flags = '';

    if (modifiers.includes('i')) {
        flags += 'i';
    }

    if (modifiers.includes('m')) {
        flags += 'm';
    }

    if (modifiers.includes('s')) {
        flags += 's';
    }

    if (modifiers.includes('u')) {
        flags += 'u';
    }

    // Rarely used in PHP but supported here.
    if (modifiers.includes('g')) {
        flags += 'g';
    }

    try {
        // Always global for full replacement behavior.
        return new RegExp(body, flags.includes('g') ? flags : flags + 'g');
    } catch {
        return null;
    }
}

/**
 * PHP-style string coercion.
 */
function phpParseString(value: any): string {
    if (value === null || value === undefined) {
        return '';
    }

    if (value === true) {
        return '1';
    }

    if (value === false) {
        return '';
    }

    return String(value);
}

/**
 * Handles the single-string replacement logic.
 */
function substrReplaceSingle(str: string, replacement: string, offset: number, length?: number): string {
    // Compute proper start position (handling negative offsets).
    let start = offset < 0 ? Math.max(str.length + offset, 0) : offset;

    if (start > str.length) {
        start = str.length;
    }

    // Determine the number of chars to replace.
    let len: number;

    if (typeof length === 'undefined') {
        // Replace to end.
        len = str.length - start;
    } else {
        len = length < 0 ? Math.max(str.length - start + length, 0) : length;
    }

    // Perform replacement.
    const before = str.slice(0, start);
    const after = str.slice(start + len);

    return before + replacement + after;
}
