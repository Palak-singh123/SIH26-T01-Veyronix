import { N8N_CONFIG } from '@/config/n8nConfig';
import { defaultItineraries, ItineraryPlan } from '@/data/gisCoordinates';
import { bharatMementos } from '@/data/mementosData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
  structuredItinerary?: ItineraryPlan;
  suggestedMementos?: typeof bharatMementos;
  suggestedPrompts?: string[];
  isError?: boolean;
}

/**
 * Send user query to n8n Webhook
 * Payload:
 * {
 *   "message": "<user_message>",
 *   "language": "<current_user_language>"
 * }
 */
export async function sendChatMessageToN8N(
  userQuery: string,
  languageCode: 'en' | 'hi' | string,
  conversationHistory: ChatMessage[]
): Promise<ChatMessage> {
  const languageLabel = languageCode === 'hi' ? 'Hindi' : 'English';

  const payload = {
    message: userQuery,
    language: languageLabel,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), N8N_CONFIG.TIMEOUT_MS);

    const response = await fetch(N8N_CONFIG.WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const responseText = await response.text();

    if (responseText && responseText.trim().length > 0) {
      try {
        const data = JSON.parse(responseText);
        // Look for "response" as specified, with fallbacks to output/message/text
        const aiAnswer =
          data.response ||
          data.output ||
          data.message ||
          data.text ||
          (typeof data === 'string' ? data : JSON.stringify(data));

        return {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiAnswer,
          timestamp: new Date(),
          structuredItinerary: data.itinerary,
          suggestedMementos: data.mementos,
          suggestedPrompts: data.suggestedPrompts || [
            languageCode === 'hi' ? '🏛️ विरासत देखें' : '🏛️ Explore Heritage',
            languageCode === 'hi' ? '🍛 स्थानीय खानपान' : '🍛 Discover Local Food',
            languageCode === 'hi' ? '🎭 संस्कृति का अनुभव' : '🎭 Experience Culture',
            languageCode === 'hi' ? '🗺️ यात्रा योजना बनाएं' : '🗺️ Plan My Trip',
          ],
          isError: false,
        };
      } catch (parseErr) {
        // Plain text response from n8n
        return {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: responseText,
          timestamp: new Date(),
          isError: false,
        };
      }
    } else {
      // If n8n returned 200 OK with empty body (due to Webhook response setting in n8n)
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text:
          languageCode === 'hi'
            ? 'n8n वेबहुक सफलतापूर्वक कनेक्ट हो गया है। (नोट: कृपया n8n वर्कफ़्लो में "Respond to Webhook" नोड सेट करें जो { "response": "..." } वापस भेजे)।'
            : 'Successfully connected to n8n webhook! (Note: In your n8n workflow, please ensure the Webhook node has "Respond" set to "Using \'Respond to Webhook\' Node" returning { "response": "..." }).',
        timestamp: new Date(),
        isError: false,
      };
    }
  } catch (error) {
    console.error('Error connecting to n8n webhook:', error);
    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: "Sorry, I'm having trouble connecting right now. Please try again.",
      timestamp: new Date(),
      isError: true,
    };
  }
}
