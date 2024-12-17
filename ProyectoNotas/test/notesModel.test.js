import { noteModel } from '../models/noteModel.js';
import { expect } from '@jest/globals';

describe('noteModel Tests', () => {
  it('should create a note object with name and content', () => {
    const name = 'Test Note';
    const content = 'This is a test content';

    const result = noteModel(name, content);

    expect(result).toEqual({
      name: 'Test Note',
      content: 'This is a test content',
    });
  });

  it('should handle empty name and content', () => {
    const name = '';
    const content = '';

    const result = noteModel(name, content);

    expect(result).toEqual({
      name: '',
      content: '',
    });
  });

  it('should handle null or undefined values', () => {
    const result = noteModel(undefined, null);

    expect(result).toEqual({
      name: undefined,
      content: null,
    });
  });
});
