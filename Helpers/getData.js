module.exports.getParam = (queryparam)=>{
	let type = queryparam.split(' ');
	let hash ='';
	for(var i=0;i<type.length;i++){
		hash += '%'+type[i]+'%'
	}
	return hash;
}