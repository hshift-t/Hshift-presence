export const APPS = [
  {
    id: "HubComm",
    catalog: "HS·01",
    name: "HubComm",
    glyph: "H",
    category: "Productivity",
    tagline: "One App to interact with siloed memnbers.",
    tone: "#8B85C7",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.hshift.HubComm",
    privacy: {
      updated: "[Add effective date]",
      sections: [
        { h: "Privacy Protocol", p:"Users data is collected and used in accordance with the Hshift Privacy Policy." },
      ],
    },
  },
  {
    id: "EasyDim",
    catalog: "HS·02",
    name: "EasyDim - Screen Dimmer & Eye Care",
    glyph: "E",
    category: "Wellbeing",
    tagline: "Go Ultra-Dim with a single tap.",
    tone: "#6FA9A6",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.hshift.EasyDim",
    privacy: {
      updated: "July 12, 2026",
      pew : "We do not collect, store, or transmit any personal data  EasyDim is dey telemetry, usage data, or personal information to our servers or any third parties.",
      sections: [
        { h: "Information we collect", p: "We do not collect, store, or transmit any personal data  EasyDim is designed to work entirely locally on your device. We do not require an account, we do not track your location, and we do not transmit any telemetry, usage data, or personal information to our servers or any third parties." },
        { h: "Required Permissions", p: "To function properly, EasyDim requires specific Android system permissions. We are committed to complete transparency about why these permissions are needed.Display Over Other Apps (SYSTEM_ALERT_WINDOW)- Why it's needed: EasyDim works by rendering a transparent, colored layer over your screen to reduce brightness and apply eye-care filters, such as blue light reduction. To draw this layer over your operating system and other apps, Android requires the Display over other apps permission. How it's used: This permission is used only to display the dimming overlay. It is configured with FLAG_NOT_TOUCHABLE and FLAG_NOT_FOCUSABLE, which means it cannot intercept your touches, read your screen content, or act as a keylogger.Usage Access (PACKAGE_USAGE_STATS) Why it's needed: EasyDim includes a Smart Pause feature that automatically hides the dimming overlay when you open selected apps, such as your Camera or Netflix. To detect when these apps are in the foreground, EasyDim needs access to the system's active package state.How it's used: EasyDim checks your device's usage statistics locally to compare the foreground app's package name with your personal Smart Pause list. This data never leaves your device. We do not log, store, or transmit your app usage history." },
        { h: "Third parties Services (Admob)", p: "EasyDim uses Google AdMob to display banner advertisements within the app's settings dashboard.         - Google AdMob may collect and use data (such as your device's Advertising ID) to provide personalized advertisements.        - For more information on how Google uses this data, please review [Google's Privacy & Terms](https://policies.google.com/technologies/ads).        - **Note:** Advertisements are only shown inside the EasyDim dashboard. No ads will ever be displayed on the screen dimming overlay itself." },

        { h: "Data Security", p: "Because EasyDim processes all core features (screen dimming and Smart Pause detection) entirely offline and directly on your device, your data is inherently secure. There are no databases or external servers involved in the core functionality of this app." },
      ],
    },
  },
  {
    id: "StatushdSaver",
    catalog: "HS·03",
    name: "Status W - Status Saver",
    glyph: "P",
    category: "Utility",
    tagline: "Save Status from Whatsapp Effortlessly.",
    tone: "#C08A8A",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.hshift.pennyledger",
    privacy: {
      updated: "23-07-2026",
      sections: [
        { h: "Information we collect", p: "We do NOT collect, store, or transmit your personal data. Status HD Saver is designed to operate entirely locally on your device. We do not require you to create an account, nor do we collect your name, email, phone number, or contacts." },
        { h: "Local Device Data (Media and Files):", p: "To provide the core functionality of saving statuses, the App requires read and write access to your local device storage. The media files (images and videos) you view and save are stored entirely on your local device. We do not upload, host, or share these files to any external servers or third parties." },
        { h: "Advertising and Analytics Data:", p: "We use third-party services Google AdMob to serve advertisements within the App. These third parties may collect non-personal information about your device, such as your IP address, device identifiers (Advertising ID), and usage data to provide relevant ads." },
        { h: "How Do We Use Your Information?", p: "Since we do not collect personal data, we only use the local permissions you grant us for the following purposes:- Core Functionality: To fetch, display, and locally save statuses (images/videos) from WhatsApp and WhatsApp Business to your device's gallery. Utility Tools: To format text (Text Repeater) or launch a WhatsApp chat via Android Intents (Direct Chat) without saving the number to your contacts. These operations happen locally.- Monetization: Third-party ad networks (Google AdMob) use your device's Advertising ID to serve personalized or non-personalized advertisements." },
        { h: "Third-Party Apps (WhatsApp)", p: "Status HD Saver is an independent utility application. We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with WhatsApp Inc., Facebook, Meta, or any of their subsidiaries or affiliates. The names WhatsApp and WhatsApp Business as well as related names, marks, emblems, and images are registered trademarks of their respective owners. You are responsible for ensuring you have the right to save and share the media you access using this App." },
        { h: "Contact", p: "If you have questions or comments about this notice, you may contact the developer at: hshift.support@gmail.com" }
      ],
    },
  },
  {
    id: "Magneter",
    catalog: "HS·04",
    name: "Magneter",
    glyph: "M",
    category: "Utility",
    tagline: "A tool that magnetically fetches content from different sources.",
    tone: "#94A98A",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.hshift.magneter",
    privacy: {
      updated: "September 21, 2026",
      sections: [
        { h: 'Magneter ("we", "our", or "the app") is a video downloading utility that allows users to fetch publicly accessible videos from supported platforms by providing a video URL.', p: "Thanyou for using Magneter!" },
        { h: "Information we collect", p: "When you paste a video URL into Magnetar, the URL may be processed to identify and fetch the requested video. URLs may be temporarily processed by the app or its supporting services solely to provide the requested functionality." },
        { h: "How we use it", p: "Using Magnetar is simple: Copy the URL of a supported video. Paste the URL into Magnetar. Magnetar processes the URL and attempts to identify the available video. Select your preferred video quality when available. Download the video to your device. Magnetar does not require you to create an account to use its basic functionality." },
        { h: "Advertising", p: "Magnetar may use third-party advertising services to display advertisements within the app. These services may collect certain information, such as advertising identifiers, device information, approximate location, or interaction with advertisements, in accordance with their own privacy policies. Users may have options to manage personalized advertising through their Android device settings and Google's advertising controls." },
        { h: "Data retention & deletion", p: "Magnetar does not collect or retain any user data beyond the scope of its functionality. All data is deleted upon uninstallation of the app." },
        { h: "Contact", p: "If you have questions, concerns, or requests regarding this Privacy Policy or Magnetar, please contact us at: hshift.support@gmail.com" },
      ],
    },
  },
];

export const CYCLE_WORDS = ["orbiting", "aligning", "drifting", "settling"];
