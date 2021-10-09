

function createUniScanCode (callback: (value: string) => void) {
	// 允许从相机和相册扫码
	uni.scanCode({
	    success: function (res) {
	        // console.log('条码类型：' + res.scanType);
	        // console.log('条码内容：' + res.result);
            callback(res.result)
	    }
	});
}

export const useUniScanCode = createUniScanCode;