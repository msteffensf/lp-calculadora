const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');

heightInput.addEventListener('input', function () {
    let value = this.value;

    // Remove tudo que não for número
    value = value.replace(/[^0-9]/g, '');

    // Insere automaticamente a vírgula após o primeiro número
    if (value.length >= 2) {
        value = value.substring(0, 1) + ',' + value.substring(1);
    }

    // Limita a 4 caracteres
    if (value.length > 4) {
        value = value.substring(0, 4);
    }

    this.value = value;
});

weightInput.addEventListener('input', function () {
    let value = this.value;

    // Remove tudo que não for número
    value = value.replace(/[^0-9]/g, '');

    // Insere automaticamente a vírgula antes dos dois últimos dígitos
    if (value.length >= 3) {
        value = value.slice(0, -2) + ',' + value.slice(-2);
    }

    // Limita a 6 caracteres (999,99)
    if (value.length > 6) {
        value = value.substring(0, 6);
    }

    this.value = value;
});

const form = document.getElementById('form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let weight = weightInput.value;
    let height = heightInput.value;

    // Converte vírgulas para pontos para cálculos
    weight = weight.replace(',', '.');
    height = height.replace(',', '.');

    if (height.length !== 4) {
        alert('A altura deve estar no formato correto (ex: 1,72)');
        return;
    }

    if (weight.length < 4 || parseFloat(weight) > 999.99) {
        alert('O peso deve estar no formato correto (ex: 75,50) e não pode ultrapassar 999,99');
        return;
    }

    const bmi = (weight / (height * height)).toFixed(2);

    const value = document.getElementById('value');
    let description = '';

    value.classList.add('attention');
    document.getElementById('infos').classList.remove('hidden');

    if (bmi < 18.5) {
        description = 'Cuidado! Você está abaixo do peso!';
    } else if (bmi >= 18.5 && bmi <= 25) {
        description = "Você está no peso ideal!";
        value.classList.remove('attention');
        value.classList.add('normal');
    } else if (bmi > 25 && bmi <= 30) {
        description = "Cuidado, você está com sobrepeso!";
    } else if (bmi > 30 && bmi <= 35) {
        description = "Cuidado, você está com obesidade moderada!";
    } else if (bmi > 35 && bmi <= 40) {
        description = "Cuidado! Você está com obesidade severa!";
    } else {
        description = "Cuidado! Você está com obesidade mórbida!";
    }

    value.textContent = bmi;
    document.getElementById('descripition').textContent = description;
});
