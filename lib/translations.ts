import { useLanguage } from '@/contexts/LanguageContext';

type TranslationKey = 
  | 'drawnMessage'
  | 'writtenMessage'
  | 'writeMessagePlaceholder'
  | 'drawnMessageDescription'
  | 'writtenMessageDescription'
  | 'loading'
  | 'ourSpecialDay'
  | 'countingMoments'
  | 'joinUsAt'
  | 'date'
  | 'time'
  | 'location'
  | 'rsvpTitle'
  | 'rsvpDescription'
  | 'rsvpButton'
  | 'rsvpFormTitle'
  | 'rsvpFormName'
  | 'rsvpFormEmail'
  | 'rsvpFormGuests'
  | 'rsvpFormSubmit'
  | 'rsvpSuccess'
  | 'rsvpError'
  | 'muteMusic'
  | 'unmuteMusic'
  | 'venueMapTitle'
  | 'venueMapLoading'
  | 'venueMapError'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'seconds'
  | 'writeUsMessage'
  | 'writeUsDescription'
  | 'yourName'
  | 'yourMessage'
  | 'clearDrawing'
  | 'undo'
  | 'sendMessage'
  | 'messageSent'
  | 'messageError'
  | 'footerMessage'
  | 'sendingMessage'
  | 'color'
  | 'width'
  | 'colorBlack'
  | 'colorRed'
  | 'colorBlue'
  | 'colorGreen'
  | 'colorPurple'
  | 'colorOrange'
  | 'widthThin'
  | 'widthMedium'
  | 'widthThick'
  | 'widthBold'
  | 'current'
  | 'size'
  | 'copyright'
  | 'sharePhotosTitle'
  | 'sharePhotosDescription'
  | 'uploadButton'
  | 'scanQRCode'
  | 'orUploadDirectly';

type Translations = {
  [key in TranslationKey]: {
    en: string;
    ar: string;
  };
};

