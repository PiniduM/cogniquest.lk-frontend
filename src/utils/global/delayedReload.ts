const delayedReload = (delay: number) => {
    setTimeout(() => {
        location?.reload();
    },delay)
}

export default delayedReload;