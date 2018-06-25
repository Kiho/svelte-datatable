export default {
    methods: {
        getPaged(props, pred) {
            const { paginate, getList } = this.get();
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
        grid.on('state', ({ changed, current, previous }) => {
            if (changed.paged) {
                const { paginate, rows, getList } = current.paged;
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
        });
        return grid;
    }
}