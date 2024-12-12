function createFrame(names) {
    const longMax = Math.max(...names.map(name => name.length));
    const anchuraMarco = longMax + 2;
    const border = '*'.repeat(anchuraMarco + 2);
    const nombresMarco = names.map(name => {
    const padding = ' '.repeat(longMax - name.length);
      return `* ${name}${padding} *`;
    });
    return [border, ...nombresMarco, border].join('\n');
  }
  
    console.log(createFrame(['midu', 'madeval', 'educalvolpz']))
    console.log()
    console.log(createFrame(['midu']))
    console.log()
    console.log(createFrame(['a', 'bb', 'ccc']))
    console.log()
    console.log(createFrame(['a', 'bb', 'ccc', 'dddd']))