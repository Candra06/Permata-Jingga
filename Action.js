export function Action(type, userData){
	let BaseURL = 'http://webbeta.wargaku.id/api?apikey=45a0c8263930d5989a66a68035efbdab&';
 //let BaseURL = 'http://localhost/PHP-Slim-Restful/api/';
 return new Promise((resolve, reject) =>{
	fetch(BaseURL+type, {
		method: 'POST',
		body: JSON.stringify(userData)
	})
	/*.then((response) => response.json())*/
	.then((res) => {
		resolve(res);
	})
	.catch((error) => {
		reject(error);
	});
	});
}
