import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { beforeAll, expect } from '@jest/globals';

describe('Jest Configuration Tests', () => {
  const coverageDir = path.join(__dirname, '..', 'coverage');

  beforeAll((done) => {
    // Ejecutar el script de pruebas usando npm
    exec('npm run test', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${stderr}`);
        done(err);
      } else {
        console.log(stdout);
        done();
      }
    });
  }, 30000); // Increase timeout to 30 seconds

  it('should create a coverage directory', () => {
    expect(fs.existsSync(coverageDir)).toBe(true);
  });

  it('should generate a JSON coverage report', () => {
    const jsonReport = path.join(coverageDir, 'coverage-final.json');
    expect(fs.existsSync(jsonReport)).toBe(true);
  });

  it('should generate an LCOV coverage report', () => {
    const lcovReport = path.join(coverageDir, 'lcov.info');
    expect(fs.existsSync(lcovReport)).toBe(true);
  });

  it('should generate a text coverage report', () => {
    const textSummary = path.join(coverageDir, 'clover.xml');
    expect(fs.existsSync(textSummary)).toBe(true);
  });
});
