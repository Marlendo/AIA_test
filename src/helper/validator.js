export const emailValidator = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const formatNumber = (num) => {
    return 'Rp. ' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const lengthValidator = (data, num) => {
    const key = Object.keys(data);
    let valid = 1;
    for(let i in key){
        if(data[key[i]].length < num){
            valid = valid * 0
        } else {
            valid = valid * 1
        }
    }
    return valid === 1 ? true : false
}



