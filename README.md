# HyperCard AI

A tribute to Bill Atkinson (1951-2025) and his revolutionary HyperCard.

## About

HyperCard AI reimagines the classic HyperCard experience with modern AI capabilities. Created by Tomoyasu Hirano (平野友康) as a homage to the software that inspired a generation of developers.

## Features

- **Classic Mac UI**: Authentic 1980s Macintosh interface with pixel fonts
- **AI Assistant**: Imagine if AI existed in 1987 - powered by ChatGPT
- **Interactive Stacks**: 
  - Welcome Stack with AI demo
  - Adventure Game (Quest for HyperCard)
  - HyperCard Memories Board
  - Connect Board for collaborators
- **Firebase Integration**: Cloud storage and authentication
- **Mobile Responsive**: Works on modern devices while maintaining retro aesthetics

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Create a Firebase project
   - Enable Authentication (Email/Password)
   - Create Firestore database
   - Add your config to `.env.local`

4. Add OpenAI API key to `.env.local` for AI features

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deploy to Vercel:
```bash
vercel
```

## Join the Teleport Project

We're building the next generation of HyperCard for the AI era. Looking for:
- Generative AI Full-stack Engineers
- UI/UX Designers
- HyperCard enthusiasts

Visit the Connect Board in the app to get involved!

## License

MIT

---

*"The computer should be doing the hard work. People should be doing the creative work."*  
– Bill Atkinson
