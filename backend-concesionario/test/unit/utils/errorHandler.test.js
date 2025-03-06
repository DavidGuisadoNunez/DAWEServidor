import ApiError from '../../../src/utils/errorHandler.js';
import { describe, it, expect } from '@jest/globals';

describe('ApiError Class', () => {
  it('debe crear un error con código de estado y mensaje', () => {
    const error = new ApiError(404, 'Recurso no encontrado');

    expect(error).toBeInstanceOf(ApiError);
    expect(error.message).toBe('Recurso no encontrado');
    expect(error.statusCode).toBe(404);
    expect(error.success).toBe(false);
  });

  it('debe capturar la traza del stack y mantener el nombre correcto', () => {
    const error = new ApiError(500, 'Error interno del servidor');

    expect(error.stack).toBeDefined();
    expect(error.constructor.name).toBe('ApiError'); // Verificamos el nombre del constructor
  });
});
