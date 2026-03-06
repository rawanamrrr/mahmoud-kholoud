"use client"

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/translations';

export default function HandwrittenMessage() {
  const t = useTranslation();
  const [writtenText, setWrittenText] = useState('');
  const [name, setName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' as 'success' | 'error' | 'info' | '' });

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !writtenText.trim()) {
      setMessage({ text: t('messageError'), type: 'error' });
      return;
    }

    setIsSending(true);
    setMessage({ text: t('sendingMessage'), type: 'info' });

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('message', writtenText.trim());

      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formData,
      });

      const contentType = response.headers.get('content-type') || '';
      let responseData: any = null;
      if (contentType.includes('application/json')) {
        try {
          responseData = await response.json();
        } catch (e) {
          console.error('Failed to parse JSON response:', e);
          const rawText = await response.text().catch(() => '');
          responseData = { raw: rawText };
        }
      } else {
        const rawText = await response.text().catch(() => '');
        responseData = { raw: rawText };
      }

      if (!response.ok) {
        console.error('Server error:', response.status, response.statusText, responseData);
        const msg = responseData?.message
          || responseData?.error
          || (typeof responseData?.raw === 'string' && responseData.raw.trim() ? responseData.raw : '')
          || 'Failed to send message';
        throw new Error(msg);
      }

      if (!responseData.success) {
        console.error('API error:', responseData);
        throw new Error(responseData.message || 'Message sending failed');
      }

      setMessage({ 
        text: t('messageSent'),
        type: 'success' as const
      });
      
      setWrittenText('');
      setName('');
      
    } catch (error) {
      console.error('Error sending message:', error);
      setMessage({ 
        text: error instanceof Error ? error.message : t('messageError'), 
        type: 'error' 
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section 
      id="message" 
      className="py-16 px-4 md:py-20 bg-gradient-to-b from-background to-accent/5 select-none"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="text-center mb-8 select-none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1] 
              }
            }
          }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-2 select-none">{t('writeUsMessage')}</h2>
          <p className="text-gray-600 text-center mb-4 select-none">
            {t('writtenMessageDescription')}
          </p>
          <div className="w-20 h-1 bg-accent mx-auto mb-6 select-none"></div>
          
          <div className="bg-white/90 p-6 md:p-8 rounded-lg shadow-lg select-none">
            <div className="mb-6">
              <textarea
                value={writtenText}
                onChange={(e) => setWrittenText(e.target.value)}
                placeholder={t('writeMessagePlaceholder')}
                className="w-full h-[300px] p-4 border-2 border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent resize-none bg-white text-gray-800 text-lg"
              />
            </div>

            <form onSubmit={sendEmail} className="space-y-4">
              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('yourName')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  {t('writtenMessageDescription')}
                </p>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setWrittenText('')}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors font-medium"
                  disabled={isSending}
                >
                  {t('clearDrawing')}
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 text-white bg-accent rounded-md hover:bg-accent/90 disabled:opacity-50 transition-colors font-medium whitespace-nowrap"
                  disabled={isSending}
                >
                  {isSending ? t('sendingMessage') : t('sendMessage')}
                </button>
              </div>

              {message.text && (
                <div className={`mt-6 p-4 rounded-md text-center ${
                  message.type === 'error' ? 'bg-red-100 text-red-700 border border-red-200' : 
                  message.type === 'info' ? 'bg-blue-100 text-blue-700 border border-blue-200' : 
                  'bg-green-100 text-green-700 border border-green-200'
                }`}>
                  {message.text}
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}