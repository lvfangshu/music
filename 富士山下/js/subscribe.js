/* 发布订阅 */
(function () {
	//创建事件池
	let listeners = {}
	//事件池中注入方法
	const on = function on(event, callback) {
		if (!listeners[event])
			listeners[event] = [];
		let arr = listeners[event];
		if (!arr.includes(callback)) { arr.push(callback) }


	}
	//从时间池中移除方法
	const off = function off(event, callback) {
     let arr=listeners[event];
		 if(!arr)return;
		 for(let i=0;i<arr.length;i++){
			 let item=arr[i];
			 if(item===callback){
				//  arr.splice(i,1);
				arr[i]=null;
				 break;
			 }
		 }
	}
	//通知事件池中的方法执行
	const emit = function emit(event, ...params) {
		let arr=listeners[event];
		if(!arr)return;
		for(let i=0;i<arr.length;i++){
			let item=arr[i];
		if(typeof item==="function"){
			item(...params);
			continue
		}
		 arr.splice(i,1);
		 i--
		}
	}
	window.$sub = {
		on,
		off,
		emit
	}
})()
const fn1 = (x, y) => {
	console.log('fn1', x, y);
};
const fn2 = (x, y) => {
	console.log('fn2', x, y);
	$sub.off('marry', fn1);
	$sub.off('marry', fn2);
};
const fn3 = () => console.log('fn3');
const fn4 = () => console.log('fn4');
const fn5 = () => console.log('fn5');
const fn6 = () => console.log('fn6');
$sub.on('marry', fn1);
$sub.on('marry', fn2);
$sub.on('marry', fn3);
$sub.on('marry', fn4);
$sub.on('marry', fn5);
$sub.on('marry', fn6);
document.body.onclick=function(){
	$sub.emit('mary',10,20)
}