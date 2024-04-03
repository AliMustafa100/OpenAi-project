// Define form elements for interaction
const metaForm = document.querySelector('.meta-form');
const imageForm = document.querySelector('.image-form');

// Define output elements to display results
const description = document.querySelector('.description p');
const tags = document.querySelector('.tags p');
const thumbnail = document.querySelector('.thumbnail img');

// Add an event listener to the metadata form for submission
metaForm.addEventListener('submit', async (e) => {
  e.preventDefault();  

  // Perform a POST request to send the title to the backend
  const response = await fetch('/openai/meta', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: metaForm.title.value })
  });
  const data = await response.json(); 
  console.log('Received data:', data);


  // Update the text content of the description and tags with the received data
  description.textContent = data.description.textContent;
  tags.textContent = data.tags.content;
});

// Add an event listener to the image form for submission
// Add an event listener to the image form for submission
imageForm.addEventListener('submit', async (e) => {
    e.preventDefault();  
  
    // Perform a POST request to send the prompt to the backend
    const response = await fetch('/openai/image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: imageForm.prompt.value })
    });
    
    const data = await response.json();
  
    // Check if the data array is not empty and set the image source attribute to the first URL received from the server
    if (data.data && data.data.length > 0) {
      thumbnail.setAttribute('src', data.data[0].url);
    } else {
      console.log('No image URL returned from the server');
    }
  });
  
