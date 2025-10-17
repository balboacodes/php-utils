import * as php from '../src/index';
import { expect, test } from 'vitest';

test('abs', () => {
    expect(php.abs(-4.2)).toBe(4.2);
    expect(php.abs(5)).toBe(5);
    expect(php.abs(-5)).toBe(5);
});

test('array_all', () => {
    const array = ['dog', 'cat', 'cow', 'duck', 'goose', 'elephant'];

    expect(php.array_all(array, (value) => php.strlen(value) < 12)).toBe(true);
    expect(php.array_all(array, (value) => php.strlen(value) > 5)).toBe(false);
    expect(php.array_all(array, (_value, key) => typeof key === 'string')).toBe(true);

    const object = {
        a: 'dog',
        b: 'cat',
        c: 'cow',
        d: 'duck',
        e: 'goose',
        f: 'elephant',
    };

    expect(php.array_all(object, (value) => php.strlen(value) < 12)).toBe(true);
    expect(php.array_all(object, (value) => php.strlen(value) > 5)).toBe(false);
    expect(php.array_all(object, (_value, key) => typeof key === 'string')).toBe(true);
});

test('array_any', () => {
    const array = ['dog', 'cat', 'cow', 'duck', 'goose', 'elephant'];

    expect(php.array_any(array, (value) => php.strlen(value) > 5)).toBe(true);
    expect(php.array_any(array, (value) => php.strlen(value) < 3)).toBe(false);
    expect(php.array_any(array, (_value, key) => typeof key !== 'string')).toBe(false);

    const object = {
        a: 'dog',
        b: 'cat',
        c: 'cow',
        d: 'duck',
        e: 'goose',
        f: 'elephant',
    };

    expect(php.array_any(object, (value: string) => php.strlen(value) > 5)).toBe(true);
    expect(php.array_any(object, (value: string) => php.strlen(value) < 3)).toBe(false);
    expect(php.array_any(object, (_value, key) => typeof key !== 'string')).toBe(false);
});

test('array_combine', () => {
    expect(php.array_combine(['green', 'red', 'yellow'], ['avocado', 'apple', 'banana'])).toEqual({
        green: 'avocado',
        red: 'apple',
        yellow: 'banana',
    });
});

test('array_filter', () => {
    expect(php.array_filter([1, 2, 3, 4, 5], (v: number): boolean => v % 2 !== 0)).toEqual([1, 3, 5]);
    expect(php.array_filter({ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }, (v: number): boolean => v % 2 !== 0)).toEqual({
        1: 1,
        3: 3,
        5: 5,
    });
    expect(php.array_filter(['foo', false, -1, null, '', '0', 0], undefined)).toEqual(['foo', -1, '0']);
    expect(php.array_filter({ 0: 'foo', 1: false, 2: -1, 3: null, 4: '', 5: '0', 6: 0 }, undefined)).toEqual({
        0: 'foo',
        2: -1,
        5: '0',
    });
});

test('array_find_key', () => {
    const arr = ['dog', 'cat', 'cow', 'duck', 'goose', 'elephant'];

    expect(Number(php.array_find_key(arr, (value: string, _key: string | number) => php.strlen(value) > 4))).toBe(4);
    expect(php.array_find_key(arr, (value: string, _key: string | number) => php.str_starts_with(value, 'f'))).toBe(
        null,
    );
    expect(php.array_find_key(arr, (value: string, key: string | number) => value[0] === key)).toBe(null);
    expect(
        Number(
            php.array_find_key(arr, (_value: string, key: string | number) =>
                php.preg_match('/^([a-f])$/', String(key)),
            ),
        ),
    ).toBe(0);

    const obj = { a: 'dog', b: 'cat', c: 'cow', d: 'duck', e: 'goose', f: 'elephant' };

    expect(php.array_find_key(obj, (value: string, _key: string | number) => php.strlen(value) > 4)).toBe('e');
    expect(php.array_find_key(obj, (value: string, _key: string | number) => php.str_starts_with(value, 'f'))).toBe(
        null,
    );
    expect(php.array_find_key(obj, (value: string, key: string | number) => value[0] === key)).toBe('c');
    expect(
        php.array_find_key(obj, (_value: string, key: string | number) => php.preg_match('/^([a-f])$/', String(key))),
    ).toBe('a');
});

test('array_first', () => {
    expect(php.array_first(['a', 'b', 'c', 'd'])).toBe('a');
    expect(php.array_first({ 0: 'a', 1: 'b', 2: 'c', 3: 'd' })).toBe('a');
});

