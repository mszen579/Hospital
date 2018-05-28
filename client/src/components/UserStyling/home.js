() => {
    document.getElementById('#carousel').carouFredSel({
        direction: 'right',
        items: {
            visible: 1,
            start: -1
        },
        scroll: {
            duration: 1000,
            timeoutDuration: 3000
        },
        pagination: '#pager'
    });
};