"use strict";

const btn = document.querySelector('button');
const btnXml = document.querySelector('.xml');


const sendData = ( url, data) => {
	return fetch(url, {
		method: 'POST',
		body: data,
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	}).then(datas=>console.log(datas)
	)
		.catch(dataError => console.log("Ошибка", dataError))
		.finally(() => console.log("Операция закончена")
		);
};

const getData = (url) => {
	return fetch(url)
		.then(data => data.json())
		.catch(errorData => console.log(errorData))
		.finally(() => console.log('Сессия завершена')
		);
};

const dataUrl = getData('db.json');


btn.addEventListener('click', (e) => { 
	e.preventDefault();
	dataUrl.then(data => sendData("https://jsonplaceholder.typicode.com/posts",JSON.stringify(data)));
});


btnXml.addEventListener('click', (e) => {
	e.preventDefault();
	dataUrl.then(data => {
		let xhr = new XMLHttpRequest();
	
		 xhr.upload.onprogress = function(event) {
			console.log(`Отправлено ${event.loaded} из ${event.total}`);
		 };
	  
		xhr.onloadend = function () {
			if (xhr.status > 200 || xhr.status < 300) {
				console.log("Успех");
			} else {
				console.log("Ошибка " + this.status);
			}
		};
		xhr.open("POST", "https://jsonplaceholder.typicode.com/posts");
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.send(JSON.stringify(data));
	});
});





