function calculateEarnings() {
    const views = parseInt(document.getElementById('views').value);
    const cpm = parseFloat(document.getElementById('cpm').value);
    const currency = document.getElementById('currency').value;

    let earnings = (views / 1000) * cpm;
    let currencySymbol;
    
    switch (currency) {
        case 'usd':
            currencySymbol = '$';
            break;
        case 'try':
            currencySymbol = '₺';
            break;
        case 'azn':
            currencySymbol = '₼';
            break;
    }

    // Hesaplanan kazancı göster
    document.getElementById('earningsResult').innerText = `Tahmini Kazanç: ${currencySymbol}${earnings.toFixed(2)}`;

    // Dönüştürülmüş kazançları hesapla
    const usdToTry = 27.0; // 1 Dolar = 27 TL
    const usdToAzn = 1.7; // 1 Dolar = 1.7 Manat
    const tryToUsd = 1 / usdToTry; // 1 TL = 1/27 Dolar
    const tryToAzn = tryToUsd * usdToAzn; // TL'yi Manata dönüştür
    const aznToUsd = 1 / usdToAzn; // 1 Manat = 1/1.7 Dolar
    const aznToTry = 1 / tryToAzn; // 1 Manat = TL

    let convertedEarnings;

    if (currency === 'usd') {
        convertedEarnings = {
            try: earnings * usdToTry,
            azn: earnings * usdToAzn,
        };
    } else if (currency === 'try') {
        convertedEarnings = {
            usd: earnings * tryToUsd,
            azn: earnings * tryToAzn,
        };
    } else if (currency === 'azn') {
        convertedEarnings = {
            usd: earnings * aznToUsd,
            try: earnings * aznToTry,
        };
    }

    // Dönüştürülmüş kazançları göster
    document.getElementById('earningsConverted').style.display = 'block';
    document.getElementById('earningsConverted').innerText = `
        Dönüştürülmüş Kazanç:
        Dolar: $${convertedEarnings.usd ? convertedEarnings.usd.toFixed(2) : 'N/A'} |
        TL: ₺${convertedEarnings.try ? convertedEarnings.try.toFixed(2) : 'N/A'} |
        Manat: ₼${convertedEarnings.azn ? convertedEarnings.azn.toFixed(2) : 'N/A'}
    `;
}

function toggleDetails() {
    const details = document.getElementById('details');
    details.style.display = details.style.display === 'none' ? 'block' : 'none';
}

function toggleSettings() {
    const settingsPanel = document.getElementById('settingsPanel');
    settingsPanel.classList.toggle('active');
}

function closeSettings() {
    const settingsPanel = document.getElementById('settingsPanel');
    settingsPanel.classList.remove('active');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
