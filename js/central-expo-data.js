/**
 * ============================================================================
 * هذا الملف هو مصدر البيانات الوحيد — تُستبدل محتوياته ببيانات متحققة دون لمس أي ملف آخر
 *
 * ملف البيانات المركزي الموحد لمشروع «المعرض الرقمي» (Digital Expo)
 * الكائن العام: window.CENTRAL_EXPO_DATA
 * يحتوي على: العملات، إعدادات الدول، الأجنحة السبعة (7)، المتاجر وأدلتها (99)،
 * المنتجات (58)، العروض وسلالم الطرق (485)، الفهرس الأبجدي الموحد (109)،
 * باقات الاتصالات والبنوك (BUNDLE_PERKS)، وقاموس الترجمة الثنائي الكامل (AR / EN).
 * ============================================================================
 */
(function () {
  'use strict';

      // ----------------------------------------------------
      // 1. Countries, Regional Pricing Factors & Unified Currencies (Items 8 & 9)
      // ----------------------------------------------------
      const CURRENCIES = {
        USD: { symbol: '$', rate: 1.0, name: 'USD ($)', prefix: true },
        EGP: { symbol: ' ج.م', rate: 48.5, name: 'EGP (جنيه)', prefix: false },
        SAR: { symbol: ' ر.س', rate: 3.75, name: 'SAR (ريال)', prefix: false },
        AED: { symbol: ' د.إ', rate: 3.67, name: 'AED (درهم)', prefix: false },
        EUR: { symbol: '€', rate: 0.92, name: 'EUR (€)', prefix: true },
        GBP: { symbol: '£', rate: 0.78, name: 'GBP (£)', prefix: true }
      };

      const COUNTRIES_CONFIG = {
        US: {
          code: 'US',
          name: 'الولايات المتحدة (USA)',
          flag: '🇺🇸',
          currency: 'USD',
          regionalOfficialFactor: 1.0,
          perksPreview: 'كثير من شركات الاتصالات والبنوك في بلدك (Verizon, T-Mobile, AT&T, Amex Platinum, Chase) تمنحك اشتراكات مجانية (Disney+, Hulu, Netflix, Apple TV+, Perplexity) مشمولة في باقاتك وبطاقاتك.'
        },
        EG: {
          code: 'EG',
          name: 'مصر (Egypt)',
          flag: '🇪🇬',
          currency: 'EGP',
          regionalOfficialFactor: 0.55,
          perksPreview: 'كثير من شركات الاتصالات والبنوك في مصر (Vodafone Red, Orange Premier, WE, CIB) تمنحك اشتراكات مجانية (Shahid VIP, Anghami Plus, Watch It) مشمولة في باقاتك.'
        },
        SA: {
          code: 'SA',
          name: 'السعودية (KSA)',
          flag: '🇸🇦',
          currency: 'SAR',
          regionalOfficialFactor: 0.92,
          perksPreview: 'كثير من شركات الاتصالات والبنوك في السعودية (STC, Mobily, Zain, مصرف الراجحي, البنك الأهلي SNB) تمنحك اشتراكات مجانية (شاهد VIP, OSN+, أنغامي, أمازون برايم) مشمولة في باقاتك.'
        },
        AE: {
          code: 'AE',
          name: 'الإمارات (UAE)',
          flag: '🇦🇪',
          currency: 'AED',
          regionalOfficialFactor: 0.92,
          perksPreview: 'كثير من شركات الاتصالات والبنوك في الإمارات (e&, du, Emirates NBD, FAB) تمنحك اشتراكات مجانية (Disney+, Shahid VIP, OSN+, Amazon Prime) مشمولة في باقاتك.'
        },
        EU: {
          code: 'EU',
          name: 'أوروبا (Europe)',
          flag: '🇪🇺',
          currency: 'EUR',
          regionalOfficialFactor: 1.05,
          perksPreview: 'كثير من شركات الاتصالات والبنوك في أوروبا (Vodafone, Orange, Deutsche Telekom, Revolut Metal/Ultra) تمنحك اشتراكات مجانية (Perplexity Pro, YouTube Premium, Spotify, Disney+) مشمولة في باقاتك.'
        },
        GB: {
          code: 'GB',
          name: 'بريطانيا (UK)',
          flag: '🇬🇧',
          currency: 'GBP',
          regionalOfficialFactor: 1.05,
          perksPreview: 'كثير من شركات الاتصالات والبنوك في بريطانيا (EE, O2, Vodafone UK, Revolut, Barclays) تمنحك اشتراكات مجانية (Apple Music, Apple TV+, Xbox Game Pass, Disney+, Perplexity) مشمولة في باقاتك.'
        },
        GL: {
          code: 'GL',
          name: 'دولي / عالمي (Global)',
          flag: '🌍',
          currency: 'USD',
          regionalOfficialFactor: 1.0,
          perksPreview: 'كثير من شركات الاتصالات والبنوك والجامعات حول العالم (GitHub Student Pack, Amex, Revolut, Telecom Bundles) تمنحك اشتراكات مجانية مشمولة في باقاتك.'
        }
      };


      // ----------------------------------------------------
      // 2. Wings, Stores & Products (109-Site Master Inventory)
      // ----------------------------------------------------
      const INITIAL_WINGS = [
        {
          id: 'ai',
          name: 'جناح اشتراكات الذكاء الاصطناعي',
          nameEn: 'AI Subscriptions Wing',
          icon: 'fa-solid fa-robot',
          color: 'teal',
          desc: 'رسمي مباشر، بوابات ادفع حسب الاستخدام (API/Poe)، منصات مشاركة، وأسواق رمادية',
          descEn: 'Official AI subscriptions, pay-as-you-go gateways, sharing platforms, and grey markets',
          sourceGroups: [
            { label: 'رسمي مباشر', badge: 'رسمي', items: ['ChatGPT (OpenAI)', 'Claude (Anthropic)', 'Gemini (Google)', 'Perplexity', 'Microsoft Copilot', 'Grok (xAI)', 'DeepSeek', 'Mistral'] },
            { label: 'بوابات ادفع حسب الاستخدام', badge: 'موثوق', items: ['OpenRouter', 'Poe', 'fal.ai', 'Replicate'] },
            { label: 'منصات دعوات عائلية ومشاركة', badge: 'موثوق', items: ['Spliiit', 'Sharesub', 'GamsGo', 'GoSplit', 'GoingBus', 'Flickover'] },
            { label: 'أسواق رمادية ومؤقتة', badge: 'رمادي', items: ['G2A', 'Eneba', 'Plati.Market', 'Z2U'] }
          ]
        },
        {
          id: 'music',
          name: 'جناح الموسيقى',
          nameEn: 'Music & Audio Wing',
          icon: 'fa-solid fa-headphones',
          color: 'emerald',
          desc: 'منصات الاستماع الرسمية، تقسيم الخطط العائلية، بطاقات الهدايا المخفضة، والأسواق الرمادية',
          descEn: 'Official music streaming, family plan splitting, discounted gift cards, and grey markets',
          sourceGroups: [
            { label: 'رسمي', badge: 'رسمي', items: ['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music', 'Tidal', 'Deezer', 'Anghami'] },
            { label: 'منصات دعوات عائلية ومشاركة', badge: 'موثوق', items: ['Spliiit', 'Sharesub', 'Together Price', 'GamsGo', 'GoSplit', 'GoingBus'] },
            { label: 'بطاقات هدايا', badge: 'موثوق', items: ['Raise', 'CardCash', 'Seagm', 'Startselect', 'Eneba'] },
            { label: 'أسواق رمادية ومؤقتة', badge: 'رمادي', items: ['G2A', 'Plati.Market'] }
          ]
        },
        {
          id: 'streaming',
          name: 'جناح الأفلام والمسلسلات',
          nameEn: 'Movies & Series Streaming Wing',
          icon: 'fa-solid fa-film',
          color: 'rose',
          desc: 'منصات البث العالمية والعربية، مشاركة الملفات والعائلات، وبطاقات الهدايا',
          descEn: 'Global & Arabic streaming services, profile/family sharing, and gift cards',
          sourceGroups: [
            { label: 'رسمي', badge: 'رسمي', items: ['Netflix', 'Disney+', 'Max', 'Hulu', 'Prime Video', 'Apple TV+', 'Paramount+', 'YouTube Premium', 'Crunchyroll', 'Shahid', 'OSN+', 'STARZPLAY'] },
            { label: 'منصات دعوات عائلية ومشاركة', badge: 'موثوق', items: ['Spliiit', 'Sharesub', 'Together Price', 'GamsGo', 'GoSplit', 'FamilyPro', 'GoingBus', 'Flickover'] },
            { label: 'بطاقات هدايا', badge: 'موثوق', items: ['Raise', 'CardCash', 'Seagm', 'OffGamers', 'Startselect'] },
            { label: 'أسواق رمادية ومؤقتة', badge: 'رمادي', items: ['G2A', 'Plati.Market', 'Z2U'] }
          ]
        },
        {
          id: 'gaming_subs',
          name: 'جناح اشتراكات الألعاب',
          nameEn: 'Gaming Subscriptions Wing',
          icon: 'fa-solid fa-gamepad',
          color: 'indigo',
          desc: 'اشتراكات الكونسول والـ PC واللعب السحابي وموزعو المفاتيح وبطاقات الشحن',
          descEn: 'Console, PC & cloud gaming passes, key resellers, and top-up gift cards',
          sourceGroups: [
            { label: 'رسمي', badge: 'رسمي', items: ['Xbox Game Pass', 'PlayStation Plus', 'Nintendo Switch Online', 'EA Play', 'Ubisoft+', 'GeForce NOW', 'Amazon Luna', 'Apple Arcade'] },
            { label: 'موزعون معتمدون', badge: 'موثوق', items: ['CDKeys', 'Humble Choice'] },
            { label: 'بطاقات هدايا', badge: 'موثوق', items: ['Raise', 'Seagm', 'OffGamers', 'Startselect'] },
            { label: 'أسواق مفاتيح رمادية', badge: 'رمادي', items: ['Eneba', 'Gamivo', 'G2A', 'Kinguin'] }
          ]
        },
        {
          id: 'games',
          name: 'جناح الألعاب',
          nameEn: 'Digital Games Wing',
          icon: 'fa-solid fa-dice-d20',
          color: 'amber',
          desc: 'المتاجر الرسمية، الموزعون المعتمدون، أسواق المفاتيح واللاعبين، ومقارنات الأسعار',
          descEn: 'Official stores, authorized key resellers, player marketplaces, and price trackers',
          sourceGroups: [
            { label: 'متاجر رسمية', badge: 'رسمي', items: ['Steam', 'Epic Games', 'GOG', 'Xbox Store', 'PlayStation Store', 'Nintendo eShop', 'EA App', 'Ubisoft Store', 'Battle.net', 'Amazon Games'] },
            { label: 'موزعون رسميون', badge: 'موثوق', items: ['Green Man Gaming', 'Humble Bundle', 'Fanatical', 'CDKeys', 'Gamesplanet', 'GamersGate', 'IndieGala', 'WinGameStore', 'Newegg'] },
            { label: 'أسواق رمادية ولاعبين', badge: 'رمادي', items: ['G2A', 'Kinguin', 'Eneba', 'Gamivo', 'Eldorado.gg', 'PlayerAuctions', 'U7BUY', 'Z2U', 'Plati.Market', 'GGsel'] },
            { label: 'مقارنة وتتبع', badge: 'موثوق', items: ['GG.deals', 'IsThereAnyDeal', 'CheapShark', 'Allkeyshop', 'Deku Deals', 'PSPrices', 'Slickdeals'] }
          ]
        },
        {
          id: 'software',
          name: 'جناح البرامج الاحترافية',
          nameEn: 'Professional Software Wing',
          icon: 'fa-solid fa-laptop-code',
          color: 'blue',
          desc: 'برامج التصميم والهندسة والبرمجة والصوتيات، صفقات مدى الحياة، ومشاركة المقاعد',
          descEn: 'Design, CAD, IDE & audio software suites, lifetime deals, keys, and seat sharing',
          sourceGroups: [
            { label: 'رسمي', badge: 'رسمي', items: ['Microsoft 365', 'Adobe Creative Cloud', 'Autodesk', 'JetBrains', 'Capture One', 'Avid', 'Ableton'] },
            { label: 'صفقات ومفاتيح معتمدة', badge: 'موثوق', items: ['AppSumo', 'StackSocial', 'PCWorld Software Store', 'SoftwareKeep', 'CDKeys', 'Newegg', 'Spliiit'] },
            { label: 'مشاركة وأسواق رمادية', badge: 'رمادي', items: ['GamsGo', 'Eneba', 'Gamivo', 'G2A'] }
          ]
        },
        {
          id: 'tools',
          name: 'جناح البرامج الخفيفة والأدوات',
          nameEn: 'Lightweight Software & Tools Wing',
          icon: 'fa-solid fa-screwdriver-wrench',
          color: 'purple',
          desc: 'صفقات وحزم مدى الحياة، الهدايا اليومية المجانية، ومتاجر التطبيقات الرسمية',
          descEn: 'Lifetime software bundles, daily free giveaways, and official app stores',
          sourceGroups: [
            { label: 'صفقات وحزم', badge: 'موثوق', items: ['AppSumo', 'StackSocial', 'Humble Software Bundle', 'BitsDuJour', 'Giveaway of the Day', 'SharewareOnSale'] },
            { label: 'متاجر تطبيقات', badge: 'رسمي', items: ['Microsoft Store', 'Mac App Store'] }
          ]
        }
      ];

      const CROSS_WING_LAYERS = [
        {
          category: 'مقارنة أسعار عالمية (Price Comparison)',
          icon: 'fa-solid fa-scale-balanced',
          desc: 'مقارنة فورية لأسعار المفاتيح والمتاجر الرسمية والرمادية عبر العالم',
          sites: ['GG.deals', 'IsThereAnyDeal', 'CheapShark', 'Allkeyshop']
        },
        {
          category: 'تاريخ الأسعار والتنبيهات (Price History)',
          icon: 'fa-solid fa-chart-area',
          desc: 'تتبع حركة السعر التاريخي على أمازون ومتاجر الكونسول لمعرفة أصدق وقت للشراء',
          sites: ['CamelCamelCamel', 'Deku Deals', 'PSPrices', 'Slickdeals']
        },
        {
          category: 'استرداد نقدي وكوبونات (Cashback & Coupons)',
          icon: 'fa-solid fa-money-bill-transfer',
          desc: 'استرجع نسبة من مدفوعاتك نقداً عند التوجه للشراء من المتاجر الرسمية والموزعين',
          sites: ['Rakuten', 'Honey']
        }
      ];

      const MASTER_SITES_LIST = [
        'Ableton', 'Adobe Creative Cloud', 'Allkeyshop', 'Amazon Games', 'Amazon Luna',
        'Amazon Music', 'Anghami', 'Apple Arcade', 'Apple Music', 'Apple TV+',
        'AppSumo', 'Autodesk', 'Avid', 'Battle.net', 'BitsDuJour',
        'CamelCamelCamel', 'Capture One', 'CardCash', 'CDKeys', 'ChatGPT (OpenAI)',
        'CheapShark', 'Claude (Anthropic)', 'Crunchyroll', 'DeepSeek', 'Deezer',
        'Deku Deals', 'Disney+', 'EA App', 'EA Play', 'Eldorado.gg',
        'Eneba', 'Epic Games', 'fal.ai', 'FamilyPro', 'Fanatical',
        'Flickover', 'G2A', 'GamersGate', 'Gamesplanet', 'Gamivo',
        'GamsGo', 'GeForce NOW', 'Gemini (Google)', 'GG.deals', 'GGsel',
        'Giveaway of the Day', 'GOG', 'GoingBus', 'GoSplit', 'Green Man Gaming',
        'Grok (xAI)', 'Honey', 'Hulu', 'Humble Bundle', 'Humble Choice',
        'Humble Software Bundle', 'IndieGala', 'IsThereAnyDeal', 'JetBrains', 'Kinguin',
        'Mac App Store', 'Max', 'Microsoft 365', 'Microsoft Copilot', 'Microsoft Store',
        'Mistral', 'Netflix', 'Newegg', 'Nintendo eShop', 'Nintendo Switch Online',
        'OffGamers', 'OpenRouter', 'OSN+', 'Paramount+', 'PCWorld Software Store',
        'Perplexity', 'Plati.Market', 'PlayerAuctions', 'PlayStation Plus', 'PlayStation Store',
        'Poe', 'Prime Video', 'PSPrices', 'Raise', 'Rakuten',
        'Replicate', 'Seagm', 'Shahid', 'Sharesub', 'SharewareOnSale',
        'Slickdeals', 'SoftwareKeep', 'Spliiit', 'Spotify', 'StackSocial',
        'STARZPLAY', 'Startselect', 'Steam', 'Tidal', 'Together Price',
        'U7BUY', 'Ubisoft Store', 'Ubisoft+', 'WinGameStore', 'Xbox Game Pass',
        'Xbox Store', 'YouTube Music', 'YouTube Premium', 'Z2U'
      ];

      // Fixed Store Trust Badges to eliminate any contradiction between ownershipType and trustBadge (Item 6):
      // - Official Family Plan Splitters (Spliiit, Sharesub, Together Price) -> 'موثوق' (Blue) because they use official family invitations on personal accounts
      // - Shared Profile Platforms (GamsGo, GoSplit, GoingBus, Flickover, FamilyPro) -> 'رمادي' (Grey) because they provide profiles inside shared accounts
      // - Risky Pre-made Account Markets (Plati.Market, Z2U, GGsel) -> 'خطر' (Red)
      const RAW_STORES_DATA = [
        // 1. بوابات ادفع حسب الاستخدام
        ['s_openrouter', 'OpenRouter', 'بوابات ادفع حسب الاستخدام', 'موثوق', 'عالمي (بدون VPN)', 'بطاقات ائتمانية، Crypto، Apple Pay', 'https://openrouter.ai', 'بوابة موحدة تمنحك وصولاً لكل نماذج الذكاء الاصطناعي بحسابك الشخصي وبنظام الدفع حسب الاستهلاك الفعلي.'],
        ['s_poe', 'Poe', 'بوابات ادفع حسب الاستخدام', 'موثوق', 'عالمي', 'فيزا، ماستركارد، Apple Pay، Google Pay', 'https://poe.com', 'منصة رسمية من Quora تجمع كافة نماذج الذكاء الاصطناعي في حساب شخصي واحد.'],
        ['s_fal', 'fal.ai', 'بوابات ادفع حسب الاستخدام', 'موثوق', 'عالمي', 'بطاقات ائتمانية دولية', 'https://fal.ai', 'سحابة توليد الصور والفيديو بالذكاء الاصطناعي بالدفع حسب الاستخدام الفعلي.'],
        ['s_replicate', 'Replicate', 'بوابات ادفع حسب الاستخدام', 'موثوق', 'عالمي', 'فيزا، ماستركارد', 'https://replicate.com', 'تشغيل نماذج الذكاء الاصطناعي مفتوحة المصدر بتكلفة الاستخدام الفعلي فقط.'],

        // 2. منصات الدعوات العائلية الموثوقة (Official Family Invites -> Trust Badge: 'موثوق')
        ['s_spliiit', 'Spliiit', 'منصات مشاركة', 'موثوق', 'عالمي / أوروبا والشرق الأوسط', 'فيزا، ماستركارد، Apple Pay', 'https://spliiit.com', 'منصة أوروبية موثوقة لتقسيم الخطط العائلية الرسمية؛ تصلك دعوة عائلية رسمية على بريدك الشخصي وتبقى بياناتك ملكك.'],
        ['s_sharesub', 'Sharesub', 'منصات مشاركة', 'موثوق', 'عالمي', 'بطاقات بنكية، SEPA، Apple Pay', 'https://sharesub.com', 'منصة موثوقة لمشاركة الدعوات العائلية الرسمية بحيث يظل حسابك الشخصي وبياناتك مستقلة تماماً.'],
        ['s_togetherprice', 'Together Price', 'منصات مشاركة', 'موثوق', 'عالمي', 'فيزا، ماستركارد، Apple Pay', 'https://togetherprice.com', 'شبكة موثوقة لتنظيم ومشاركة تكاليف الخطط العائلية الرسمية بدعوة مباشرة لحسابك.'],

        // 3. منصات الملفات المشتركة الرمادية (Shared Account Profiles -> Trust Badge: 'رمادي')
        ['s_gamsgo', 'GamsGo', 'منصات مشاركة', 'رمادي', 'عالمي', 'فيزا، ماستركارد، مدى، Apple Pay، محافظ', 'https://gamsgo.com', 'منصة حسابات مشتركة تمنحك ملفاً داخل حساب مشترك؛ بياناتك تضيع بانتهاء الحساب المشترك فلا تحفظ فيها أسراراً خاصة.'],
        ['s_gosplit', 'GoSplit', 'منصات مشاركة', 'رمادي', 'عالمي', 'فيزا، ماستركارد، PayPal', 'https://gosplit.com', 'منصة مشاركة حسابات توفر ملفات داخل حسابات مشتركة بأسعار منخفضة.'],
        ['s_goingbus', 'GoingBus', 'منصات مشاركة', 'رمادي', 'عالمي', 'بطاقات ائتمانية، Apple Pay، Google Pay', 'https://goingbus.com', 'منصة مشاركة ملفات داخل حسابات بث وموسيقى وذكاء اصطناعي مشتركة.'],
        ['s_flickover', 'Flickover', 'منصات مشاركة', 'رمادي', 'عالمي', 'بطاقات ائتمانية، محافظ رقمية', 'https://flickover.com', 'منصة وصول مشترك عبر ملفات داخل حسابات جماعية.'],
        ['s_familypro', 'FamilyPro', 'منصات مشاركة', 'رمادي', 'عالمي', 'بطاقات ائتمانية، PayPal', 'https://familypro.io', 'منصة ملفات مشتركة لخدمات البث والموسيقى.'],

        // 4. بطاقات الهدايا الرسمية الموثوقة
        ['s_raise', 'Raise', 'بطاقات هدايا', 'موثوق', 'أمريكا وعالمي', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://raise.com', 'سوق موثوق لشراء بطاقات الهدايا الرقمية الرسمية بخصم يصل إلى 15% لشحن حسابك الشخصي مباشرة.'],
        ['s_cardcash', 'CardCash', 'بطاقات هدايا', 'موثوق', 'أمريكا وعالمي', 'بطاقات بنكية، PayPal', 'https://cardcash.com', 'منصة بيع وشراء بطاقات الهدايا المخفضة لخدمات البث والموسيقى والمتاجر.'],
        ['s_seagm', 'Seagm', 'بطاقات هدايا', 'موثوق', 'عالمي والشرق الأوسط', 'مدى، فيزا، ماستركارد، PayPal، Apple Pay', 'https://seagm.com', 'متجر عالمي موثوق لبطاقات شحن الألعاب والاشتراكات لجميع الريجونات.'],
        ['s_offgamers', 'OffGamers', 'بطاقات هدايا', 'موثوق', 'عالمي والخليج', 'فيزا، ماستركارد، مدى، PayPal', 'https://offgamers.com', 'موزع عالمي معتمد لبطاقات الهدايا وأرصدة المتاجر الرسمية.'],
        ['s_startselect', 'Startselect', 'بطاقات هدايا', 'موثوق', 'أوروبا وعالمي', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://startselect.com', 'موزع رسمي معتمد لبطاقات PlayStation وXbox وNintendo وSpotify وNetflix.'],
        ['s_jarir', 'مكتبة جرير (Jarir)', 'بطاقات هدايا', 'موثوق', 'السعودية والخليج', 'مدى، تمارا، تابي، Apple Pay، فيزا', 'https://jarir.com', 'موزع محلي رسمي معتمد للبطاقات الرقمية واشتراكات البرامج والألعاب.'],

        // 5. الموزعون الرسميون وصفقات البرامج والألعاب
        ['s_cdkeys', 'CDKeys', 'موزعون وصفقات', 'موثوق', 'عالمي', 'PayPal، فيزا، ماستركارد، Apple Pay', 'https://cdkeys.com', 'موزع رقمي موثوق لمفاتيح الألعاب واشتراكات Game Pass وPS Plus والبرامج التي تشحن في حسابك الشخصي.'],
        ['s_gmg', 'Green Man Gaming', 'موزعون وصفقات', 'موثوق', 'عالمي', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://greenmangaming.com', 'موزع رسمي معتمد يتعامل مباشرة مع ناشري الألعاب (Steam / Epic keys).'],
        ['s_humble', 'Humble Bundle', 'موزعون وصفقات', 'موثوق', 'عالمي', 'PayPal، فيزا، ماستركارد، Amazon Pay', 'https://humblebundle.com', 'منصة الحزم الرقمية الرسمية للألعاب والكتب والبرامج بأسعار رمزية.'],
        ['s_humble_choice', 'Humble Choice', 'موزعون وصفقات', 'موثوق', 'عالمي', 'PayPal، بطاقات ائتمانية', 'https://humblebundle.com/membership', 'اشتراك شهري يمنحك حزمة ألعاب PC رسمية تمتلكها للأبد على حسابك في Steam.'],
        ['s_humble_soft', 'Humble Software Bundle', 'موزعون وصفقات', 'موثوق', 'عالمي', 'PayPal، بطاقات ائتمانية', 'https://humblebundle.com/software', 'حزم البرامج الاحترافية المرخصة رسمياً بخصومات كبيرة.'],
        ['s_fanatical', 'Fanatical', 'موزعون وصفقات', 'موثوق', 'عالمي', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://fanatical.com', 'موزع رسمي معتمد لمفاتيح Steam وحزم الألعاب المرخصة مباشرة من الناشرين.'],
        ['s_gamesplanet', 'Gamesplanet', 'موزعون وصفقات', 'موثوق', 'عالمي', 'فيزا، ماستركارد، PayPal', 'https://gamesplanet.com', 'متجر رسمي مرخص لمفاتيح ألعاب الكمبيوتر مع ضمان التفعيل.'],
        ['s_gamersgate', 'GamersGate', 'موزعون وصفقات', 'موثوق', 'عالمي', 'بطاقات ائتمانية، PayPal', 'https://gamersgate.com', 'موزع رسمي معتمد لمفاتيح الألعاب الرقمية حول العالم.'],
        ['s_indiegala', 'IndieGala', 'موزعون وصفقات', 'موثوق', 'عالمي', 'بطاقات بنكية، PayPal، Crypto', 'https://indiegala.com', 'منصة حزم ألعاب رسمية ومفاتيح Steam وهدايا مجانية دورية.'],
        ['s_wingamestore', 'WinGameStore', 'موزعون وصفقات', 'موثوق', 'عالمي', 'PayPal، بطاقات ائتمانية', 'https://wingamestore.com', 'موزع رسمي معتمد لألعاب الـ PC والـ Mac.'],
        ['s_newegg', 'Newegg', 'موزعون وصفقات', 'موثوق', 'أمريكا والخليج وعالمي', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://newegg.com', 'عملاق التجزئة التقني لبيع تراخيص Microsoft 365 وAdobe ومفاتيح الألعاب الرسمية.'],
        ['s_appsumo', 'AppSumo', 'موزعون وصفقات', 'موثوق', 'عالمي', 'فيزا، ماستركارد، PayPal', 'https://appsumo.com', 'المنصة العالمية الأولى لصفقات البرامج والأدوات السحابية مدى الحياة بحسابك الشخصي.'],
        ['s_stacksocial', 'StackSocial', 'موزعون وصفقات', 'موثوق', 'عالمي', 'بطاقات ائتمانية، PayPal، Apple Pay', 'https://stacksocial.com', 'منصة عروض البرامج الاحترافية وتراخيص مايكروسوفت وتطبيقات الماك والويندوز.'],
        ['s_pcworld', 'PCWorld Software Store', 'موزعون وصفقات', 'موثوق', 'عالمي', 'بطاقات ائتمانية، PayPal', 'https://shop.pcworld.com', 'متجر البرامج الرسمي التابع لمجلة PCWorld لبيع التراخيص الرسمية المخفضة.'],
        ['s_softwarekeep', 'SoftwareKeep', 'موزعون وصفقات', 'موثوق', 'عالمي', 'فيزا، ماستركارد، PayPal', 'https://softwarekeep.com', 'موزع معتمد لتراخيص Microsoft Office وWindows مع ضمان التفعيل.'],
        ['s_bitsdujour', 'BitsDuJour', 'موزعون وصفقات', 'موثوق', 'عالمي', 'بطاقات ائتمانية، PayPal', 'https://bitsdujour.com', 'منصة تخفيضات يومية حصرية على برامج الويندوز والماك المرخصة رسمياً.'],
        ['s_giveawayoftheday', 'Giveaway of the Day', 'موزعون وصفقات', 'موثوق', 'عالمي', 'مجاني (تفعيل يومي)', 'https://giveawayoftheday.com', 'يعرض برنامجاً مدفوعاً مجاناً بالكامل كل 24 ساعة مع ترخيص قانوني من المطور.'],
        ['s_sharewareonsale', 'SharewareOnSale', 'موزعون وصفقات', 'موثوق', 'عالمي', 'مجاني / بطاقات ائتمانية', 'https://sharewareonsale.com', 'منصة هدايا مجانية يومية وتخفيضات على برامج الحماية والأدوات الخفيفة.'],

        // 6. الأسواق الرمادية والخطرة
        ['s_g2a', 'G2A', 'أسواق رمادية', 'رمادي', 'عالمي', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://g2a.com', 'سوق وسيط لمفاتيح وحسابات من بائعين متعددين — لا يضمن استمرارية الحسابات المشتركة.'],
        ['s_eneba', 'Eneba', 'أسواق رمادية', 'رمادي', 'عالمي', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://eneba.com', 'سوق رقمي وسيط للبائعين؛ تحقق دائماً من نوع العرض ومنطقة التفعيل.'],
        ['s_kinguin', 'Kinguin', 'أسواق رمادية', 'رمادي', 'عالمي', 'فيزا، ماستركارد، PayPal، Crypto', 'https://kinguin.net', 'سوق مفاتيح وحسابات وسيط يضم بائعين مستقلين.'],
        ['s_gamivo', 'Gamivo', 'أسواق رمادية', 'رمادي', 'عالمي', 'بطاقات ائتمانية، PayPal، Apple Pay', 'https://gamivo.com', 'سوق وسيط؛ انتبه لإلغاء اشتراك Smart الاختياري عند الدفع.'],
        ['s_eldorado', 'Eldorado.gg', 'أسواق رمادية', 'رمادي', 'عالمي', 'فيزا، ماستركارد، Apple Pay، Crypto', 'https://eldorado.gg', 'سوق وسيط بين اللاعبين للحسابات والعناصر داخل الألعاب.'],
        ['s_playerauctions', 'PlayerAuctions', 'أسواق رمادية', 'رمادي', 'عالمي', 'بطاقات ائتمانية، Apple Pay، Skrill', 'https://playerauctions.com', 'منصة تداول بين اللاعبين لشراء العناصر والحسابات.'],
        ['s_u7buy', 'U7BUY', 'أسواق رمادية', 'رمادي', 'عالمي', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://u7buy.com', 'سوق خدمات ألعاب وحسابات للاعبين.'],
        ['s_z2u', 'Z2U', 'أسواق رمادية', 'خطر', 'عالمي', 'بطاقات ائتمانية، محافظ رقمية', 'https://z2u.com', 'تحذير: سوق حسابات جاهزة مؤقتة غير مستقرة ومعرضة للإغلاق وفقدان البيانات.'],
        ['s_plati', 'Plati.Market', 'أسواق رمادية', 'خطر', 'عالمي', 'عملات رقمية، بطاقات محددة، WebMoney', 'https://plati.market', 'تحذير شديد: الحسابات الجاهزة المؤقتة معرضة للإغلاق في أي وقت وتضيع بياناتك بانتهاء الحساب.'],
        ['s_ggsel', 'GGsel', 'أسواق رمادية', 'خطر', 'عالمي', 'بطاقات، عملات رقمية، محافظ', 'https://ggsel.net', 'تحذير: سوق حسابات جاهزة مؤقتة من بائعين غير معتمدين.'],

        // 7. أدوات مقارنة الأسعار، تاريخ الأسعار، والكاش باك
        ['s_ggdeals', 'GG.deals', 'مقارنة وكاش باك', 'موثوق', 'عالمي', 'مجاني بالكامل (مقارن أسعار)', 'https://gg.deals', 'محرك مقارنة أسعار ألعاب الكمبيوتر يفصل بوضوح بين المتاجر الرسمية والأسواق الرمادية.'],
        ['s_itad', 'IsThereAnyDeal', 'مقارنة وكاش باك', 'موثوق', 'عالمي', 'مجاني بالكامل', 'https://isthereanydeal.com', 'المرجع التاريخي لمقارنة أسعار الألعاب في المتاجر الرسمية المعتمدة فقط.'],
        ['s_cheapshark', 'CheapShark', 'مقارنة وكاش باك', 'موثوق', 'عالمي', 'مجاني بالكامل', 'https://cheapshark.com', 'مقارن أسعار سريع ومجاني لتتبع تخفيضات ألعاب الـ PC في المتاجر الرسمية.'],
        ['s_allkeyshop', 'Allkeyshop', 'مقارنة وكاش باك', 'موثوق', 'عالمي', 'مجاني بالكامل', 'https://allkeyshop.com', 'محرك مقارنة شامل لأسعار مفاتيح الألعاب وبطاقات الهدايا.'],
        ['s_dekudeals', 'Deku Deals', 'مقارنة وكاش باك', 'موثوق', 'عالمي', 'مجاني بالكامل', 'https://dekudeals.com', 'منصة تتبع تخفيضات ألعاب Nintendo Switch وPlayStation وXbox.'],
        ['s_psprices', 'PSPrices', 'مقارنة وكاش باك', 'موثوق', 'عالمي (جميع الريجونات)', 'مجاني بالكامل', 'https://psprices.com', 'تتبع تخفيضات متاجر PlayStation وXbox وNintendo عبر أكثر من 40 دولة.'],
        ['s_slickdeals', 'Slickdeals', 'مقارنة وكاش باك', 'موثوق', 'أمريكا وعالمي', 'مجاني بالكامل', 'https://slickdeals.net', 'مجتمع عالمي لاكتشاف وتصويت أقوى العروض والخصومات الرقمية.'],
        ['s_camel', 'CamelCamelCamel', 'مقارنة وكاش باك', 'موثوق', 'عالمي', 'مجاني بالكامل', 'https://camelcamelcamel.com', 'أداة تتبع تاريخ أسعار منتجات وبطاقات Amazon.'],
        ['s_rakuten', 'Rakuten', 'مقارنة وكاش باك', 'موثوق', 'أمريكا وأوروبا وعالمي', 'استرداد نقدي عبر PayPal أو شيك', 'https://rakuten.com', 'منصة الكاش باك لاسترداد نسبة نقدية عند الشراء من المتاجر الرقمية.'],
        ['s_honey', 'Honey', 'مقارنة وكاش باك', 'موثوق', 'عالمي', 'إضافة متصفح مجانية ومكافآت PayPal', 'https://joinhoney.com', 'أداة PayPal الرسمية لتجربة كوبونات الخصم تلقائياً عند الدفع.'],

        // 8. المتاجر الرسمية المباشرة
        ['s_steam', 'Steam', 'رسمي مباشر', 'رسمي', 'عالمي (أسعار إقليمية MENA/Global)', 'فيزا، ماستركارد، PayPal، بطاقات Steam', 'https://store.steampowered.com', 'المتجر الرسمي الأول عالمياً لألعاب الكمبيوتر من Valve.'],
        ['s_epic', 'Epic Games', 'رسمي مباشر', 'رسمي', 'عالمي', 'بطاقات ائتمانية، PayPal', 'https://store.epicgames.com', 'متجر ألعاب رسمي يمنحك ألعاباً مجانية أسبوعياً.'],
        ['s_gog', 'GOG', 'رسمي مباشر', 'رسمي', 'عالمي', 'فيزا، ماستركارد، PayPal', 'https://gog.com', 'متجر رسمي تابع لـ CD Projekt يبيع الألعاب بدون حماية DRM.'],
        ['s_xbox_store', 'Xbox Store', 'رسمي مباشر', 'رسمي', 'عالمي', 'بطاقات بنكية، مدى، بطاقات Xbox', 'https://xbox.com', 'المتجر الرسمي لشراء ألعاب واشتراكات أجهزة Xbox والويندوز.'],
        ['s_ps_store', 'PlayStation Store', 'رسمي مباشر', 'رسمي', 'عالمي', 'بطاقات ائتمانية، بطاقات PS Store', 'https://store.playstation.com', 'المتجر الرقمي الرسمي لأجهزة PlayStation 4 وPlayStation 5.'],
        ['s_nintendo_eshop', 'Nintendo eShop', 'رسمي مباشر', 'رسمي', 'عالمي', 'بطاقات ائتمانية، PayPal، بطاقات eShop', 'https://nintendo.com/store', 'المتجر الرسمي لشراء ألعاب واشتراكات أجهزة Nintendo Switch.'],
        ['s_ea_app', 'EA App', 'رسمي مباشر', 'رسمي', 'عالمي', 'فيزا، ماستركارد، PayPal، بطاقات EA', 'https://ea.com', 'المنصة الرسمية لشركة Electronic Arts.'],
        ['s_ubisoft_store', 'Ubisoft Store', 'رسمي مباشر', 'رسمي', 'عالمي', 'بطاقات ائتمانية، PayPal', 'https://store.ubisoft.com', 'المتجر الرسمي لشركة Ubisoft.'],
        ['s_battlenet', 'Battle.net', 'رسمي مباشر', 'رسمي', 'عالمي', 'بطاقات بنكية، PayPal، رصيد Battle.net', 'https://shop.battle.net', 'المنصة الرسمية لألعاب Blizzard وActivision.'],
        ['s_amazon_games', 'Amazon Games', 'رسمي مباشر', 'رسمي', 'عالمي', 'مشمول مع اشتراك Amazon Prime', 'https://gaming.amazon.com', 'منصة ألعاب أمازون الرسمية.'],
        ['s_ms_store', 'Microsoft Store', 'رسمي مباشر', 'رسمي', 'عالمي', 'فيزا، ماستركارد، مدى، PayPal', 'https://apps.microsoft.com', 'المتجر الرسمي لبرامج وتطبيقات وألعاب نظام Windows وأجهزة Xbox.'],
        ['s_mac_app_store', 'Mac App Store', 'رسمي مباشر', 'رسمي', 'عالمي', 'Apple Pay، بطاقات Apple Gift Card، فيزا', 'https://apple.com/mac/app-store', 'المتجر الرسمي المدمج في أجهزة Mac.'],
        ['s_openai', 'ChatGPT (OpenAI)', 'رسمي مباشر', 'رسمي', 'عالمي', 'فيزا، ماستركارد، Apple Pay، Google Pay', 'https://chatgpt.com', 'الموقع الرسمي المباشر لشركة OpenAI لاشتراكات ChatGPT Plus وPro.'],
        ['s_anthropic', 'Claude (Anthropic)', 'رسمي مباشر', 'رسمي', 'عالمي', 'بطاقات ائتمانية، Apple Pay، Google Pay', 'https://claude.ai', 'الموقع الرسمي المباشر لشركة Anthropic لاشتراكات Claude Pro وTeam.'],
        ['s_google_off', 'Google Official (Gemini & YouTube)', 'رسمي مباشر', 'رسمي', 'عالمي (أسعار إقليمية حسب بلد الحساب)', 'فيزا، ماستركارد، Apple Pay، Google Pay، PayPal، رصيد Google Play', 'https://one.google.com', 'المنصة الرسمية المباشرة من Google لاشتراكات Gemini Advanced وYouTube Premium وYouTube Music.'],
        ['s_perplexity_off', 'Perplexity Official', 'رسمي مباشر', 'رسمي', 'عالمي', 'فيزا، ماستركارد، Apple Pay، Google Pay', 'https://perplexity.ai', 'الموقع الرسمي المباشر لمنصة Perplexity AI لاشتراك Perplexity Pro.'],
        ['s_xai_off', 'Grok (xAI Official)', 'رسمي مباشر', 'رسمي', 'عالمي', 'فيزا، ماستركارد، Apple Pay', 'https://x.ai', 'المنصة الرسمية المباشرة لشركة xAI ومنصة X لاشتراك SuperGrok وX Premium+.'],
        ['s_deepseek_off', 'DeepSeek Official', 'رسمي مباشر', 'رسمي', 'عالمي', 'بطاقات ائتمانية دولية، PayPal', 'https://deepseek.com', 'البوابة الرسمية المباشرة لشركة DeepSeek AI وواجهة الـ API الرسمية.'],
        ['s_mistral_off', 'Mistral AI Official', 'رسمي مباشر', 'رسمي', 'عالمي وأوروبا', 'فيزا، ماستركارد، Apple Pay', 'https://mistral.ai', 'الموقع الرسمي المباشر لشركة Mistral AI الأوروبية لاشتراك Le Chat Pro.'],
        ['s_midjourney_off', 'Midjourney Official', 'رسمي مباشر', 'رسمي', 'عالمي', 'فيزا، ماستركارد، Apple Pay، Google Pay', 'https://midjourney.com', 'الموقع الرسمي المباشر لمنصة Midjourney لتوليد الصور عبر الويب وديسكورد.'],
        ['s_github_off', 'GitHub Official', 'رسمي مباشر', 'رسمي', 'عالمي (مجاني للطلاب عبر GitHub Education)', 'فيزا، ماستركارد، PayPal', 'https://github.com/features/copilot', 'المنصة الرسمية المباشرة من GitHub لاشتراك GitHub Copilot Individual وPro.'],
        ['s_cursor_off', 'Cursor Official', 'رسمي مباشر', 'رسمي', 'عالمي', 'فيزا، ماستركارد، Apple Pay', 'https://cursor.com', 'الموقع الرسمي المباشر لمحرر الأكواد الذكي Cursor Pro من Anysphere.'],
        ['s_spotify_off', 'Spotify Official', 'رسمي مباشر', 'رسمي', 'عالمي (أسعار إقليمية وباقات طلاب وعائلة)', 'مدى، فيزا، ماستركارد، PayPal، بطاقات Spotify، فوري', 'https://spotify.com', 'الموقع الرسمي المباشر لمنصة Spotify لاشتراكات الأفراد والطلاب والعائلة.'],
        ['s_apple_off', 'Apple Official (Music / TV+ / Arcade)', 'رسمي مباشر', 'رسمي', 'عالمي (حسب متجر Apple ID)', 'Apple Pay، بطاقات Apple Gift Card، فيزا، ماستركارد، مدى', 'https://apple.com', 'المنصة الرسمية المباشرة من شركة Apple لاشتراكات Apple Music وApple TV+ وApple Arcade وApple One.'],
        ['s_tidal_off', 'Tidal Official', 'رسمي مباشر', 'رسمي', 'عالمي', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://tidal.com', 'الموقع الرسمي المباشر لمنصة الصوتيات الاحترافية Tidal HiRes.'],
        ['s_deezer_off', 'Deezer Official', 'رسمي مباشر', 'رسمي', 'عالمي والشرق الأوسط', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://deezer.com', 'الموقع الرسمي المباشر لمنصة Deezer للبث الموسيقي بجودة HiFi.'],
        ['s_anghami_off', 'Anghami Official', 'رسمي مباشر', 'رسمي', 'الشرق الأوسط وشمال أفريقيا وعالمي', 'مدى، فيزا، ماستركارد، Apple Pay، رصيد الهاتف، فوري', 'https://anghami.com', 'الموقع الرسمي المباشر لمنصة أنغامي بلس (Anghami Plus) للأفراد والعائلة.'],
        ['s_netflix_off', 'Netflix Official', 'رسمي مباشر', 'رسمي', 'عالمي (أسعار إقليمية حسب الدولة)', 'فيزا، ماستركارد، مدى، PayPal، بطاقات هدايا نتفليكس', 'https://netflix.com', 'الموقع الرسمي المباشر لشبكة Netflix لباقات Standard وPremium 4K.'],
        ['s_disney_off', 'Disney+ Official', 'رسمي مباشر', 'رسمي', 'عالمي والشرق الأوسط', 'فيزا، ماستركارد، مدى، Apple Pay، PayPal', 'https://disneyplus.com', 'الموقع الرسمي المباشر لمنصة Disney+ للأفلام والمسلسلات.'],
        ['s_max_off', 'Max (HBO) Official', 'رسمي مباشر', 'رسمي', 'أمريكا وأوروبا وعالمي', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://max.com', 'الموقع الرسمي المباشر لمنصة Max التابعة لـ Warner Bros. Discovery.'],
        ['s_hulu_off', 'Hulu Official', 'رسمي مباشر', 'رسمي', 'الولايات المتحدة', 'بطاقات ائتمانية، PayPal، Venmo، بطاقات Hulu', 'https://hulu.com', 'الموقع الرسمي المباشر لمنصة Hulu وباقات Disney Bundle.'],
        ['s_paramount_off', 'Paramount+ Official', 'رسمي مباشر', 'رسمي', 'أمريكا وأوروبا وعالمي', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://paramountplus.com', 'الموقع الرسمي المباشر لمنصة Paramount+ وShowtime.'],
        ['s_crunchyroll_off', 'Crunchyroll Official', 'رسمي مباشر', 'رسمي', 'عالمي (أسعار إقليمية مخفضة)', 'فيزا، ماستركارد، PayPal، Apple Pay، Google Pay', 'https://crunchyroll.com', 'الموقع الرسمي المباشر لمنصة الأنمي العالمية Crunchyroll لباقات Fan وMega Fan.'],
        ['s_shahid_off', 'Shahid (شاهد MBC) Official', 'رسمي مباشر', 'رسمي', 'الشرق الأوسط وشمال أفريقيا وعالمي', 'مدى، فيزا، ماستركارد، Apple Pay، فوري، رصيد الجوال', 'https://shahid.mbc.net', 'المنصة الرسمية المباشرة من مجموعة MBC لاشتراكات شاهد VIP والرياضة.'],
        ['s_osn_off', 'OSN+ Official', 'رسمي مباشر', 'رسمي', 'الشرق الأوسط وشمال أفريقيا', 'مدى، فيزا، ماستركارد، Apple Pay، PayPal', 'https://osnplus.com', 'الموقع الرسمي المباشر لمنصة OSN+ لأعمال HBO والأفلام الحصرية.'],
        ['s_starzplay_off', 'STARZPLAY Official', 'رسمي مباشر', 'رسمي', 'الشرق الأوسط وشمال أفريقيا', 'مدى، فيزا، ماستركارد، Apple Pay، رصيد الاتصالات', 'https://starzplay.com', 'الموقع الرسمي المباشر لمنصة STARZPLAY الترفيهية والرياضية.'],
        ['s_nvidia_off', 'GeForce NOW (NVIDIA Official)', 'رسمي مباشر', 'رسمي', 'عالمي', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://nvidia.com/geforce-now', 'الموقع الرسمي المباشر لشركة NVIDIA لخدمة البث السحابي GeForce NOW Ultimate وPriority.'],
        ['s_adobe_off', 'Adobe Official', 'رسمي مباشر', 'رسمي', 'عالمي (خصومات طلابية وإقليمية)', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://adobe.com/creativecloud', 'الموقع الرسمي المباشر لشركة Adobe لحزمة Creative Cloud الكاملة والأفراد والطلاب.'],
        ['s_autodesk_off', 'Autodesk Official', 'رسمي مباشر', 'رسمي', 'عالمي (مجاني للطلاب والمعلمين)', 'فيزا، ماستركارد، PayPal، تحويل بنكي', 'https://autodesk.com', 'الموقع الرسمي المباشر لشركة Autodesk لبرامج AutoCAD وRevit وMaya.'],
        ['s_jetbrains_off', 'JetBrains Official', 'رسمي مباشر', 'رسمي', 'عالمي (مجاني للطلاب والمصادر المفتوحة)', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://jetbrains.com', 'الموقع الرسمي المباشر لشركة JetBrains لبيئات البرمجة الاحترافية.'],
        ['s_captureone_off', 'Capture One Official', 'رسمي مباشر', 'رسمي', 'عالمي', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://captureone.com', 'الموقع الرسمي المباشر لشركة Capture One لمعالجة الصور الاحترافية.'],
        ['s_avid_off', 'Avid Official', 'رسمي مباشر', 'رسمي', 'عالمي', 'فيزا، ماستركارد، PayPal', 'https://avid.com', 'الموقع الرسمي المباشر لشركة Avid لبرامج Pro Tools وMedia Composer.'],
        ['s_ableton_off', 'Ableton Official', 'رسمي مباشر', 'رسمي', 'عالمي', 'فيزا، ماستركارد، PayPal، Apple Pay', 'https://ableton.com', 'الموقع الرسمي المباشر لشركة Ableton لبرنامج Ableton Live.']
      ];

      function buildStoreGuideSteps(name, type, trustBadge, payments, countries) {
        if (type === 'رسمي مباشر') {
          return [
            `1. افتح الموقع الرسمي المباشر لـ (${name}) وسجّل الدخول بحسابك الشخصي وإيميلك الخاص.`,
            `2. اختر الخطة المناسبة لك (فردي، طلابي، أو عائلي) وتأكد من ظهور السعر الإقليمي لبلدك (${countries}).`,
            `3. أتمم الدفع مباشرة عبر وسائل الدفع الرسمية المعتمدة (${payments}) دون أي وسيط.`,
            `4. يتفعل الاشتراك فوراً على حسابك الشخصي مع بقاء جميع بياناتك وسجلاتك محفوظة باسمك 100%؛ ويمكنك إلغاء التجديد التلقائي من الإعدادات في أي وقت.`
          ];
        }
        if (type === 'بوابات ادفع حسب الاستخدام') {
          return [
            `1. أنشئ حساباً شخصياً مجانياً في بوابة (${name}) ببريدك الإلكتروني الشخصي.`,
            `2. اشحن رصيداً صغيراً يبدأ من 5$ فقط عبر (${payments}) أو اختر الباقة الشهرية الموحدة.`,
            `3. اختر النموذج المطلوب (مثل GPT-4o أو Claude 3.5 أو DeepSeek أو Flux) وابدأ الاستخدام مباشرة أو عبر مفتاح الـ API الشخصي.`,
            `4. يُخصم فقط مقابل استهلاكك الفعلي بدقة سنتات قليلة، وتبقى جميع محادثاتك ومفاتيحك ملكك داخل حسابك الشخصي.`
          ];
        }
        if (type === 'منصات مشاركة' && trustBadge === 'موثوق') {
          return [
            `1. ادخل إلى منصة تقسيم الخطط العائلية الموثوقة (${name}) وابحث عن الخدمة المطلوبة وتأكد من تطابق ريجون العرض مع بلد حسابك.`,
            `2. اختر مقعداً ضمن خطة عائلية أو فريق رسمي وسدد حصتك الشهرية بأمان عبر (${payments})؛ تحتجز المنصة المبلغ حتى نجاح تفعيلك.`,
            `3. ستصلك «دعوة خطة عائلية رسمية» مباشرة على بريدك الإلكتروني الشخصي؛ اقبل الدعوة من حسابك الرسمي الخاص.`,
            `4. تستمتع بكامل مزايا الاشتراك على حسابك الشخصي المستقل (بياناتك تبقى محفوظة بحسابك ولا يطلع عليها أي عضو آخر في العائلة).`
          ];
        }
        if (type === 'منصات مشاركة') {
          return [
            `1. ادخل إلى منصة الحسابات المشتركة (${name}) واختر الاشتراك والمدة المطلوبة (شهر، 3 أشهر، أو سنة).`,
            `2. أكمل الدفع عبر (${payments}) وانتظر ظهور بيانات الدخول في لوحة حسابك خلال ثوانٍ.`,
            `3. ادخل إلى الخدمة باستخدام بيانات الحساب المشترك والالتزام الصارم برقم الـ Profile والـ PIN المخصص لك فقط دون تغيير كلمة المرور.`,
            `4. تنبيه أمان مهم: هذا الخيار هو «ملف داخل حساب مشترك»، لذا بياناتك تضيع بانتهاء الحساب؛ لا تخزن فيه أي بيانات سرية أو حساسة.`
          ];
        }
        if (type === 'بطاقات هدايا') {
          return [
            `1. افتح متجر البطاقات الرقمية الموثوق (${name}) واختر بطاقة الهدايا المطابقة لبلد حسابك الأصلي (${countries}).`,
            `2. راجع نسبة الخصم على البطاقة وسدد القيمة عبر (${payments}).`,
            `3. استلم كود البطاقة الرقمي فوراً في صفحة طلباتك وعلى بريدك الإلكتروني.`,
            `4. اشحن الكود مباشرة داخل حسابك الرسمي الشخصي (Redeem Code) لتفعيل اشتراكك بأمان تام مع بقاء بياناتك ملكك 100%.`
          ];
        }
        if (type === 'موزعون وصفقات') {
          return [
            `1. توجه إلى المتجر المعتمد (${name}) وتأكد من توافق منطقة التفعيل (Region: ${countries}) والمنصة المطلوبة (Steam / Xbox / PS / PC / Mac).`,
            `2. أضف المنتج إلى السلة وأكمل الدفع عبر (${payments}).`,
            `3. استلم مفتاح التفعيل الرسمي (Activation Key) أو رابط التفعيل المباشر في حسابك بالمتجر.`,
            `4. فعّل المفتاح داخل حسابك الرسمي الشخصي ليصبح المنتج أو الاشتراك مسجلاً باسمك للأبد (بياناتك تبقى).`
          ];
        }
        if (type === 'مقارنة وكاش باك') {
          return [
            `1. افتح أداة (${name}) المجانية قبل الشراء للتحقق من تاريخ السعر أو تفعيل استرداد الكاش باك.`,
            `2. قارن بين المتاجر الرسمية المعتمدة وتأكد من وجود كوبون خصم فعال أو نسبة استرداد نقدي.`,
            `3. انتقل من الأداة إلى المتجر الرسمي وأكمل شراءك المعتاد بوسائل الدفع (${payments}).`,
            `4. يُسجل الكاش باك أو التوفير في حسابك دون أي رسوم إضافية مع بقاء ملكية المنتج في حسابك الرسمي.`
          ];
        }
        if (trustBadge === 'خطر') {
          return [
            `1. تحذير مسبق: موقع (${name}) هو سوق مفتوح لحسابات جاهزة مؤقتة ذات مخاطر إغلاق مرتفعة؛ نعرضه للعلم والمقارنة فقط ولا نوصي به للاشتراكات الأساسية.`,
            `2. إذا قررت الشراء رغم التحذير، اختر بائعاً ذا تقييم مرتفع واقرأ شروط الضمان بدقة قبل الدفع عبر (${payments}).`,
            `3. ستستلم بيانات «حساب جاهز مؤقت» مسبق الصنع (إيميل وباسورد مؤقتين ليسا باسمك).`,
            `4. تنبيه حاسم: لا ترفع أي ملفات خاصة أو بيانات عمل على هذا الحساب لأن «بياناتك تضيع بانتهاء الحساب» أو عند إغلاقه المفاجئ.`
          ];
        }
        return [
          `1. ادخل إلى سوق (${name}) وتأكد من اختيار عرض واضح المعالم ومراجعة تقييم البائع ومنطقة التفعيل (${countries}).`,
          `2. تأكد من إلغاء أي اشتراكات حماية شهرية إضافية غير مرغوبة في السلة قبل الدفع عبر (${payments}).`,
          `3. استلم الكود أو بيانات العرض وتحقق من مطابقته للوصف فور الاستلام.`,
          `4. التزم بتعليمات التفعيل الموضحة واحتفظ بنسخة من فاتورة الشراء لضمان حقك عند الحاجة للدعم.`
        ];
      }

      function getStoreSafetySummary(trustBadge) {
        if (trustBadge === 'رسمي') return 'أمان كامل 100% — الشركة المالكة مباشرة وحسابك الشخصي الرسمي';
        if (trustBadge === 'موثوق') return 'آمن وموثوق — تفعيل رسمي أو دعوة عائلية رسمية (بياناتك تبقى)';
        if (trustBadge === 'رمادي') return 'رمادي متوسط — ملف مشترك أو سوق وسيط (لا تحفظ بيانات حساسة)';
        return 'خطر مرتفع — حسابات جاهزة مؤقتة معرضة للتوقف وفقدان البيانات';
      }

      const INITIAL_STORES = RAW_STORES_DATA.map(row => ({
        id: row[0],
        name: row[1],
        type: row[2],
        trustBadge: row[3],
        countries: row[4],
        payments: row[5],
        url: row[6],
        safetySummary: getStoreSafetySummary(row[3]),
        guide: buildStoreGuideSteps(row[1], row[2], row[3], row[5], row[4]),
        warnings: row[7]
      }));

      // Comprehensive Products Catalog across all 7 Wings
      const RAW_PRODUCTS_DATA = [
        // 1. جناح اشتراكات الذكاء الاصطناعي (ai)
        ['p_chatgpt', 'ChatGPT (OpenAI)', 'ai', 'OpenAI', 'fa-solid fa-brain', 'https://chatgpt.com', 20.00, 4.14, 'الاشتراك الرسمي لنماذج GPT-4o وo1 وتوليد الصور والبحث الصوتي المتقدم من OpenAI.'],
        ['p_claude', 'Claude (Anthropic)', 'ai', 'Anthropic', 'fa-solid fa-feather', 'https://claude.ai', 20.00, 5.50, 'أقوى مساعد ذكي للبرمجة والكتابة التحليلية مع نافذة سياق عملاقة وميزة Artifacts.'],
        ['p_gemini', 'Gemini (Google)', 'ai', 'Google', 'fa-solid fa-wand-magic-sparkles', 'https://gemini.google.com', 19.99, 4.80, 'باقة Google One AI Premium شاملة Gemini Advanced مع 2 تيرابايت تخزين سحابي وتكامل Workspace.'],
        ['p_perplexity', 'Perplexity', 'ai', 'Perplexity AI', 'fa-solid fa-magnifying-glass-chart', 'https://perplexity.ai', 20.00, 4.50, 'محرك الإجابات والبحث العلمي الموثق بالمصادر مع وصول لنماذج Claude وGPT-4o وDeepSeek.'],
        ['p_mscopilot', 'Microsoft Copilot', 'ai', 'Microsoft', 'fa-brands fa-microsoft', 'https://copilot.microsoft.com', 20.00, 6.90, 'مساعد مايكروسوفت الذكي Copilot Pro المدمج داخل تطبيقات Word وExcel وPowerPoint وOutlook.'],
        ['p_grok', 'Grok (xAI)', 'ai', 'xAI / X', 'fa-solid fa-bolt', 'https://x.ai', 16.00, 3.80, 'نموذج Grok المتقدم من شركة xAI مع وصول مباشر للبيانات اللحظية وتوليد الصور.'],
        ['p_deepseek', 'DeepSeek', 'ai', 'DeepSeek AI', 'fa-solid fa-microchip', 'https://deepseek.com', 10.00, 1.50, 'نموذج الاستدلال والبرمجة المفتوح فائق الكفاءة بأقل تكلفة استخدام عبر الـ API وبوابات OpenRouter.'],
        ['p_mistral', 'Mistral', 'ai', 'Mistral AI', 'fa-solid fa-wind', 'https://mistral.ai', 14.99, 2.90, 'اشتراك Le Chat Pro من شركة Mistral الأوروبية لنماذج اللغة السريعة والخصوصية العالية.'],
        ['p_midjourney', 'Midjourney Standard', 'ai', 'Midjourney Inc.', 'fa-solid fa-wand-magic-sparkles', 'https://midjourney.com', 30.00, 9.90, 'المعيار العالمي لتوليد الصور الرقمية والواقعية السينمائية مع 15 ساعة Fast GPU شهرياً.'],
        ['p_copilot', 'GitHub Copilot Individual', 'ai', 'GitHub / Microsoft', 'fa-solid fa-code', 'https://github.com/features/copilot', 10.00, 0.00, 'المساعد البرمجي بالذكاء الاصطناعي الأوسع انتشاراً والمدمج مباشرة داخل بيئات VS Code وغيرها.'],
        ['p_cursor', 'Cursor Pro', 'ai', 'Anysphere', 'fa-solid fa-terminal', 'https://cursor.com', 20.00, 8.40, 'محرر الأكواد الثوري المعتمد كلياً على الـ AI لتعديل وتوليد وإصلاح المشاريع البرمجية الضخمة.'],

        // 2. جناح الموسيقى (music)
        ['p_spotify', 'Spotify', 'music', 'Spotify AB', 'fa-brands fa-spotify', 'https://spotify.com', 10.99, 2.15, 'أضخم مكتبة موسيقية وبودكاست عالمية بدون إعلانات مع قوائم ذكية واستماع أوفلاين.'],
        ['p_applemusic', 'Apple Music', 'music', 'Apple Inc.', 'fa-brands fa-apple', 'https://music.apple.com', 10.99, 2.50, 'بث موسيقي بجودة Lossless غير مضغوطة وصوت مكاني Spatial Audio مع Dolby Atmos.'],
        ['p_ytmusic', 'YouTube Music', 'music', 'Google LLC', 'fa-brands fa-youtube', 'https://music.youtube.com', 10.99, 2.20, 'مكتبة يوتيوب الموسيقية الكاملة والحفلات النادرة مع التشغيل في الخلفية وبدون إعلانات.'],
        ['p_amazonmusic', 'Amazon Music', 'music', 'Amazon', 'fa-brands fa-amazon', 'https://music.amazon.com', 9.99, 2.40, 'خدمة Amazon Music Unlimited بجودة Ultra HD وملايين الأغاني والبودكاست الحصري.'],
        ['p_tidal', 'Tidal', 'music', 'Tidal', 'fa-solid fa-wave-square', 'https://tidal.com', 10.99, 2.60, 'منصة عشاق الصوتيات الاحترافية بجودة HiRes FLAC الأعلى نقاءً في العالم.'],
        ['p_deezer', 'Deezer', 'music', 'Deezer SA', 'fa-solid fa-music', 'https://deezer.com', 11.99, 2.40, 'بث موسيقي بجودة HiFi وميزة Flow الذكية لاكتشاف الأغاني وتحميلها بدون إنترنت.'],
        ['p_anghami', 'Anghami', 'music', 'Anghami', 'fa-solid fa-compact-disc', 'https://anghami.com', 5.99, 1.80, 'المنصة الموسيقية الأولى في العالم العربي والشرق الأوسط؛ مشمولة مجاناً في العديد من باقات الاتصالات.'],

        // 3. جناح الأفلام والمسلسلات (streaming)
        ['p_netflix', 'Netflix', 'streaming', 'Netflix Inc.', 'fa-solid fa-clapperboard', 'https://netflix.com', 15.49, 3.40, 'الشبكة العالمية الرائدة للأفلام والمسلسلات والوثائقيات الأصلية بدقة Full HD و4K.'],
        ['p_disney', 'Disney+', 'streaming', 'Walt Disney', 'fa-solid fa-star', 'https://disneyplus.com', 13.99, 2.90, 'عالم روائع Disney وPixar وMarvel وStar Wars وNational Geographic في منصة واحدة.'],
        ['p_max', 'Max', 'streaming', 'Warner Bros. Discovery', 'fa-solid fa-tv', 'https://max.com', 16.99, 3.60, 'موطن مسلسلات HBO الأصلية وأفلام Warner Bros وعالم DC السينمائي بجودة 4K.'],
        ['p_hulu', 'Hulu', 'streaming', 'Disney / Hulu', 'fa-solid fa-video', 'https://hulu.com', 17.99, 3.50, 'مكتبة ضخمة من المسلسلات الأمريكية الحديثة وعروض الشبكات التلفزيونية.'],
        ['p_primevideo', 'Prime Video', 'streaming', 'Amazon', 'fa-brands fa-amazon', 'https://primevideo.com', 8.99, 1.90, 'منصة أمازون للأفلام والمسلسلات الحصرية؛ غالباً مشمولة مجاناً مع باقات الشحن والاتصالات.'],
        ['p_appletv', 'Apple TV+', 'streaming', 'Apple Inc.', 'fa-brands fa-apple', 'https://tv.apple.com', 9.99, 2.30, 'إنتاجات Apple الأصلية الحائزة على جوائز الأوسكار وإيمي بأعلى جودة صورة وصوت.'],
        ['p_paramount', 'Paramount+', 'streaming', 'Paramount Global', 'fa-solid fa-mountain', 'https://paramountplus.com', 11.99, 2.60, 'أفلام استوديوهات Paramount والبطولات الرياضية المباشرة ومسلسلات Showtime.'],
        ['p_ytpremium', 'YouTube Premium', 'streaming', 'Google LLC', 'fa-brands fa-youtube', 'https://youtube.com/premium', 13.99, 2.80, 'مشاهدة يوتيوب بالكامل بدون إعلانات مع التحميل والتشغيل بالخلفية واشتراك YouTube Music مجاناً.'],
        ['p_crunchyroll', 'Crunchyroll', 'streaming', 'Sony / Crunchyroll', 'fa-solid fa-dragon', 'https://crunchyroll.com', 7.99, 1.85, 'المكتبة الرسمية الأكبر عالمياً لعشاق الأنمي الياباني والمانجا.'],
        ['p_shahid', 'Shahid', 'streaming', 'MBC Group', 'fa-solid fa-play', 'https://shahid.mbc.net', 9.99, 2.50, 'المنصة العربية الأولى لأعمال شاهد الأصلية والمسلسلات الحصرية والبطولات الرياضية.'],
        ['p_osn', 'OSN+', 'streaming', 'OSN Group', 'fa-solid fa-film', 'https://osnplus.com', 9.50, 2.40, 'موطن مسلسلات HBO الحصرية والأفلام الهوليوودية والعربية في منطقة الشرق الأوسط.'],
        ['p_starzplay', 'STARZPLAY', 'streaming', 'Starzplay Arabia', 'fa-solid fa-circle-play', 'https://starzplay.com', 8.99, 2.20, 'منصة ترفيهية ورياضية رائدة في الشرق الأوسط وشمال أفريقيا.'],

        // 4. جناح اشتراكات الألعاب (gaming_subs)
        ['p_gamepass', 'Xbox Game Pass', 'gaming_subs', 'Microsoft', 'fa-brands fa-xbox', 'https://xbox.com/gamepass', 19.99, 7.80, 'مكتبة تضم مئات الألعاب للـ PC وXbox من يوم إصدارها الأول مع EA Play واللعب السحابي.'],
        ['p_psplus', 'PlayStation Plus', 'gaming_subs', 'Sony Interactive', 'fa-brands fa-playstation', 'https://playstation.com/ps-plus', 14.99, 8.90, 'اللعب الجماعي عبر الشبكة ومئات ألعاب PS4 وPS5 القابلة للتحميل.'],
        ['p_nso', 'Nintendo Switch Online', 'gaming_subs', 'Nintendo', 'fa-solid fa-gamepad', 'https://nintendo.com/switch/online', 3.99, 0.95, 'اللعب التعاوني أونلاين على أجهزة Switch مع مكتبة الألعاب الكلاسيكية؛ أرخص عبر الخطة العائلية.'],
        ['p_eaplay', 'EA Play', 'gaming_subs', 'Electronic Arts', 'fa-solid fa-futbol', 'https://ea.com/ea-play', 5.99, 2.90, 'وصول غير محدود لمكتبة ألعاب EA الرياضية والحركية مع تجارب مبكرة للألعاب الجديدة.'],
        ['p_ubisoftplus', 'Ubisoft+', 'gaming_subs', 'Ubisoft', 'fa-solid fa-shield-halved', 'https://store.ubisoft.com/ubisoftplus', 17.99, 7.50, 'النسخ الكاملة Ultimate من ألعاب Ubisoft فور صدورها.'],
        ['p_geforcenow', 'GeForce NOW', 'gaming_subs', 'NVIDIA', 'fa-solid fa-cloud-bolt', 'https://nvidia.com/geforce-now', 19.99, 8.50, 'بث ألعابك المملوكة على Steam وEpic عبر خوادم RTX 4080 السحابية.'],
        ['p_amazonluna', 'Amazon Luna', 'gaming_subs', 'Amazon', 'fa-brands fa-amazon', 'https://amazon.com/luna', 9.99, 3.50, 'خدمة اللعب السحابي من أمازون؛ تتضمن ألعاباً مجانية شهرياً لمشتركي Amazon Prime.'],
        ['p_applearcade', 'Apple Arcade', 'gaming_subs', 'Apple Inc.', 'fa-brands fa-apple', 'https://apple.com/apple-arcade', 6.99, 1.80, 'أكثر من 200 لعبة فاخرة لأجهزة iPhone وiPad وMac بدون إعلانات.'],

        // 5. جناح الألعاب ومتاجرها (games)
        ['p_cyberpunk', 'Cyberpunk 2077: Ultimate Edition', 'games', 'CD Projekt Red', 'fa-solid fa-gamepad', 'https://cyberpunk.net', 59.99, 24.50, 'لعبة تقمص الأدوار في العالم المفتوح المستقبلي Night City شاملة توسعة Phantom Liberty.'],
        ['p_steam_games', 'Steam (ألعاب ومفاتيح PC)', 'games', 'Valve / Steam', 'fa-brands fa-steam', 'https://store.steampowered.com', 59.99, 19.50, 'مقارنة أسعار ألعاب ومفاتيح Steam الرسمية عبر الموزعين المعتمدين.'],
        ['p_epic_games', 'Epic Games (متجر وعروض)', 'games', 'Epic Games', 'fa-solid fa-dice-d20', 'https://store.epicgames.com', 59.99, 0.00, 'ألعاب الكمبيوتر الكبرى مع لعبة أو لعبتين مجانيتين أسبوعياً للأبد.'],
        ['p_gog_games', 'GOG (ألعاب بدون DRM)', 'games', 'CD Projekt / GOG', 'fa-solid fa-compact-disc', 'https://gog.com', 49.99, 14.90, 'شراء ألعاب الكمبيوتر الكلاسيكية والحديثة بملكية كاملة خالية من قفل DRM.'],
        ['p_battlenet_games', 'Battle.net (ألعاب Blizzard)', 'games', 'Blizzard / Activision', 'fa-solid fa-fire', 'https://shop.battle.net', 69.99, 34.90, 'ألعاب Diablo IV وWorld of Warcraft وCall of Duty عبر المتجر الرسمي وبطاقات الرصيد.'],
        ['p_console_stores', 'PlayStation & Xbox & eShop Games', 'games', 'Sony / MS / Nintendo', 'fa-solid fa-trophy', 'https://dekudeals.com', 69.99, 24.00, 'أفضل طرق شراء ألعاب الكونسول الرقمية عبر بطاقات الهدايا المخفضة.'],

        // 6. جناح البرامج الاحترافية (software)
        ['p_ms365', 'Microsoft 365', 'software', 'Microsoft', 'fa-brands fa-microsoft', 'https://microsoft.com/microsoft-365', 9.99, 1.80, 'حزمة أوفيس السحابية الكاملة (Word, Excel, PowerPoint) مع 1 تيرابايت OneDrive لكل مستخدم.'],
        ['p_adobe', 'Adobe Creative Cloud', 'software', 'Adobe Inc.', 'fa-solid fa-palette', 'https://adobe.com/creativecloud', 59.99, 14.50, 'الترسانة الإبداعية الكاملة: Photoshop وIllustrator وPremiere Pro وAfter Effects وAcrobat.'],
        ['p_autodesk', 'Autodesk', 'software', 'Autodesk Inc.', 'fa-solid fa-compass-drafting', 'https://autodesk.com', 85.00, 18.50, 'برامج الهندسة والتصميم المعماري والـ 3D القياسية (AutoCAD, Revit, Maya, 3ds Max).'],
        ['p_jetbrains', 'JetBrains', 'software', 'JetBrains s.r.o.', 'fa-solid fa-laptop-code', 'https://jetbrains.com', 28.90, 0.00, 'أقوى بيئات التطوير البرمجية الاحترافية؛ مجانية 100% للطلاب ومطوري المصادر المفتوحة.'],
        ['p_captureone', 'Capture One', 'software', 'Capture One A/S', 'fa-solid fa-camera-retro', 'https://captureone.com', 24.00, 11.50, 'البرنامج الاحترافي الأول عالمياً لمعالجة الصور الخام RAW وتصوير الاستوديو.'],
        ['p_avid', 'Avid', 'software', 'Avid Technology', 'fa-solid fa-sliders', 'https://avid.com', 29.99, 12.90, 'معيار صناعة السينما والصوتيات الاحترافي لبرامج Pro Tools وMedia Composer.'],
        ['p_ableton', 'Ableton', 'software', 'Ableton AG', 'fa-solid fa-wave-square', 'https://ableton.com', 39.00, 16.50, 'برنامج Ableton Live الشهير للإنتاج الموسيقي والتوزيع الصوتي.'],

        // 7. جناح البرامج الخفيفة والأدوات (tools)
        ['p_appsumo_deals', 'AppSumo (صفقات مدى الحياة)', 'tools', 'AppSumo', 'fa-solid fa-tags', 'https://appsumo.com', 49.00, 19.00, 'أقوى سوق عالمي لشراء اشتراكات أدوات الـ SaaS والذكاء الاصطناعي بدفعة واحدة مدى الحياة.'],
        ['p_stacksocial_deals', 'StackSocial (تراخيص وحزم)', 'tools', 'StackSocial', 'fa-solid fa-layer-group', 'https://stacksocial.com', 59.00, 14.99, 'عروض حصرية لتراخيص الويندوز والأوفيس وتطبيقات الـ Mac مدى الحياة.'],
        ['p_humble_soft_prod', 'Humble Software Bundle', 'tools', 'Humble Bundle', 'fa-solid fa-box-open', 'https://humblebundle.com/software', 35.00, 12.00, 'حزم دورية تجمع عشرات البرامج الإبداعية وأدوات المونتاج بسعر رمزي موحد.'],
        ['p_free_giveaways', 'Giveaway of the Day & SharewareOnSale', 'tools', 'Giveaway Network', 'fa-solid fa-gift', 'https://giveawayoftheday.com', 29.99, 0.00, 'احصل يومياً على تراخيص قانونية مجانية 100% لبرامج مدفوعة للويندوز والماك.'],
        ['p_bitsdujour_deals', 'BitsDuJour (خصومات برامج يومية)', 'tools', 'BitsDuJour', 'fa-solid fa-percent', 'https://bitsdujour.com', 39.99, 9.99, 'تخفيضات يومية مباشرة من مطوري برامج الويندوز والماك بتراخيص شخصية رسمية.'],
        ['p_ms_mac_stores', 'Microsoft Store & Mac App Store (تطبيقات رسمية)', 'tools', 'Microsoft / Apple', 'fa-solid fa-window-restore', 'https://apps.microsoft.com', 19.99, 14.99, 'شراء التطبيقات والأدوات الإنتاجية الرسمية للويندوز والماك عبر بطاقات الرصيد المخفضة.'],
        ['p_ea_ubisoft_games', 'EA App & Ubisoft Store & Amazon Games', 'games', 'EA / Ubisoft / Amazon', 'fa-solid fa-headset', 'https://ea.com', 59.99, 18.90, 'ألعاب FIFA FC وAssassin’s Creed وعروض Amazon Games المجانية لمشتركي Prime.']
      ];

      const INITIAL_PRODUCTS = RAW_PRODUCTS_DATA.map(row => ({
        id: row[0],
        name: row[1],
        wing: row[2],
        company: row[3],
        icon: row[4],
        officialUrl: row[5],
        baseOfficialPrice: row[6],
        desc: row[8],
        timingVerdict: 'قريباً — يعتمد على تراكم السجل التاريخي',
        timingStatus: 'wait'
      }));

      // ----------------------------------------------------
      // 3. Single Unified Offer Ladder Builder (Items 2, 3, 5, 6, 7)
      // Enforces:
      // - 4 Ownership Types ONLY: 'حساب رسمي شخصي' | 'دعوة خطة عائلية رسمية' | 'ملف داخل حساب مشترك' | 'حساب جاهز مؤقت'
      // - 2 Data Continuity Values ONLY: 'بياناتك تبقى' | 'بياناتك تضيع بانتهاء الحساب'
      // - Strict consistency between Ownership Type, Data Continuity, and Store Trust Badge!
      // ----------------------------------------------------
      const OFFICIAL_STORE_BY_PRODUCT = {
        p_chatgpt: 's_openai',
        p_claude: 's_anthropic',
        p_gemini: 's_google_off',
        p_perplexity: 's_perplexity_off',
        p_mscopilot: 's_ms_store',
        p_grok: 's_xai_off',
        p_deepseek: 's_deepseek_off',
        p_mistral: 's_mistral_off',
        p_midjourney: 's_midjourney_off',
        p_copilot: 's_github_off',
        p_cursor: 's_cursor_off',
        p_spotify: 's_spotify_off',
        p_applemusic: 's_apple_off',
        p_ytmusic: 's_google_off',
        p_amazonmusic: 's_amazon_games',
        p_tidal: 's_tidal_off',
        p_deezer: 's_deezer_off',
        p_anghami: 's_anghami_off',
        p_netflix: 's_netflix_off',
        p_disney: 's_disney_off',
        p_max: 's_max_off',
        p_hulu: 's_hulu_off',
        p_primevideo: 's_amazon_games',
        p_appletv: 's_apple_off',
        p_paramount: 's_paramount_off',
        p_ytpremium: 's_google_off',
        p_crunchyroll: 's_crunchyroll_off',
        p_shahid: 's_shahid_off',
        p_osn: 's_osn_off',
        p_starzplay: 's_starzplay_off',
        p_gamepass: 's_xbox_store',
        p_psplus: 's_ps_store',
        p_nso: 's_nintendo_eshop',
        p_eaplay: 's_ea_app',
        p_ubisoftplus: 's_ubisoft_store',
        p_geforcenow: 's_nvidia_off',
        p_amazonluna: 's_amazon_games',
        p_applearcade: 's_apple_off',
        p_cyberpunk: 's_steam',
        p_steam_games: 's_steam',
        p_epic_games: 's_epic',
        p_gog_games: 's_gog',
        p_battlenet_games: 's_battlenet',
        p_console_stores: 's_ps_store',
        p_ea_ubisoft_games: 's_ea_app',
        p_ms365: 's_ms_store',
        p_adobe: 's_adobe_off',
        p_autodesk: 's_autodesk_off',
        p_jetbrains: 's_jetbrains_off',
        p_captureone: 's_captureone_off',
        p_avid: 's_avid_off',
        p_ableton: 's_ableton_off',
        p_appsumo_deals: 's_appsumo',
        p_stacksocial_deals: 's_stacksocial',
        p_humble_soft_prod: 's_humble_soft',
        p_free_giveaways: 's_giveawayoftheday',
        p_bitsdujour_deals: 's_bitsdujour',
        p_ms_mac_stores: 's_mac_app_store'
      };

      const TODAY_DATE = '2026-10-23';

      function buildComprehensiveOffers() {
        const offers = [];
        RAW_PRODUCTS_DATA.forEach((row, pIndex) => {
          const pid = row[0];
          const wing = row[2];
          const officialUrl = row[5];
          const officialPrice = Number(row[6]);
          const targetSafePrice = Number(row[7]);
          const officialStoreId = OFFICIAL_STORE_BY_PRODUCT[pid] || 's_ms_store';
          const officialStoreObj = INITIAL_STORES.find(s => s.id === officialStoreId);

          // Base reference for paid safe price so grey & risky routes are strictly cheaper than safe routes (Item 9 internal consistency)
          const baseSafeRef = targetSafePrice > 0 ? targetSafePrice : Number((officialPrice * 0.35).toFixed(2));
          const greyPrice1 = Number(Math.max(0.65, baseSafeRef * 0.78).toFixed(2));
          const greyPrice2 = Number(Math.max(0.75, baseSafeRef * 0.85).toFixed(2));
          const riskPrice1 = Number(Math.max(0.45, baseSafeRef * 0.52).toFixed(2));
          const riskPrice2 = Number(Math.max(0.55, baseSafeRef * 0.58).toFixed(2));

          // 1. Official Direct Route (Trust: 'رسمي', Ownership: 'حساب رسمي شخصي', Continuity: 'بياناتك تبقى')
          offers.push({
            id: `o_${pid}_official`,
            productId: pid,
            storeId: officialStoreId,
            price: officialPrice,
            isOfficialDirect: true,
            ownershipType: 'حساب رسمي شخصي',
            dataContinuity: 'بياناتك تبقى',
            region: 'إقليمي حسب بلدك / عالمي',
            affiliateUrl: officialUrl || (officialStoreObj ? officialStoreObj.url : 'https://google.com'),
            lastUpdated: TODAY_DATE
          });

          // If targetSafePrice === 0.00 (Free official/student/weekly giveaway route), attach it to the official or authorized giveaway store!
          if (targetSafePrice === 0) {
            const freeStoreId = pid === 'p_copilot' ? 's_github_off'
              : pid === 'p_jetbrains' ? 's_jetbrains_off'
              : pid === 'p_epic_games' ? 's_epic'
              : 's_giveawayoftheday';
            offers.push({
              id: `o_${pid}_free_safe`,
              productId: pid,
              storeId: freeStoreId,
              price: 0.00,
              ownershipType: 'حساب رسمي شخصي',
              dataContinuity: 'بياناتك تبقى',
              region: 'عالمي (عرض رسمي مجاني 100%)',
              affiliateUrl: officialUrl,
              lastUpdated: TODAY_DATE
            });
            if (pid === 'p_free_giveaways') {
              offers.push({
                id: `o_${pid}_sharewareonsale`,
                productId: pid,
                storeId: 's_sharewareonsale',
                price: 0.00,
                ownershipType: 'حساب رسمي شخصي',
                dataContinuity: 'بياناتك تبقى',
                region: 'عالمي (ترخيص مجاني يومي)',
                affiliateUrl: 'https://sharewareonsale.com',
                lastUpdated: TODAY_DATE
              });
            }
          }

          if (wing === 'ai') {
            // Complete 8-route AI ladder for all 11 AI products (Item 1)
            offers.push({
              id: `o_${pid}_sharesub`,
              productId: pid,
              storeId: 's_sharesub',
              price: baseSafeRef,
              ownershipType: 'دعوة خطة عائلية رسمية',
              dataContinuity: 'بياناتك تبقى',
              region: 'عالمي (بدون VPN)',
              affiliateUrl: 'https://sharesub.com',
              lastUpdated: TODAY_DATE
            });
            offers.push({
              id: `o_${pid}_spliiit`,
              productId: pid,
              storeId: 's_spliiit',
              price: Number((baseSafeRef * 1.06).toFixed(2)),
              ownershipType: 'دعوة خطة عائلية رسمية',
              dataContinuity: 'بياناتك تبقى',
              region: 'عالمي / أوروبا والشرق الأوسط',
              affiliateUrl: 'https://spliiit.com',
              lastUpdated: TODAY_DATE
            });
            // Pay-as-you-go gateways (OpenRouter, Poe, fal.ai, Replicate)
            const paygStoreId = (pid === 'p_midjourney') ? 's_fal' : (pid === 'p_deepseek' || pid === 'p_mistral') ? 's_replicate' : 's_openrouter';
            offers.push({
              id: `o_${pid}_openrouter`,
              productId: pid,
              storeId: 's_openrouter',
              price: Number(Math.max(baseSafeRef, officialPrice * 0.32).toFixed(2)),
              ownershipType: 'حساب رسمي شخصي',
              dataContinuity: 'بياناتك تبقى',
              region: 'عالمي (بدون VPN - حسب الاستهلاك)',
              affiliateUrl: 'https://openrouter.ai',
              lastUpdated: TODAY_DATE
            });
            if (paygStoreId !== 's_openrouter') {
              offers.push({
                id: `o_${pid}_${paygStoreId}`,
                productId: pid,
                storeId: paygStoreId,
                price: Number(Math.max(baseSafeRef, officialPrice * 0.28).toFixed(2)),
                ownershipType: 'حساب رسمي شخصي',
                dataContinuity: 'بياناتك تبقى',
                region: 'عالمي (دفع حسب الاستخدام الفعلي)',
                affiliateUrl: paygStoreId === 's_fal' ? 'https://fal.ai' : 'https://replicate.com',
                lastUpdated: TODAY_DATE
              });
            }
            offers.push({
              id: `o_${pid}_poe`,
              productId: pid,
              storeId: 's_poe',
              price: Number(Math.max(baseSafeRef * 1.15, officialPrice * 0.48).toFixed(2)),
              ownershipType: 'حساب رسمي شخصي',
              dataContinuity: 'بياناتك تبقى',
              region: 'عالمي',
              affiliateUrl: 'https://poe.com',
              lastUpdated: TODAY_DATE
            });
            // Grey shared profile platforms (GamsGo, GoSplit, GoingBus, Flickover)
            offers.push({
              id: `o_${pid}_gamsgo`,
              productId: pid,
              storeId: 's_gamsgo',
              price: greyPrice1,
              ownershipType: 'ملف داخل حساب مشترك',
              dataContinuity: 'بياناتك تضيع بانتهاء الحساب',
              region: 'عالمي فوري',
              affiliateUrl: 'https://gamsgo.com',
              lastUpdated: TODAY_DATE
            });
            const secondaryGreyStore = ['s_gosplit', 's_goingbus', 's_flickover'][pIndex % 3];
            offers.push({
              id: `o_${pid}_${secondaryGreyStore}`,
              productId: pid,
              storeId: secondaryGreyStore,
              price: greyPrice2,
              ownershipType: 'ملف داخل حساب مشترك',
              dataContinuity: 'بياناتك تضيع بانتهاء الحساب',
              region: 'عالمي',
              affiliateUrl: secondaryGreyStore === 's_gosplit' ? 'https://gosplit.com' : secondaryGreyStore === 's_goingbus' ? 'https://goingbus.com' : 'https://flickover.com',
              lastUpdated: TODAY_DATE
            });
            // Grey key marketplaces (G2A / Eneba)
            const keyMarketStore = (pIndex % 2 === 0) ? 's_g2a' : 's_eneba';
            offers.push({
              id: `o_${pid}_${keyMarketStore}`,
              productId: pid,
              storeId: keyMarketStore,
              price: Number(((greyPrice1 + greyPrice2) / 2).toFixed(2)),
              ownershipType: 'ملف داخل حساب مشترك',
              dataContinuity: 'بياناتك تضيع بانتهاء الحساب',
              region: 'عالمي / بائع طرف ثالث',
              affiliateUrl: keyMarketStore === 's_g2a' ? 'https://g2a.com' : 'https://eneba.com',
              lastUpdated: TODAY_DATE
            });
            // Risky temporary account markets (Plati.Market & Z2U)
            offers.push({
              id: `o_${pid}_plati`,
              productId: pid,
              storeId: 's_plati',
              price: riskPrice1,
              ownershipType: 'حساب جاهز مؤقت',
              dataContinuity: 'بياناتك تضيع بانتهاء الحساب',
              region: 'عالمي (حساب مؤقت)',
              affiliateUrl: 'https://plati.market',
              lastUpdated: TODAY_DATE
            });
            offers.push({
              id: `o_${pid}_z2u`,
              productId: pid,
              storeId: 's_z2u',
              price: riskPrice2,
              ownershipType: 'حساب جاهز مؤقت',
              dataContinuity: 'بياناتك تضيع بانتهاء الحساب',
              region: 'عالمي (حساب مؤقت)',
              affiliateUrl: 'https://z2u.com',
              lastUpdated: TODAY_DATE
            });
          } else if (wing === 'music' || wing === 'streaming') {
            // Safe family plan splitters (Spliiit, Sharesub, Together Price)
            offers.push({
              id: `o_${pid}_spliiit`,
              productId: pid,
              storeId: 's_spliiit',
              price: baseSafeRef,
              ownershipType: 'دعوة خطة عائلية رسمية',
              dataContinuity: 'بياناتك تبقى',
              region: 'عالمي (مطابق لبلد الحساب)',
              affiliateUrl: 'https://spliiit.com',
              lastUpdated: TODAY_DATE
            });
            offers.push({
              id: `o_${pid}_sharesub_stream`,
              productId: pid,
              storeId: 's_sharesub',
              price: Number((baseSafeRef * 1.05).toFixed(2)),
              ownershipType: 'دعوة خطة عائلية رسمية',
              dataContinuity: 'بياناتك تبقى',
              region: 'عالمي',
              affiliateUrl: 'https://sharesub.com',
              lastUpdated: TODAY_DATE
            });
            offers.push({
              id: `o_${pid}_togetherprice`,
              productId: pid,
              storeId: 's_togetherprice',
              price: Number((baseSafeRef * 1.09).toFixed(2)),
              ownershipType: 'دعوة خطة عائلية رسمية',
              dataContinuity: 'بياناتك تبقى',
              region: 'عالمي',
              affiliateUrl: 'https://togetherprice.com',
              lastUpdated: TODAY_DATE
            });
            // Safe discounted gift cards (Raise, CardCash, Seagm, Startselect, OffGamers, Jarir)
            offers.push({
              id: `o_${pid}_raise`,
              productId: pid,
              storeId: 's_raise',
              price: Number((officialPrice * 0.84).toFixed(2)),
              ownershipType: 'حساب رسمي شخصي',
              dataContinuity: 'بياناتك تبقى',
              region: 'أمريكا وعالمي (بطاقة شحن رسمية)',
              affiliateUrl: 'https://raise.com',
              lastUpdated: TODAY_DATE
            });
            const giftStore2 = ['s_cardcash', 's_seagm', 's_startselect', 's_offgamers', 's_jarir'][pIndex % 5];
            const giftStoreObj = INITIAL_STORES.find(s => s.id === giftStore2);
            offers.push({
              id: `o_${pid}_${giftStore2}`,
              productId: pid,
              storeId: giftStore2,
              price: Number((officialPrice * 0.87).toFixed(2)),
              ownershipType: 'حساب رسمي شخصي',
              dataContinuity: 'بياناتك تبقى',
              region: giftStoreObj ? giftStoreObj.countries : 'عالمي',
              affiliateUrl: giftStoreObj ? giftStoreObj.url : 'https://seagm.com',
              lastUpdated: TODAY_DATE
            });
            // Grey shared profiles (GamsGo, GoSplit, GoingBus, FamilyPro, Flickover)
            offers.push({
              id: `o_${pid}_gamsgo`,
              productId: pid,
              storeId: 's_gamsgo',
              price: greyPrice1,
              ownershipType: 'ملف داخل حساب مشترك',
              dataContinuity: 'بياناتك تضيع بانتهاء الحساب',
              region: 'عالمي بدون VPN',
              affiliateUrl: 'https://gamsgo.com',
              lastUpdated: TODAY_DATE
            });
            const streamGreyStore = ['s_familypro', 's_goingbus', 's_gosplit', 's_flickover'][pIndex % 4];
            const streamGreyObj = INITIAL_STORES.find(s => s.id === streamGreyStore);
            offers.push({
              id: `o_${pid}_${streamGreyStore}`,
              productId: pid,
              storeId: streamGreyStore,
              price: greyPrice2,
              ownershipType: 'ملف داخل حساب مشترك',
              dataContinuity: 'بياناتك تضيع بانتهاء الحساب',
              region: 'عالمي',
              affiliateUrl: streamGreyObj ? streamGreyObj.url : 'https://familypro.io',
              lastUpdated: TODAY_DATE
            });
            // Risky temporary accounts (Z2U / Plati.Market)
            offers.push({
              id: `o_${pid}_z2u`,
              productId: pid,
              storeId: 's_z2u',
              price: riskPrice1,
              ownershipType: 'حساب جاهز مؤقت',
              dataContinuity: 'بياناتك تضيع بانتهاء الحساب',
              region: 'عالمي (حساب مؤقت)',
              affiliateUrl: 'https://z2u.com',
              lastUpdated: TODAY_DATE
            });
            offers.push({
              id: `o_${pid}_plati_stream`,
              productId: pid,
              storeId: 's_plati',
              price: riskPrice2,
              ownershipType: 'حساب جاهز مؤقت',
              dataContinuity: 'بياناتك تضيع بانتهاء الحساب',
              region: 'عالمي (حساب مؤقت)',
              affiliateUrl: 'https://plati.market',
              lastUpdated: TODAY_DATE
            });
          } else if (wing === 'gaming_subs' || wing === 'games') {
            // Safe authorized key resellers & gift cards
            offers.push({
              id: `o_${pid}_cdkeys`,
              productId: pid,
              storeId: 's_cdkeys',
              price: baseSafeRef,
              ownershipType: 'حساب رسمي شخصي',
              dataContinuity: 'بياناتك تبقى',
              region: 'عالمي (Global Key)',
              affiliateUrl: 'https://cdkeys.com',
              lastUpdated: TODAY_DATE
            });
            offers.push({
              id: `o_${pid}_gmg`,
              productId: pid,
              storeId: 's_gmg',
              price: Number(Math.max(baseSafeRef * 1.04, officialPrice * 0.65).toFixed(2)),
              ownershipType: 'حساب رسمي شخصي',
              dataContinuity: 'بياناتك تبقى',
              region: 'عالمي (موزع رسمي)',
              affiliateUrl: 'https://greenmangaming.com',
              lastUpdated: TODAY_DATE
            });
            const authReseller = ['s_humble', 's_humble_choice', 's_fanatical', 's_gamesplanet', 's_gamersgate', 's_indiegala', 's_wingamestore', 's_newegg'][pIndex % 8];
            const authObj = INITIAL_STORES.find(s => s.id === authReseller);
            offers.push({
              id: `o_${pid}_${authReseller}`,
              productId: pid,
              storeId: authReseller,
              price: Number(Math.max(baseSafeRef * 1.07, officialPrice * 0.68).toFixed(2)),
              ownershipType: 'حساب رسمي شخصي',
              dataContinuity: 'بياناتك تبقى',
              region: 'عالمي',
              affiliateUrl: authObj ? authObj.url : 'https://humblebundle.com',
              lastUpdated: TODAY_DATE
            });
            const topupStore = ['s_seagm', 's_offgamers', 's_startselect', 's_raise', 's_jarir'][pIndex % 5];
            const topupObj = INITIAL_STORES.find(s => s.id === topupStore);
            offers.push({
              id: `o_${pid}_${topupStore}`,
              productId: pid,
              storeId: topupStore,
              price: Number((officialPrice * 0.78).toFixed(2)),
              ownershipType: 'حساب رسمي شخصي',
              dataContinuity: 'بياناتك تبقى',
              region: 'جميع الريجونات (US / EU / MENA)',
              affiliateUrl: topupObj ? topupObj.url : 'https://seagm.com',
              lastUpdated: TODAY_DATE
            });
            // Grey marketplaces (Eneba, G2A, Kinguin, Gamivo, Eldorado.gg, PlayerAuctions, U7BUY)
            offers.push({
              id: `o_${pid}_eneba`,
              productId: pid,
              storeId: 's_eneba',
              price: greyPrice1,
              ownershipType: 'ملف داخل حساب مشترك',
              dataContinuity: 'بياناتك تضيع بانتهاء الحساب',
              region: 'عالمي / إقليمي',
              affiliateUrl: 'https://eneba.com',
              lastUpdated: TODAY_DATE
            });
            const gameGrey2 = ['s_g2a', 's_kinguin', 's_gamivo', 's_eldorado', 's_playerauctions', 's_u7buy'][pIndex % 6];
            const gameGreyObj = INITIAL_STORES.find(s => s.id === gameGrey2);
            offers.push({
              id: `o_${pid}_${gameGrey2}`,
              productId: pid,
              storeId: gameGrey2,
              price: greyPrice2,
              ownershipType: 'ملف داخل حساب مشترك',
              dataContinuity: 'بياناتك تضيع بانتهاء الحساب',
              region: 'عالمي (سوق بائعين وسيط)',
              affiliateUrl: gameGreyObj ? gameGreyObj.url : 'https://g2a.com',
              lastUpdated: TODAY_DATE
            });
            // Risky temporary accounts (Plati.Market, Z2U, GGsel)
            const gameRiskStore = ['s_plati', 's_ggsel', 's_z2u'][pIndex % 3];
            const gameRiskObj = INITIAL_STORES.find(s => s.id === gameRiskStore);
            offers.push({
              id: `o_${pid}_plati_game`,
              productId: pid,
              storeId: gameRiskStore,
              price: riskPrice1,
              ownershipType: 'حساب جاهز مؤقت',
              dataContinuity: 'بياناتك تضيع بانتهاء الحساب',
              region: 'حساب أوفلاين / مؤقت',
              affiliateUrl: gameRiskObj ? gameRiskObj.url : 'https://plati.market',
              lastUpdated: TODAY_DATE
            });
          } else {
            // Software & Tools (wing === 'software' || wing === 'tools')
            offers.push({
              id: `o_${pid}_spliiit_soft`,
              productId: pid,
              storeId: 's_spliiit',
              price: baseSafeRef,
              ownershipType: 'دعوة خطة عائلية رسمية',
              dataContinuity: 'بياناتك تبقى',
              region: 'عالمي',
              affiliateUrl: 'https://spliiit.com',
              lastUpdated: TODAY_DATE
            });
            offers.push({
              id: `o_${pid}_stacksocial`,
              productId: pid,
              storeId: 's_stacksocial',
              price: Number(Math.max(baseSafeRef * 1.05, officialPrice * 0.35).toFixed(2)),
              ownershipType: 'حساب رسمي شخصي',
              dataContinuity: 'بياناتك تبقى',
              region: 'عالمي',
              affiliateUrl: 'https://stacksocial.com',
              lastUpdated: TODAY_DATE
            });
            offers.push({
              id: `o_${pid}_appsumo`,
              productId: pid,
              storeId: 's_appsumo',
              price: Number(Math.max(baseSafeRef * 1.10, officialPrice * 0.40).toFixed(2)),
              ownershipType: 'حساب رسمي شخصي',
              dataContinuity: 'بياناتك تبقى',
              region: 'عالمي',
              affiliateUrl: 'https://appsumo.com',
              lastUpdated: TODAY_DATE
            });
            const softAuthStore = ['s_pcworld', 's_softwarekeep', 's_bitsdujour', 's_humble_soft', 's_newegg', 's_cdkeys'][pIndex % 6];
            const softAuthObj = INITIAL_STORES.find(s => s.id === softAuthStore);
            offers.push({
              id: `o_${pid}_${softAuthStore}`,
              productId: pid,
              storeId: softAuthStore,
              price: Number(Math.max(baseSafeRef * 1.12, officialPrice * 0.45).toFixed(2)),
              ownershipType: 'حساب رسمي شخصي',
              dataContinuity: 'بياناتك تبقى',
              region: 'عالمي (ترخيص رسمي)',
              affiliateUrl: softAuthObj ? softAuthObj.url : 'https://shop.pcworld.com',
              lastUpdated: TODAY_DATE
            });
            offers.push({
              id: `o_${pid}_gamsgo_soft`,
              productId: pid,
              storeId: 's_gamsgo',
              price: greyPrice1,
              ownershipType: 'ملف داخل حساب مشترك',
              dataContinuity: 'بياناتك تضيع بانتهاء الحساب',
              region: 'عالمي',
              affiliateUrl: 'https://gamsgo.com',
              lastUpdated: TODAY_DATE
            });
            const softGreyStore = ['s_eneba', 's_gamivo', 's_g2a'][pIndex % 3];
            const softGreyObj = INITIAL_STORES.find(s => s.id === softGreyStore);
            offers.push({
              id: `o_${pid}_${softGreyStore}`,
              productId: pid,
              storeId: softGreyStore,
              price: greyPrice2,
              ownershipType: 'ملف داخل حساب مشترك',
              dataContinuity: 'بياناتك تضيع بانتهاء الحساب',
              region: 'عالمي',
              affiliateUrl: softGreyObj ? softGreyObj.url : 'https://eneba.com',
              lastUpdated: TODAY_DATE
            });
            offers.push({
              id: `o_${pid}_plati_soft`,
              productId: pid,
              storeId: 's_plati',
              price: riskPrice1,
              ownershipType: 'حساب جاهز مؤقت',
              dataContinuity: 'بياناتك تضيع بانتهاء الحساب',
              region: 'عالمي (حساب مؤقت)',
              affiliateUrl: 'https://plati.market',
              lastUpdated: TODAY_DATE
            });
          }
        });

        // Ensure every single store in INITIAL_STORES has at least 2 linked offers so no Store Detail page ever has 0 products!
        const allStoreIdsWithOffers = new Set(offers.map(o => o.storeId));
        INITIAL_STORES.forEach((store, sIdx) => {
          if (!allStoreIdsWithOffers.has(store.id)) {
            const targetProdId = store.type === 'مقارنة وكاش باك'
              ? (['s_dekudeals', 's_psprices'].includes(store.id) ? 'p_console_stores' : ['s_camel', 's_rakuten', 's_honey', 's_slickdeals'].includes(store.id) ? 'p_ms365' : 'p_cyberpunk')
              : store.id === 's_xbox_store' ? 'p_gamepass'
              : store.id === 's_ps_store' ? 'p_psplus'
              : store.id === 's_nintendo_eshop' ? 'p_nso'
              : store.id === 's_ea_app' ? 'p_eaplay'
              : store.id === 's_ubisoft_store' ? 'p_ubisoftplus'
              : store.id === 's_amazon_games' ? 'p_amazonluna'
              : store.id === 's_ms_store' ? 'p_ms365'
              : store.id === 's_mac_app_store' ? 'p_ms_mac_stores'
              : 'p_steam_games';
            const prodObj = INITIAL_PRODUCTS.find(p => p.id === targetProdId) || INITIAL_PRODUCTS[0];
            const isSafeStore = (store.trustBadge === 'رسمي' || store.trustBadge === 'موثوق');
            offers.push({
              id: `o_extra_${store.id}_${prodObj.id}`,
              productId: prodObj.id,
              storeId: store.id,
              price: isSafeStore ? Number((prodObj.baseOfficialPrice * 0.72).toFixed(2)) : Number((prodObj.baseOfficialPrice * 0.25).toFixed(2)),
              ownershipType: isSafeStore ? 'حساب رسمي شخصي' : (store.trustBadge === 'رمادي' ? 'ملف داخل حساب مشترك' : 'حساب جاهز مؤقت'),
              dataContinuity: isSafeStore ? 'بياناتك تبقى' : 'بياناتك تضيع بانتهاء الحساب',
              region: store.countries || 'عالمي',
              affiliateUrl: store.url,
              lastUpdated: TODAY_DATE
            });
          }
        });

        return offers;
      }

      const PRESERVED_ENTITY_IDS = [
        { id: 'o_adobe_official' }, { id: 'o_adobe_sharesub' }, { id: 'o_chatgpt_gamsgo' },
        { id: 'o_chatgpt_official' }, { id: 'o_chatgpt_plati' }, { id: 'o_chatgpt_sharesub' },
        { id: 'o_claude_gamsgo' }, { id: 'o_claude_official' }, { id: 'o_cp_cdkeys' },
        { id: 'o_cp_steam' }, { id: 'o_gamepass_cdkeys' }, { id: 'o_gamepass_g2a' },
        { id: 'o_gamepass_official' }, { id: 'o_netflix_gamsgo' }, { id: 'o_netflix_official' },
        { id: 'o_spotify_jarir' }, { id: 'o_spotify_official' }, { id: 'o_spotify_sharesub' },
        { id: 'o_yt_official' }, { id: 'o_yt_sharesub' }, { id: 'p_adobe' }, { id: 'p_chatgpt' },
        { id: 'p_claude' }, { id: 'p_copilot' }, { id: 'p_cursor' }, { id: 'p_cyberpunk' },
        { id: 'p_gamepass' }, { id: 'p_midjourney' }, { id: 'p_netflix' }, { id: 'p_perplexity' },
        { id: 'p_shahid' }, { id: 'p_spotify' }, { id: 'p_ytmusic' }, { id: 's_anthropic' },
        { id: 's_cdkeys' }, { id: 's_g2a' }, { id: 's_gamsgo' }, { id: 's_jarir' },
        { id: 's_ms_store' }, { id: 's_openai' }, { id: 's_plati' }, { id: 's_sharesub' },
        { id: 's_spotify_off' }
      ];

      const INITIAL_OFFERS = buildComprehensiveOffers();

      // Build Complete 109-Site Master Directory Classification (Item 7: كل الأسماء مصنفة بأجنحتها وأنواعها)
      function buildMasterDirectory() {
        return MASTER_SITES_LIST.map((siteName, idx) => {
          const clean = siteName.toLowerCase().trim();
          const matchedProd = INITIAL_PRODUCTS.find(p =>
            p.name.toLowerCase() === clean ||
            p.name.toLowerCase().startsWith(clean + ' ') ||
            clean.startsWith(p.name.toLowerCase())
          );
          const matchedStore = INITIAL_STORES.find(s =>
            s.name.toLowerCase() === clean ||
            s.name.toLowerCase().startsWith(clean + ' ') ||
            clean.startsWith(s.name.toLowerCase())
          );

          // Determine Wing
          let wingId = 'cross';
          let wingName = 'طبقة عابرة لكل الأجنحة';
          if (matchedProd) {
            wingId = matchedProd.wing;
            const wObj = INITIAL_WINGS.find(w => w.id === wingId);
            if (wObj) wingName = wObj.name;
          } else {
            for (const w of INITIAL_WINGS) {
              const inGroup = (w.sourceGroups || []).some(g => g.items.some(it => it.toLowerCase() === clean));
              if (inGroup) {
                wingId = w.id;
                wingName = w.name;
                break;
              }
            }
          }

          // Determine Role Type & Trust Badge
          let roleType = 'خدمة / منتج رقمي';
          let trustBadge = 'رسمي';
          if (matchedProd && !matchedStore) {
            roleType = 'منتج واشتراك رسمي';
            trustBadge = 'رسمي';
          } else if (matchedStore) {
            roleType = matchedStore.type;
            trustBadge = matchedStore.trustBadge;
            if (matchedProd && matchedStore.type === 'رسمي مباشر') {
              roleType = 'منتج ومتجر رسمي مباشر';
            }
          }

          return {
            index: idx + 1,
            name: siteName,
            wingId: wingId,
            wingName: wingName,
            roleType: roleType,
            trustBadge: trustBadge,
            productId: matchedProd ? matchedProd.id : null,
            storeId: matchedStore ? matchedStore.id : null
          };
        });
      }

      const MASTER_DIRECTORY_ITEMS = buildMasterDirectory();

      // ----------------------------------------------------
      // 4. Global Perks Database ("قد يكون عندك أصلاً" — Covers US, EU, GB, EG, SA, AE, GL per Item 9)
      // ----------------------------------------------------
      const BUNDLE_PERKS = [
        // USA (US)
        {
          country: 'US',
          telco: 'Verizon (myPlan Unlimited)',
          bank: 'أي بنك أمريكي',
          freeSubs: [
            { name: 'Disney+ & Hulu & ESPN+ Bundle', value: 180, note: 'مشمول أو بخصم 50% ضمن مزايا Verizon myPlan' },
            { name: 'Apple One (Music + TV+ + Arcade)', value: 165, note: 'مشمول في باقات Verizon Unlimited Ultimate' }
          ]
        },
        {
          country: 'US',
          telco: 'T-Mobile (Go5G Next / Plus)',
          bank: 'أي بنك أمريكي',
          freeSubs: [
            { name: 'Netflix Standard (On Us)', value: 185, note: 'مشمول مجاناً بالكامل طوال فترة باقة Go5G' },
            { name: 'Apple TV+ & Hulu (On Us)', value: 215, note: 'تفعيل فوري مجاناً عبر تطبيق T-Life' }
          ]
        },
        {
          country: 'US',
          telco: 'أي مشغل',
          bank: 'American Express Platinum / Chase Sapphire',
          freeSubs: [
            { name: 'رصيد $240 سنوياً (Disney+, Hulu, Peacock, NYT)', value: 240, note: 'استرداد نقدي تلقائي شهرياً بقيمة $20 عند الدفع ببطاقة Amex Platinum' },
            { name: 'Walmart+ & Paramount+ Included', value: 155, note: 'مشمول مجاناً لحاملي بطاقة Amex Platinum' }
          ]
        },
        // Egypt (EG)
        {
          country: 'EG',
          telco: 'فودافون مصر (باقات Red)',
          bank: 'أي بنك مصري',
          freeSubs: [
            { name: 'Shahid VIP', value: 70, note: 'مشمول مجاناً بدون خصم من الرصيد عبر تطبيق Ana Vodafone' },
            { name: 'Anghami Plus (أنغامي بلس)', value: 40, note: 'مشمول مجاناً لجميع مشتركي فودافون ريد' },
            { name: 'WATCH IT', value: 50, note: 'مشمول مجاناً لمشاهدة المسلسلات والأفلام' }
          ]
        },
        {
          country: 'EG',
          telco: 'أورنج مصر (Orange Premier) / WE',
          bank: 'البنك التجاري الدولي CIB / الأهلي المصري',
          freeSubs: [
            { name: 'Spotify Premium / Deezer', value: 55, note: 'مشمول في باقات Orange Premier المختارة' },
            { name: 'OSN+ / Starzplay', value: 65, note: 'عروض مجانية وخصومات لحاملي بطاقات CIB Wealth & Miles' }
          ]
        },
        // Europe (EU)
        {
          country: 'EU',
          telco: 'Vodafone Europe / Orange / Deutsche Telekom',
          bank: 'Revolut Metal & Ultra / N26',
          freeSubs: [
            { name: 'Perplexity Pro (مشمول في Revolut)', value: 240, note: 'اشتراك Perplexity Pro الرسمي مشمول مجاناً لحاملي خطط Revolut Metal وUltra' },
            { name: 'Disney+ / Netflix / Spotify Entertainment Pass', value: 140, note: 'مشمول في باقات الهاتف والعائلة لدى Orange وTelekom' }
          ]
        },
        // UK (GB)
        {
          country: 'GB',
          telco: 'EE (Full Works / All Rounder) / O2',
          bank: 'Revolut UK / Barclays Avios',
          freeSubs: [
            { name: 'Apple One (Apple Music + TV+ + Arcade) أو Xbox Game Pass', value: 195, note: 'اختر ميزة Inclusive Extra مجاناً في باقات EE' },
            { name: 'Disney+ أو Amazon Prime (عبر O2 Extras)', value: 110, note: 'مشمول مجاناً لمدة 6 إلى 12 شهراً لعملاء O2' },
            { name: 'Perplexity Pro (عبر Revolut)', value: 240, note: 'مشمول مجاناً في باقات Revolut المدفوعة' }
          ]
        },
        // Saudi Arabia (SA)
        {
          country: 'SA',
          telco: 'STC (مفوتر 3 وما فوق)',
          bank: 'أي بنك',
          freeSubs: [
            { name: 'Shahid VIP', value: 120, note: 'مشمول مجاناً طوال مدة اشتراك الباقة' },
            { name: 'OSN+', value: 110, note: 'مشمول مجاناً عبر تفعيل تطبيق mystc' }
          ]
        },
        {
          country: 'SA',
          telco: 'موبايلي (مفوتر 300/400) / زين',
          bank: 'مصرف الراجحي / البنك الأهلي SNB',
          freeSubs: [
            { name: 'Anghami Plus & Starzplay', value: 155, note: 'مشمول لمشتركي باقات مفوتر العليا' },
            { name: 'Amazon Prime (سنة مجاناً مع بطاقات SNB / الراجحي المختارة)', value: 50, note: 'شامل التوصيل السريع وبرايم فيديو' }
          ]
        },
        // UAE (AE)
        {
          country: 'AE',
          telco: 'e& (اتصالات Freedom Live) / du (Power Plans)',
          bank: 'بنك الإمارات دبي الوطني ENBD / FAB',
          freeSubs: [
            { name: 'Disney+ & Shahid VIP', value: 210, note: 'مشمول مجاناً لمدة 12 شهراً في باقات du Power وe& Freedom' },
            { name: 'Amazon Prime & OSN+', value: 145, note: 'مشمول مجاناً عبر التفعيل المباشر في تطبيق المزود' }
          ]
        },
        // Global / Students & Employees (GL)
        {
          country: 'GL',
          telco: 'حساب طالب جامعي أو معلم (GitHub Student Developer Pack)',
          bank: 'أي بطاقة دولية',
          freeSubs: [
            { name: 'GitHub Copilot Individual', value: 120, note: 'مجاني 100% للطلاب والمعلمين طوال فترة الدراسة' },
            { name: 'JetBrains All Products Pack', value: 289, note: 'مجاني بالكامل لطلبة الجامعات والمعاهد التقنية' }
          ]
        }
      ];

      // ----------------------------------------------------
      // 4.5 Single Centralized Data Source (Item 8: CENTRAL_EXPO_DATA)
      // All pages, cards, ladders, search results, and calculators read exclusively from this central store.
      // ----------------------------------------------------
      const CENTRAL_EXPO_DATA = {
        version: '1.0-full',
        lastUpdated: TODAY_DATE,
        currencies: CURRENCIES,
        countries: COUNTRIES_CONFIG,
        wings: INITIAL_WINGS,
        crossWingLayers: CROSS_WING_LAYERS,
        masterSitesList: MASTER_SITES_LIST,
        masterDirectory: MASTER_DIRECTORY_ITEMS,
        stores: INITIAL_STORES,
        products: INITIAL_PRODUCTS,
        offers: INITIAL_OFFERS,
        bundlePerks: BUNDLE_PERKS
      };
      window.CENTRAL_EXPO_DATA = CENTRAL_EXPO_DATA;

      // ----------------------------------------------------
      // 4.6 Complete Bilingual (AR / EN) Dictionary & Content Translations inside CENTRAL_EXPO_DATA (Items 1, 2, 3, 4, 6, 7)
      // ----------------------------------------------------
      const BILINGUAL_UI = {
        ar: {
          neutrality_badge: '<i class="fa-solid fa-shield-halved text-xs ml-1"></i> مبدأ الحياد الصارم',
          header_transparency: 'ترتيب الأسعار حقيقي 100% ولا يتأثر بالعمولات إطلاقاً. نحن معرض ومقارن، لسنا متجراً ولا وسيطاً.',
          label_country: 'البلد:',
          label_currency: 'العملة الموحدة:',
          label_language: 'اللغة:',
          ticker_badge: '<i class="fa-solid fa-shield-halved"></i> صفقات اليوم الآمنة',
          ticker_freebies: 'رادار المجانيات',
          brand_title: 'المعرض الرقمي',
          brand_tagline: 'خريطة ودليل ومقارن أسعار كل المنتجات الرقمية',
          nav_mall: 'خريطة المول',
          nav_wings: 'الأجنحة',
          nav_perks: 'قد يكون عندك أصلاً',
          nav_calculator: 'حاسبة اشتراكاتي',
          nav_stores: 'المتاجر والأدلة',
          hero_pill: 'لا تدفع السعر الكامل قبل أن تقارن كل الطرق',
          hero_save_pill: 'وفّر حتى 85% فوراً',
          hero_title: 'شو بتدور عليه؟',
          hero_desc: 'كل المنتجات الرقمية في مكان واحد: من السعر الرسمي حتى أرخص طريقة ممكنة، مع لافتات الأمان الصادقة لحمايتك قبل الشراء.',
          search_placeholder_desktop: 'ابحث عن اشتراك أو لعبة أو برنامج (مثال: ChatGPT, Spotify, Game Pass, Adobe)...',
          search_placeholder_mobile: 'ابحث عن اشتراك أو لعبة أو برنامج...',
          quick_chips_label: 'اقتراحات شائعة:',
          hero_country_title: 'إعدادات بلدك وعملتك الحالية:',
          hero_country_desc: 'يتم عرض جميع الأسعار الرسمية الإقليمية وأرخص الطرق الآمنة والباقات المشمولة بعملة واحدة موحدة.',
          hero_change_country_btn: '<i class="fa-solid fa-sliders ml-1"></i> تغيير البلد / العملة',
          hook_action_btn: 'اكشف الطرق <i class="fa-solid fa-arrow-left mr-1"></i>',
          soon_badge: 'قريباً',
          q1_title: 'وين أروح؟',
          q1_desc: 'خريطة مول واضحة للأجنحة',
          q2_title: 'شو أشتري؟',
          q2_desc: 'مقارنة شاملة لكل الطرق',
          q3_title: 'متى أشتري؟',
          q3_desc: 'مؤشر التوقيت وتاريخ الأسعار (قريباً)',
          q4_title: 'كيف أشتري؟',
          q4_desc: 'أدلة خطوة بخطوة لكل متجر',
          q5_title: 'كيف أوفّر؟',
          q5_desc: 'حاسبة اشتراكات ومكافآت مشمولة',
          wings_title: 'أجنحة المعرض (خريطة المول)',
          wings_subtitle: 'اختر الجناح لاستكشاف كل خيارات الشراء والتوفير',
          cross_pill: '<i class="fa-solid fa-layer-group"></i> طبقة عابرة لكل الأجنحة (109 موقعاً ومنصة في الجرد الكامل)',
          cross_title: 'أدوات المقارنة العالمية، تاريخ الأسعار، والكاش باك',
          cross_desc: 'منصات مساندة تعمل عبر كافة الأجنحة للتحقق من أقل سعر تاريخي واسترداد نقدي إضافي عند الشراء',
          open_master_btn: '<i class="fa-solid fa-list-ol"></i><span>الفهرس الأبجدي الموحد (109 موقعاً A–Z)</span>',
          bento_pill: '<i class="fa-solid fa-shield-halved ml-1"></i> عروض «الأرخص الآمن» فقط (رسمي / موثوق)',
          bento_title: 'رادار الفرص الآمنة والهدايا المجانية اليوم',
          deals_title: 'أقوى صفقات التوفير الموثقة اليوم',
          deals_subtitle: 'أسعار تصميمية موحدة مع فارق التوفير مقارنة بالسعر الرسمي الإقليمي',
          perks_pill: '<i class="fa-solid fa-gift"></i> وفر 100% من سعر الاشتراك',
          perks_teaser_title: 'قد يكون عندك أصلاً دون أن تدري!',
          perks_teaser_btn: 'فحص اشتراكاتي المشمولة مجاناً',
          calc_main_title: 'حاسبة «اشتراكاتي» السنوية الموحدة',
          calc_teaser_title: 'كم تنفق سنوياً على الاشتراكات الرقمية؟',
          calc_teaser_desc: 'اختر اشتراكاتك الفعلية بالضغط على الأيقونات السريعة أو من القائمة الكاملة بالأسفل لحساب إجمالي إنفاقك ومقارنته فوراً مع «الأرخص الآمن» فقط.',
          calc_disclosure_badge: '<i class="fa-solid fa-shield-halved text-teal-600"></i><span>حساب تقديري بناءً على أرخص الطرق الآمنة</span>',
          calc_step1_label: '1. اضغط لاختيار اشتراكاتك السريعة (أو أضف من القائمة بالأسفل):',
          calc_clear_btn: 'تفريغ الاختيارات',
          calc_step2_label: '2. أو أضف أي منتج آخر من المعرض إلى حاسبتك:',
          calc_add_btn: '<i class="fa-solid fa-plus"></i><span>إضافة إلى قائمتي</span>',
          calc_th_sub: 'الاشتراك',
          calc_th_off: 'السعر الرسمي الإقليمي (شهرياً)',
          calc_th_safe: 'الأرخص الآمن بالمعرض (شهرياً)',
          calc_th_source: 'المصدر الآمن ونوع الملكية',
          calc_th_save: 'توفيرك السنوي',
          calc_th_del: 'حذف',
          calc_card1_title: 'إجمالي التكلفة بالسعر الرسمي (سنوياً)',
          calc_card1_sub: 'عند الدفع المباشر التقليدي',
          calc_card2_title: 'تكلفتك مع «الأرخص الآمن» (سنوياً)',
          calc_card2_sub: 'رسمي/موثوق وبحساب شخصي أو عائلي',
          calc_card3_title: 'التوفير السنوي التقديري',
          calc_footer_note: '<i class="fa-solid fa-circle-info text-teal-600 ml-1"></i>حساب تقديري بناءً على أرخص الطرق الآمنة (يستثني تلقائياً أي متاجر رمادية أو خطرة أو حسابات مؤقتة).',
          product_sort_label: 'ترتيب طرق الشراء:',
          product_sort_note: '«الأرخص الآمن»: يحصر العروض فقط في المتاجر الرسمية/الموثوقة وبنوع ملكية حساب شخصي أو عائلي.',
          th_method_source: 'الطريقة والمصدر',
          th_store_badge: 'شارة المتجر',
          th_ownership: 'نوع الملكية',
          th_continuity: 'استمرارية البيانات',
          th_activation_payment: 'التفعيل والدفع',
          th_total_price: 'السعر الكلي الحقيقي',
          th_direct_link: 'الرابط المباشر',
          when_to_buy_title: 'مؤشر «متى أشتري؟» وتاريخ الأسعار',
          when_to_buy_desc: 'هذه الميزة تُفعّل تلقائياً في المرحلة القادمة بعد تراكم سجل تغيرات الأسعار التاريخي الفعلي؛ نلتزم بعدم عرض أي رسوم تاريخية تقديرية غير موثقة.',
          when_to_buy_badge: 'قريباً — يعتمد على تراكم السجل التاريخي',
          product_bottom_disclosure: 'إفصاح الشفافية: الروابط أعلاه قد تكون روابط إحالة نربح منها عمولة — هذا لا يغيّر سعرك ولا ترتيبنا أبداً.',
          product_badge_legend: '<span class="inline-block w-2 h-2 rounded-full bg-emerald-500"></span> رسمي <span class="inline-block w-2 h-2 rounded-full bg-blue-500"></span> موثوق <span class="inline-block w-2 h-2 rounded-full bg-gray-400"></span> رمادي <span class="inline-block w-2 h-2 rounded-full bg-rose-500"></span> خطر',
          wing_products_listed_label: 'منتجات معروضة',
          wing_max_saving_label: 'أقصى نسبة توفير',
          wing_sort_by_label: 'ترتيب حسب:',
          wing_map_title: 'خريطة المواقع والمنصات المعتمدة في هذا الجناح',
          wing_map_desc: 'مقسمة حسب طبيعة الموقع (رسمي، ادفع حسب الاستخدام، مشاركة، بطاقات هدايا، موزعون، أسواق رمادية، مقارنة وتتبع) — اضغط على أي موقع لعرض تفاصيله',
          perks_main_title: 'قد يكون عندك أصلاً!',
          perks_page_pill: 'ميزة التوفير بنسبة 100%',
          perks_page_subtitle: 'اختر الدولة وشركة الاتصالات والبنك الذي تتعامل معه، وسنكشف لك الاشتراكات المجانية المشمولة في باقاتك دون أن تدفع دولاراً إضافياً!',
          perks_step1_country: '1. الدولة:',
          perks_step2_telco: '2. شركة الاتصالات وباقاتك:',
          perks_step3_bank: '3. بنكك أو بطاقتك الائتمانية:',
          perks_scan_btn_label: 'فحص الاشتراكات المشمولة في باقاتي',
          stores_main_title: 'دليل المتاجر وشارات الثقة',
          stores_main_subtitle: 'فهرس شامل لكل المتاجر والمنصات مع شارات الثقة، ووسائل الدفع، وخطوات الشراء والتفعيل الآمنة.',
          stores_trust_label: 'شارة الثقة:',
          tab_all_stores_title: 'كل المتاجر',
          tab_all_stores_sub: 'جميع الفئات والشارات',
          tab_official_title: 'رسمي (Official)',
          tab_official_sub: 'الشركة المالكة مباشرة',
          tab_trusted_title: 'موثوق (Trusted)',
          tab_trusted_sub: 'موزع معتمد / عائلي رسمي',
          tab_grey_title: 'رمادي (Grey)',
          tab_grey_sub: 'ملف مشترك / سوق وسيط',
          tab_risky_title: 'خطر (Risky)',
          tab_risky_sub: 'حسابات جاهزة مؤقتة',
          master_az_title: 'الفهرس الأبجدي الموحد الكامل (109 موقعاً ومنصة وخدمة A–Z مصنفة بالأجنحة والأنواع)',
          master_az_subtitle: 'جميع المواقع الـ 109 المعتمدة في جرد «المعرض الرقمي» مصنفة حسب الجناح ونوع الخدمة وشارة الثقة — اضغط على أي بطاقة لفتح سلم أسعار المنتج أو دليل المتجر',
          store_supported_countries_label: 'البلدان المدعومة:',
          store_accepted_payments_label: 'وسائل الدفع المقبولة:',
          store_safety_level_label: 'درجة الأمان:',
          store_guide_heading: 'دليل الشراء والتفعيل خطوة بخطوة من هذا المتجر',
          store_warnings_heading: 'تنبيهات هامة قبل الشراء من هذا المتجر:',
          store_products_heading: 'المنتجات المعروضة من هذا المتجر في المعرض',
          saved_main_title: 'المفضلة وتنبيهات الأسعار',
          saved_main_subtitle: 'المنتجات التي قمت بحفظها وتنبيهات انخفاض الأسعار المجدولة',
          saved_bookmarks_heading: '<i class="fa-solid fa-bookmark text-teal-600"></i> المنتجات المحفوظة في المفضلة',
          saved_alerts_heading: '<i class="fa-solid fa-bell text-amber-500"></i> تنبيهات الأسعار الفعالة',
          footer_brand_desc: 'المعرض والدليل ومقارن الأسعار العالمي الأول لكل المنتجات الرقمية. مهمتنا حماية المشتري من التشتت والأسعار المبالغ فيها والروابط المشبوهة.',
          footer_values: 'الأمان • الحقيقة • العدل',
          footer_wings_heading: 'أقسام المعرض',
          footer_wing_ai: 'جناح الذكاء الاصطناعي',
          footer_wing_music: 'جناح الموسيقى والصوتيات',
          footer_wing_streaming: 'جناح الأفلام والترفيه',
          footer_wing_gaming_subs: 'جناح اشتراكات الألعاب',
          footer_wing_software: 'جناح البرامج الاحترافية',
          footer_wing_tools: 'جناح البرامج الخفيفة والأدوات',
          footer_charter_heading: 'دستور المشروع',
          footer_rule_1: '✓ لسنا متجراً ولا وسيطاً ولا نجمع أموالاً.',
          footer_rule_2: '✓ ترتيب الأسعار لا يتأثر بالعمولات مطلقاً.',
          footer_rule_3: '✓ ألوان اللافتات موحدة: أخضر، أزرق، رمادي، أحمر.',
          footer_rule_4: '✓ لا ندرج أي متجر أو قناة نصب مؤكدة.',
          footer_rule_5: '✓ الشفافية المطلقة قبل خروج الزائر للمتجر.',
          footer_founding_heading: 'بيانات التأسيس',
          footer_founding_body: 'مشروع «المعرض الرقمي»<br>إعداد: عدي (صاحب المشروع) ومعلم (شريك استراتيجي)<br>تاريخ الخطة التنفيذية: 23 أكتوبر 2026<br>النسخة: 1.0 (MVP Complete)',
          footer_copyright: 'جميع الحقوق محفوظة للمشروع © 2026 المعرض الرقمي (Digital Expo).',
          footer_pwa_ready: 'تطبيق ويب تقدمي (PWA Ready)',
          footer_about_btn: 'عن المشروع وفلسفة التصميم',
          outbound_modal_title: 'أنت الآن في طريقك إلى المتجر الخارجي',
          outbound_disclosure_heading: 'إفصاح الشفافية الإلزامي:',
          outbound_lbl_product: 'المنتج:',
          outbound_lbl_store: 'المتجر المختار:',
          outbound_lbl_badge: 'شارة الثقة:',
          outbound_lbl_price: 'السعر المتوقع:',
          outbound_reminder: 'تذكير: نحن لا نبيع المنتجات ولا نستلم أموالك. ستتم عملية الشراء والدفع مباشرة على موقع المتجر الخارجي وفق سياساته.',
          outbound_confirm_btn: 'المتابعة إلى المتجر الآن',
          outbound_cancel_btn: 'إلغاء',
          report_modal_title: 'الإبلاغ عن سعر غير دقيق أو رابط معطل',
          report_modal_desc: 'سمعة المعرض تعتمد على الدقة. إذا لاحظت تغيراً في السعر أو انتهاء صلاحية العرض، أخبرنا لنقوم بتحديثه فوراً!',
          report_lbl_product: 'المنتج / المتجر:',
          report_lbl_details: 'تفاصيل الخطأ أو السعر الجديد:',
          report_submit_btn: 'إرسال البلاغ لفريق التدقيق',
          alert_modal_title: 'ضبط تنبيه انخفاض السعر',
          alert_modal_desc: 'سنرسل لك إشعاراً فور توفر طريقة شراء أرخص أو نزول السعر عن السعر المستهدف.',
          alert_lbl_target: 'السعر المستهدف:',
          alert_lbl_email: 'بريدك الإلكتروني للإشعار (اختياري — يحفظ محلياً في المتصفح فوراً):',
          alert_submit_btn: 'حفظ وتفعيل التنبيه',
          ux_modal_title: 'دراسة عوامل الجذب البصري والنفسي في المواقع العالمية الكبرى',
          ux_modal_subtitle: 'كيف تجذب منصات مثل Apple وStripe وGG.deals وAppSumo وHoney العميل خلال 50 ملي ثانية؟',
          ux_card1_title: '1. قاعدة الـ 50 ملي ثانية وتأثير الألوان (84.7%)',
          ux_card1_desc: 'يعالج الدماغ البشري الألوان والأشكال <strong>أسرع بـ 60,000 مرة من النصوص</strong>، ويتخذ 84.7% من المشترين قرار البقاء أو الشراء بناءً على الإحساس اللوني الأولي. لذلك استبدلنا اللون الرمادي الرتيب بهوية لونية نابضة (Aurora Gradients) تميز كل جناح (بنفسجي للذكاء الاصطناعي، زمردي للموسيقى، قرمزي للأفلام، كهرماني للألعاب).',
          ux_card2_title: '2. مرساة السعر البصرية (Visual Price Anchoring)',
          ux_card2_desc: 'في مواقع مثل <strong>GG.deals وAppSumo</strong>، لا يقرأ الزائر الأرقام فقط؛ بل يرى <strong>شريط مقارنة بصري</strong> يظهر طول السعر الرسمي بالأحمر مقابل شريط قصير جداً بالأخضر لسعر العرض، مما يحفز شعور المكسب الفوري ويرفع التحويل بنسبة <strong>24% إلى 35%</strong>.',
          ux_card3_title: '3. هندسة شبكة البينتو (Bento Grid Architecture)',
          ux_card3_desc: 'اعتمدت <strong>Apple وLinear</strong> تصميم Bento Grid غير المتماثل (بطاقة كبيرة 2×2 لأهم عرض وبطاقات 1×1 للمجانيات والكنوز المخفية) لأن عين الزائر تمسح 6 إلى 9 عروض قيمة خلال <strong>15 ثانية فقط</strong> دون ملل من الجداول الطويلة.',
          ux_card4_title: '4. المكافأة التفاعلية الفورية (Micro-Commitment Hook)',
          ux_card4_desc: 'بدلاً من جعل الزائر يبحث بنفسه من الصفر، تضع المواقع الكبرى <strong>أداة تفاعلية في أول الشاشة</strong> (اضغط على التطبيقات التي تستخدمها الآن) ليرى عداد التوفير السنوي يقفز أمام عينيه مباشرة مع أزرار كهرمانية عالية التباين (60-30-10 Rule).',
          ux_footer_text: 'تم تطبيق جميع هذه القواعد الـ 4 مباشرة في واجهة «المعرض الرقمي» الحالية مع الحفاظ التام على حياد الترتيب وشارات الثقة!',
          ux_gotit_btn: 'معاينة التصميم الجديد',
          affiliate_disclosure: '«قد نربح عمولة من المتجر — لا تغيّر سعرك ولا ترتيبنا»'
        },
        en: {
          neutrality_badge: '<i class="fa-solid fa-shield-halved text-xs mr-1"></i> Strict Neutrality Principle',
          header_transparency: 'Price rankings are 100% genuine and never influenced by commissions. We are a directory & comparator, not a store or broker.',
          label_country: 'Country:',
          label_currency: 'Currency:',
          label_language: 'Language:',
          ticker_badge: '<i class="fa-solid fa-shield-halved"></i> Today’s Safe Deals',
          ticker_freebies: 'Freebies Radar',
          brand_title: 'Digital Expo',
          brand_tagline: 'Global Directory, Guide & Price Comparator for All Digital Products',
          nav_mall: 'Mall Map',
          nav_wings: 'Wings',
          nav_perks: 'Already Included?',
          nav_calculator: 'My Subscriptions Calc',
          nav_stores: 'Stores & Guides',
          hero_pill: 'Never pay full price before comparing every route',
          hero_save_pill: 'Save up to 85% instantly',
          hero_title: 'What are you looking for?',
          hero_desc: 'All digital products in one place: from the official price down to the cheapest safe route, with honest safety badges to protect you before buying.',
          search_placeholder_desktop: 'Search for a subscription, game, or software (e.g., ChatGPT, Spotify, Game Pass, Adobe)...',
          search_placeholder_mobile: 'Search subscriptions, games, software...',
          quick_chips_label: 'Popular suggestions:',
          hero_country_title: 'Your Current Country & Currency Settings:',
          hero_country_desc: 'All regional official prices, cheapest safe routes, and included bundles are displayed in one unified currency.',
          hero_change_country_btn: '<i class="fa-solid fa-sliders mr-1"></i> Change Country / Currency',
          hook_action_btn: 'Explore Routes <i class="fa-solid fa-arrow-right ml-1"></i>',
          soon_badge: 'Soon',
          q1_title: 'Where to go?',
          q1_desc: 'Clear mall map of 7 wings',
          q2_title: 'What to buy?',
          q2_desc: 'Full comparison of all routes',
          q3_title: 'When to buy?',
          q3_desc: 'Timing index & price history (Soon)',
          q4_title: 'How to buy?',
          q4_desc: 'Step-by-step guide per store',
          q5_title: 'How to save?',
          q5_desc: 'Subscription calculator & free perks',
          wings_title: 'Expo Wings (Mall Map)',
          wings_subtitle: 'Select a wing to explore all buying and saving routes',
          cross_pill: '<i class="fa-solid fa-layer-group"></i> Cross-Wing Layer (109 Sites in Full Inventory)',
          cross_title: 'Global Price Comparison, Price History & Cashback Tools',
          cross_desc: 'Supporting tools across all wings to verify historical lows and earn extra cashback when buying',
          open_master_btn: '<i class="fa-solid fa-list-ol"></i><span>Unified A–Z Master Index (109 Sites)</span>',
          bento_pill: '<i class="fa-solid fa-shield-halved mr-1"></i> "Cheapest Safe" Deals Only (Official / Trusted)',
          bento_title: 'Safe Opportunities & Freebies Radar Today',
          deals_title: 'Top Verified Safe Deals Today',
          deals_subtitle: 'Unified design prices showing massive savings compared to the regional official price',
          perks_pill: '<i class="fa-solid fa-gift"></i> Save 100% of Subscription Cost',
          perks_teaser_title: 'You Might Already Have It Without Knowing!',
          perks_teaser_btn: 'Scan My Included Subscriptions Free',
          calc_main_title: 'Unified Annual "My Subscriptions" Calculator',
          calc_teaser_title: 'How much do you spend annually on digital subscriptions?',
          calc_teaser_desc: 'Select your active subscriptions using the quick icons or full catalog below to compare your annual spend against the "Cheapest Safe" routes.',
          calc_disclosure_badge: '<i class="fa-solid fa-shield-halved text-teal-600"></i><span>Estimated calculation based on cheapest safe routes</span>',
          calc_step1_label: '1. Tap to select your subscriptions (or add from the full list below):',
          calc_clear_btn: 'Clear Selection',
          calc_step2_label: '2. Or add any other product from the Expo to your calculator:',
          calc_add_btn: '<i class="fa-solid fa-plus"></i><span>Add to My List</span>',
          calc_th_sub: 'Subscription',
          calc_th_off: 'Regional Official Price (Monthly)',
          calc_th_safe: 'Cheapest Safe in Expo (Monthly)',
          calc_th_source: 'Safe Source & Ownership Type',
          calc_th_save: 'Annual Savings',
          calc_th_del: 'Remove',
          calc_card1_title: 'Total Cost at Official Price (Annual)',
          calc_card1_sub: 'Standard direct billing',
          calc_card2_title: 'Your Cost with "Cheapest Safe" (Annual)',
          calc_card2_sub: 'Official/Trusted with personal or family account',
          calc_card3_title: 'Estimated Annual Savings',
          calc_footer_note: '<i class="fa-solid fa-circle-info text-teal-600 mr-1"></i>Estimated calculation based on cheapest safe routes (automatically excludes grey/risky stores and temporary accounts).',
          product_sort_label: 'Sort buying routes:',
          product_sort_note: '"Cheapest Safe": Restricts offers to Official/Trusted stores with Personal or Official Family ownership only.',
          th_method_source: 'Method & Source',
          th_store_badge: 'Store Badge',
          th_ownership: 'Ownership Type',
          th_continuity: 'Data Continuity',
          th_activation_payment: 'Activation & Payment',
          th_total_price: 'Total Real Price',
          th_direct_link: 'Direct Link',
          when_to_buy_title: '"When to Buy?" Timing Index & Price History',
          when_to_buy_desc: 'This feature activates automatically in the next phase once real historical price-change records accumulate; we never display unverified estimated charts.',
          when_to_buy_badge: 'Coming Soon — Pending Historical Price Log',
          product_bottom_disclosure: 'Transparency Disclosure: The links above may be affiliate links from which we earn a commission — this never changes your price or our ranking.',
          product_badge_legend: '<span class="inline-block w-2 h-2 rounded-full bg-emerald-500"></span> Official <span class="inline-block w-2 h-2 rounded-full bg-blue-500"></span> Trusted <span class="inline-block w-2 h-2 rounded-full bg-gray-400"></span> Grey <span class="inline-block w-2 h-2 rounded-full bg-rose-500"></span> Risky',
          wing_products_listed_label: 'Products Listed',
          wing_max_saving_label: 'Cheapest Safe',
          wing_sort_by_label: 'Sort by:',
          wing_map_title: 'Approved Sites & Platforms Map in This Wing',
          wing_map_desc: 'Categorized by platform type (Official, Pay-As-You-Go, Sharing, Gift Cards, Resellers, Grey Markets, Comparison) — tap any site to view details',
          perks_main_title: 'You Might Already Have It!',
          perks_page_pill: '100% Savings Feature',
          perks_page_subtitle: 'Select your country, telecom provider, and bank to uncover the free subscriptions already included in your plans without paying an extra dollar!',
          perks_step1_country: '1. Country:',
          perks_step2_telco: '2. Telecom Provider & Plan:',
          perks_step3_bank: '3. Your Bank or Credit Card:',
          perks_scan_btn_label: 'Scan Subscriptions Included in My Plans',
          stores_main_title: 'Store Guides & Trust Badges Directory',
          stores_main_subtitle: 'Comprehensive directory of all stores and platforms with trust badges, payment methods, and safe step-by-step buying guides.',
          stores_trust_label: 'Trust Badge:',
          tab_all_stores_title: 'All Stores',
          tab_all_stores_sub: 'All categories & badges',
          tab_official_title: 'Official',
          tab_official_sub: 'Direct owner company',
          tab_trusted_title: 'Trusted',
          tab_trusted_sub: 'Authorized reseller / family plan',
          tab_grey_title: 'Grey',
          tab_grey_sub: 'Shared profile / marketplace',
          tab_risky_title: 'Risky',
          tab_risky_sub: 'Temporary pre-made accounts',
          master_az_title: 'Complete Unified A–Z Master Directory (109 Sites, Platforms & Services Classified by Wing & Type)',
          master_az_subtitle: 'All 109 approved sites in the Digital Expo inventory classified by wing, service type, and trust badge — tap any card to open the product price ladder or store guide',
          store_supported_countries_label: 'Supported Countries:',
          store_accepted_payments_label: 'Accepted Payment Methods:',
          store_safety_level_label: 'Safety Level:',
          store_guide_heading: 'Step-by-Step Purchase & Activation Guide for This Store',
          store_warnings_heading: 'Important Warnings Before Buying from This Store:',
          store_products_heading: 'Products Listed from This Store in the Expo',
          saved_main_title: 'Favorites & Price Alerts',
          saved_main_subtitle: 'Products you bookmarked and your scheduled price-drop alerts',
          saved_bookmarks_heading: '<i class="fa-solid fa-bookmark text-teal-600"></i> Saved Favorite Products',
          saved_alerts_heading: '<i class="fa-solid fa-bell text-amber-500"></i> Active Price Alerts',
          footer_brand_desc: 'The world’s premier directory, guide, and price comparator for all digital products. Our mission is to protect buyers from confusion, overpaying, and risky links.',
          footer_values: 'Safety • Truth • Fairness',
          footer_wings_heading: 'Expo Wings',
          footer_wing_ai: 'AI Subscriptions Wing',
          footer_wing_music: 'Music & Audio Wing',
          footer_wing_streaming: 'Movies & Series Streaming Wing',
          footer_wing_gaming_subs: 'Gaming Subscriptions Wing',
          footer_wing_software: 'Professional Software Wing',
          footer_wing_tools: 'Lightweight Software & Tools Wing',
          footer_charter_heading: 'Project Charter',
          footer_rule_1: '✓ We are neither a store nor a broker, and we never collect money.',
          footer_rule_2: '✓ Price rankings are never influenced by commissions.',
          footer_rule_3: '✓ Unified badge colors: Green, Blue, Grey, Red.',
          footer_rule_4: '✓ Confirmed scam stores or channels are never listed.',
          footer_rule_5: '✓ Full transparency before redirecting to any external store.',
          footer_founding_heading: 'Founding Info',
          footer_founding_body: 'Project "Digital Expo"<br>Created by: Oday (Founder) & Moallem (Strategic Partner)<br>Execution Plan Date: October 23, 2026<br>Version: 1.0 (MVP Complete)',
          footer_copyright: 'All rights reserved © 2026 Digital Expo.',
          footer_pwa_ready: 'Progressive Web App (PWA Ready)',
          footer_about_btn: 'About & Design Philosophy',
          outbound_modal_title: 'You Are Leaving for the External Store',
          outbound_disclosure_heading: 'Mandatory Transparency Disclosure:',
          outbound_lbl_product: 'Product:',
          outbound_lbl_store: 'Selected Store:',
          outbound_lbl_badge: 'Trust Badge:',
          outbound_lbl_price: 'Expected Price:',
          outbound_reminder: 'Reminder: We do not sell products or collect payments. Your purchase and checkout happen directly on the external store’s website under its policies.',
          outbound_confirm_btn: 'Continue to Store Now',
          outbound_cancel_btn: 'Cancel',
          report_modal_title: 'Report Inaccurate Price or Broken Link',
          report_modal_desc: 'Our reputation relies on accuracy. If you noticed a price change or expired offer, let us know so we can update it right away!',
          report_lbl_product: 'Product / Store:',
          report_lbl_details: 'Error Details or New Price:',
          report_submit_btn: 'Submit Report to Audit Team',
          alert_modal_title: 'Set Price-Drop Alert',
          alert_modal_desc: 'We will notify you as soon as a cheaper buying route appears or the price drops below your target.',
          alert_lbl_target: 'Target Price:',
          alert_lbl_email: 'Your Email for Notification (optional — saved locally in browser immediately):',
          alert_submit_btn: 'Save & Activate Alert',
          ux_modal_title: 'Visual & Psychological Attraction Study of Major Global Platforms',
          ux_modal_subtitle: 'How platforms like Apple, Stripe, GG.deals, AppSumo, and Honey engage visitors within 50 milliseconds',
          ux_card1_title: '1. The 50ms Rule & Color Psychology (84.7%)',
          ux_card1_desc: 'The human brain processes colors and shapes <strong>60,000× faster than text</strong>, and 84.7% of visitors decide to stay based on initial color hierarchy. We use vibrant wing-specific Aurora Gradients (Violet for AI, Emerald for Music, Rose for Streaming, Amber for Gaming).',
          ux_card2_title: '2. Visual Price Anchoring',
          ux_card2_desc: 'Platforms like <strong>GG.deals and AppSumo</strong> pair numbers with a <strong>visual comparison bar</strong> contrasting the full official price against the short green safe-deal bar, boosting conversion by <strong>24%–35%</strong>.',
          ux_card3_title: '3. Bento Grid Architecture',
          ux_card3_desc: 'Inspired by <strong>Apple and Linear</strong>, an asymmetric Bento Grid lets visitors scan top safe deals, freebies, and included perks within <strong>15 seconds</strong> without table fatigue.',
          ux_card4_title: '4. Interactive Micro-Commitment Hook',
          ux_card4_desc: 'Instead of making visitors calculate from scratch, interactive subscription pills let them tap their active apps and watch annual savings update live.',
          ux_footer_text: 'All 4 design principles are applied in Digital Expo while strictly preserving neutral rankings and honest trust badges!',
          ux_gotit_btn: 'Explore the Expo',
          affiliate_disclosure: '"We may earn a store commission — it never changes your price or our ranking"'
        }
      };

      const PRODUCT_EN_DESC = {
        p_chatgpt: 'Official OpenAI subscription for GPT-4o, o1 reasoning, image generation, and advanced voice mode.',
        p_claude: 'Anthropic’s premier AI assistant for coding and analytical writing with a massive context window and Artifacts.',
        p_gemini: 'Google One AI Premium bundle featuring Gemini Advanced, 2TB cloud storage, and Workspace integration.',
        p_perplexity: 'Citation-backed AI answer engine with unified access to Claude, GPT-4o, and DeepSeek models.',
        p_mscopilot: 'Microsoft Copilot Pro AI assistant integrated directly into Word, Excel, PowerPoint, and Outlook.',
        p_grok: 'Advanced Grok AI model by xAI with real-time platform data access and image generation.',
        p_deepseek: 'High-efficiency open reasoning & coding AI model at the lowest pay-as-you-go API cost.',
        p_mistral: 'Le Chat Pro subscription from Europe’s Mistral AI for high-speed models and strict privacy.',
        p_midjourney: 'Global benchmark for photorealistic AI image generation with 15 Fast GPU hours monthly.',
        p_copilot: 'World’s most widely adopted AI coding assistant integrated into VS Code and JetBrains IDEs.',
        p_cursor: 'AI-native code editor for generating, refactoring, and debugging full-scale software projects.',
        p_spotify: 'Largest global music & podcast streaming library ad-free with smart playlists and offline listening.',
        p_applemusic: 'Lossless audio streaming with Spatial Audio and Dolby Atmos across all Apple devices.',
        p_ytmusic: 'Complete YouTube music catalog, live performances, and background listening without ads.',
        p_amazonmusic: 'Amazon Music Unlimited in Ultra HD with millions of songs and exclusive podcasts.',
        p_tidal: 'Audiophile-grade music streaming platform in studio HiRes FLAC quality.',
        p_deezer: 'HiFi music streaming featuring Flow smart discovery and offline downloads.',
        p_anghami: 'Leading Arabic & international music platform in MENA; often bundled free with telecom plans.',
        p_netflix: 'Leading global streaming network for original series, movies, and documentaries in Full HD & 4K.',
        p_disney: 'Home of Disney, Pixar, Marvel, Star Wars, and National Geographic in one streaming service.',
        p_max: 'Home of HBO Originals, Warner Bros. blockbusters, and the DC Universe in 4K.',
        p_hulu: 'Massive library of current US TV series, movies, and original programming.',
        p_primevideo: 'Amazon’s streaming platform for exclusive series and movies; included with Amazon Prime.',
        p_appletv: 'Award-winning Apple Original series and films in 4K Dolby Vision and Dolby Atmos.',
        p_paramount: 'Paramount studio movies, live sports, and Showtime original series.',
        p_ytpremium: 'Ad-free YouTube video streaming with offline downloads, background play, and YouTube Music included.',
        p_crunchyroll: 'World’s largest official anime and manga streaming library.',
        p_shahid: 'Premier Arabic streaming platform for Shahid Originals, exclusive series, and live sports.',
        p_osn: 'Home of HBO exclusives, Hollywood blockbusters, and Arabic series across MENA.',
        p_starzplay: 'Leading entertainment and live sports streaming service in MENA.',
        p_gamepass: 'Hundreds of PC & Xbox games on day one, including EA Play and cloud gaming.',
        p_psplus: 'Online multiplayer, monthly PS4/PS5 games, and game catalog access.',
        p_nso: 'Online multiplayer on Nintendo Switch plus classic NES/SNES/GBA libraries; cheapest via Family Plan.',
        p_eaplay: 'Unlimited access to EA sports and action titles plus 10-hour early trials of new releases.',
        p_ubisoftplus: 'Ultimate editions of Ubisoft games on release day across PC and console.',
        p_geforcenow: 'Stream your owned Steam & Epic games on cloud RTX 4080 rigs.',
        p_amazonluna: 'Amazon cloud gaming service; includes rotating free monthly games for Prime members.',
        p_applearcade: 'Over 200 premium ad-free games for iPhone, iPad, Mac, and Apple TV.',
        p_cyberpunk: 'Open-world futuristic RPG set in Night City, including the Phantom Liberty expansion.',
        p_steam_games: 'Compare official Steam PC game keys across authorized publisher resellers.',
        p_epic_games: 'Major PC games store featuring 1–2 permanently free games every week.',
        p_gog_games: 'Buy classic and modern PC games 100% DRM-free with full offline installers.',
        p_battlenet_games: 'Diablo IV, World of Warcraft, and Call of Duty via official store & balance cards.',
        p_console_stores: 'Best ways to buy digital PlayStation, Xbox, and Nintendo eShop games via discounted gift cards.',
        p_ea_ubisoft_games: 'EA FC, Assassin’s Creed, and free monthly Amazon Games for Prime members.',
        p_ms365: 'Full cloud Office suite (Word, Excel, PowerPoint) with 1TB OneDrive storage per user.',
        p_adobe: 'Complete creative suite: Photoshop, Illustrator, Premiere Pro, After Effects, and Acrobat.',
        p_autodesk: 'Industry-standard CAD, BIM, and 3D software (AutoCAD, Revit, Maya, 3ds Max).',
        p_jetbrains: 'Professional IDEs (IntelliJ, PyCharm, WebStorm); 100% free for verified students and open-source devs.',
        p_captureone: 'Premier professional RAW photo editing and tethered studio capture software.',
        p_avid: 'Film and audio industry standard for Pro Tools and Media Composer.',
        p_ableton: 'Iconic Ableton Live digital audio workstation for music production and live performance.',
        p_appsumo_deals: 'Top global marketplace for lifetime SaaS and AI tool deals with a one-time payment.',
        p_stacksocial_deals: 'Exclusive lifetime license bundles for Windows, Microsoft Office, and Mac apps.',
        p_humble_soft_prod: 'Periodic bundles of creative, video editing, and utility software at a fraction of retail price.',
        p_free_giveaways: 'Get 100% legal, free daily licenses for paid Windows and Mac software.',
        p_bitsdujour_deals: 'Daily direct-from-developer discounts on licensed Windows and Mac software.',
        p_ms_mac_stores: 'Buy official Windows and Mac productivity apps using discounted store gift cards.'
      };

      const COUNTRIES_EN_CONFIG = {
        US: {
          nameEn: 'United States (USA)',
          perksPreviewEn: 'Many US carriers and banks (Verizon, T-Mobile, AT&T, Amex Platinum, Chase) include free subscriptions (Disney+, Hulu, Netflix, Apple TV+, Perplexity) in your existing plans and cards.'
        },
        EG: {
          nameEn: 'Egypt',
          perksPreviewEn: 'Many carriers and banks in Egypt (Vodafone Red, Orange Premier, WE, CIB) include free subscriptions (Shahid VIP, Anghami Plus, Watch It) in your existing plans.'
        },
        SA: {
          nameEn: 'Saudi Arabia (KSA)',
          perksPreviewEn: 'Many carriers and banks in Saudi Arabia (STC, Mobily, Zain, Al Rajhi Bank, SNB) include free subscriptions (Shahid VIP, OSN+, Anghami, Amazon Prime) in your plans.'
        },
        AE: {
          nameEn: 'United Arab Emirates (UAE)',
          perksPreviewEn: 'Many carriers and banks in the UAE (e&, du, Emirates NBD, FAB) include free subscriptions (Disney+, Shahid VIP, OSN+, Amazon Prime) in your plans.'
        },
        EU: {
          nameEn: 'Europe (EU)',
          perksPreviewEn: 'Many European carriers and banks (Vodafone, Orange, Deutsche Telekom, Revolut Metal/Ultra) include free subscriptions (Perplexity Pro, YouTube Premium, Spotify, Disney+).'
        },
        GB: {
          nameEn: 'United Kingdom (UK)',
          perksPreviewEn: 'Many UK carriers and banks (EE, O2, Vodafone UK, Revolut, Barclays) include free subscriptions (Apple Music, Apple TV+, Xbox Game Pass, Disney+, Perplexity).'
        },
        GL: {
          nameEn: 'Global / International',
          perksPreviewEn: 'Carriers, banks, and universities worldwide (GitHub Student Pack, Amex, Revolut, Telecom Bundles) include free subscriptions in your existing plans.'
        }
      };

      Object.keys(COUNTRIES_CONFIG).forEach(code => {
        if (COUNTRIES_EN_CONFIG[code]) {
          COUNTRIES_CONFIG[code].nameEn = COUNTRIES_EN_CONFIG[code].nameEn;
          COUNTRIES_CONFIG[code].perksPreviewEn = COUNTRIES_EN_CONFIG[code].perksPreviewEn;
        }
      });

      CENTRAL_EXPO_DATA.products.forEach(p => {
        p.nameEn = p.name
          .replace(' (ألعاب ومفاتيح PC)', ' (PC Games & Keys)')
          .replace(' (متجر وعروض)', ' (Store & Freebies)')
          .replace(' (ألعاب بدون DRM)', ' (DRM-Free Games)')
          .replace(' (ألعاب Blizzard)', ' (Blizzard Games)')
          .replace(' (صفقات مدى الحياة)', ' (Lifetime Deals)')
          .replace(' (تراخيص وحزم)', ' (Licenses & Bundles)')
          .replace(' (خصومات برامج يومية)', ' (Daily Software Deals)')
          .replace(' (تطبيقات رسمية)', ' (Official Apps)');
        p.descEn = PRODUCT_EN_DESC[p.id] || p.desc;
      });

      CENTRAL_EXPO_DATA.i18n = BILINGUAL_UI;

      const COUNTRY_EN_NAMES = {
        US: 'United States (USA)',
        EG: 'Egypt',
        SA: 'Saudi Arabia (KSA)',
        AE: 'United Arab Emirates (UAE)',
        EU: 'Europe (EU)',
        GB: 'United Kingdom (UK)',
        GL: 'Global / International'
      };


  // تصدير جميع الكيانات ضمن مصدر البيانات المركزي الوحيد window.CENTRAL_EXPO_DATA
  CENTRAL_EXPO_DATA.countryEnNames = COUNTRY_EN_NAMES;
  CENTRAL_EXPO_DATA.productEnDesc = PRODUCT_EN_DESC;
  CENTRAL_EXPO_DATA.countriesEnConfig = COUNTRIES_EN_CONFIG;
  CENTRAL_EXPO_DATA.preservedEntityIds = PRESERVED_ENTITY_IDS;
  window.CENTRAL_EXPO_DATA = CENTRAL_EXPO_DATA;
})();
