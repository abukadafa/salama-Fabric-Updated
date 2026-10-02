/**
 * SALAMA Fabrics & Bedding - AI Sales & Customer Support Concierge Chatbot
 * Interactive shopping assistant with catalog search, instant FAQ, and WhatsApp escalation
 */

(function () {
  'use strict';

  // Chatbot State
  const ChatState = {
    isOpen: false,
    hasInteracted: false,
    messages: []
  };

  // Pre-configured FAQ & Knowledge Base
  const FAQ_RESPONSES = [
    {
      keywords: ["pay", "payment", "paystack", "flutterwave", "card", "ussd", "pod", "delivery payment", "cash", "pos"],
      response: `We provide 4 flexible, secure payment options:
<br><br>
• <strong>💳 Paystack Online:</strong> Instant card payment (Mastercard/Visa/Verve), USSD & Apple Pay.<br>
• <strong>🦋 Flutterwave Online:</strong> Debit cards, bank transfers & mobile money.<br>
• <strong>🏛️ Direct Bank Transfer:</strong> Transfer directly to our GTBank account & share receipt on WhatsApp.<br>
• <strong>🚚 Payment on Delivery (POD):</strong> Inspect your luxury fabrics upon arrival and pay via Cash or POS to the rider!`,
      chips: ["View Bedding", "View Fabrics", "Chat on WhatsApp"]
    },
    {
      keywords: ["deliver", "shipping", "dispatch", "lagos", "abuja", "kano", "port harcourt", "how long", "time", "interstate", "nationwide"],
      response: `🚚 <strong>Nationwide Delivery Across Nigeria:</strong>
<br><br>
• <strong>Lagos, Abuja & Kano:</strong> 24 – 48 Hours Doorstep Delivery.<br>
• <strong>Other States:</strong> 2 – 4 Business Days via priority courier.<br>
• All orders are packed in luxury branded dust bags and pristine gift-ready boxes. Payment on Delivery (POD) is available nationwide!`,
      chips: ["How to Pay", "View Bedding", "Chat on WhatsApp"]
    },
    {
      keywords: ["bedding", "duvet", "sheet", "sheets", "egyptian cotton", "pillows", "mattress", "comfort"],
      isProductCategory: "bedding",
      response: `🛏️ <strong>SALAMA Luxury Bedding Collection:</strong>
<br><br>
We craft premium 1000-thread-count Egyptian cotton sheet sets, plush velvet quilted duvets, and hypoallergenic royal hotel suites. Here are our top featured bedding sets:`,
      chips: ["Guinea Brocades", "Curtains", "Delivery Info"]
    },
    {
      keywords: ["fabric", "fabrics", "brocade", "brocades", "wrapper", "wrappers", "material", "materials", "lace", "laces", "shadda", "damask", "silk", "swiss"],
      isProductCategory: "fabrics",
      response: `🧵 <strong>SALAMA Fabrics & Luxury Textiles:</strong>
<br><br>
Our heritage textiles include 100% Bazin Riche Guinea Brocades, Italian Floral Damasks, Hand-beaded French Laces, and Pure Silk Chiffons. Check out these royal selections:`,
      chips: ["Luxury Bedding", "Curtains", "Custom Tailoring"]
    },
    {
      keywords: ["curtain", "curtains", "drape", "drapery", "blackout", "window", "living room"],
      isProductCategory: "curtains",
      response: `🪟 <strong>SALAMA Drapery & Curtains:</strong>
<br><br>
We craft heavy velvet thermal blackout curtains, French jacquard blackout sets, and sheer gold-embroidered panels. Custom ceiling-to-floor drop lengths can also be tailored for your space!`,
      chips: ["Custom Sizing", "Luxury Bedding", "Chat on WhatsApp"]
    },
    {
      keywords: ["custom", "tailor", "tailoring", "measure", "length", "drop", "size", "yards"],
      response: `✂️ <strong>Custom Sizing & Bespoke Tailoring:</strong>
<br><br>
We offer bespoke sizing for draperies (custom drop lengths) and cut-to-length fabric yards for traditional attire and wrappers.
<br><br>
Click below to connect with our master tailor directly on WhatsApp with your room or body measurements!`,
      chips: ["Chat on WhatsApp", "View Curtains", "View Fabrics"]
    },
    {
      keywords: ["social", "facebook", "instagram", "tiktok", "twitter", "x", "linkedin", "follow"],
      response: `🌟 <strong>Connect With SALAMA on Social Media:</strong>
<br><br>
Follow us for daily fabric arrivals, home styling inspiration, and exclusive VIP catalogues:
<br>
• <strong>Instagram:</strong> @salamafabrics<br>
• <strong>TikTok:</strong> @salamafabrics<br>
• <strong>Facebook:</strong> /salamafabrics<br>
• <strong>X (Twitter):</strong> @salamafabrics<br>
• <strong>LinkedIn:</strong> SALAMA Fabrics & Bedding`,
      chips: ["Shop Catalog", "Chat on WhatsApp"]
    },
    {
      keywords: ["contact", "phone", "call", "whatsapp", "address", "location", "store", "office", "human", "agent", "stylist"],
      response: `📞 <strong>SALAMA Customer Concierge:</strong>
<br><br>
• <strong>WhatsApp & Direct Calls:</strong> <a href="https://wa.me/2348147709019" target="_blank" style="color:var(--gold); font-weight:700;">+234 814 770 9019</a><br>
• <strong>Showroom Fulfillment:</strong> Kano Textile District & Logistics Hubs in Lagos and Abuja.<br>
• <strong>Hours:</strong> Mon – Sat: 8:00 AM – 8:00 PM (WAT)`,
      chips: ["Chat on WhatsApp", "How to Pay", "Delivery Info"]
    }
  ];

  // Initialize Chatbot when DOM is ready
  document.addEventListener("DOMContentLoaded", () => {
    buildChatbotMarkup();
    bindChatbotEvents();
  });

  function buildChatbotMarkup() {
    // 1. Floating Launcher Button
    const launcher = document.createElement("button");
    launcher.id = "salama-chat-launcher";
    launcher.className = "salama-chat-launcher";
    launcher.setAttribute("aria-label", "Open SALAMA AI Concierge Chatbot");
    launcher.innerHTML = `
      <div class="launcher-bubble">
        <span class="launcher-icon">💬</span>
        <span class="launcher-label">Chat with Concierge</span>
      </div>
      <span class="launcher-pulse"></span>
      <span class="launcher-badge">1</span>
    `;
    document.body.appendChild(launcher);

    // 2. Chat Window Container
    const chatContainer = document.createElement("div");
    chatContainer.id = "salama-chat-window";
    chatContainer.className = "salama-chat-window";
    chatContainer.setAttribute("role", "dialog");
    chatContainer.setAttribute("aria-label", "SALAMA Concierge Chat Window");
    chatContainer.innerHTML = `
      <div class="chat-header">
        <div class="chat-header-brand">
          <img src="assets/logo.svg" alt="SALAMA Logo" class="chat-logo" onerror="this.style.display='none'">
          <div>
            <h4 class="chat-title">SALAMA Concierge</h4>
            <span class="chat-status"><span class="status-dot"></span> Online • Instant Answers</span>
          </div>
        </div>
        <div class="chat-header-actions">
          <a href="https://wa.me/2348147709019?text=Hello%20SALAMA%20Team%2C%20I%20am%20chatting%20with%20your%20assistant%20and%20would%20like%20to%20speak%20with%20a%20stylist." 
             target="_blank" rel="noopener" class="chat-header-wa-btn" title="Speak to Human on WhatsApp">
            💬
          </a>
          <button type="button" class="chat-close-btn" id="salama-chat-close" aria-label="Close Chat">✕</button>
        </div>
      </div>

      <div class="chat-body" id="salama-chat-messages">
        <!-- Messages will be injected here -->
      </div>

      <div class="chat-quick-chips" id="salama-chat-chips">
        <button type="button" class="quick-chip" data-query="Luxury Bedding">🛏️ Bedding</button>
        <button type="button" class="quick-chip" data-query="Fabrics & Brocades">🧵 Fabrics &amp; Laces</button>
        <button type="button" class="quick-chip" data-query="Curtains">🪟 Curtains</button>
        <button type="button" class="quick-chip" data-query="Payment Options">💳 How to Pay</button>
        <button type="button" class="quick-chip" data-query="Nationwide Delivery">🚚 Delivery Info</button>
        <button type="button" class="quick-chip" data-query="Contact Stylist">💬 Human Stylist</button>
      </div>

      <form class="chat-footer" id="salama-chat-form">
        <input type="text" id="salama-chat-input" class="chat-input" placeholder="Ask about fabrics, prices, delivery..." autocomplete="off">
        <button type="submit" class="chat-send-btn" aria-label="Send message">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </form>
    `;
    document.body.appendChild(chatContainer);

    // Initial greeting
    setTimeout(() => {
      addAssistantMessage(
        `Welcome to <strong>SALAMA Fabrics & Bedding</strong>! ✨<br><br>` +
        `I am your 24/7 AI Luxury Concierge. How may I assist you with your home decor or wardrobe today?<br>` +
        `Feel free to choose a topic below or type your inquiry!`
      );
    }, 400);
  }

  function bindChatbotEvents() {
    const launcher = document.getElementById("salama-chat-launcher");
    const closeBtn = document.getElementById("salama-chat-close");
    const form = document.getElementById("salama-chat-form");
    const chipsContainer = document.getElementById("salama-chat-chips");

    if (launcher) {
      launcher.addEventListener("click", () => toggleChat(true));
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => toggleChat(false));
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("salama-chat-input");
        const query = input.value.trim();
        if (!query) return;
        input.value = "";
        handleUserQuery(query);
      });
    }

    if (chipsContainer) {
      chipsContainer.addEventListener("click", (e) => {
        const chip = e.target.closest(".quick-chip");
        if (chip) {
          const q = chip.dataset.query || chip.textContent.trim();
          handleUserQuery(q);
        }
      });
    }
  }

  function toggleChat(open) {
    ChatState.isOpen = (open !== undefined) ? open : !ChatState.isOpen;
    const win = document.getElementById("salama-chat-window");
    const launcher = document.getElementById("salama-chat-launcher");

    if (win) {
      win.classList.toggle("open", ChatState.isOpen);
    }
    if (launcher) {
      launcher.classList.toggle("active", ChatState.isOpen);
      // Remove badge when opened
      if (ChatState.isOpen) {
        const badge = launcher.querySelector(".launcher-badge");
        if (badge) badge.style.display = "none";
        const input = document.getElementById("salama-chat-input");
        if (input) setTimeout(() => input.focus(), 300);
      }
    }
  }

  function handleUserQuery(query) {
    addUserMessage(query);
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      processBotResponse(query);
    }, 600);
  }

  function processBotResponse(query) {
    const qLower = query.toLowerCase().trim();

    // Check FAQ & Intent matching
    let matchedFaq = FAQ_RESPONSES.find(item => 
      item.keywords.some(kw => qLower.includes(kw))
    );

    if (matchedFaq) {
      // If FAQ targets a product category, show category message + product preview cards
      if (matchedFaq.isProductCategory && typeof PRODUCTS !== "undefined") {
        const productsInCat = PRODUCTS.filter(p => p.category === matchedFaq.isProductCategory).slice(0, 3);
        addAssistantMessage(matchedFaq.response, productsInCat, matchedFaq.chips);
      } else {
        addAssistantMessage(matchedFaq.response, null, matchedFaq.chips);
      }
      return;
    }

    // Direct search in PRODUCTS
    if (typeof PRODUCTS !== "undefined") {
      const matchedProducts = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(qLower) ||
        p.description.toLowerCase().includes(qLower) ||
        p.categoryName.toLowerCase().includes(qLower)
      ).slice(0, 3);

      if (matchedProducts.length > 0) {
        addAssistantMessage(
          `Here are matching luxury items from our collection for "<strong>${escapeHtml(query)}</strong>":`,
          matchedProducts,
          ["How to Pay", "Delivery Info", "Chat on WhatsApp"]
        );
        return;
      }
    }

    // Fallback general assistance
    addAssistantMessage(
      `Thank you for reaching out! We specialize in 1000TC Egyptian cotton bedding, heavyweight Guinea brocades, Italian damask, and luxury velvet draperies.<br><br>` +
      `You can also chat directly with our head stylist on WhatsApp for custom orders or bespoke sizing.`,
      null,
      ["View Bedding", "View Fabrics", "Chat on WhatsApp"]
    );
  }

  function addUserMessage(text) {
    const messages = document.getElementById("salama-chat-messages");
    if (!messages) return;

    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-msg user-msg";
    msgDiv.innerHTML = `
      <div class="msg-bubble">${escapeHtml(text)}</div>
    `;
    messages.appendChild(msgDiv);
    scrollMessagesToBottom();
  }

  function addAssistantMessage(htmlContent, productList = null, chips = null) {
    const messages = document.getElementById("salama-chat-messages");
    if (!messages) return;

    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-msg bot-msg";

    let productsHtml = "";
    if (productList && productList.length > 0) {
      productsHtml = `
        <div class="chat-product-cards">
          ${productList.map(p => `
            <div class="chat-prod-card" onclick="openProductFromChat('${p.id}')">
              <img src="${p.image}" alt="${p.name}" class="chat-prod-thumb" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE || ''}';">
              <div class="chat-prod-info">
                <span class="chat-prod-title">${p.name}</span>
                <span class="chat-prod-price">${typeof formatNaira === 'function' ? formatNaira(p.price) : '₦' + p.price.toLocaleString()}</span>
                <button type="button" class="chat-prod-btn">View Item &rarr;</button>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    }

    let chipsHtml = "";
    if (chips && chips.length > 0) {
      chipsHtml = `
        <div class="chat-msg-chips">
          ${chips.map(c => `
            <button type="button" class="msg-chip" onclick="handleChipClick('${c}')">${c}</button>
          `).join("")}
        </div>
      `;
    }

    msgDiv.innerHTML = `
      <div class="bot-avatar">✨</div>
      <div class="bot-msg-content">
        <div class="msg-bubble">${htmlContent}</div>
        ${productsHtml}
        ${chipsHtml}
      </div>
    `;

    messages.appendChild(msgDiv);
    scrollMessagesToBottom();
  }

  function showTypingIndicator() {
    const messages = document.getElementById("salama-chat-messages");
    if (!messages) return;

    removeTypingIndicator();

    const indicator = document.createElement("div");
    indicator.id = "chat-typing-indicator";
    indicator.className = "chat-msg bot-msg typing";
    indicator.innerHTML = `
      <div class="bot-avatar">✨</div>
      <div class="msg-bubble typing-bubble">
        <span></span><span></span><span></span>
      </div>
    `;
    messages.appendChild(indicator);
    scrollMessagesToBottom();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById("chat-typing-indicator");
    if (indicator) indicator.remove();
  }

  function scrollMessagesToBottom() {
    const messages = document.getElementById("salama-chat-messages");
    if (messages) {
      messages.scrollTop = messages.scrollHeight;
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Global handlers accessible by onclick attributes
  window.openProductFromChat = function(productId) {
    if (typeof openQuickView === "function") {
      openQuickView(productId);
    }
  };

  window.handleChipClick = function(query) {
    if (query === "Chat on WhatsApp") {
      window.open("https://wa.me/2348147709019?text=Hello%20SALAMA%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20products.", "_blank");
      return;
    }
    handleUserQuery(query);
  };

  window.toggleSalamaChat = toggleChat;

})();
