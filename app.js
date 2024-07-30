const API_KEY = '';

const submitButton = document.querySelector('#submit');

async function getMessage() {
    console.log('clicked');
    const options = {
        method: 'POST',
        Headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        "body": JSON.stringify({
            "model": "gpt-4o-mini",
            "messages": [{ "role": "user", "content": "What is 2+2?" }],
            max_tokens: 100
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        console.log(data);

        if (data.choices && data.choices.length > 0 && data.choices[0].messages && data.choices[0].messages.length > 0) {
            outPutElement.textContent = data.choices[0].messages[0].content;

            const pElement = document.createElement('p');
            pElement.textContent = inputElement.value;
            pElement.addEventListener('click', () => changeInput(pElement.textContent));
            historyElement.appendChild(pElement);
        }
    } catch (error) {
        console.error(error);
    }
}

submitButton.addEventListener('click', getMessage);

function clearInput() {
    inputElement.value = '';
}
