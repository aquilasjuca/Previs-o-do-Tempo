const main = document.querySelector('.div-main');
const pesquisar = document.querySelector('.pesquisar button');
const clima = document.querySelector('.clima');
const dados = document.querySelector('.clima-dados');
const erro = document.querySelector('.erro');

pesquisar.addEventListener('click', () => {

    const APIKey = '8529b8d83a7ae817786378d2f3e3c0b1';
    const cidade = document.querySelector('.pesquisar input').value;

    if (cidade === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {

        if (json.cod === '404') {
            main.style.height = '400px';
            clima.style.display = 'none';
            dados.style.display = 'none';
            erro.style.display = 'block';
            erro.classList.add('fadeIn');
            return;
        }

        erro.style.display = 'none';
        erro.classList.remove('fadeIn');

        const imagem = document.querySelector('.clima img');
        const temperatura = document.querySelector('.clima .temperatura');
        const descricao = document.querySelector('.clima .descricao');
        const humidade = document.querySelector('.clima-dados .humidade span');
        const vento = document.querySelector('.clima-dados .vento span');
        const cityLink = document.querySelector('.city-link');
        cityLink.href = `https://openweathermap.org/city/${json.id}`;
        cityLink.textContent = "Mais Informações";

        switch (json.weather[0].main) {
            case 'Clear':
                imagem.src = './img/clear.png';
                break;

            case 'Rain':
                imagem.src = './img/rain.png';
                break;

            case 'Snow':
                imagem.src = './img/snow.png';
                break;

            case 'Clouds':
                imagem.src = './img/cloud.png';
                break;

            case 'Haze':
                imagem.src = './img/mist.png';
                break;

            default:
                imagem.src = '';
        }

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        descricao.innerHTML = `${json.weather[0].description}`;
        humidade.innerHTML = `${json.main.humidity}%`;
        vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        clima.style.display = '';
        dados.style.display = '';
        clima.classList.add('fadeIn');
        dados.classList.add('fadeIn');
        main.style.height = '590px';
    });
});