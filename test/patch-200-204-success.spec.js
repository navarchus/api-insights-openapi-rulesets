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
import path from 'path';
import { prepLinter } from '../util/testUtils';
import ruleset from '../api-insights-openapi-ruleset';

const ruleName = 'patch-200-204-success';
const resPath = path.join(__dirname, `resources/${ ruleName }`);

describe(ruleName, () => {
  let spectral;

  beforeAll(() => {
    spectral = prepLinter(ruleset, ruleName);
  });
  test('should catch PATCHs with both 200 and 204 status codes', async () => {
    const spec = await fsPromises.readFile(`${ resPath }/negative-both.yml`);
    const res = await spectral.run(spec.toString());

    expect(res).toEqual([
      {
        code: ruleName,
        message: 'PATCH operations return either \'200 OK\' with full representation or \'204 No Content\' (https://developer.cisco.com/docs/api-insights/#!api-guidelines-analyzer)',
        path: [
          'paths',
          '/test',
          'patch',
        ],
        range: {
          start: {
            line: 26,
            character: 10,
          },
          end: {
            line: 42,
            character: 33,
          },
        },
        severity: 0,
      },
    ]);
  });
  test('should catch PATCHs without a 200 or 204 status code', async () => {
    const spec = await fsPromises.readFile(`${ resPath }/negative-neither.yml`);
    const res = await spectral.run(spec.toString());

    expect(res).toEqual([
      {
        code: ruleName,
        message: 'PATCH operations return either \'200 OK\' with full representation or \'204 No Content\' (https://developer.cisco.com/docs/api-insights/#!api-guidelines-analyzer)',
        path: [
          'paths',
          '/test',
          'patch',
        ],
        range: {
          start: {
            line: 26,
            character: 10,
          },
          end: {
            line: 35,
            character: 34,
          },
        },
        severity: 0,
      },
    ]);
  });
  test('should catch PATCHs containing info not in response body, indicating possible partial representation response', async () => {
    const spec = await fsPromises.readFile(`${ resPath }/negative-partial-rep.yml`);
    const res = await spectral.run(spec.toString());

    expect(res).toEqual([
      {
        code: ruleName,
        message: 'PATCH operations return either \'200 OK\' with full representation or \'204 No Content\' (https://developer.cisco.com/docs/api-insights/#!api-guidelines-analyzer)',
        path: [
          'paths',
          '/test',
          'patch',
        ],
        range: {
          start: {
            line: 26,
            character: 10,
          },
          end: {
            line: 46,
            character: 30,
          },
        },
        severity: 0,
      },
    ]);
  });
  test('should pass PATCHs with 200 status code', async () => {
    const spec = await fsPromises.readFile(`${ resPath }/positive-200.yml`);
    const res = await spectral.run(spec.toString());

    expect(res).toEqual([]);
  });
  test('should pass PATCHs with 204 status code', async () => {
    const spec = await fsPromises.readFile(`${ resPath }/positive-204.yml`);
    const res = await spectral.run(spec.toString());

    expect(res).toEqual([]);
  });


  test('should catch PATCHs with both 200 and 204 status codes - oas2', async () => {
    const spec = await fsPromises.readFile(`${ resPath }/negative-both-oas2.yml`);
    const res = await spectral.run(spec.toString());

    expect(res).toEqual([
      {
        code: ruleName,
        message: 'PATCH operations return either \'200 OK\' with full representation or \'204 No Content\' (https://developer.cisco.com/docs/api-insights/#!api-guidelines-analyzer)',
        path: [
          'paths',
          '/test',
          'patch',
        ],
        range: {
          start: {
            line: 25,
            character: 10,
          },
          end: {
            line: 41,
            character: 32,
          },
        },
        severity: 0,
      },
    ]);
  });
  test('should catch PATCHs without a 200 or 204 status code - oas2', async () => {
    const spec = await fsPromises.readFile(`${ resPath }/negative-neither-oas2.yml`);
    const res = await spectral.run(spec.toString());

    expect(res).toEqual([
      {
        code: ruleName,
        message: 'PATCH operations return either \'200 OK\' with full representation or \'204 No Content\' (https://developer.cisco.com/docs/api-insights/#!api-guidelines-analyzer)',
        path: [
          'paths',
          '/test',
          'patch',
        ],
        range: {
          start: {
            line: 25,
            character: 10,
          },
          end: {
            line: 35,
            character: 32,
          },
        },
        severity: 0,
      },
    ]);
  });

  test('should catch PATCHs containing info not in response body, indicating possible partial representation response - oas2', async () => {
    const spec = await fsPromises.readFile(`${ resPath }/negative-partial-rep-oas2.yml`);
    const res = await spectral.run(spec.toString());

    expect(res).toEqual([
      {
        code: ruleName,
        message: 'PATCH operations return either \'200 OK\' with full representation or \'204 No Content\' (https://developer.cisco.com/docs/api-insights/#!api-guidelines-analyzer)',
        path: [
          'paths',
          '/test',
          'patch',
        ],
        range: {
          start: {
            line: 25,
            character: 10,
          },
          end: {
            line: 35,
            character: 25,
          },
        },
        severity: 0,
      },
    ]);
  });
  test('should pass PATCHs with 200 status code - oas2', async () => {
    const spec = await fsPromises.readFile(`${ resPath }/positive-200-oas2.yml`);
    const res = await spectral.run(spec.toString());

    expect(res).toEqual([]);
  });
  test('should pass PATCHs with 204 status code - oas2', async () => {
    const spec = await fsPromises.readFile(`${ resPath }/positive-204-oas2.yml`);
    const res = await spectral.run(spec.toString());

    expect(res).toEqual([]);
  });

});
