export default {
    getPaged(props, pred, paged) {
        const { paginate, getList } = paged;
        if (getList && (!pred || pred(paginate))) {
            const p = Object.assign({}, paginate, props);
            getList(p).then(data => {
                console.log('getPagedServer ', data );
                this.$set({ paged: data });
            });		
        }
    },

    watch(paged) {
        const { paginate, getList } = paged;
        const d = {
            paginate,
            rowCount: paginate.total,
            pageCount: paginate.pages,
            // paginated: rows,
            selectedPage: paginate ? (paginate.page - 1) : 0
        }
        if (getList) {
            d.getList = getList;
        }
        this.$set(d);	
        return paged;
    }
}
