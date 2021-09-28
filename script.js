let posts = document.getElementById('posts');
let ulCr = document.createElement('ul');
let button = document.getElementById('addPost');
let postForm = document.forms.postData;
let nameInput = postForm.elements.title;
let authorInput = postForm.elements.author;

button.addEventListener('click', function decorator(e) {
  e.preventDefault();
  newPost = {
    "title": nameInput.value,
    "author": authorInput.value
  };
  saveJSON('http://localhost:3000/posts', JSON.stringify(newPost)).then(function (data) {

    let li = document.createElement('li');
    li.innerHTML = `title: ${newPost.title} of author:${newPost.author}`;

    ulCr.append(li);
    console.log('Success ', data);
    postForm.reset();

  }, function (status) {
    console.log('wrong', status);
  });
});

let getJSON = function (url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();

    xhr.open('get', url, true);

    xhr.responseType = 'json';

    xhr.onload = function () {
      let status = xhr.status;

      if (status === 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};

getJSON('http://localhost:3000/posts').then(function (data) {
  console.log(data)
  ulCr.innerHTML = data.map((post) => {
    let li = `<li>title: ${post.title} of author: ${post.author}</li>`;
    console.log(li)
    return li;
  }).join('');

  posts.appendChild(ulCr);

  console.log('Success ', data);
}, function (status) {
  console.log('wrong.', status);

});

function saveJSON(url, data) {
  console.log(nameInput.value + 'author ' + authorInput.value);
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();

    xhr.open('post', url, true);
    xhr.setRequestHeader(
      'Content-type', 'application/json; charset=utf-8'
    );

    xhr.responseType = 'json';

    xhr.onload = function () {
      let status = xhr.status;

      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject("Error " + url);
    };
    xhr.send(data);
  });
};
