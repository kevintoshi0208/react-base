import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

global.stateAbortionsController = {};

/**
 * 重複發送ajax 會發生必須等待之前的ajax 一個一個完成
 *
 * 這個兩個function用來將之前發送的ajax暫停
 *
 * createTerminalSignal會建立一個signal 將他放進fetch的options裡面
 *
 * 使用terminatePrevFetch 就可將他停止
 *
 * 用key來分別儲存不同功能的ajax 避免互相把ajax停止
 *
 * @param key
 */
export function terminatePrevFetch(key) {
    if (!stateAbortionsController[key]){
        return;
    }
    for (let controller of stateAbortionsController[key]) {
        controller.abort();
    }
}

export function createTerminalSignal(key) {
    if (!stateAbortionsController[key]) {
        stateAbortionsController[key] = []
    }

    /** 新增停止器 */
    var newController = new AbortController();
    const signal = newController.signal;
    stateAbortionsController[key].push(newController);

    return signal;
}

export function terminateAndCreateSignal(key) {
    if (key) {
        terminatePrevFetch(key);
        const  signal = createTerminalSignal(key);
        return signal;
    }
}