test('array_flip', () => {
    expect(php.array_flip(['oranges', 'apples', 'pears'])).toEqual({ oranges: 0, apples: 1, pears: 2 });
    expect(php.array_flip({ a: 0, b: 1, c: 2 })).toEqual({ 0: 'a', 1: 'b', 2: 'c' });
});

test('array_intersect_key', () => {
    expect(php.array_intersect_key(['blue', 'red', 'green', 'purple'], ['green', 'blue', 'yellow', 'cyan'])).toEqual([
        'blue',
        'red',
        'green',
        'purple',
    ]);

    expect(
        php.array_intersect_key({ blue: 1, red: 2, green: 3, purple: 4 }, { green: 5, blue: 6, yellow: 7, cyan: 8 }),
    ).toEqual({ blue: 1, green: 3 });
});

test('array_key_first', () => {
    expect(php.array_key_first({ a: 1, b: 2, c: 3 })).toBe('a');
    expect(php.array_key_first([1, 2, 3])).toBe(0);
});

test('array_key_last', () => {
    expect(php.array_key_last({ a: 1, b: 2, c: 3 })).toBe('c');
    expect(php.array_key_last([1, 2, 3])).toBe(2);
});

test('array_keys', () => {
    expect(php.array_keys({ 0: 100, color: 'red' })).toEqual([0, 'color']);
    expect(php.array_keys(['blue', 'red', 'green', 'blue', 'blue'], 'blue')).toEqual([0, 3, 4]);
    expect(
        php.array_keys({
            color: ['blue', 'red', 'green'],
            size: ['small', 'medium', 'large'],
        }),
    ).toEqual(['color', 'size']);
});

test('array_last', () => {
    expect(php.array_last(['a', 'b', 'c', 'd'])).toBe('d');
});

test('array_map', () => {
    const a = [1, 2, 3, 4, 5];
    const b = ['uno', 'dos', 'tres', 'cuatro', 'cinco'];
    const c = ['one', 'two', 'three', 'four', 'five'];

    expect(php.array_map((n: number): number => n * n * n, a)).toEqual([1, 8, 27, 64, 125]);
    expect(php.array_map((n: number, m: string): string => `The number ${n} is called ${m} in Spanish`, a, b)).toEqual([
        'The number 1 is called uno in Spanish',
        'The number 2 is called dos in Spanish',
        'The number 3 is called tres in Spanish',
        'The number 4 is called cuatro in Spanish',
        'The number 5 is called cinco in Spanish',
    ]);

    expect(php.array_map(undefined, a, c, b)).toEqual([
        [1, 'one', 'uno'],
        [2, 'two', 'dos'],
        [3, 'three', 'tres'],
        [4, 'four', 'cuatro'],
        [5, 'five', 'cinco'],
    ]);
});

test('array_merge', () => {
    expect(
        php.array_merge({ color: 'red', 0: 2, 1: 4 }, { 0: 'a', 1: 'b', color: 'green', shape: 'trapezoid', 2: 4 }),
    ).toEqual({ color: 'green', 0: 2, 1: 4, 2: 'a', 3: 'b', shape: 'trapezoid', 4: 4 });

    expect(php.array_merge([], { 1: 'data' })).toEqual({ 0: 'data' });
});

test('array_pop', () => {
    const array = ['orange', 'banana', 'apple', 'raspberry'];

    expect(php.array_pop(array)).toBe('raspberry');
    expect(array).toEqual(['orange', 'banana', 'apple']);
});

test('array_push', () => {
    const array = ['orange', 'banana'];

    expect(php.array_push(array, 'apple', 'raspberry')).toBe(4);
    expect(array).toEqual(['orange', 'banana', 'apple', 'raspberry']);
});

test('array_reduce', () => {
    expect(php.array_reduce([1, 2, 3, 4, 5], (carry, item) => (carry += item))).toBe(15);
    expect(php.array_reduce([1, 2, 3, 4, 5], (carry, item) => (carry *= item), 10)).toBe(1200);
    expect(php.array_reduce([], (carry, item) => (carry += item), 'No data to reduce')).toBe('No data to reduce');
});

test('array_reverse', () => {
    expect(php.array_reverse(['php', 4, ['green', 'red']])).toEqual([['green', 'red'], 4, 'php']);
});

test('array_shift', () => {
    expect(php.array_shift(['orange', 'banana', 'apple', 'raspberry'])).toBe('orange');
    expect(php.array_shift([])).toBe(undefined);
});

