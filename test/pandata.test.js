import { vi, beforeEach, describe, test, expect } from 'vitest';
import PanData from '../src/index.js'; // Assuming the file is located at src/index.js
import fs from 'fs/promises';

describe('PanData', () => {
    let data;

    beforeEach(() => {
        data = new PanData();
    });

    test('loadJson() should load data from JSON file and set items', async () => {
        const jsonContent =
            '[{"id": 1, "name": "Item 1"}, {"id": 2, "name": "Item 2"}]';

        // Mock fs.readFile method
        vi.spyOn(fs, 'readFile').mockResolvedValue(jsonContent);

        await data.loadJson('./mockData.json');
        expect(data.getAll()).toEqual([
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ]);
    });

    test('clear() should reset the data store', () => {
        data.items = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ];
        data.clear();
        expect(data.getAll()).toEqual([]);
    });

    test('getByKeyValue() should return items by key-value pair', () => {
        data.items = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ];
        const result = data.getByKeyValue('name', 'Item 1');
        expect(result).toEqual([{ id: 1, name: 'Item 1' }]);
    });

    test('getFirstByKeyValue() should return the first item by key-value pair', () => {
        data.items = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ];
        const result = data.getFirstByKeyValue('name', 'Item 2');
        expect(result).toEqual({ id: 2, name: 'Item 2' });
    });

    test('removeByKeyValue() should remove items by key-value pair', () => {
        data.items = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ];
        data.removeByKeyValue('name', 'Item 1');
        expect(data.getAll()).toEqual([{ id: 2, name: 'Item 2' }]);
    });

    test('bubble() should apply the function to all items', () => {
        data.items = [{ id: 1, name: 'Item 1' }];
        const spyFn = vi.fn();
        data.bubble(spyFn);
        expect(spyFn).toHaveBeenCalledWith({ id: 1, name: 'Item 1' });
    });

    test('delegateGetAllByKey() should return a function to filter by key', () => {
        data.items = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ];
        const filterByName = data.delegateGetAllByKey('name');
        const result = filterByName('Item 1');
        expect(result).toEqual([{ id: 1, name: 'Item 1' }]);
    });

    test('delegateGetFirstByKey() should return a function to find the first item by key', () => {
        data.items = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ];
        const findFirstById = data.delegateGetFirstByKey('id');
        const result = findFirstById(1);
        expect(result).toEqual({ id: 1, name: 'Item 1' });
    });

    test('delegateAllByKeySorted() should return a function to sort items by key', () => {
        data.items = [
            { id: 2, name: 'Item 2' },
            { id: 1, name: 'Item 1' },
        ];
        const sortById = data.delegateAllByKeySorted('id');
        const resultAsc = sortById(true);
        expect(resultAsc).toEqual([
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ]);
        const resultDesc = sortById(false);
        expect(resultDesc).toEqual([
            { id: 2, name: 'Item 2' },
            { id: 1, name: 'Item 1' },
        ]);
    });

    test('delegateAllByKeySorted() should return empty array if items are empty', () => {
        const sortById = data.delegateAllByKeySorted('id');
        const result = sortById(true);
        expect(result).toEqual([]);
    });
});
