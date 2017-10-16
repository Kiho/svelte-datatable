import Fuse from 'fuse.js';
import { collect, dataGrid } from './data-grid';

export default {
    data: dataGrid.data,
    methods: {
        grid: function(data) { 
            return this.get(data); // this.refs.grid.get(data);
        },

        setGrid: function(data) { 
            // this.refs.grid.set(data);
            this.set(data);
        },

        searchData(searchText) {
            this.processRows(this.get('rows'), searchText);
        },

        setPage(reload, currentPage, offset = 0) {
            if (reload) {
                this.setGrid({currentPage: currentPage + offset});
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
    },

    oncreate: function(p) {
        const grid = Object.assign(this, p.methods);		
        dataGrid.setPerPageOptions(grid);

        this.observe('rows', rows => {
            this.processRows(rows);		
        }, { init: false });

        grid.observe('currentPerPage', currentPerPage => {
            const { currentPage } = grid.get();
            this.set({currentPerPage});
            this.setPage(true, currentPage);
        }, { init: false });
        grid.observe('searchInput', searchInput => {
            this.searchData(searchInput);
        }, { init: false });
        grid.observe('selectedPage', selected => {
            this.setPage(true, selected + 1);
        }, { init: false });
        
        grid.on('sort', (index) => {
            if (index > -1) {
                dataGrid.setSortIcon(grid, index);
                const { columns, sortType, currentPage } = grid.get();
                this.setPage(true, currentPage);
            }
        });			
        grid.on('row-click', (row) => dataGrid.edit(row));
    }
}