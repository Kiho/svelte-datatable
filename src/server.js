import { dataGrid } from './data-grid';

export default {
    methods: {
        getPaged(props, pred) {
            const { paginate, getList } = this.get(); // this.refs.grid.get();
            if (getList && !pred || pred(paginate)) {
                const p = Object.assign({}, paginate, props);
                getList(p).then(data => this.set({ paged: data }));				
            }
        },

        sort(index) {
            if (index > -1) {
                dataGrid.setSortIcon(this, index);
                const { columns, sortType } = this.get();
                this.getPaged({colName: columns[index].field, direction: sortType});				
            }
        },
    },

    oncreate: function(p) {
        const grid = Object.assign(this, p.methods);		
        dataGrid.setPerPageOptions(grid);

        grid.observe('paged', paged => {
            if (paged) {
                const { paginate, rows, getList } = paged;
                const d = {
                    paginate,
                    rowCount: paginate.total,
                    pageCount: paginate.pages,
                    paginated: rows,
                    selectedPage: paginate ? (paginate.page - 1) : 0
                }
                if (getList) {
                    d.getList = getList;
                }
                grid.set(d);
            }				
        }, { init: false });

        grid.observe('currentPerPage', currentPerPage => {
            this.getPaged({size: currentPerPage});
        }, { init: false });
        grid.observe('searchInput', searchInput => {
            this.getPaged({searchText: searchInput});
        }, { init: false });
        grid.observe('selectedPage', selected => {
            const newPage = selected + 1;
            this.getPaged({page: newPage}, x => x.page != newPage);
        }, { init: false });
    }
}