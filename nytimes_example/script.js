// Defining a baseURL and key to as part of the request URL
const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'KoRdkVwwMB6cyt5HhLgF6O6LvxB7oJxy';

searchInput = document.querySelector('.search');
startDate = document.querySelector('.start-date');
endDate = document.querySelector('.end-date');
submitBtn = document.querySelector('.submit');
searchDiv = document.querySelector('.controls');

prevBtn = document.querySelector('.prev');
nextBtn = document.querySelector('.next');
navDiv = document.querySelector('nav');
resultsDiv = document.querySelector('.results');
resultSection = document.querySelector('section');

resultsDiv.style.display = "none";

let pageNumber = 0;

submitBtn.addEventListener('click', (e)=>{
	e.preventDefault();
	// fetch from URL
	getArticles();
})

// assemble URL for query

function getURL() {
	let sURL='';
	if (searchInput.value != '') {
		sURL = `${baseURL}?q=${searchInput.value}&api-key=${key}&fq=document_type:("article")&page=${pageNumber}`;

		if (startDate.value != ''){
			sURL = sURL +`&begin_date=${startDate.value.replace(/\-/g,'')}`;
		};

		if (endDate.value != ''
			&& (Date.parse(endDate.value) >= Date.parse(startDate.value))){
			sURL = sURL + `&end_date=${endDate.value.replace(/\-/g,'')}`;
		}else{
			console.error('End Date is smaller than start date.\
			Please reselect the end date.')
		};
	}else {
		console.error('Search is empty. Please enter search words');
	}

	return sURL;
}

function getArticles() {
	//clear section and re-render it
	while (resultSection.firstChild) {
			resultSection.removeChild(resultSection.firstChild);
		}

	const sURL = getURL();
	console.log(sURL);
	fetch(sURL)
		.then(response => {
			if(!response.ok) {
				throw new Error('Network response was not OK.');
			}
			return response.json();
		})
		.then(data => {
			console.log(data);
			// Do something with data
			displayArticles(data.response);
		})
		.catch(error => {
			console.error('There was a problem with fetch operation:', error);
		})
}


function displayArticles(data) {
	const total = data.meta.hits;
	const offset = data.meta.offset;

	if (total == 0) {
		nav.style.display = "none";
	}
	//display contents on the first page, i.e. page 0. The maximum item on one
	//page is 10
	if ((total != 0) &&(offset<=total)) {
		for (const doc of data.docs){
			const articleDiv = displayDoc(doc);
			resultSection.appendChild(articleDiv);
		}
	} else {
			const h1= document.createElement('h1');
		  h1.textContent = `Found 0 results for \'${searchInput.value}\'`;
			resultSection.appendChild(h1);
	}
	//console.log(resultSection);
	//or "flex" https://www.w3schools.com/jsref/prop_style_display.asp
	resultsDiv.style.display ="block";
	}

function displayDoc(doc) {
	const articleDiv = document.createElement('article');
	const h = document.createElement('h2');
	const para1 = document.createElement('p');
	const para3 = document.createElement('p');
	const img = document.createElement('img');
	//const div2 = document.createElement('div');
	const link = document.createElement('a');
	const para2 = document.createElement('p');
	para2.classList.add('keywords');

	link.href = doc.web_url;
	link.textContent = doc.headline.main;
	if (doc.subsection_name != undefined){
		para1.textContent = `${doc.section_name}-${doc.subsection_name}`;
	}else{
		para1.textContent = `${doc.section_name}`;
	}

	para3.textContent = doc.snippet;

	if (doc.multimedia.length > 0) {
		img.src = `http://www.nytimes.com/${doc.multimedia[0].url}`;
		img.alt = doc.headline.main;
	}

	articleDiv.appendChild(h);
	h.appendChild(link);
	articleDiv.appendChild(img);
	articleDiv.appendChild(para1);
	articleDiv.appendChild(para3);

	if (doc.keywords.length > 0) {
		for (let i=0;i<3;i++) {
			el = document.createElement('span');
			el.textContent = doc.keywords[i].value;
			para2.appendChild(el);
		}
		articleDiv.appendChild(para2);
	}
	return articleDiv;
}


// Add actions for next page button and previous page button
nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', previousPage);

function nextPage() {
	pageNumber++;
	getArticles();
}

function previousPage() {
	if (pageNumber >0){
		pageNumber--;
	}else {
		return;
	}

	getArticles();
}
