export const setToken = (key, value)=> {
    localStorage.setItem(key, JSON.stringify(value));
} 

export const getToken = (key)=> {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
   } 

export const removeToken = (key)=>{
    localStorage.removeItem(key);
}

export const  setUserName = (key, value)=>{
localStorage.setItem(key, JSON.stringify(value))
}

export const getUser =(key)=>{
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

  
export const createCart = (key, value) =>{
    localStorage.setItem(key, JSON.stringify(value));
}

export const getCart = (key) => {
    const value = localStorage.getItem(key);
    if (value) {
        try {
            const parsedValue = JSON.parse(value);
           
            return Array.isArray(parsedValue) ? new Set(parsedValue) : new Set();
        } catch (error) {
            console.error('Error parsing cart from localStorage:', error);
            return new Set();
        }
    }
    return new Set();
};

export const updateCart = (key, value) => {
    localStorage.setItem(key, JSON.stringify(Array.from(value)));
};


export const createList = (key, value) =>{
    localStorage.setItem(key, JSON.stringify(value));
}

export const getList = (key) => {
    const value = localStorage.getItem(key);
    if (value) {
        try {
            const parsedValue = JSON.parse(value);
           
            return Array.isArray(parsedValue) ? new Set(parsedValue) : new Set();
        } catch (error) {
            console.error('Error parsing cart from localStorage:', error);
            return new Set();
        }
    }
    return new Set();
};

export const updateList = (key, value) => {
    localStorage.setItem(key, JSON.stringify(Array.from(value)));
};


export const createCompare = (key, value) =>{
    localStorage.setItem(key, JSON.stringify(value));
}

export const getComparison = (key) => {
    const value = localStorage.getItem(key);
    if (value) {
        try {
            const parsedValue = JSON.parse(value);
           
            return Array.isArray(parsedValue) ? new Set(parsedValue) : new Set();
        } catch (error) {
            console.error('Error parsing cart from localStorage:', error);
            return new Set();
        }
    }
    return new Set();
};

export const updateComparison= (key, value) => {
    localStorage.setItem(key, JSON.stringify(Array.from(value)));
};


export const setTheme =(key, value)=>{
    localStorage.setItem(key, JSON.stringify(value))
}

export const getTheme =(key)=>{
   const value = localStorage.getItem(key);
 const parsedValue = JSON.parse(value);
 return parsedValue;
}
