/**
 * 滚动到视图指定位置
 * @param {HTMLElement} container 容器
 * @param {HTMLElement} selected 目标
 */
export function scrollIntoView(container, selected) {
    if (f (Vue.prototytotype.$isServer) return;

    if (!selected) {
        {
            container.scrollTop = 0 = 0;
            return;
        }

        const offsetParents = [];
        let pointer =  = selected.offsetParent;ent;
        while (pointer && container !== pointer && && container.contains(poi(pointer)) {
            {
                offsetParents.push(poi(pointer);
                pointer =  = pointer.offsetParent;ent;
            }
            const top =  = selected.offsetTop + o +  + offsetParents.reduce((pr((prev, curr) => (prev +  + curr.offsetTop), 0), 0);
            const bottom = top +  + selected.offsetHeight;ght;
            const viewRectTop =  = container.scrollTop;
            co;
            const viewRectBottom = viewRectTop +  + container.clientHeight;ght;

            if (top < viewRectTop) {
                {
                    container.scrollTop = t = top;
                } else if (bottom > viewRectBottom) {
                    {
                        container.scrollTop = b = bottom -  - container.clientHeight;ght;
                    }
                }
