let currency = 0;
let clickValue = 1;
let autoBotActive = false;
let energy = 1000; // Начальная энергия
const maxEnergy = 1000;
let upgradeClickPrice = 1000;
let upgradeAutoBotPrice = 5000;
let telegramUsername = null;
let ratingList = [];

// Обработчик клика по монете
document.getElementById("clickButton").addEventListener("click", (event) => {
    if (energy > 0) {
        currency += clickValue;
        document.getElementById("currency").textContent = Math.floor(currency);
        energy--;
        updateEnergyBar();

        // Создаем и анимируем плавающий текст
        const floatText = document.createElement('div');
        floatText.className = 'float-text';
        floatText.textContent = `+${clickValue}`;
        floatText.style.top = `${event.clientY - 20}px`;
        floatText.style.left = `${event.clientX}px`;
        document.body.appendChild(floatText);

        // Удаляем плавающий текст после анимации
        setTimeout(() => {
            floatText.remove();
        }, 1000);
    }
});

// Открытие магазина
document.getElementById("openShopButton").addEventListener("click", () => {
    document.getElementById("shop").style.display = "block";
});

// Закрытие магазина
document.getElementById("closeShopButton").addEventListener("click", () => {
    document.getElementById("shop").style.display = "none";
});

// Покупка апгрейда клика
document.getElementById("buyUpgradeButton").addEventListener("click", () => {
    if (currency >= upgradeClickPrice) {
        currency -= upgradeClickPrice;
        clickValue += 1;
        upgradeClickPrice *= 2;
        document.getElementById("currency").textContent = Math.floor(currency);
        document.getElementById("buyUpgradeButton").textContent = `Buy Upgrade (${upgradeClickPrice} Currency)`;
        showNotification("Upgrade purchased!");
    } else {
        showNotification("Not enough currency!");
    }
});

// Покупка автобота
document.getElementById("buyAutoBotButton").addEventListener("click", () => {
    if (currency >= upgradeAutoBotPrice && !autoBotActive) {
        currency -= upgradeAutoBotPrice;
        autoBotActive = true;
        upgradeAutoBotPrice *= 2;
        document.getElementById("currency").textContent = Math.floor(currency);
        document.getElementById("buyAutoBotButton").textContent = `Buy Auto Bot (${upgradeAutoBotPrice} Currency)`;
        showNotification("Auto Bot purchased!");
        startAutoBot();
    } else if (autoBotActive) {
        showNotification("Auto Bot already active!");
    } else {
        showNotification("Not enough currency!");
    }
});

// Открытие рейтинга
document.getElementById("ratingButton").addEventListener("click", () => {
    showRatingOverlay();
});

// Открытие заработка
document.getElementById("earnButton").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "flex";
});

// Открытие друзей
document.getElementById("friendsButton").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "flex";
});

// Открытие настроек
document.getElementById("settingsButton").addEventListener("click", () => {
    document.getElementById("settingsOverlay").style.display = "flex";
});

// Закрытие оверлеев
document.querySelectorAll(".close-button").forEach(button => {
    button.addEventListener("click", () => {
        button.parentElement.style.display = "none";
    });
});

// Обновление энергии
function updateEnergyBar() {
    const energyBar = document.getElementById("energy");
    const energyPercentage = (energy / maxEnergy) * 100;
    energyBar.style.width = `${energyPercentage}%`;

    if (energy <= 0) {
        document.getElementById("clickButton").style.visibility = 'hidden';
    } else {
        document.getElementById("clickButton").style.visibility = 'visible';
    }
}

// Восстановление энергии
function regenerateEnergy() {
    if (energy < maxEnergy) {
        energy++;
        updateEnergyBar();
    }
}

// Интервал восстановления энергии
setInterval(regenerateEnergy, 900);

// Запуск автобота
function startAutoBot() {
    setInterval(() => {
        if (autoBotActive) {
            currency += clickValue;
            document.getElementById("currency").textContent = Math.floor(currency);
            // Автобот не тратит энергию
        }
    }, 1000);
}

// Показ уведомлений
function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Показ рейтингового оверлея
function showRatingOverlay() {
    const overlay = document.getElementById("ratingOverlay");
    const ratingListElement = document.getElementById("ratingList");
    ratingListElement.innerHTML = '';

    ratingList.sort((a, b) => b.currency - a.currency);

    ratingList.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${entry.username} - ${entry.currency} Currency`;
        ratingListElement.appendChild(listItem);
    });

    overlay.style.display = 'flex';
}

// Сохранение в облако Telegram
document.getElementById("saveToTelegramButton").addEventListener("click", () => {
    if (telegramUsername) {
        // Здесь должна быть логика сохранения данных в облако Telegram
        showNotification("Currency saved to Telegram!");
    } else {
        showNotification("Please link your Telegram account in settings!");
    }
});

// Привязка аккаунта Telegram
document.getElementById("linkTelegramButton").addEventListener("click", () => {
    const usernameInput = document.getElementById("telegramUsernameInput");
    if (usernameInput.value.trim() !== "") {
        telegramUsername = usernameInput.value.trim();
        showNotification(`Linked to Telegram account: ${telegramUsername}`);
    } else {
        showNotification("Please enter a valid Telegram username!");
    }
});