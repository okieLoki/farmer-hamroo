const formatDate = (date) => {
    // display date in dd/mm/yy 

    const d = new Date(date);

    let year = d.getFullYear();
    year = year.toString().substr(-2);

    const month = d.getMonth() + 1;
    const day = d.getDate();

    return `${day}/${month}/${year}`;
}

const EM = (payload) => {
    if(payload === 'Evening'){
        return 'E';
    }
    else if(payload === 'Morning'){
        return 'M';
    }
    else{
        return 'N';
    }
}

const formatAmount = (amt) => {
    return amt.toFixed(2);
}

const formatDateLedger = (date) => {
    // display date in dd/mm/yy 

    const d = new Date(date);

    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();

    return `${month}-${day}-${year}`;
}

export { formatDate, EM, formatAmount, formatDateLedger };