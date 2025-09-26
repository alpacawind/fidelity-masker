# Fidelity Account Masker

A Tampermonkey userscript that automatically masks account numbers on Fidelity's digital portfolio positions page for enhanced privacy and security.

## 🔒 What it does

This script automatically replaces the last digits of your account numbers with `****yourmum` on the Fidelity Positions page (`https://digital.fidelity.com/ftgw/digital/portfolio/positions`). This helps protect your account information from:

- Shoulder surfing
- Screen recordings/screenshots
- Accidental exposure during screen sharing
- Browser history/cache concerns

## 📋 Features

- **Automatic Detection**: Finds and masks account numbers as soon as they load
- **Dynamic Content Support**: Works with Fidelity's AG Grid virtualized rows
- **Robust Targeting**: Uses multiple fallback methods to ensure reliable masking
- **Performance Optimized**: Avoids re-processing already masked elements
- **SPA Compatible**: Handles single-page application navigation and re-renders

## 🚀 Installation

### Prerequisites
- [Tampermonkey](https://www.tampermonkey.net/) browser extension installed
- Access to Fidelity's digital portfolio platform

### Steps
1. Install Tampermonkey for your browser:
   - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Safari](https://apps.apple.com/us/app/tampermonkey/id1482490089)
   - [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

2. Click on the Tampermonkey extension icon in your browser
3. Select "Create a new script"
4. Replace the default template with the script from `fidelity-account-masker.js`
5. Save the script (Ctrl+S or Cmd+S)
6. Navigate to your Fidelity positions page to see it in action

## 📁 Repository Structure

```
fidelity-account-masker/
├── README.md                    # This file
├── fidelity-account-masker.js   # Main Tampermonkey script
├── LICENSE                      # MIT License
└── screenshots/                 # Before/after examples
    ├── before.png
    └── after.png
```

## 🎯 How it works

The script uses three complementary approaches to ensure reliable masking:

1. **Class-based targeting**: Looks for `span.posweb-cell-account_secondary` elements
2. **Structural fallback**: Targets the 3rd span within `h3.posweb-cell-account` elements
3. **Dynamic observation**: Uses MutationObserver to catch dynamically loaded content

### Technical Details

- **Target Page**: `https://digital.fidelity.com/ftgw/digital/portfolio/positions*`
- **Replacement Text**: `****yourmum`
- **DOM Monitoring**: Watches for new content via MutationObserver
- **Safety Interval**: Runs periodic checks for 30 seconds after page load
- **Deduplication**: Marks processed elements to avoid repeated processing

## 🛠️ Customization

### Change the Mask Text
Edit line 12 in the script:
```javascript
const MASK_TEXT = '****yourmum';  // Change this to your preferred mask
```

### Adjust Safety Interval
Modify the interval duration and frequency on lines 74-75:
```javascript
const maxTicks = 60; // Total number of checks (60 = ~30 seconds)
// ...
}, 500);  // Check every 500ms
```

## 🔧 Troubleshooting

### Script not working?
1. Ensure Tampermonkey is enabled for the Fidelity domain
2. Check that the script is enabled in Tampermonkey dashboard
3. Refresh the Fidelity positions page
4. Open browser console (F12) to check for any errors

### Account numbers still visible?
- Fidelity may have updated their HTML structure
- Check the browser console for errors
- Try disabling and re-enabling the script
- Report the issue with screenshots if possible

### Performance issues?
- The script is designed to be lightweight
- If you experience slowdowns, try increasing the safety interval duration
- Consider disabling other userscripts temporarily to isolate the issue

## 🤝 Contributing

Contributions are welcome! Please feel free to:

- Report bugs or issues
- Suggest improvements
- Submit pull requests
- Share feedback

### Development Setup
1. Fork this repository
2. Make your changes to `fidelity-account-masker.js`
3. Test on the Fidelity positions page
4. Submit a pull request with a clear description

## ⚠️ Disclaimer

This script is for privacy and security purposes only. It:

- **Does NOT** modify any actual account data
- **Does NOT** send data anywhere
- **Only** changes the visual display in your browser
- **Is NOT** affiliated with or endorsed by Fidelity

Use at your own discretion. Always verify your actual account information through official Fidelity channels.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for enhanced privacy during screen sharing and recordings
- Inspired by the need for better financial data protection
- Thanks to the Tampermonkey community for userscript best practices

---

**Note**: This script only affects the visual display in your browser. Your actual account numbers remain unchanged in Fidelity's systems.

```
I've created a comprehensive README that covers all the essential aspects of your Tampermonkey script repository. Here are the key sections included:

## 📋 **Key Features of this README:**

- **Clear purpose statement** - explains what the script does and why it's useful
- **Step-by-step installation** - makes it easy for users to get started
- **Technical documentation** - explains how the script works under the hood
- **Customization options** - shows users how to modify the script for their needs
- **Troubleshooting section** - helps users resolve common issues
- **Contributing guidelines** - encourages community involvement
- **Important disclaimers** - clarifies what the script does and doesn't do

## 🎯 **Repository Structure Suggested:**

```
fidelity-account-masker/
├── README.md
├── fidelity-account-masker.js
├── LICENSE
└── screenshots/
    ├── before.png
    └── after.png
```

## 💡 **Additional Recommendations:**

1. **Add screenshots** showing before/after examples (with fake account numbers)
2. **Include a LICENSE file** (MIT License is suggested in the README)
3. **Consider adding a CHANGELOG.md** if you plan to version the script
4. **Add GitHub issue templates** for bug reports and feature requests