test('array_slice', () => {
    let input = ['a', 'b', 'c', 'd', 'e'];

    expect(php.array_slice(input, 2)).toEqual(['c', 'd', 'e']);
    expect(php.array_slice(input, -2, 1)).toEqual(['d']);
    expect(php.array_slice(input, 0, 3)).toEqual(['a', 'b', 'c']);
    expect(php.array_slice(input, 2, -1)).toEqual(['c', 'd']);
    expect(php.array_slice(input, 2, -1, true)).toEqual({ 2: 'c', 3: 'd' });
});

test('array_unshift', () => {
    const array = ['orange', 'banana'];
    expect(php.array_unshift(array, 'apple', 'raspberry')).toBe(4);
    expect(array).toEqual(['apple', 'raspberry', 'orange', 'banana']);
});

test('array_values', () => {
    expect(php.array_values({ size: 'XL', color: 'gold' })).toEqual(['XL', 'gold']);
    expect(php.array_values(['XL', 'gold'])).toEqual(['XL', 'gold']);
});

test('base64_decode', () => {
    expect(php.base64_decode('VGhpcyBpcyBhbiBlbmNvZGVkIHN0cmluZw==')).toBe('This is an encoded string');
});

test('base64_encode', () => {
    expect(php.base64_encode('This is an encoded string')).toBe('VGhpcyBpcyBhbiBlbmNvZGVkIHN0cmluZw==');
});

test('basename', () => {
    expect(php.basename('/etc/sudoers.d', '.d')).toBe('sudoers');
    expect(php.basename('/etc/sudoers.d')).toBe('sudoers.d');
    expect(php.basename('/etc/passwd')).toBe('passwd');
    expect(php.basename('/etc/')).toBe('etc');
    expect(php.basename('.')).toBe('.');
    expect(php.basename('/')).toBe('');
});

test('ceil', () => {
    expect(php.ceil(4.3)).toBe(5);
    expect(php.ceil(9.999)).toBe(10);
    expect(php.ceil(-3.14)).toBe(-3);
});

test('count', () => {
    expect(php.count([1, 3, 5])).toBe(3);
    expect(
        php.count(
            [
                ['orange', 'banana', 'apple'],
                ['carrot', 'collard', 'pea'],
            ],
            php.COUNT_RECURSIVE,
        ),
    ).toBe(8);
    expect(
        php.count([
            ['orange', 'banana', 'apple'],
            ['carrot', 'collard', 'pea'],
        ]),
    ).toBe(2);
});

test('dirname', () => {
    expect(php.dirname('/etc/passwd')).toBe('/etc');
    expect(php.dirname('/etc/')).toBe('/');
    expect(php.dirname('.')).toBe('.');
    expect(php.dirname('C:\\\\')).toBe('C:\\');
    expect(php.dirname('/usr/local/lib', 2)).toBe('/usr');
});

test('empty', () => {
    expect(php.empty(0)).toBe(true);

    const expectedArrayGotString = 'somestring';

    expect(php.empty(expectedArrayGotString['some_key'])).toBe(true);
    expect(php.empty(expectedArrayGotString[0])).toBe(false);
});

test('explode', () => {
    expect(php.explode(' ', 'piece1 piece2 piece3')).toEqual(['piece1', 'piece2', 'piece3']);
    expect(php.explode(':', 'foo:*:1023')).toEqual(['foo', '*', '1023']);
    expect(php.explode(', ', 'hello')).toEqual(['hello']);
    expect(php.explode('|', 'one|two|three|four', 2)).toEqual(['one', 'two|three|four']);
});

test('filter_var', () => {
    expect(php.filter_var('bob@example.com', php.FILTER_VALIDATE_EMAIL)).toBe('bob@example.com');
    expect(php.filter_var('https://example.com', php.FILTER_VALIDATE_URL)).toBe('https://example.com');
    expect(php.filter_var('255', php.FILTER_VALIDATE_INT, { options: { max_range: 10 } })).toBe(false);
});

test('hash', async () => {
    expect(await php.hash('SHA-256', 'The quick brown fox jumped over the lazy dog.')).toBe(
        '68b1282b91de2c054c36629cb8dd447f12f096d3e3c587978dc2248444633483',
    );
});

