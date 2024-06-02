let currency = 0;
let clickValue = 1;
let autoBotActive = false;
let energy = 1000; // Начальная энергия
const maxEnergy = 1000;

document.getElementById("clickButton").addEventListener("click", (event) => {
    if (energy > 0) {
        currency += clickValue;
        document.getElementById("currency").textContent = Math.floor(currency);
        energy--;
        updateEnergyBar();

        // Create and animate the floating text
        const floatText = document.createElement('div');
        floatText.className = 'float-text';
        floatText.textContent = `+${clickValue}`;
        floatText.style.top = `${event.clientY - 20}px`;
        floatText.style.left = `${event.clientX}px`;
        document.body.appendChild(floatText);

        // Remove the floating text after animation
        setTimeout(() => {
            floatText.remove();
        }, 1000);
    }
});

document.getElementById("openShopButton").addEventListener("click", () => {
    document.getElementById("shop").style.display = "block";
});

document.getElementById("closeShopButton").addEventListener("click", () => {
    document.getElementById("shop").style.display = "none";
});

document.getElementById("buyUpgradeButton").addEventListener("click", () => {
    if (currency >= 10) {
        currency -= 10;
        clickValue += 1;
        document.getElementById("currency").textContent = Math.floor(currency);
        document.getElementById("notification").textContent = "Upgrade purchased!";
    } else {
        document.getElementById("notification").textContent = "Not enough currency!";
    }
});

document.getElementById("buyAutoBotButton").addEventListener("click", () => {
    if (currency >= 50 && !autoBotActive) {
        currency -= 50;
        autoBotActive = true;
        document.getElementById("currency").textContent = Math.floor(currency);
        document.getElementById("notification").textContent = "Auto Bot purchased!";
        startAutoBot();
    } else if (autoBotActive) {
        document.getElementById("notification").textContent = "Auto Bot already active!";
    } else {
        document.getElementById("notification").textContent = "Not enough currency!";
    }
});

document.getElementById("ratingButton").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "flex";
});

document.getElementById("earnButton").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "flex";
});

document.getElementById("friendsButton").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "flex";
});

function closeOverlay() {
    document.getElementById("overlay").style.display = "none";
}

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

function regenerateEnergy() {
    if (energy < maxEnergy) {
        energy++;
        updateEnergyBar();
    }
}

setInterval(regenerateEnergy, 1300);

function startAutoBot() {
    setInterval(() => {
        if (autoBotActive && energy > 0) {
            currency += clickValue;
            document.getElementById("currency").textContent = Math.floor(currency);
            energy--;
            updateEnergyBar();
        }
    }, 1000);
}