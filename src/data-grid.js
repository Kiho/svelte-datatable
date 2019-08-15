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

export function exportExcel(columns, rows, title) {
    const mimeType = 'data:application/vnd.ms-excel';
    const html = renderTable(columns, rows).replace(/ /g, '%20');

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

export function print(columns, rows) {
    let win = window.open("");
    win.document.write(renderTable(columns, rows));
    win.print();
    win.close();
}

function renderTable(columns, rows) {
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