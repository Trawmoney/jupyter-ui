/*
 * Copyright (c) 2021-2023 Datalayer, Inc.
 *
 * MIT License
 */

import { ICell, IOutput } from '@jupyterlab/nbformat';
import { UUID } from '@lumino/coreutils';

// const MAX = Number.MAX_SAFE_INTEGER;
// const MAX = 999999;

export const newSourceId = (base: string) => {
  //  return base + Math.floor(Math.random() * MAX).toString();
  return base;
};

export const newUuid = () => {
  return UUID.uuid4();
};

export const cellSourceAsString = (cell: ICell) => {
  let source = cell.source;
  if (typeof source === 'object') {
    source = (source as []).join('\n');
  }
  return source;
};

export const outputsAsString = (outputs: IOutput[]) => {
  let result = '';
  outputs.forEach(output => {
    switch (output.output_type) {
      case 'display_data': {
        if (output.text) {
          result = result + output.text + '\n';
        }
        break;
      }
      case 'update_display_data': {
        if (output.text) {
          result = result + output.text + '\n';
        }
        break;
      }
      case 'stream': { 
        if (output.text) {
          result = result + output.text + '\n';
        }
        break;
      }
      case 'error': {
        if (output.text) {
          result = result + output.text + '\n';
        }
        break;
      }
      case 'execute_result': {
        if (output.text) {
          result = result + output.text + '\n';
        }
        break;
      }
      default: {
        console.warn('Unknown output type while converting output to string', output);
      }
    }
  })
  return result;
};

export const getCookie = (name: string): string | null => {
  const nameLenPlus = name.length + 1;
  return (
    document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null
  );
};
