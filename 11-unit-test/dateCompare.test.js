import test from 'ava';
import { dateCompare } from './dateCompare.js';

// Lee los argumentos de la línea de comandos
const args = process.argv.slice(2);
const date1 = args[0] || null; // Primer argumento (date1)
const date2 = args[1] || null; // Segundo argumento (date2)

test('Should compare two dates', t => {
    const result = dateCompare(date1, date2);
    
    if (date1 && date2) {
        t.truthy(result.startDate);
        t.truthy(result.endDate);
        
        if (new Date(date1) < new Date(date2)) {
            t.is(result.comparison, 'startDate is before endDate');
        } else if (new Date(date1) > new Date(date2)) {
            t.is(result.comparison, 'startDate is after endDate');
        } else {
            t.is(result.comparison, 'startDate is the same as endDate');
        }
    }
});

test('Should return current date if no argument is given', t => {
    const result = dateCompare();
    const now = new Date().toISOString();
    t.is(result.startDate, now);
    t.is(result.endDate, now);
    t.is(result.comparison, 'startDate is the same as endDate');
});