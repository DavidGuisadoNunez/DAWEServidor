function decodeFilename(filename) {
  // Elimina la parte inicial del número y el guion bajo
  const parts = filename.split('_');
  if (parts.length < 2) return '';

  // Obtén la parte del nombre del archivo y su extensión
  const nameWithExtension = parts[1];

  // Elimina la extensión extra al final
  const nameParts = nameWithExtension.split('.');
  if (nameParts.length < 2) return '';

  // Devuelve el nombre del archivo y su extensión original
  return nameParts.slice(0, -1).join('.');
}

// Ejemplo de uso
console.log(decodeFilename('12345_file-name.ext.extra')); // Output: file-name.ext