
/* Route1 Controller Class */
export default  class controllerRoute1{
	constructor(){
	}

	createAction(Route1){
		return new Promise((Resolve,Reject)=>{

			return Models.name.create(Route1)
			.then( data => Resolve(data) )
			.catch( Err => Reject(Err) );
		});
	}

	getOne({id}){
		return new Promise((Resolve,Reject)=>{

			return Models.name.findById(id)
			.then((Route1)=>{
				if (!Route1) return Reject('Non-existent Route1');
				return Route1;
			})
			.then( data => Resolve(data) )
			.catch( Err => Reject(Err) );
		});
	}

	getAll(Route1){
		return new Promise((Resolve,Reject)=>{
			let Wh = {
				// attributes: ['id','Field1','Field2','Field3','Field4'],
				limit: Route1.limit,
				offset: Route1.offset,
			};

			return Models.name.findAndCountAll(Wh)
			.then((Route1)=>{
				if (!Route1) return Reject('Non-existent Route1');

				return Route1;
			})
			.then( data => Resolve(data) )
			.catch( Err => Reject(Err) );
		});
	}

	edit(id,Route1){
		return new Promise((Resolve,Reject)=>{

			return Models.name.findById(id)
			.then((oldRoute1)=>{
				if (!oldRoute1) return Reject('Non-existent Route1');

				/* -- Update Fields --*/
				// if( Route1.Field1 ){
				// 	oldRoute1.Field1 = Route1.Field1;
				// }
				// if( Route1.Field2 ){
				// 	oldRoute1.Field2 = Route1.Field2;
				// }
				// .
				// .
				// .
				// if( Route1.FieldN ){
				// 	oldRoute1.FieldN = Route1.FieldN;
				// }
				/* -- Update Fields --*/

				return oldRoute1.save();
			})
			.then( data => Resolve(data) )
			.catch( Err => Reject(Err) );
		});
	}

	delete({id}){
		return new Promise((Resolve,Reject)=>{
			return Models.name.findById(id)
			.then((condemnedRoute1)=>{
				if (!condemnedRoute1) return Reject('Non-existent Route1');

				return condemnedRoute1.destroy();
			})
			.then( data => Resolve(data) )
			.catch( Err => Reject(Err) );
		});
	}

	// getJoinedModelExample(id,cb){
	// 	return new Promise((Resolve,Reject)=>{

	// 		let Wh = {
	// 			where: {id:id},
	// 			include: [{
	// 				model: Models.related,
	// 				limit: this.limit,
	// 				offset: this.offset,
	// 			}],
	// 		};

	// 		return Models.name.findOne(Wh)
	// 		.then((Route1)=>{
	// 			if(!Route1 || Route1.users.length == 0) return Reject('Non-existent Route1 OR without users');

	// 			return Route1;
	// 		})
	// 		.then( data => Resolve(data) )
	// 		.catch( Err => Reject(Err) );
	// 	});
	// }
}
