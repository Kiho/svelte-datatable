import Fuse from 'fuse.js';
import { collect } from './data-grid';

export function getPaged(props, pred, paginated) {
	const { selectedPage } = paginated;           
	if (!pred || pred({page: selectedPage})) {
		if (props.page) {
			props.currentPage = props.page;
		}
		paginated = Object.assign(paginated, props);
		processRows(props.rows || paginated.rows, props.searchText, paginated);
		return paginated;
	}
} 

function paginateRows(rows, paginated) {
	let paginatedRows = rows;
	const { currentPerPage, currentPage, paginate } = paginated;
	if (paginate) {
		paginatedRows = paginatedRows.slice((currentPage - 1) * currentPerPage, currentPerPage === -1 ? 
			paginatedRows.length + 1 : 
			currentPage * currentPerPage);
	}
	paginated.paginatedRows = paginatedRows;
}

function processRows(rows, searchText, paginated) {
	let computedRows = rows;
	const { currentPerPage, columns,
		sortable, sortColumn, sortType, 
		searchInput, exactSearch } = paginated;	

	if (!searchText) {
		searchText = searchInput;
	}

	if (sortable !== false && sortColumn > -1 && columns) {
		computedRows = computedRows.sort((x, y) => {
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
		});
	}

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

	paginated.pageCount = Math.ceil(computedRows.length / currentPerPage);
	paginated.rowCount = computedRows.length;
	paginateRows(computedRows, paginated);
}
