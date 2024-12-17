import fs from 'fs';
import path from 'path';
import { initializeDirectories } from '../utils/initializeDirectories.js';
import jest from 'jest-mock';
import { expect } from '@jest/globals';

jest.mock('fs');

describe('initializeDirectories', () => {
  const notesDir = path.join(process.cwd(), 'src', 'notes');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create the directory if it does not exist', () => {
    fs.existsSync.mockReturnValue(false); // Simula que el directorio no existe
    fs.mkdirSync.mockImplementation(() => {}); // Mock para mkdirSync

    initializeDirectories();

    expect(fs.existsSync).toHaveBeenCalledWith(notesDir);
    expect(fs.mkdirSync).toHaveBeenCalledWith(notesDir);
    console.log = jest.fn(); // Mock para console.log
    expect(console.log).toHaveBeenCalledWith(`Directorio creado: ${notesDir}`);
  });

  it('should not create the directory if it already exists', () => {
    fs.existsSync.mockReturnValue(true); // Simula que el directorio ya existe

    initializeDirectories();

    expect(fs.existsSync).toHaveBeenCalledWith(notesDir);
    expect(fs.mkdirSync).not.toHaveBeenCalled(); // Asegura que no se intenta crear el directorio
    expect(console.log).not.toHaveBeenCalled();
  });
});
