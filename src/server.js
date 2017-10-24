import { dataGrid } from './data-grid';
import { debounce } from './debounce';

export default {
    methods: {
        getPaged(props, pred) {
            const { paginate, getList } = this.get(); // this.refs.grid.get();
            if (getList && (!pred || pred(paginate))) {
                const p = Object.assign({}, paginate, props);
                getList(p).then(data => {
                    this.set({ paged: data });
                });		
            }
        },
    },

    oncreate: function(p) {
        const grid = Object.assign(this, p.methods);		

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
        return grid;
    }
}