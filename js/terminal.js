/**
 * Terminal Emulator Module
 * Provides an interactive developer console to explore Yashashvi's portfolio via CLI.
 */

function initTerminal() {
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');
  if (!terminalInput || !terminalBody) return;

  const welcomeMessage = `Welcome to Yashashvi's Interactive Shell v1.0.0
Type <span style="color: #38bdf8; font-weight: bold;">help</span> to inspect available commands.
`;
  printTerminalOutput(welcomeMessage);

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = terminalInput.value.trim();
      terminalInput.value = '';
      if (!rawCmd) return;

      printTerminalOutput(`<span style="color: #10b981;">guest@yashashvi:~$</span> ${escapeHTML(rawCmd)}`);
      executeCommand(rawCmd.toLowerCase());
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  // Clicking terminal container focuses input
  document.getElementById('terminal-box')?.addEventListener('click', () => {
    terminalInput.focus();
  });
}

function executeCommand(cmd) {
  switch (cmd) {
    case 'help':
      printTerminalOutput(`Available commands:
  <span style="color: #38bdf8;">about</span>     - Yashashvi's bio & background
  <span style="color: #38bdf8;">skills</span>    - Technical stack & competencies
  <span style="color: #38bdf8;">projects</span>  - Key engineering projects
  <span style="color: #38bdf8;">patent</span>    - Granted patent details
  <span style="color: #38bdf8;">paper</span>     - Published research paper
  <span style="color: #38bdf8;">contact</span>   - Direct contact channels
  <span style="color: #38bdf8;">clear</span>     - Clear console screen
  <span style="color: #38bdf8;">whoami</span>    - Current session user
`);
      break;

    case 'about':
      printTerminalOutput(`Yashashvi Srivastava | B.Tech CSE (AI & ML) at VIT Bhopal University (CGPA: 8.67/10, Top 10%).
Specializing in Generative AI, LLMs, Computer Vision, and scalable cloud APIs.`);
      break;

    case 'skills':
      printTerminalOutput(`Languages:    Python, Java, SQL, JavaScript, HTML5, CSS3
AI/ML:        TensorFlow, Keras, scikit-learn, Computer Vision, LLMs, Gemini API
Web & Cloud:  FastAPI, Flask, Streamlit, Firebase Firestore, REST APIs
Hardware:     Raspberry Pi 4, IoT Systems, Docker, Git`);
      break;

    case 'projects':
      printTerminalOutput(`1. PureUP: Air Quality Plant Recommender (FastAPI, 90% accuracy, Render 300+ req/day)
2. Aura: Health Habit Tracker (Flask, Firebase, Gemini API personalized coaching)
3. AI Study Buddy: Automated 3-Day Learning Roadmaps (Streamlit, Gemini API)`);
      break;

    case 'patent':
      printTerminalOutput(`[GRANTED PATENT] Automated Spraying System
- Organization: MPCST Lab, VIT Bhopal University
- Key Metric:   20% automation efficiency gain
- Architecture: DenseNetV2 deep learning on Raspberry Pi 4 for real-time crop disease detection`);
      break;

    case 'paper':
      printTerminalOutput(`[PUBLICATION] Towards Automated Crop Protection: Fusion of DenseNet121-ResNet50 model for Disease Detection and Pest Recognition
- Mentors: Dr. Anil Kumar Yadav & Mr. Shiv Shankar Prasad Shukla
- Impact:  3+ scientific citations`);
      break;

    case 'contact':
      printTerminalOutput(`Email:    yashashvisrivastava674@gmail.com
Phone:    +91 8303355281
LinkedIn: https://www.linkedin.com/in/yashashvi-srivastava-681b35251
GitHub:   https://github.com/yashashvisri`);
      break;

    case 'whoami':
      printTerminalOutput(`guest@portfolio-visitor (Welcome to Yashashvi's portfolio)`);
      break;

    case 'sudo':
      printTerminalOutput(`Permission denied: With great power comes great responsibility.`);
      break;

    case 'clear':
      document.getElementById('terminal-output-container').innerHTML = '';
      break;

    default:
      printTerminalOutput(`command not found: "${cmd}". Type <span style="color: #38bdf8;">help</span> for a list of commands.`);
  }
}

function printTerminalOutput(htmlContent) {
  const container = document.getElementById('terminal-output-container');
  if (!container) return;
  const line = document.createElement('div');
  line.className = 'terminal-output';
  line.innerHTML = htmlContent;
  container.appendChild(line);
}

function escapeHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
