function dig(obj, selector) {
    var result = obj;
    const splitter = selector.split('.');

    for (let i = 0; i < splitter.length; i++){
        if (result == undefined)
            return undefined;                
        result = result[splitter[i]];
    }

    return result;
}

export function collect(obj, field) {
    if (typeof(field) === 'function')
        return field(obj);
    else if (typeof(field) === 'string')
        return dig(obj, field);
    else
        return undefined;
}

export class dataGrid {
    static data() {
        return {
            selectedPage: 0,
            currentPage: 1,
            currentPerPage: 10,
            pageCount: 0,
            rowCount: 0,
            sortIndex: -1,
            sortColumn: -1,
            sortType: 'asc',
            searching: false,
            searchInput: '',
            // props
            process: 'server',
            title: '',
            columns: [],
            rows: [],
            processedRows: [],
            paged: {},
            paginate: {},
            paginated: [],
            clickable:true,
            customButtons: [],
            perPage:  [10, 20, 30, 40, 50],
            perPageOptions: [],
            defaultPerPage: null,
            sortable: true,
            searchable: true,
            exactSearch: false,
            exportable: true,
            printable: true,			
        };
    }

    static setSortIcon(component, index) {
        let { sortable, sortColumn, sortType, currentPage } = component.get();
        if (!sortable)
            return;
        if (sortColumn === index) {
            sortType = sortType === 'asc' ? 'desc' : 'asc';
        } else {
            sortType = 'asc';
            sortColumn = index;
        }
        component.set({sortType, sortColumn});
    }
    
    static setPerPageOptions(component) {
        let { currentPerPage, defaultPerPage, perPage } = component.get();
        let options = perPage;
    
        // Force numbers
        options = options.map( v => parseInt(v));
        
        // Set current page to first value
        currentPerPage = options[0];
    
        // Sort options
        options.sort((a,b) => a - b);
    
        // And add "All"
        options.push(-1);
    
        // If defaultPerPage is provided and it's a valid option, set as current per page
        if (options.indexOf(defaultPerPage) > -1) {
            currentPerPage = parseInt(defaultPerPage);
        }
    
        console.log('currentPerPage', currentPerPage, options);
        component.set({currentPerPage, perPageOptions: options});
    }
    
    static exportExcel(component) {
        const {title} = component.get();
        const mimeType = 'data:application/vnd.ms-excel';
        const html = dataGrid.renderTable(component).replace(/ /g, '%20');
    
        const documentPrefix = title != '' ? title.replace(/ /g, '-') : 'Sheet'
        const d = new Date();
    
        var dummy = document.createElement('a');
        dummy.href = mimeType + ', ' + html;
        dummy.download = documentPrefix
            + '-' + d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()
            + '-' + d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds()
            +'.xls';
        dummy.click();
    }
    
    static print(component) {
        let win = window.open("");
        win.document.write(dataGrid.renderTable(component));
        win.print();
        win.close();
    }
    
    static renderTable(component) {
        const { currentPage, columns, rows } = component.get();
        let table = '<table><thead>';
    
        table += '<tr>';
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            table += '<th>';
            table += 	column.label;
            table += '</th>';
        }
        table += '</tr>';
    
        table += '</thead><tbody>';
        
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            table += '<tr>';
            for (let j = 0; j < columns.length; j++) {
                const column = columns[j];
                table += '<td>';
                table +=	collect(row, column.field);
                table += '</td>';
            }
            table += '</tr>';
        }
    
        table += '</tbody></table>';
        return table;
    }

    static click(component, row) {
        if(!component.get().clickable){
            return;
        }
        if (getSelection().toString()) {
            // Return if some text is selected instead of firing the row-click event.
            return;
        }
        component.fire('row-click', row);
        // console.log('click', row);
    }
}