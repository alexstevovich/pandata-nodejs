/*
 * pandata
 *
 * https://alexstevovich.com/a/pandata-nodejs
 *
 * Copyright 2015–2025 Alex Stevovich
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import fs from 'fs/promises';

class PanData {
    constructor() {
        this.items = [];
    }

    clear() {
        this.items = [];
        return this;
    }

    async loadJson(filePath) {
        const raw = await fs.readFile(filePath, 'utf8');
        this.items = JSON.parse(raw);
        return this;
    }

    getAll() {
        return this.items;
    }
    getByKeyValue(key, value) {
        return this.items.filter((p) => p[key] === value);
    }
    getFirstByKeyValue(key, value) {
        return this.items.find((p) => p[key] === value);
    }
    removeByKeyValue(key, value) {
        this.items = this.items.filter((p) => p[key] !== value);
    }
    bubble(fn) {
        for (const i of this.items) fn(i);
    }

    delegateGetAllByKey(key) {
        return (value) => this.items.filter((p) => p[key] === value);
    }

    delegateGetFirstByKey(key) {
        return (value) => this.items.find((p) => p[key] === value) || null;
    }

    delegateAllByKeySorted(key) {
        return (ascending = true) => {
            const sorted = [...this.items].sort((a, b) => {
                const va = a[key] ?? 0;
                const vb = b[key] ?? 0;
                return ascending ? va - vb : vb - va;
            });
            return sorted;
        };
    }
}

export { PanData };
export default PanData;
