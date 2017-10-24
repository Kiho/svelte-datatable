import Fuse from 'fuse.js';
import { debounce } from './debounce';
import { collect, dataGrid } from './data-grid';

export default {
    methods: {
        grid: function(data) { 
            return this.get(data);
        },

        setGrid: function(data) { 
            this.set(data);
        },

        searchData(searchText) {
            this.processRows(this.get('rows'), searchText);
        },

        getPaged(props, pred) {
            const { page } = props;            
            if (!pred || pred({page: this.get('selectedPage')})) {
                if (page) {
                    props.currentPage = page;
                }
                // console.log('getPaged - props', props);	
                this.setGrid(props);
                this.processRows(this.get('rows'));	
            }
        },
        
        paginateRows: function(rows) {
            const { currentPerPage, currentPage, paginate } = this.grid();
            let paginatedRows = rows;
            if (paginate)
                paginatedRows = paginatedRows.slice((currentPage - 1) * currentPerPage, currentPerPage === -1 ? paginatedRows.length + 1 : currentPage * currentPerPage);
            this.setGrid({paginated: paginatedRows});
            console.log('paginatedRows', paginatedRows);
        },

        processRows: function(rows, searchText) {
            let computedRows = rows;				
            const { currentPage, currentPerPage, columns,
                sortable, sortColumn, sortType, 
                searchInput, exactSearch } = this.grid();
            if (!searchText) {
                searchText = searchInput;
            }	
            if (sortable !== false && sortColumn > -1 && columns)
                computedRows = computedRows.sort((x,y) => {
                    if (!columns[sortColumn])
                        return 0;

                    const cook = (x) => {
                        x = collect(x, columns[sortColumn].field);
                        if (typeof(x) === 'string') {
                            x = x.toLowerCase();
                             if (columns[sortColumn].numeric)
                                x = x.indexOf('.') >= 0 ? parseFloat(x) : parseInt(x);
                        }
                        return x;
                    }

                    x = cook(x);
                    y = cook(y);

                    return (x < y ? -1 : (x > y ? 1 : 0)) * (sortType === 'desc' ? -1 : 1);
                })

            if (searchText) {
                const searchConfig = { keys: columns.map(c => c.field) }

                // Enable searching of numbers (non-string)
                // Temporary fix of https://github.com/krisk/Fuse/issues/144
                    searchConfig.getFn = function (obj, path) {
                    if(Number.isInteger(obj[path]))
                    return JSON.stringify(obj[path]);
                        return obj[path];
                }

                if (exactSearch) {
                    //return only exact matches
                    searchConfig.threshold = 0,
                    searchConfig.distance = 0
                }

                computedRows = (new Fuse(computedRows, searchConfig)).search(searchText);
            }

            const pageCount = Math.ceil(computedRows.length / currentPerPage);
            this.setGrid({processedRows: computedRows, rowCount: computedRows.length, pageCount});
            this.paginateRows(computedRows);
        },

        sort(index) {
            if (index > -1) {
                dataGrid.setSortIcon(this, index);
                const { currentPage } = this.get();
                this.getPaged({currentPage});				
            }
        },
    },

    oncreate: function(p) {
        const grid = Object.assign(this, p.methods);		
        dataGrid.setPerPageOptions(grid);

        grid.observe('rows', rows => {
            this.processRows(rows);		
        }, { init: false });

        grid.observe('currentPerPage', currentPerPage => {
            this.getPaged({currentPerPage});
        }, { init: false });
        grid.observe('searchInput', debounce((searchInput) => {
            this.searchData(searchInput);
        }, 250), { init: false });
        grid.observe('selectedPage', selected => {
            const newPage = selected + 1;
            this.getPaged({page: newPage}, x => x.page != newPage);
        }, { init: false });
    }
}