test('http_build_query', () => {
    expect(php.http_build_query({ foo: 'bar', baz: 'boom', cow: 'milk', null: null, php: 'hypertext processor' })).toBe(
        'foo=bar&baz=boom&cow=milk&php=hypertext+processor',
    );

    expect(
        php.http_build_query(
            { foo: 'bar', baz: 'boom', cow: 'milk', null: null, php: 'hypertext processor' },
            '',
            '&amp;',
        ),
    ).toBe('foo=bar&amp;baz=boom&amp;cow=milk&amp;php=hypertext+processor');

    expect(php.http_build_query(['foo', 'bar', 'baz', null, 'boom', 'milk', 'hypertext processor'])).toBe(
        '0=foo&1=bar&2=baz&4=boom&5=milk&6=hypertext+processor',
    );

    expect(php.http_build_query(['foo', 'bar', 'baz', null, 'boom', 'milk', 'hypertext processor'], 'myvar_')).toBe(
        'myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_4=boom&myvar_5=milk&myvar_6=hypertext+processor',
    );

    expect(
        php.http_build_query(
            { foo: 'bar', baz: 'boom', cow: 'milk', null: null, php: 'hypertext processor' },
            undefined,
            undefined,
            php.PHP_QUERY_RFC3986,
        ),
    ).toBe('foo=bar&baz=boom&cow=milk&php=hypertext%20processor');

    expect(
        php.http_build_query(
            { foo: 'bar', baz: 'boom', cow: 'milk', null: null, php: 'hypertext processor' },
            '',
            '&amp;',
            php.PHP_QUERY_RFC3986,
        ),
    ).toBe('foo=bar&amp;baz=boom&amp;cow=milk&amp;php=hypertext%20processor');

    expect(
        php.http_build_query(
            ['foo', 'bar', 'baz', null, 'boom', 'milk', 'hypertext processor'],
            undefined,
            undefined,
            php.PHP_QUERY_RFC3986,
        ),
    ).toBe('0=foo&1=bar&2=baz&4=boom&5=milk&6=hypertext%20processor');

    expect(
        php.http_build_query(
            ['foo', 'bar', 'baz', null, 'boom', 'milk', 'hypertext processor'],
            'myvar_',
            undefined,
            php.PHP_QUERY_RFC3986,
        ),
    ).toBe('myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_4=boom&myvar_5=milk&myvar_6=hypertext%20processor');
});

test('implode', () => {
    expect(php.implode(',', ['lastname', 'email', 'phone'])).toBe('lastname,email,phone');
    expect(php.implode('hello', [])).toBe('');
    expect(php.implode(undefined, ['a', 'b', 'c'])).toBe('abc');
});

test('in_array', () => {
    expect(php.in_array('Irix', ['Mac', 'NT', 'Irix', 'Linux'])).toBe(true);
    expect(php.in_array('mac', ['Mac', 'NT', 'Irix', 'Linux'])).toBe(false);
    expect(php.in_array('12.4', ['1.10', 12.4, 1.13], true)).toBe(false);
    expect(php.in_array(1.13, ['1.10', 12.4, 1.13], true)).toBe(true);
});

test('isset', () => {
    expect(php.isset('')).toBe(true);
    expect(php.isset('test')).toBe(true);
    expect(php.isset(undefined)).toBe(false);
    expect(php.isset(undefined, null)).toBe(false);
    expect(php.isset([1][0])).toBe(true);
    expect(php.isset([1][1])).toBe(false);
    expect(php.isset({ foo: 'bar' }['foo'])).toBe(true);
    expect(php.isset({ foo: 'bar' }['baz'])).toBe(false);
});

test('lcfirst', () => {
    expect(php.lcfirst('HelloWorld')).toBe('helloWorld');
    expect(php.lcfirst('HELLO WORLD!')).toBe('hELLO WORLD!');
});

test('ltrim', () => {
    expect(php.ltrim('\t\tThese are a few words :) ...  ')).toBe('These are a few words :) ...  ');
    expect(php.ltrim('\t\tThese are a few words :) ...  ', ' \t.')).toBe('These are a few words :) ...  ');
    expect(php.ltrim('Hello World', 'Hdle')).toBe('o World');
    expect(php.ltrim('\x09Example string\x0A', '\x09')).toBe('Example string\x0A');
});

test('max', () => {
    expect(php.max(2, 3, 1, 6, 7)).toBe(7);
});

