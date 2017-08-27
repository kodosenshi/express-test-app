function handleBodyClick(e) {
  // if the delete button clicked
  if (event.target.getAttribute('data-action') === 'delete') {
    const id = event.target.getAttribute('data-id');
    deleteArticleById(id, event.target.parentElement)
  }
}

// we're not handling errors in this test
function deleteArticleById(id, elem) {
  elem.classList.add('fade');

  // we could use css animation instead!!
  // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations
  setTimeout(function(){
    fetch ('/articles/'+id, { method: 'DELETE' }).then(function() {
      elem.parentElement.removeChild(elem);
    });
  }, 300);
}

function uploadFile(file, signedRequest, url){
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        document.getElementById('preview').src = url;
        document.querySelector('[name=url]').value = url;
      }
      else{
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(file);
}

function getSignedRequest(file){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        const response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
      }
      else{
        alert('Could not get signed URL.');
      }
    }
  };
  xhr.send();
}

function handleFileChanges(e) {
  const files = e.target.files;
  const file = files[0];
  if(file == null){
    return alert('No file selected.');
  }
  getSignedRequest(file);
}

document.addEventListener('DOMContentLoaded', function() {
  const imageField = document.querySelector('[name=image]');
  document.body.addEventListener('click', handleBodyClick);

  if (imageField) {
    imageField.addEventListener('change', handleFileChanges);
  }
})