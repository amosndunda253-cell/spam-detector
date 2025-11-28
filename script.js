const spamKeywords = [
    'free', 'winner', 'congratulations', 'prize', 'cash', 'lottery', 'money',
    'claim', 'urgent', 'limited', 'offer', 'discount', 'guaranteed', 'win',
    'selected', 'exclusive', 'deal', 'bonus', 'income', 'earn', 'profit',
    'investment', 'opportunity', 'risk-free', 'miracle', 'secret', 'method',
    'subscription', 'trial', 'membership', 'activation', 'verification',
    'account', 'password', 'security', 'update', 'suspended', 'verify',
    'click here', 'link', 'website', 'visit', 'call now', 'text back',
    'reply', 'message', 'unsubscribe', 'remove', 'stop', 'cancel',
    'viagra', 'cialis', 'medication', 'prescription', 'drugs', 'weight loss',
    'diet', 'supplement', 'faster', 'bigger', 'enhancement', 'work from home',
    'job offer', 'employment', 'position', 'salary', 'hiring', 'recruitment',
    'inheritance', 'funds', 'transfer', 'payment', 'refund', 'million',
    'billion', 'dollars', 'euros', 'pounds', 'rich', 'wealthy', 'luxury',
    'casino', 'betting', 'gambling', 'poker', 'roulette', 'lottery ticket',
    'credit card', 'loan', 'mortgage', 'debt', 'bank', 'financial',
    'nigerian prince', 'foreign business', 'partner', 'opportunity',
    'lottery commission', 'bank of england', 'paypal', 'ebay', 'amazon'
];

document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('messageInput');
    const checkBtn = document.getElementById('checkBtn');
    const resultDiv = document.getElementById('result');
    const charCount = document.getElementById('charCount');
    
    // Update character count
    messageInput.addEventListener('input', function() {
        const length = this.value.length;
        charCount.textContent = `${length} characters`;
    });
    
    checkBtn.addEventListener('click', function() {
        const message = messageInput.value.toLowerCase().trim();
        
        if (!message) {
            showResult('Please enter a message to check.', 'error');
            return;
        }
        
        const detectedWords = detectSpamWords(message);
        const spamScore = calculateSpamScore(detectedWords, message);
        displayResults(detectedWords, spamScore, message);
    });
    
    function detectSpamWords(message) {
        return spamKeywords.filter(keyword => 
            message.includes(keyword.toLowerCase())
        );
    }
    
    function calculateSpamScore(detectedWords, message) {
        if (detectedWords.length === 0) return 0;
        
        const wordCount = message.split(/\s+/).length;
        const spamWordCount = detectedWords.length;
        const spamRatio = (spamWordCount / wordCount) * 100;
        
        // Base score on number of spam words and their ratio
        let score = Math.min((spamWordCount * 10) + (spamRatio * 0.5), 100);
        
        // Bonus points for multiple spam words
        if (spamWordCount >= 3) score += 15;
        if (spamWordCount >= 5) score += 20;
        
        return Math.min(Math.round(score), 100);
    }
    
    function displayResults(detectedWords, spamScore, message) {
        const wordCount = message.split(/\s+/).length;
        
        let scoreClass = 'score-low';
        let status = 'Not Spam';
        
        if (spamScore >= 70) {
            scoreClass = 'score-high';
            status = 'High Risk Spam';
        } else if (spamScore >= 30) {
            scoreClass = 'score-medium';
            status = 'Potential Spam';
        }
        
        resultDiv.innerHTML = `
            <div class="result-container">
                <div class="result-title">Detection Results</div>
                
                <div class="spam-score ${scoreClass}">
                    ${spamScore}% - ${status}
                </div>
                
                <div class="stats">
                    <div class="stat-item">
                        <div class="stat-value">${detectedWords.length}</div>
                        <div class="stat-label">Spam Words Found</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${wordCount}</div>
                        <div class="stat-label">Total Words</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${spamKeywords.length}</div>
                        <div class="stat-label">Keywords in Database</div>
                    </div>
                </div>
                
                ${detectedWords.length > 0 ? `
                    <div class="detected-words">
                        <strong>Detected Spam Words:</strong>
                        <div class="words-list">
                            ${detectedWords.map(word => 
                                `<span class="spam-word">${word}</span>`
                            ).join('')}
                        </div>
                    </div>
                ` : `
                    <div style="text-align: center; color: #28a745; font-weight: 600; margin-top: 20px;">
                        ✅ No spam words detected. Your message looks clean!
                    </div>
                `}
            </div>
        `;
        
        resultDiv.classList.remove('hidden');
    }
    
    function showResult(message, type) {
        resultDiv.innerHTML = `
            <div class="result-container" style="text-align: center; color: ${
                type === 'error' ? '#dc3545' : '#666'
            };">
                ${message}
            </div>
        `;
        resultDiv.classList.remove('hidden');
    }
});