export const translations: Translations = {
  drawnMessage: {
    en: 'Drawn Message',
    ar: 'رسالة مرسومة',
  },
  writtenMessage: {
    en: 'Written Message',
    ar: 'رسالة مكتوبة',
  },
  writeMessagePlaceholder: {
    en: 'Write your message here...',
    ar: 'اكتب رسالتك هنا...',
  },
  drawnMessageDescription: {
    en: 'Leave us a handwritten note',
    ar: 'اتركوا لنا رسالة بخط اليد',
  },
  writtenMessageDescription: {
    en: 'We would love to read your kind wishes and messages.',
    ar: 'يسعدنا أن نقرأ كلماتكم ودعواتكم الجميلة.',
  },
  loading: {
    en: 'Getting everything ready for you...',
    ar: 'جاري تجهيز كل شيء ليكم...',
  },
  ourSpecialDay: {
    en: 'Celebrating Our Special Day',
    ar: 'يومنا المميز',
  },
  countingMoments: {
    en: 'Counting every moment until we celebrate together',
    ar: 'نعد اللحظات حتى نحتفل معاً',
  },
  joinUsAt: {
    en: "We'd be honored to have you join us",
    ar: 'نتشرف بحضوركم لمشاركتنا فرحتنا',
  },
  date: {
    en: 'March 26, 2026',
    ar: '٢٦ مارس ٢٠٢٦',
  },
  time: {
    en: '7:00 PM',
    ar: '٧:٠٠ مساءً',
  },
  location: {
    en: 'Royal Hall, Bilbeis, Al-Sharqia',
    ar: 'قاعة رويال، بلبيس، الشرقية',
  },
  rsvpTitle: {
    en: 'Will You Join Us?',
    ar: 'هل ستشاركوننا هذه المناسبة؟',
  },
  rsvpDescription: {
    en: 'We would be honored to have you celebrate with us on our special day.',
    ar: 'يسعدنا جداً حضوركم ومشاركتنا فرحتنا في هذا اليوم المميز.',
  },
  rsvpButton: {
    en: 'Confirm Attendance',
    ar: 'تأكيد الحضور',
  },
  rsvpFormTitle: {
    en: 'RSVP Details',
    ar: 'تفاصيل الحضور',
  },
  rsvpFormName: {
    en: 'Your Name',
    ar: 'الاسم الكريم',
  },
  rsvpFormEmail: {
    en: 'Email Address',
    ar: 'البريد الإلكتروني',
  },
  rsvpFormGuests: {
    en: 'Number of Guests',
    ar: 'عدد الضيوف',
  },
  rsvpFormSubmit: {
    en: 'Submit',
    ar: 'إرسال',
  },
  rsvpSuccess: {
    en: 'Thank you! We look forward to seeing you.',
    ar: 'شكراً لكم! نتطلع لرؤيتكم قريباً.',
  },
  rsvpError: {
    en: 'Please ensure all fields are filled correctly.',
    ar: 'يرجى التأكد من ملء جميع البيانات.',
  },
  muteMusic: {
    en: 'Mute background music',
    ar: 'كتم الموسيقى',
  },
  unmuteMusic: {
    en: 'Unmute background music',
    ar: 'إعادة تشغيل الموسيقى',
  },
  venueMapTitle: {
    en: 'Venue Location',
    ar: 'موقع القاعة',
  },
  venueMapLoading: {
    en: 'Loading map...',
    ar: 'جاري تحميل الخريطة...',
  },
  venueMapError: {
    en: 'Failed to load map',
    ar: 'فشل تحميل الخريطة',
  },
  days: {
    en: 'Days',
    ar: 'أيام',
  },
  hours: {
    en: 'Hours',
    ar: 'ساعات',
  },
  minutes: {
    en: 'Minutes',
    ar: 'دقائق',
  },
  seconds: {
    en: 'Seconds',
    ar: 'ثواني',
  },
  writeUsMessage: {
    en: 'Leave a Message',
    ar: 'اترك لنا كلمة للذكرى',
  },
  writeUsDescription: {
    en: 'Leave us a handwritten note or message',
    ar: 'اتركوا لنا رسالة بخط اليد',
  },
  yourName: {
    en: 'Your Name',
    ar: 'الاسم',
  },
  yourMessage: {
    en: 'Your Message',
    ar: 'رسالتكم الجميلة',
  },
  clearDrawing: {
    en: 'Clear',
    ar: 'مسح',
  },
  undo: {
    en: 'Undo',
    ar: 'تراجع',
  },
  sendMessage: {
    en: 'Send Message',
    ar: 'إرسال الرسالة',
  },
  messageSent: {
    en: 'Thank you for your beautiful message!',
    ar: 'شكراً جزيلاً على كلماتكم الرقيقة!',
  },
  messageError: {
    en: 'Please include your name and a short message.',
    ar: 'يرجى كتابة الاسم ورسالة قصيرة.',
  },
  footerMessage: {
    en: 'We look forward to celebrating with you.',
    ar: 'ادام اللّٰه المودة والرحمة بيننا عمراً وجمع بيننا و وفقنا لما يحب ويرضى',
  },
  sendingMessage: {
    en: 'Sending your message...',
    ar: 'جاري إرسال رسالتكم...',
  },
  color: {
    en: 'Color',
    ar: 'اللون',
  },
  width: {
    en: 'Width',
    ar: 'السُمك',
  },
  colorBlack: {
    en: 'Black',
    ar: 'أسود',
  },
  colorRed: {
    en: 'Red',
    ar: 'أحمر',
  },
  colorBlue: {
    en: 'Blue',
    ar: 'أزرق',
  },
  colorGreen: {
    en: 'Green',
    ar: 'أخضر',
  },
  colorPurple: {
    en: 'Purple',
    ar: 'بنفسجي',
  },
  colorOrange: {
    en: 'Orange',
    ar: 'برتقالي',
  },
  widthThin: {
    en: 'Thin',
    ar: 'رفيع',
  },
  widthMedium: {
    en: 'Medium',
    ar: 'متوسط',
  },
  widthThick: {
    en: 'Thick',
    ar: 'سميك',
  },
  widthBold: {
    en: 'Bold',
    ar: 'عريض',
  },
  current: {
    en: 'Current',
    ar: 'الحالي',
  },
  size: {
    en: 'Size',
    ar: 'الحجم',
  },
  copyright: {
    en: 'All Rights Reserved. Made by',
    ar: 'جميع الحقوق محفوظة. صنع بواسطة',
  },
  sharePhotosTitle: {
    en: 'Share Your Photos From The Day',
    ar: 'شاركونا صوركم من اليوم',
  },
  sharePhotosDescription: {
    en: 'Upload the photos you take during our celebration so we can cherish these memories together',
    ar: 'ارفعوا الصور التي التقطوها خلال احتفالنا لنحتفظ بهذه الذكريات معاً',
  },
  uploadButton: {
    en: 'Upload Your Photos',
    ar: 'ارفع صورك',
  },
  scanQRCode: {
    en: 'Scan QR Code to Upload Your Photos',
    ar: 'امسح الرمز لرفع صورك',
  },
  orUploadDirectly: {
    en: 'Or click below to upload your photos directly',
    ar: 'أو اضغط أدناه لرفع صورك مباشرة',
  },
};

export function useTranslation() {
  const { language } = useLanguage();
  
  return function t(key: TranslationKey): string {
    return translations[key][language];
  };
}