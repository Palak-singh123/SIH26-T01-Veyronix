import { N8N_CONFIG } from '@/config/n8nConfig';
import { defaultItineraries, ItineraryPlan } from '@/data/gisCoordinates';
import { bharatMementos, BharatMemento } from '@/data/mementosData';
import { cityFamousPlacesData } from '@/data/cityFamousPlacesData';
import { allAnnualFestivals } from '@/data/festivalsData';
import { nationalParks } from '@/data/nationalParksData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  agentRole?: string;
  structuredItinerary?: ItineraryPlan;
  suggestedMementos?: BharatMemento[];
  suggestedPrompts?: string[];
  isError?: boolean;
}

/**
 * Intelligent Local Knowledge Fallback for Bharat AI Companion (used only if n8n is completely unreachable)
 */
function generateLocalAIResponse(query: string, languageCode: string): ChatMessage {
  const q = query.toLowerCase().trim();
  const isHi = languageCode === 'hi' || Boolean(query.match(/[\u0900-\u097F]/));

  // 1. Check for specific City / Destination
  for (const [cityKey, collection] of Object.entries(cityFamousPlacesData)) {
    if (q.includes(cityKey) || q.includes(collection.cityName.toLowerCase())) {
      const placesList = collection.places.map((p, idx) => `
📍 **${idx + 1}. ${p.name}** — *${p.tagline}*
   • **Architecture & Era:** ${p.architecturalStyle} (${p.builtYearOrEra})
   • **Highlight:** ${p.mustExperience}
   • **Optimal Time:** ${p.bestVisitingTime}
`).join('');

      const mementosForCity = bharatMementos.filter(
        (m) => m.destination.toLowerCase().includes(collection.cityName.toLowerCase()) || collection.cityName.toLowerCase().includes(m.destination.toLowerCase())
      );

      const text = isHi
        ? `🤖 **भारत AI एजेंट विश्लेषण — गंतव्य: ${collection.cityName}, ${collection.state}**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 **उद्देश्य:** ${collection.tagline}

🏛️ **प्रमुख दर्शनीय स्थल एवं अनुभव:**
${placesList}
✦ **जीवित सांस्कृतिक छाया (Living Cultural Shadow):**
> *${collection.places[0]?.culturalShadowPreview || 'यहाँ की सदियों पुरानी जीवित हस्तशिल्प और मौखिक परंपराएं आज भी जीवंत हैं'}*

💡 **एजेंट प्रो-टिप्स एवं लॉजिस्टिक्स:**
• **अनुशंसित ठहरने का समय:** 2 से 3 दिन
• **खानपान:** आस-पास की ऐतिहासिक गलियों में स्थानीय कारीगरों द्वारा तैयार पारंपरिक व्यंजनों का आनंद लें`
        : `🤖 **Bharat AI Agent Intelligence Report — Destination: ${collection.cityName}, ${collection.state}**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 **Strategic Assessment:** *${collection.tagline}*

🏛️ **Curated Landmark Dossier:**
${placesList}
✦ **Living Cultural Shadow Insight:**
> *${collection.places[0]?.culturalShadowPreview || 'Generational artisan guilds, oral folklore, and classical gharanas preserved in living courtyards'}*

💡 **Agent Pro-Tips & Logistics:**
• **Recommended Window:** 2–3 Days
• **Culinary Recommendation:** Explore local historical lanes for heritage slow-cooked recipes`;

      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        agentRole: 'Bharat AI Agent',
        text,
        timestamp: new Date(),
        suggestedMementos: mementosForCity.slice(0, 2),
        suggestedPrompts: isHi
          ? [`3-दिवसीय ${collection.cityName} यात्रा प्लान`, `${collection.cityName} का प्रसिद्ध खानपान`, `हस्तशिल्प और कारीगर`, `भारत के अन्य शहर`]
          : [`3-Day ${collection.cityName} Itinerary`, `${collection.cityName} Food Trail`, `Handcrafted Mementos`, `Explore Other Cities`],
        isError: false,
      };
    }
  }

  // 2. Check for Itinerary / Trip Planning queries
  if (q.includes('plan') || q.includes('trip') || q.includes('itinerary') || q.includes('योजना') || q.includes('यात्रा') || q.includes('days') || q.includes('route')) {
    let matchedItinerary: ItineraryPlan = defaultItineraries['lucknow-3day'];

    if (q.includes('varanasi') || q.includes('kashi') || q.includes('बनारस')) {
      matchedItinerary = defaultItineraries['varanasi-3day'];
    } else if (q.includes('buddhist') || q.includes('बुद्ध') || q.includes('sarnath')) {
      matchedItinerary = defaultItineraries['buddhist-circuit'];
    } else if (q.includes('ayodhya') || q.includes('ramayana') || q.includes('अयोध्या')) {
      matchedItinerary = defaultItineraries['ramayana-circuit'];
    }

    const text = isHi
      ? `🤖 **भारत AI एजेंट — यात्रा कार्यक्रम संरचना (Itinerary Synthesis)**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗺️ **यात्रा शीर्षक:** ${matchedItinerary.title}
⏱️ **अवधि:** ${matchedItinerary.durationDays} दिन | 🎭 **थीम:** ${matchedItinerary.theme}

📋 **रणनीतिक रूट सारांश:**
${matchedItinerary.whyThisRoute}

📍 **दिन-वार वेपॉइंट्स:**
${matchedItinerary.waypoints.map(w => `• **Day ${w.day}: ${w.name}** (${w.stayDuration})\n  *आकर्षण:* ${w.highlight}\n  *सांस्कृतिक पहलू:* ${w.shadowNote}`).join('\n\n')}`
      : `🤖 **Bharat AI Agent — Custom Itinerary Synthesis**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗺️ **Synthesized Route:** ${matchedItinerary.title}
⏱️ **Pacing:** ${matchedItinerary.durationDays} Days | 🎭 **Strategic Theme:** ${matchedItinerary.theme}

📋 **Route Rationalization:**
${matchedItinerary.whyThisRoute}

📍 **Day-by-Day Waypoints Breakdown:**
${matchedItinerary.waypoints.map(w => `• **Day ${w.day}: ${w.name}** (${w.stayDuration})\n  *Highlights:* ${w.highlight}\n  *Cultural Shadow:* ${w.shadowNote}`).join('\n\n')}`;

    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      agentRole: 'Bharat AI Agent',
      text,
      timestamp: new Date(),
      structuredItinerary: matchedItinerary,
      suggestedPrompts: isHi
        ? ['स्थानीय व्यंजन सुझाव', 'पासपोर्ट में सेव करें', 'अन्य टूरिज्म सर्किट', 'राष्ट्रीय उद्यान सफारी']
        : ['Best Local Food Spots', 'Save to Cultural Passport', 'Other Tourism Circuits', 'Wildlife Safari Tips'],
      isError: false,
    };
  }

  // 3. Fallback generic
  const defaultAnswer = isHi
    ? `🤖 **नमस्ते! मैं हूँ आपका भारत AI ट्रैवल एजेंट**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
मैं आपकी यात्रा का पूरा खाका तैयार कर सकता हूँ:

🎯 **क्षमताएं:**
1. **🗺️ बहु-दिवसीय यात्रा कार्यक्रम:** दिन-वार समय सारणी, बजट और भोजन सुझाव
2. **🏛️ ऐतिहासिक एवं सांस्कृतिक अंतर्दृष्टि:** स्मारक, वास्तुकला और जीवित सांस्कृतिक परछाइयाँ
3. **🍛 प्रामाणिक गैस्ट्रोनॉमी ट्रेल:** सदियों पुराने प्रामाणिक भोजनालय
4. **🎭 उत्सव एवं सफारी शेड्यूलिंग:** 12-मासीय उत्सव कैलेंडर

💡 मुझे बताएं कि आप किस शहर या अनुभव की खोज करना चाहते हैं`
    : `🤖 **Greetings! I am your Bharat AI Travel Agent**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I synthesize complete travel intelligence, routes, and cultural dossiers tailored to your preferences:

🎯 **Agentic Capabilities:**
1. **🗺️ Multi-Day Itineraries:** Day-by-day pacing, route rationalization, stay durations & food stops
2. **🏛️ Architectural & Cultural Dossiers:** Unrevealed legends, artisan cooperatives & history
3. **🍛 Heritage Gastronomy Trails:** Regional street food gems and slow-cooked royal recipes
4. **🐅 Wildlife Safaris & Festivals:** Season windows, sanctuary rules & permit guidance

💡 Tell me which Indian state, city, budget, or theme you want to explore`;

  return {
    id: `ai-${Date.now()}`,
    sender: 'ai',
    agentRole: 'Bharat AI Agent',
    text: defaultAnswer,
    timestamp: new Date(),
    suggestedPrompts: isHi
      ? ['प्रमुख पर्यटन स्थल', '3-दिवसीय लखनऊ यात्रा प्लान', 'स्थानीय खानपान की खोज', 'भारतीय उत्सव']
      : ['Explore Top Destinations', '3-Day Lucknow Heritage Tour', 'Discover Regional Food', 'Annual Festivals'],
    isError: false,
  };
}

