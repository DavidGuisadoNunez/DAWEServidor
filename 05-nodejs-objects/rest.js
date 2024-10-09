let { name: userName, email, ...rest } = { 
    name: "John", 
    email: "john@example.com", 
    city: "Phoenix", 
    state: "AZ", 
    country: "USA" 
};


console.log(userName);   
console.log(email);  
console.log(rest);   