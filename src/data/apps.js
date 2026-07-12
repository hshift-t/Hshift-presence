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
    name: "EasyDim",
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
    id: "pennyledger",
    catalog: "HS·03",
    name: "PennyLedger",
    glyph: "P",
    category: "Finance",
    tagline: "Spending you can actually see, without opening a spreadsheet.",
    tone: "#C08A8A",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.hshift.pennyledger",
    privacy: {
      updated: "[Add effective date]",
      sections: [
        { h: "Information we collect", p: "Placeholder — list transaction data, budget categories, and any bank-linking details." },
        { h: "How we use it", p: "Placeholder — explain how spending data powers charts, alerts, and budget suggestions." },
        { h: "Sharing & third parties", p: "Placeholder — name any financial-data aggregators used to sync transactions." },
        { h: "Data retention & deletion", p: "Placeholder — describe how long financial records are kept and how to export or delete them." },
        { h: "Contact", p: "Placeholder — add a support email for privacy questions specific to PennyLedger." },
      ],
    },
  },
  {
    id: "quiethours",
    catalog: "HS·04",
    name: "QuietHours",
    glyph: "Q",
    category: "Wellbeing",
    tagline: "One button that mutes the noise, not the important stuff.",
    tone: "#94A98A",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.hshift.quiethours",
    privacy: {
      updated: "[Add effective date]",
      sections: [
        { h: "Information we collect", p: "Placeholder — list notification/contact permissions and schedule preferences QuietHours stores." },
        { h: "How we use it", p: "Placeholder — explain how permissions are used to filter notifications and calls." },
        { h: "Sharing & third parties", p: "Placeholder — disclose any third-party services involved, or state there are none." },
        { h: "Data retention & deletion", p: "Placeholder — describe how schedule data is stored locally or remotely, and how to clear it." },
        { h: "Contact", p: "Placeholder — add a support email for privacy questions specific to QuietHours." },
      ],
    },
  },
];

export const CYCLE_WORDS = ["orbiting", "aligning", "drifting", "settling"];
