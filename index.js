const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({
		headless:false
	});
	const page = await browser.newPage();
	await page.goto('https://www.smogon.com/dex/ss/pokemon/');
	// await page.screenshot({
	// 	path: 'example.png',
	// 	fullPage: true
	// });
	await page.waitForSelector(".DexTable");
	let data = [];

	const getData = async () => {
		let retorno1 = await page.evaluate(() => {
			new Promise((resolve) => {
				let totalHeight = 0;
				let distance = 100;
				let listaPKM = [];
	
				let timer = setInterval(() => {
					
					let scrollHeight = document.body.scrollHeight;
					
					document.querySelectorAll('.PokemonAltRow-name').forEach((i) => {
						listaPKM[i.innerText] = i.innerText;
					})
					
					window.scrollBy(0, distance)
					totalHeight += distance;
					if(totalHeight >= scrollHeight){
						clearInterval(timer);
						resolve(listaPKM);
					}
				}, 100);
			}).then((retorno2) => {
				console.log('-----------2');
				console.log(retorno2);
				console.log('-----------2');
				return retorno2;	
			});
			
		});
		console.log('-----------1');
		console.log(retorno1);
		console.log('-----------1');
		return retorno1;
	}
	data = await getData();
	console.log('-----------0');
	console.log(data);
	console.log('-----------0');

	// await browser.close();
})();