test('mb_convert_case', () => {
    expect(php.mb_convert_case('mary had a little lamb and she loved it so', php.MB_CASE_UPPER)).toBe(
        'MARY HAD A LITTLE LAMB AND SHE LOVED IT SO',
    );

    expect(php.mb_convert_case('MARY HAD A LITTLE LAMB AND SHE LOVED IT SO', php.MB_CASE_LOWER)).toBe(
        'mary had a little lamb and she loved it so',
    );

    expect(php.mb_convert_case('mary had a little lamb and she loved it so', php.MB_CASE_TITLE)).toBe(
        'Mary Had A Little Lamb And She Loved It So',
    );

    expect(
        php.mb_convert_case('Τάχιστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός', php.MB_CASE_UPPER),
    ).toBe('ΤΆΧΙΣΤΗ ΑΛΏΠΗΞ ΒΑΦΉΣ ΨΗΜΈΝΗ ΓΗ, ΔΡΑΣΚΕΛΊΖΕΙ ΥΠΈΡ ΝΩΘΡΟΎ ΚΥΝΌΣ');

    expect(
        php.mb_convert_case('ΤΆΧΙΣΤΗ ΑΛΏΠΗΞ ΒΑΦΉΣ ΨΗΜΈΝΗ ΓΗ, ΔΡΑΣΚΕΛΊΖΕΙ ΥΠΈΡ ΝΩΘΡΟΎ ΚΥΝΌΣ', php.MB_CASE_LOWER),
    ).toBe('τάχιστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός');

    expect(
        php.mb_convert_case('Τάχιστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός', php.MB_CASE_TITLE),
    ).toBe('Τάχιστη Αλώπηξ Βαφής Ψημένη Γη, Δρασκελίζει Υπέρ Νωθρού Κυνός');
});

test('mb_split', () => {
    expect(php.mb_split('\\s', 'hello world')).toEqual(['hello', 'world']);
    expect(php.mb_split('\\s', 'foo bar baz', 2)).toEqual(['foo', 'bar baz']);
});

test('mb_str_pad', () => {
    expect(php.mb_str_pad('▶▶', 6, '❤❓❇', php.STR_PAD_RIGHT)).toBe('▶▶❤❓❇❤');
    expect(php.mb_str_pad('▶▶', 6, '❤❓❇', php.STR_PAD_LEFT)).toBe('❤❓❇❤▶▶');
    expect(php.mb_str_pad('▶▶', 6, '❤❓❇', php.STR_PAD_BOTH)).toBe('❤❓▶▶❤❓');
});

test('mb_str_split', () => {
    expect(php.mb_str_split('▶▶❤❓❇❤')).toEqual(['▶', '▶', '❤', '❓', '❇', '❤']);
    expect(php.mb_str_split('▶▶❤❓❇❤', 2)).toEqual(['▶▶', '❤❓', '❇❤']);
});

test('mb_strimwidth', () => {
    expect(php.mb_strimwidth('Hello World', 0, 10, '...')).toBe('Hello W...');
});

test('mb_strlen', () => {
    expect(php.mb_strlen('▶▶❤❓❇❤')).toBe(6);
});

test('mb_strpos', () => {
    expect(php.mb_strpos('▶▶❤❓❇❤', '❓')).toBe(3);
    expect(php.mb_strpos('▶▶❤❓❇❤', '▶', 2)).toBe(false);
    expect(php.mb_strpos('▶▶❤❇❤', '❓')).toBe(false);
});

test('mb_strrpos', () => {
    expect(php.mb_strrpos('▶▶❤❓❇❤', '❤')).toBe(5);
    expect(php.mb_strrpos('▶❤❓❇❤', '▶', 2)).toBe(false);
    expect(php.mb_strrpos('▶▶❤❇❤', '❓')).toBe(false);
});

test('mb_strtolower', () => {
    expect(php.mb_strtolower('Mary Had A Little Lamb and She LOVED It So')).toBe(
        'mary had a little lamb and she loved it so',
    );

    expect(php.mb_strtolower('Τάχιστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός')).toBe(
        'τάχιστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός',
    );
});

test('mb_strtoupper', () => {
    expect(php.mb_strtoupper('Mary Had A Little Lamb and She LOVED It So')).toBe(
        'MARY HAD A LITTLE LAMB AND SHE LOVED IT SO',
    );

    expect(php.mb_strtoupper('Τάχιστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός')).toBe(
        'ΤΆΧΙΣΤΗ ΑΛΏΠΗΞ ΒΑΦΉΣ ΨΗΜΈΝΗ ΓΗ, ΔΡΑΣΚΕΛΊΖΕΙ ΥΠΈΡ ΝΩΘΡΟΎ ΚΥΝΌΣ',
    );
});

test('mb_strwidth', () => {
    expect(php.mb_strwidth('a')).toBe(1);
    expect(php.mb_strwidth('\uff41')).toBe(2);
});

