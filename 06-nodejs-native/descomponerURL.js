function descomponerURL(url) {
    const urlObj = new URL(url);
    
    const protocolo = urlObj.protocol; // 'http:' o 'https:'
    const hostParts = urlObj.host.split('.');
    
    // Extraemos la dirección IP (en el caso de URLs de IP) o el dominio
    const ipAdress = hostParts[0].includes(':') ? hostParts[0] : null; // Puede ser IP
    const domainName = ipAdress ? null : hostParts.slice(-2).join('.'); // El dominio
    const subDomain = ipAdress ? null : hostParts.slice(0, -2).join('.'); // Subdominio, si existe

    const pathParts = urlObj.pathname.split('/').filter(Boolean); // Filtramos carpetas vacías
    const folderTree = pathParts.slice(0, -1).join('/'); // Todas las carpetas excepto la última
    const targetFile = pathParts[pathParts.length - 1]; // Última parte como archivo objetivo
    
    const args = urlObj.searchParams; // Obtenemos los parámetros de la URL
    const argumentsFile = {};
    args.forEach((value, key) => {
        argumentsFile[key] = value; // Convertimos a un objeto
    });

    return {
        protocolo,
        ipAdress,
        subDomain,
        domainName,
        folderTree,
        targetFile,
        argumentsFile
    };
}

// Ejemplo de uso
const url = 'https://kahoot.it/challenge/9dd0b0d3-dde6-4c46-995a-73396eeb9be0_1727974852436';
const resultado = descomponerURL(url);
console.log(resultado);