/**
 * Send user query directly to live n8n Webhook
 */
export async function sendChatMessageToN8N(
  userQuery: string,
  languageCode: 'en' | 'hi' | string,
  conversationHistory: ChatMessage[],
  sessionId: string = 'bharat-session-1'
): Promise<ChatMessage> {
  const languageLabel = languageCode === 'hi' ? 'Hindi' : 'English';

  const payload = {
    chatInput: userQuery,
    message: userQuery,
    question: userQuery,
    input: userQuery,
    query: userQuery,
    language: languageLabel,
    sessionId: sessionId,
  };

  try {
    const controller = new AbortController();
    // Allow up to 35 seconds for live n8n cloud LLM execution
    const timeoutId = setTimeout(() => controller.abort(), 35000);

    const response = await fetch(N8N_CONFIG.WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const responseText = await response.text();

      if (responseText && responseText.trim().length > 0) {
        let aiAnswer = responseText.trim();
        let structuredItinerary: ItineraryPlan | undefined;
        let suggestedMementos: BharatMemento[] | undefined;
        let customPrompts: string[] | undefined;

        try {
          const data = JSON.parse(responseText);
          if (data && typeof data === 'object') {
            aiAnswer =
              data.output ||
              data.response ||
              data.text ||
              data.message ||
              data.answer ||
              (typeof data === 'string' ? data : JSON.stringify(data));
            structuredItinerary = data.itinerary;
            suggestedMementos = data.mementos;
            customPrompts = data.suggestedPrompts;
          }
        } catch {
          // Plain text returned by n8n Respond to Webhook
          aiAnswer = responseText.trim();
        }

        // Clean any unnecessary trailing dots/fullstops in response
        if (typeof aiAnswer === 'string' && aiAnswer.length > 0) {
          return {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            agentRole: 'Bharat AI Agent (Live n8n Cloud)',
            text: aiAnswer,
            timestamp: new Date(),
            structuredItinerary,
            suggestedMementos,
            suggestedPrompts: customPrompts || [
              languageCode === 'hi' ? 'विरासत देखें' : 'Explore Heritage',
              languageCode === 'hi' ? 'स्थानीय खानपान' : 'Discover Local Food',
              languageCode === 'hi' ? 'संस्कृति का अनुभव' : 'Experience Culture',
              languageCode === 'hi' ? 'यात्रा योजना बनाएं' : 'Plan My Trip',
            ],
            isError: false,
          };
        }
      }
    }
  } catch (error) {
    console.warn('n8n webhook network issue or timeout, utilizing local knowledge engine:', error);
  }

  // Graceful fallback if n8n cloud server is completely offline
  return generateLocalAIResponse(userQuery, languageCode);
}