test('mb_substr', () => {
    expect(php.mb_substr('▶▶❤❓❇❤', 0)).toBe('▶▶❤❓❇❤');
    expect(php.mb_substr('▶▶❤❓❇❤', 2)).toBe('❤❓❇❤');
    expect(php.mb_substr('▶▶❤❓❇❤', 2, 2)).toBe('❤❓');
    expect(php.mb_substr('▶▶❤❓❇❤', 20)).toBe('');
});

test('preg_match', () => {
    expect(php.preg_match('/php/i', 'PHP is the web scripting language of choice.')).toBe(true);
    expect(php.preg_match('/\\bweb\\b/i', 'PHP is the web scripting language of choice.')).toBe(true);

    let matches: string[] = [];

    expect(php.preg_match('/^(?:http://)?([^/]+)/i', 'http://www.php.net/index.html', matches)).toBe(true);
    expect(matches).toEqual(['http://www.php.net', 'www.php.net']);
});

test('preg_match_all', () => {
    let phones: string[][] = [];

    expect(php.preg_match_all('/(\\d{1}-)?(\\d{3}-)?\\d{3}-\\d{4}/', 'Call 555-1212 or 1-800-555-1212', phones)).toBe(
        2,
    );

    expect(phones[0]).toEqual(['555-1212', '1-800-555-1212']);

    let matches: string[][] = [];

    expect(
        php.preg_match_all(
            '/(<([\\w]+)[^>]*>)(.*?)(<\\/\\2>)/',
            '<b>bold text</b><a href=howdy.html>click me</a>',
            matches,
            php.PREG_SET_ORDER,
        ),
    ).toBe(2);

    expect(matches[0][0]).toBe('<b>bold text</b>');
    expect(matches[1][0]).toBe('<a href=howdy.html>click me</a>');
});

test('preg_quote', () => {
    expect(php.preg_quote('$40 for a g3/400')).toBe('\\$40 for a g3/400');
    expect(php.preg_quote('*very*')).toBe('\\*very\\*');
});

test('preg_replace', () => {
    expect(php.preg_replace('/(\\w+) (\\d+), (\\d+)/i', '$1,$3', 'April 15, 2003')).toBe('April,2003');
    expect(
        php.preg_replace(
            ['/quick/', '/brown/', '/fox/'],
            ['slow', 'black', 'bear'],
            'The quick brown fox jumps over the lazy dog.',
        ),
    ).toBe('The slow black bear jumps over the lazy dog.');

    expect(
        php.preg_replace(
            ['/(19|20)(\\d{2})-(\\d{1,2})-(\\d{1,2})/', '/^\\s*{(\\w+)}\\s*=/'],
            ['$3/$4/$1$2', '\$$1 ='],
            '{startDate} = 1999-5-27',
        ),
    ).toBe('$startDate = 5/27/1999');

    let count = { value: 0 };
    php.preg_replace(['/\\d/', '/\\s/'], '*', 'xp 4 to', -1, count);

    expect(count.value).toBe(3);
});

test('preg_replace_callback', () => {
    expect(
        php.preg_replace_callback(
            '|(\\d{2}/\\d{2}/)(\\d{4})|',
            (matches) => matches[1] + (parseInt(matches[2]) + 1),
            'April fools day is 04/01/2002\nLast christmas was 12/24/2001',
        ),
    ).toBe('April fools day is 04/01/2003\nLast christmas was 12/24/2002');
});

test('preg_split', () => {
    expect(php.preg_split('/[\\s,]+/', 'hypertext language, programming')).toEqual([
        'hypertext',
        'language',
        'programming',
    ]);

    expect(php.preg_split('//', 'string', -1, [php.PREG_SPLIT_NO_EMPTY])).toEqual(['s', 't', 'r', 'i', 'n', 'g']);
    expect(php.preg_split('/ /', 'hypertext language programming', -1, [php.PREG_SPLIT_OFFSET_CAPTURE])).toEqual([
        ['hypertext', 0],
        ['language', 10],
        ['programming', 19],
    ]);
});

test('random_bytes', () => {
    expect(php.random_bytes(5)).toBeTypeOf('string');
});

test('random_int', () => {
    expect(php.random_int(100, 999)).toBeTypeOf('number');
});

test('rsort', () => {
    const array = ['lemon', 'orange', 'banana', 'apple'];

    php.rsort(array);

    expect(array).toEqual(['orange', 'lemon', 'banana', 'apple']);

    const fruits = ['Orange1', 'orange2', 'Orange3', 'orange20'];

    php.rsort(fruits, [php.SORT_NATURAL, php.SORT_FLAG_CASE]);

    expect(fruits).toEqual(['orange20', 'Orange3', 'orange2', 'Orange1']);
});

