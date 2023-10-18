const formatDate = (date) => {
    // display date in dd/mm/yy 

    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();

    return `${day}/${month}/${year}`;
}

export { formatDate };