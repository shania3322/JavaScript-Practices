// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

//----------------code for creating a database-------------
let db;

const openRequest = window.indexedDB.open('note_db', 1);

openRequest.addEventListener('error', ()=> console.error('Database failed to open'));

openRequest.addEventListener('success', ()=> {
	console.log('Database opened successfully');
	db = openRequest.result;
	displayData();
});

openRequest.addEventListener('upgradeneeded', e=> {
	//e.target.result == openRequest.result.
	//we use e.target.result since upgradeneeded event handler runs before success event handler
	db = e.target.result;

	//create a table
	const objectStore = db.createObjectStore(
		'notes_os',
		{ keyPath: 'id', autoIncrement:true }
	);

	objectStore.createIndex('title', 'title', { unique: false });
	objectStore.createIndex('body', 'body', { unique: false });

	console.log('Database setup completed');
});


//--------------code for adding data to database----------------------
//add notes to form and submit
form.addEventListener('submit', addData);

function addData(e) {
	e.preventDefault();

	const newItem = {
		title: titleInput.value,
		body: bodyInput.value
	};

	// open a transaction with read and write authentation?
	const transaction = db.transaction(['notes_os'], 'readwrite');

	// Access the object store
	const objectStore = transaction.objectStore('notes_os');

	// Add a new item
	const addRequest = objectStore.add(newItem);

	// clear title and body after being successfully added to database
	addRequest.addEventListener('success', ()=> {
		titleInput.value = '';
		bodyInput.value = '';
	});

	// handling transaction after data has been added
	transaction.addEventListener('complete', ()=> {
		console.log('Transanction completed.');
		displayData();
	});
	transaction.addEventListener('error', () => console.log('Transanction not opened due to error'));
}

function displayData() {
	while(list.firstChild) {
		list.removeChild(list.firstChild);
	}

	const objectStore = db.transaction('notes_os').objectStore('notes_os');

	// openCursor() method returns a construct that can be used to iterate over
	// the records in an object store
	objectStore.openCursor().addEventListener('success', e => {
		const cursor = e.target.result; // get a reference to the cursor (an IDBCursor)

		if(cursor) {
			const listItem = document.createElement('li');
			const h3 = document.createElement('h3');
			const para = document.createElement('p');

			listItem.appendChild(h3);
			listItem.appendChild(para);
			list.appendChild(listItem);

			h3.textContent = cursor.value.title;
			para.textContent = cursor.value.body;

			listItem.setAttribute('data-note-id', cursor.value.id);

			const deleteBtn = document.createElement('button');
			listItem.appendChild(deleteBtn);
			deleteBtn.textContent = 'Delete';

			deleteBtn.addEventListener('click', deleteItem);

			//Iterate to the next item in the cursor. If no more records, cursor
			//returns undefined
			cursor.continue();
		} else {
			// if list is emtpy
			if (!list.firstChild) {
				const listItem = document.createElement('li');
				listItem.textContent = 'No notes stored.'
				list.appendChild(listItem);
			}

			// if not more cursor items to iterate through
			console.log('Notes all displayed');
		}
	});
}

function deleteItem(e) {
	const noteId = Number(e.target.parentNode.getAttribute('data-note-id'));

	const transaction = db.transaction(['notes_os'], 'readwrite');
	const objectStore = transaction.objectStore('notes_os');
	const deleteRquest = objectStore.delete(noteId);

	transaction.addEventListener('complete', ()=> {
		e.target.parentNode.parentNode.removeChild(e.target.parentNode);
		console.log(`Node ${noteId} deleted.`);

		if (!list.firstChild) {
			const listItem = document.createElement('li');
			listItem.textContent = 'No notes';
			list.appendChild(listItem);
		}
	});
}