test('rtrim', () => {
    expect(php.rtrim('\t\tThese are a few words :) ...  ')).toBe('\t\tThese are a few words :) ...');
    expect(php.rtrim('\t\tThese are a few words :) ...  ', ' \t.')).toBe('\t\tThese are a few words :)');
    expect(php.rtrim('Hello World', 'Hdle')).toBe('Hello Wor');
    expect(php.rtrim('\x09Example string\x0A', '\x0A')).toBe('\x09Example string');
});

test('sort', () => {
    const array = ['lemon', 'orange', 'banana', 'apple'];

    php.sort(array);

    expect(array).toEqual(['apple', 'banana', 'lemon', 'orange']);

    const fruits = ['Orange1', 'orange2', 'Orange3', 'orange20'];

    php.sort(fruits, [php.SORT_NATURAL, php.SORT_FLAG_CASE]);

    expect(fruits).toEqual(['Orange1', 'orange2', 'Orange3', 'orange20']);
});

test('sscanf', () => {
    expect(php.sscanf('SN/2350001', 'SN/%d')).toEqual([2350001]);
    expect(php.sscanf('January 01 2000', '%s %d %d')).toEqual(['January', 1, 2000]);
});

test('str_contains', () => {
    expect(php.str_contains('abc', '')).toEqual(true);
    expect(php.str_contains('The lazy fox jumped over the fence', 'lazy')).toEqual(true);
    expect(php.str_contains('The lazy fox jumped over the fence', 'Lazy')).toEqual(false);
});

test('str_ends_with', () => {
    expect(php.str_ends_with('abc', '')).toBe(true);
    expect(php.str_ends_with('The lazy fox jumped over the fence', 'fence')).toBe(true);
    expect(php.str_ends_with('The lazy fox jumped over the fence', 'Fence')).toBe(false);
});

test('str_ireplace', () => {
    expect(php.str_ireplace('%body%', 'black', '<body text=%BODY%>')).toBe('<body text=black>');
});

test('str_repeat', () => {
    expect(php.str_repeat('-=', 10)).toBe('-=-=-=-=-=-=-=-=-=-=');
});

