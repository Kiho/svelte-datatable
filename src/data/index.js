import serverData from './data';
import { collect } from '../data-grid';

const artificialDelay = 250;

const paginate = {
    page: 1,
    size: 10,
    pages: 0,
    colName: '',
    direction: '',
}

const delay = (time) => (result) => new Promise(resolve => setTimeout(() => resolve(result), time));

export default function getList(p) {
    if (!p) {
        p = Object.assign({}, paginate);
    }
    return getData(p).then(data => {
        data.getList = getData;
        return  { paged: data };
    });    
}

function paginateArray(array, size, page) {
    return array.slice(page * size, (page + 1) * size);
}

function searchByName(obj, text) {
    text = text.toLowerCase();
    if (obj.fname.toLowerCase().indexOf(text) > -1) return true;
    if (obj.lname.toLowerCase().indexOf(text) > -1) return true;
    return false;
}

function getData(p) {
    let data = serverData;
    if (p.colName) {
        const sort = (x, y) => {
            const cook = (x) => {
                x = collect(x, p.colName);
                if (typeof(x) === 'string') {
                    x = x.toLowerCase();
                    if (p.numeric)
                        x = x.indexOf('.') >= 0 ? parseFloat(x) : parseInt(x);
                }
                return x;
            }
    
            x = cook(x);
            y = cook(y);
    
            return (x < y ? -1 : (x > y ? 1 : 0)) * (p.direction === 'desc' ? -1 : 1);
        };

        data = data.sort(sort);
    }

    if (p.searchText) { 
        data = data.filter(x => searchByName(x, p.searchText));
    }

    if (!p.page) {
        p.page = 1;
    }
    const rows = paginateArray(data, p.size, p.page - 1);
    p.total = data.length;
    p.pages = Math.ceil(data.length / p.size);
    const paged = { paginate: p, rows };
    return Promise.resolve(paged).then(delay(artificialDelay));    
}