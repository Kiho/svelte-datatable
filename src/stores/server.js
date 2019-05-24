import { writable } from 'svelte/store';

const initialState = {
    paginate: {},
    rowCount: 0,
    pageCount: 0,
    selectedPage: 0,
    getList: null
}

function createServerStore() {
	const { subscribe, set, update } = writable(initialState);

	return {
        subscribe,
        getPaged: (props, pred, paged) => {
            const { paginate, getList } = paged;
            if (getList && (!pred || pred(paginate))) {
                const p = Object.assign({}, paginate, props);
                getList(p).then(data => {
                    console.log('getPagedServer ', data );
                    update({ paged: data });
                });		
            }
        },
        watch: (paged) => {
            const { paginate, getList } = paged;
            const d = {
                paginate,
                rowCount: paginate.total,
                pageCount: paginate.pages,
                selectedPage: paginate ? (paginate.page - 1) : 0
            }
            if (getList) {
                d.getList = getList;
            }
            update(d);
        }
	};
}

export const paged = createServerStore();