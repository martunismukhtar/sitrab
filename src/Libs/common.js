export const Capitalize = (string) => {
    let new_string = string.toLowerCase();
    let pieces = new_string.split(" ");
    for(let i = 0; i < pieces.length; i++) {
        pieces[i] = pieces[i][0].toUpperCase() + pieces[i].slice(1);
    }
    return pieces.join(" ");    
};

export const convertToFixed=(val)=> {
    let n = parseFloat(val).toFixed(4);
    return n;
}

export const judul = (string) => {
    let new_string = string.toLowerCase().replace(/_/g, ' ');    
    let pieces = new_string.split(" ");
    for(let i = 0; i < pieces.length; i++) {
        pieces[i] = pieces[i][0].toUpperCase() + pieces[i].slice(1);
    }
    return pieces.join(" ");    
};