test('str_replace', () => {
    expect(php.str_replace('%body%', 'black', "<body text='%body%'>")).toBe("<body text='black'>");
    expect(php.str_replace(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'], '', 'Hello World of PHP')).toBe(
        'Hll Wrld f PHP',
    );

    expect(
        php.str_replace(
            ['fruits', 'vegetables', 'fiber'],
            ['pizza', 'beer', 'ice cream'],
            'You should eat fruits, vegetables, and fiber every day.',
        ),
    ).toBe('You should eat pizza, beer, and ice cream every day.');
});

test('str_starts_with', () => {
    expect(php.str_starts_with('abc', '')).toBe(true);
    expect(php.str_starts_with('The lazy fox jumped over the fence', 'The')).toBe(true);
    expect(php.str_starts_with('The lazy fox jumped over the fence', 'the')).toBe(false);
});

test('str_word_count', () => {
    const str = `Hello fri3nd, you're
         looking          good today!`;

    expect(php.str_word_count(str, 0)).toBe(8);
    expect(php.str_word_count(str, 1)).toEqual(['Hello', 'fri', 'nd', 'you', 're', 'looking', 'good', 'today']);
    expect(php.str_word_count(str, 2)).toEqual({
        0: 'Hello',
        6: 'fri',
        10: 'nd',
        14: 'you',
        18: 're',
        30: 'looking',
        47: 'good',
        52: 'today',
    });

    expect(php.str_word_count(str, 1, 'àáãç3')).toEqual(['Hello', 'fri3nd', 'you', 're', 'looking', 'good', 'today']);
});

test('strip_tags', () => {
    expect(php.strip_tags('<p>Test paragraph.</p><!-- Comment --> <a href="#fragment">Other text</a>')).toBe(
        'Test paragraph. Other text',
    );

    expect(php.strip_tags('<p>Test paragraph.</p><!-- Comment --> <a href="#fragment">Other text</a>', '<p><a>')).toBe(
        '<p>Test paragraph.</p> <a href="#fragment">Other text</a>',
    );

    expect(
        php.strip_tags('<p>Test paragraph.</p><!-- Comment --> <a href="#fragment">Other text</a>', ['p', 'a']),
    ).toBe('<p>Test paragraph.</p> <a href="#fragment">Other text</a>');
});

test('strlen', () => {
    expect(php.strlen('abcdef')).toBe(6);
    expect(php.strlen(' ab cd ')).toBe(7);
});

test('strpos', () => {
    expect(php.strpos('abc', 'a')).toBe(0);
    expect(php.strpos('abcdef abcdef', 'a', 1)).toBe(7);
    expect(php.strpos('abcdef abcdef', 'z')).toBe(false);
});

test('strrpos', () => {
    expect(php.strrpos('Elephpant', 'b')).toBe(false);
    expect(php.strrpos('0123456789a123456789b123456789c', '0', 0)).toBe(0);
    expect(php.strrpos('0123456789a123456789b123456789c', '0', 1)).toBe(false);
});

test('strstr', () => {
    expect(php.strstr('name@example.com', '@')).toBe('@example.com');
    expect(php.strstr('name@example.com', '@', true)).toBe('name');
    expect(php.strstr('name@example.com', 'z')).toBe(false);
});

test('strtr', () => {
    expect(php.strtr('The river å', 'äåö', 'aao')).toBe('The river a');
    expect(php.strtr('hi all, I said hello', { h: '-', hello: 'hi', hi: 'hello' })).toBe('-ello all, I said -ello');
    expect(php.strtr('baab', 'ab', '01')).toBe('1001');
    expect(php.strtr('baab', { ab: '01' })).toBe('ba01');
});

test('substr', () => {
    expect(php.substr('abcdef', 1)).toBe('bcdef');
    expect(php.substr('abcdef', -1)).toBe('f');
    expect(php.substr('abcdef', 0, -1)).toBe('abcde');
});

test('substr_count', () => {
    expect(php.substr_count('This is a test', 'is')).toBe(2);
    expect(php.substr_count('This is a test', 'is', 3)).toBe(1);
    expect(php.substr_count('gcdgcdgcd', 'gcdgcd')).toBe(1);
});

test('substr_replace', () => {
    expect(php.substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 0, 0)).toBe('bobABCDEFGH:/MNRPQR/');
    expect(php.substr_replace('ABCDEFGH:/MNRPQR/', 'bob', 10, -1)).toBe('ABCDEFGH:/bob/');
    expect(php.substr_replace(['A: XXX', 'B: XXX', 'C: XXX'], 'YYY', 3, 3)).toEqual(['A: YYY', 'B: YYY', 'C: YYY']);
    expect(php.substr_replace(['A: XXX', 'B: XXX', 'C: XXX'], ['AAA', 'BBB', 'CCC'], 3, 3)).toEqual([
        'A: AAA',
        'B: BBB',
        'C: CCC',
    ]);

    expect(php.substr_replace(['A: XXX', 'B: XXX', 'C: XXX'], ['AAA', 'BBB', 'CCC'], 3, [1, 2, 3])).toEqual([
        'A: AAAXX',
        'B: BBBX',
        'C: CCC',
    ]);
});

test('trim', () => {
    expect(php.trim('\t\tThese are a few words :) ...  ')).toBe('These are a few words :) ...');
    expect(php.trim('\t\tThese are a few words :) ...  ', ' \t.')).toBe('These are a few words :)');
    expect(php.trim('Hello World', 'Hdle')).toBe('o Wor');
    expect(php.trim('\x09Example string\x0A', '\x09\x0A')).toBe('Example string');
});

test('ucwords', () => {
    expect(php.ucwords('hello world!')).toBe('Hello World!');
    expect(php.ucwords('hello|world!', '|')).toBe('Hello|World!');
});

test('unset', () => {
    const arr = ['foo', 'bar', 'baz'];

    php.unset(arr, 1);

    expect(arr).toEqual(['foo', 'baz']);

    const obj = { foo: 1, bar: 2, baz: 3 };

    php.unset(obj, 'bar');

    expect(obj).toEqual({ foo: 1, baz: 3 });
});

test('wordwrap', () => {
    expect(php.wordwrap('The quick brown fox jumped over the lazy dog.', 20, '<br />\n')).toBe(
        'The quick brown fox<br />\njumped over the lazy<br />\ndog.',
    );

    expect(php.wordwrap('A very long woooooooooooord.', 8, '\n', true)).toBe('A very\nlong\nwooooooo\nooooord.');
    expect(php.wordwrap('A very long woooooooooooooooooord.', 8, '\n', false)).toBe(
        'A very\nlong\nwoooooooooooooooooord.',
    );
});
