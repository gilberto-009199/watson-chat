module.exports = (router) => {
	
	router.get('/user',(req,res)=>{
		res.render('home',{users:[
			{id:1,name:'gil'},
			{id:1,name:'claudio'},
			{id:1,name:'guilherme'}
		]});
	})
	
	return router;
}