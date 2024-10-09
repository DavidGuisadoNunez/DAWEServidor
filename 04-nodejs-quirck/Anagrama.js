function areAnagrams(word1, word2) {
    
    const normalizedWord1 = word1.toLowerCase().replace(/\s+/g, '');
    const normalizedWord2 = word2.toLowerCase().replace(/\s+/g, '');

    
    if (normalizedWord1 === normalizedWord2) {
        return false;
    }

    
    const sortedWord1 = normalizedWord1.split('').sort().join('');
    const sortedWord2 = normalizedWord2.split('').sort().join('');

    return sortedWord1 === sortedWord2;
}

console.log(areAnagrams("amor", "roma"));        
console.log(areAnagrams("dormir", "morir"));     
console.log(areAnagrams("cinema", "iceman"));    
console.log(areAnagrams("hello", "world"));      
console.log(areAnagrams("listen", "silent"));     
console.log(areAnagrams("triangle", "integral")); 
console.log(areAnagrams("aaa", "aaa"));          
