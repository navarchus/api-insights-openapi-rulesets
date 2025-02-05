/**
 * Copyright 2022 Cisco Systems, Inc. and its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import fsPromises from 'fs/promises';
/* eslint-env jest */
import path from 'path';
import { prepLinter } from '../util/testUtils';
import ruleset from '../api-insights-openapi-ruleset';

const ruleName = 'oas2-get-collection-sort-parameter';
const resPath = path.join(__dirname, `resources/${ ruleName }`);

describe(ruleName, () => {
  let spectral;

  beforeAll(() => {
    spectral = prepLinter(ruleset, ruleName);
  });
  test('should flag a collection (array) without a sort query parameter', async () => {
    const spec = await fsPromises.readFile(`${ resPath }/negative-array.yml`);
    const res = await spectral.run(spec.toString());

    expect(res).toEqual([
      {
        code: ruleName,
        message: 'It is recommended to add a "sort" query parameter to sort this collection (https://developer.cisco.com/docs/api-insights/#!api-guidelines-analyzer)',
        path: [
          'paths',
          '/test',
          'get',
        ],
        range: {
          start: {
            line: 15,
            character: 8,
          },
          end: {
            line: 24,
            character: 25,
          },
        },
        severity: 1,
      },
    ]);
  });
  test('should flag a collection (object wrapping an array) without a sort query parameter', async () => {
    const spec = await fsPromises.readFile(`${ resPath }/negative-object.yml`);
    const res = await spectral.run(spec.toString());

    expect(res).toEqual([
      {
        code: ruleName,
        message: 'It is recommended to add a "sort" query parameter to sort this collection (https://developer.cisco.com/docs/api-insights/#!api-guidelines-analyzer)',
        path: [
          'paths',
          '/test',
          'get',
        ],
        range: {
          start: {
            line: 15,
            character: 8,
          },
          end: {
            line: 27,
            character: 25,
          },
        },
        severity: 1,
      },
    ]);
  });
  test('should not flag responses that have a sort query parameter', async () => {
    const spec = await fsPromises.readFile(`${ resPath }/positive.yml`);
    const res = await spectral.run(spec.toString());

    expect(res).toEqual([]);
  });
});
