const initialState = {
	isLoggedIn: false,
	id: null,
	name: null
};

export default function user (state = initialState, action){
	if(action.type === 'LOGGED_IN'){
		let {id, name} = action.data;
		return {
			isLoggedIn: true,
			id,
			name,
		};
	}
	if(action.type === 'LOGGED_OUT'){
		return initialState;
	}
}