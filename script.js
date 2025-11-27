document.getElementById("checkBtn").addEventListener("click", function() {
    const message = document.getElementById("messageInput").value.toLowerCase();

    // Spam keywords
    const spamWords = [
        "win money", "free", "prize", "click here", "urgent",
        "lottery", "congratulations", "claim now", "money",
        "offer", "limited time", "discount", "guaranteed",
        "double your", "risk-free"
    ];

    let detectedWords = [];

    // find which words exist in the message
    spamWords.forEach(word => {
        if (message.includes(word)) {
            detectedWords.push(word);
        }
    });

    const resultBox = document.getElementById("result");

    if (detectedWords.length > 0) {
        // spam score: number of words detected / total words
        let score = Math.round((detectedWords.length / spamWords.length) * 100);

        resultBox.innerHTML = `
            <p><strong>🚨 SPAM DETECTED</strong></p>
            <p>Spam Score: <strong>${score}%</strong></p>
            <p>Detected Words:</p>
            <ul>${detectedWords.map(w => `<li>${w}</li>`).join("")}</ul>
        `;
        resultBox.style.color = "red";

    } else {
        resultBox.innerHTML = `
            <strong>✅ Not Spam</strong>
        `;
        resultBox.style.color = "green";
    }
});
